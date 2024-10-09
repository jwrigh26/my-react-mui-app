import { defer } from 'react-router-dom';

/**
 * This function dfers the loading of a component using react-router-dom's defer function
 * It's designed to work with react-router's await and react's suspense for loading async components.
 *
 * Example:
 * export function myLoader(store, data) {
 *   const fetchDeferredData = async () => {
 *     const { foo } = store.getState().fooData ?? {};
 *     const myData = await processFooData(foo);
 *     return { ...data, foo: myData };
 *   };
 *   return deferLoading(store, data, fetchDeferredData);
 * }
 */
export function deferLoading(store, routeData, fetchDeferredData) {
  return defer({
    ...routeData,
    root: new Promise((resolve, reject) => {
      (async () => {
        try {
          const payload = await fetchDeferredData(store);
          resolve({
            ...payload,
          });
        } catch (error) {
          reject(error);
        }
      })(); // invoke the async function right away
    }),
  });
}

/**
 * Generic function to load a part of the state from the Redux store
 * @param {Object} store - The Redux store
 * @param {Function} selector - A function that selects the part of the state to load
 * @param {Function} validator - A function that validates the loaded state
 * @param {String} errorMessage - The error message to return if the state is not loaded
 * @param {Boolean} timer - Whether to run a timer to timeout
 * @returns {Promise} - A promise that resolves when the state is loaded
 */
export function loadFromStore({
  store,
  selector,
  validator,
  errorMessage,
  shouldTimeout = true,
}) {
  return new Promise((resolve, reject) => {
    if (!store || !selector) {
      throw new Error('Missing required parameters');
    }

    const currentState = selector(store.getState());

    if (!shouldTimeout) {
      resolve(currentState);
      return;
    }

    if (shouldTimeout && !validator) {
      throw new Error('Missing validator function');
    }

    const stopTimer = (id) => {
      if (shouldTimeout) {
        clearTimeout(id);
      }
    };

    if (!!validator(currentState)) {
      resolve(currentState);
      return;
    }

    let timeoutId;
    if (shouldTimeout) {
      timeoutId = setTimeout(() => {
        unsubscribe();
        reject(new Error(errorMessage));
        // Set url to error page 400
        console.log(`%cTIMEOUT HAPPENED`, 'color: #7FFFD4');
        window.location.href = '/error?status=400';
      }, 5000);
    }

    let isUnsubscribed = false;
    const unsubscribe = store.subscribe(() => {
      if (isUnsubscribed) {
        return;
      }
      const newState = selector(store.getState());
      if (!!validator(newState)) {
        stopTimer(timeoutId);
        unsubscribe();
        isUnsubscribed = true;
        resolve(newState);
      }
    });
  });
}
/**
 * Load the user from the Redux store
 * @param {Object} store - The Redux store
 * @returns {Promise} - A promise that resolves when the user is loaded
 */
export function loadUserFromStore(store) {
  return loadFromStore({
    store,
    selector: (state) => state.user,
    validator: (user) => user && !user.invalidToken,
    errorMessage: 'User not loaded',
  });
}

export function loadBootrappedFromStore(store) {
  return loadFromStore({
    store,
    selector: (state) => state.root.bootstrapped,
    validator: (bootstrapped) => bootstrapped,
    errorMessage: 'Bootstrapped not loaded',
    timer: false,
  });
}

/**
 * Loads in the affiliate data, companies, selected company, and user from the Redux store
 * @param {*} store
 * @returns { affiliateData, companies, selectedCompany, user }
 */
export async function loadInitialAppData(store) {
  const bootstrapped = await loadBootrappedFromStore(store);
  if (!bootstrapped) {
    throw new Error('App not bootstrapped');
  }

  console.log(`%cLoaded Initial Data!`, 'color: #7FFFD4');

  const [user, companies, selectedCompany, affiliate] = await Promise.all([
    loadUserFromStore(store),
    // loadFooFromStore(store),
    // loadHerpFromStore(store),
    // loadDerpFromStore(store),
  ]);

  return { affiliate, companies, selectedCompany, user };
}
