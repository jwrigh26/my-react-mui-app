/**
 * getDefineObject: Constructs a 'define' object for Vite to inject environment variables into the app.
 * This function adapts environment variables for both development and production modes.
 *
 * Vite requires environment variables to be prefixed with 'import.meta.env'. This function:
 * 1. Retrieves and filters relevant environment variables.
 * 2. Transforms them into the format Vite expects, ensuring they are injected into the app correctly.
 *
 * @param {Object} env - The environment object from loadEnv, typically loaded in Vite's config.
 * @returns {Object} - The define object Vite needs to access environment variables.
 *
 * @example
 * // Usage in vite.config.js to make environment variables available in your app:
 * import { defineConfig, loadEnv } from 'vite';
 * import { getDefineObject } from './config/env.config';
 *
 * export default defineConfig(({ mode }) => {
 *   const env = loadEnv(mode, process.cwd(), '');
 *   return {
 *     define: getDefineObject(env),
 *   };
 * });
 */
export function getDefineObject(env) {
  // If the env object is not provided, return an empty object to avoid errors
  if (!env) {
    return {};
  }

  // List of keys we care about injecting into our app.
  const keys = ['API_URL', 'FAKE_API_TOKEN'];

  // Set the prefix for env variables. In production, we expect 'REACT_APP_' as the prefix,
  // but in development (Vite), we use 'VITE_REACT_APP_' to differentiate.
  const prefix =
    process.env.NODE_ENV === 'production' ? 'REACT_APP_' : 'VITE_REACT_APP_';

  // Determine the source of the environment variables:
  // - In production, use `process.env` to pull variables from the build system.
  // - In development, use the `env` object from Vite's loadEnv function.
  const source = process.env.NODE_ENV === 'production' ? process.env : env;

  let define = {};

  // Iterate over the keys and assign their corresponding environment variable value
  // based on the defined prefix (e.g., 'VITE_REACT_APP_API_URL' or 'REACT_APP_API_URL').
  keys.forEach((key) => {
    define[key] = source[`${prefix}${key}`];
  });

  console.log('DEFINE');
  console.log(define);

  // Vite expects environment variables to be formatted as `import.meta.env`, so we need to
  // transform our define object to match this pattern. Also, stringify the values for safe injection.
  const transformedDefine = {};

  keys.forEach((key) => {
    transformedDefine[`import.meta.env.VITE_REACT_APP_${key}`] = JSON.stringify(
      define[key]
    );
  });

  console.log('TRANSFORMED DEFINE');
  console.log(transformedDefine);

  // Return the transformed define object to be used in Vite's config for env variable injection.
  return transformedDefine;
}
