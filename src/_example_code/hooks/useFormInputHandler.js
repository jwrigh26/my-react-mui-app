import { useDebounce } from 'hooks/useDebounce';
import { useCallback, useRef, useState } from 'react';
import { hasValue, isFunction } from 'utils/helpers';

export const useFormInputHandler = ({
  errorContext,
  ids,
  validationCallback,
}) => {
  if (!errorContext?.errors) {
    throw new Error(
      'useFormInputHandler must be called with an errorContext object that has an errors property.'
    );
  }

  if (!isFunction(errorContext.setError)) {
    throw new Error(
      'useFormInputHandler must be called with an errorContext object that has an setError function.'
    );
  }

  const { errors, setError } = errorContext;
  const validationRef = useRef({});

  // Convert errors into a boolean for each input to track if it has an error
  // Boolean errors determine if the input should be marked dirty.
  const errorBooleans = Object.keys(errors).reduce((acc, key) => {
    acc[key] = !!errors[key];
    return acc;
  }, {});

  // Initialize 'dirty' state for each input based on their existing errors.
  // dirty looks like this: { id: true }
  const [dirty, setDirty] = useState(errorBooleans);

  // Helper method to get the error for a given id
  // It takes an id and returns a string used as a error message
  const getError = (id) => {
    return errors?.[id] || null;
  };

  // Helper method to check if the form is valid
  // It only checks if valid or not and does not set any state
  const isValid = (options) => {
    const { dirtied = false, setErrorOnValidation = false } = options || {};
    let filteredIds = ids;

    // If dirtied is true, then we only want to validate inputs that have been dirtied.
    // This prevents checking on every input change.
    // Why is this important? Because say we want to validate something that is required
    // but the value is currenlty an empty string. We don't want to show the error message
    // sometimes like if the user navigates back to page 1 and the input is empty.
    if (dirtied) {
      filteredIds = ids.filter((id) => dirty[id]);
    }

    // Finds the first input that has an error from the validationRef object of inputs
    // ------------
    // Check if any input has an error message.
    // The loop will break if an error is found.
    // The variable 'hasValidationError' will be set to true if any input has an error.
    // We return the opposite of 'hasValidationError' to indicate that the form is valid if no errors are found.
    const hasValidationError = filteredIds?.some((id) => {
      let value = validationRef.current[id]?.value;

      if (validationRef.current[id]?.type === 'checkbox') {
        value = validationRef.current[id]?.checked;
      }

      const validationError = validationCallback(id, value, validationRef);
      const hasError = hasValue(validationError);

      if (setErrorOnValidation && hasError) {
        setError(id, validationError);
      }

      if (hasError) {
        console.log('Validation error found for', id, validationError);
      }

      return hasError;
    });

    // Return opposite of hasValidationError for isValid
    const valid = !hasValidationError;
    return valid;
  };

  // The 'disabled' state controls the 'Submit' button's availability based on form validity.
  const [disabled, setDisabled] = useState(true);

  // Update the 'disabled' state every time the form undergoes changes.
  const checkFormValidity = (event) => {
    if (!event?.target) return;
    event.preventDefault();
    setDisabled(!isValid());
  };

  // This is used under the hood of the handleBlur and handleChange methods.
  const handleInput = (event) => {
    if (!event?.target) return;
    event.preventDefault();
    const { id, value } = event.target;
    const validationError = validationCallback(id, value, validationRef);
    setError(id, validationError);
  };

  const handleBlur = useCallback(
    (id) => (event) => {
      handleInput(event);
      // Let's check if we should dirty the input
      // We only want to dirty if the input on blur is valid
      // Guard: first check if dirty, if dirty we bail.
      if (dirty[id]) return;
      // If not dirty, set dirty to true
      setDirty((prevDirty) => ({
        ...prevDirty,
        [id]: true,
      }));
      // In handleInput, we cover valiation for the current input, but
      // we also need to check if the whole form is valid.
      checkFormValidity(event);
    },
    []
  );

  // Debouncing is applied to improve performance and limit unnecessary validations.
  const handleDebouncedValidation = useDebounce(checkFormValidity);

  // Combines debounced and immediate validation based on the 'dirty' state.
  const handleChange = (id) =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useCallback(
      (event) => {
        // Only run the debounced input handler if the input is dirty.
        if (dirty[event.target?.id]) {
          // Not debouncing due to issues with auto-fill scenarios
          // where the error doesn't clear right away.
          // Validation is still on debounce which will help performance.
          // for other forms.
          handleInput(event);
        }
        handleDebouncedValidation(event);
      },
      [dirty[id]]
    );

  const handleSelect = useCallback(
    (id) => (ref) => {
      const validationError = validationCallback(id, ref?.value, validationRef);

      setError(id, validationError);
      // If required can update any other state/context here too.
      setDisabled(!isValid());
    },
    []
  );

  const handleChecked = useCallback(
    (id) => (ref) => {
      const validationError = validationCallback(
        id,
        ref?.target?.checked,
        validationRef
      );
      setDirty((prevDirty) => ({
        ...prevDirty,
        [id]: true,
      }));
    },
    []
  );

  const handleRadioSelect = useCallback(
    (id) => (ref) => {
      const validationError = validationCallback(id, ref?.value, validationRef);
      setError(id, validationError);
      setDisabled(!isValid());
    },
    []
  );

  const clearForm = useCallback(() => {
    setDirty({});
    setDisabled(true);
    Object.keys(validationRef.current).forEach((key) => {
      validationRef.current[key].value = null; // Clear out the values
      if (validationRef.current[key].checked) {
        validationRef.current[key].checked = false;
      }
    });
  }, []);

  return {
    disabled,
    clearForm,
    getError,
    handleBlur,
    handleChange,
    handleSelect,
    handleChecked,
    handleRadioSelect,
    isValid, // should be used to confirm if the whole form is valid
    validationRef,
    setDirty,
    validate: () => {
      const valid = isValid({ setErrorOnValidation: true });
      setDisabled(!valid);
      return valid;
    },
  };
};
