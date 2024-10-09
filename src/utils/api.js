import {isFunction, isNil, sleep} from 'utils/helpers';

// NOTE: In order to make sure cache works
// You must pass in correct defaults for the query

/**
 * Example:
    const { promise, unsubscribe } = dispatchEndpoint(store, billingApi.endpoints.createStripeCustomer, {
        ensemblesId: selectedCompany.ensembles_id,
    });

    // When you need to unsubscribe:
    unsubscribe();
 */
export function dispatchEndpoint(
  store,
  endpoint,
  params,
  forceRefetch = false
) {
  let promise;

  if (isNil(params)) {
    promise = store.dispatch(endpoint.initiate(null, { forceRefetch }));
  } else {
    promise = store.dispatch(endpoint.initiate(params, { forceRefetch }));
  }

  return {
    promise,
    unsubscribe: () => promise.unsubscribe(),
  };
}

/*
 * Example:
    const stripeCustomerData = await dispatchAndUnwrap(
      store,
      billingApi.endpoints.createStripeCustomer,
      { ensemblesId: selectedCompany.ensembles_id }
    );
*/
export async function dispatchAndUnwrap(
  store,
  endpoint,
  params,
  forceRefetch = false
) {
  let response;

  if (isNil(params)) {
    response = store.dispatch(endpoint.initiate(null, { forceRefetch }));
  } else {
    response = store.dispatch(endpoint.initiate(params, { forceRefetch }));
  }

  // Unsubscribe to clean up query cache
  // Note: Necessary because we use this with mutations too,
  //       which don't have a unsubscribe method
  if (isFunction(response?.unsubscribe)) {
    response.unsubscribe();
  }

  return await response.unwrap().catch((error) => {
    console.error('Error dispatching and unwrapping:', error);
    throw error;
  });
}

/**
 * Example usage of dispatchAndPoll:
 *
 * try {
 *   const result = await dispatchAndPoll(
 *     store,
 *     myApi.endpoints.myEndpoint,
 *     { myParam: 'myValue' },
 *     5, // maxAttempts
 *     2000 // delay in ms
 *   );
 *   console.log('Result:', result);
 * } catch (error) {
 *   console.error('Error:', error);
 * }
 */
export async function dispatchAndPoll(
  store,
  endpoint,
  params,
  maxAttempts = 3,
  delay = 1000
) {
  let attempts = 0;
  while (attempts < maxAttempts) {
    const response = store.dispatch(
      endpoint.initiate(params, { forceRefetch: true })
    );
    try {
      const result = await response.unwrap();
      response.unsubscribe(); // Unsubscribe to clean up
      return result; // Return the result if successful
    } catch (error) {
      // eslint-disable-next-line no-plusplus
      attempts++;
      if (attempts >= maxAttempts) {
        throw error; // Throw the error after max attempts
      }
      await sleep(delay); // Wait before trying again
    }
  }
}

export async function dispatchAndPollWithValidation(
  store,
  endpoint,
  params,
  validateResult,
  { maxAttempts = 3, delay = 1000 }
) {
  let attempts = 0;
  while (attempts < maxAttempts) {
    const response = store.dispatch(
      endpoint.initiate(params, { forceRefetch: true })
    );

    try {
      const result = await response.unwrap();
      if (validateResult(result)) {
        return result; // Return the result if it passes validation
      } else {
        throw new Error('Result does not meet criteria');
      }
    } catch (error) {
      // eslint-disable-next-line no-plusplus
      attempts++;
      if (attempts >= maxAttempts) {
        response.unsubscribe(); // Unsubscribe to clean up
        throw error; // Throw the error after max attempts
      }
      await sleep(delay); // Wait before trying again
    }
  }
}

/**
 * Dispatch multiple RTK Query endpoints concurrently, handle their subscriptions,
 * and await their resolution using Promise.all. Ensures cleanup by unsubscribing
 * after completion or error.
 *
 * @param {object} store - The Redux store.
 * @param {array} endpoints - Array of objects with endpoint and params.
 * @returns {Promise} - A promise that resolves when all endpoints have completed or rejects if any fail.
 */
export async function dispatchMultipleEndpoints(
  store,
  endpoints,
  forceRefetch = false
) {
  // Create an array to store subscription objects
  const subscriptions = [];

  try {
    // Map over the endpoints to initiate each one and store subscriptions
    const dispatchPromises = endpoints.map(({ endpoint, params }) => {
      let initiated;

      if (isNil(params)) {
        initiated = store.dispatch(
          endpoint.initiate(null, { forceRefetch })
        );
      } else {
        initiated = store.dispatch(
          endpoint.initiate(params, { forceRefetch })
        );
      }

      subscriptions.push(initiated); // Store the subscription object
      return initiated.unwrap(); // Prepare to wait on the unwrapped promise
    });

    // Await all dispatches to resolve or reject
    const results = await Promise.all(dispatchPromises);
    return results;
  } catch (error) {
    console.error('Error dispatching multiple endpoints:', error);
    throw error; // Rethrow to handle error upstream if needed
  } finally {
    // Unsubscribe from all endpoints, whether resolved or rejected
    subscriptions.forEach((subscription) => {
      if (isFunction(subscription?.unsubscribe)) {
        subscription.unsubscribe();
      }
    });
  }
}
