export async function createLazyRoute(page, store) {
  try {
    // dynamically import the component, loader, and action from the page directory,
    const { action, loader, Component } = await import(
      `../../pages/${page}.jsx`
    );

    return {
      action: action
        ? ({ params, request }) => {
            return action(store, { params, request });
          }
        : undefined,
      loader: loader
        ? ({ params, request }) => {
            return loader(store, { params, request });
          }
        : undefined,
      Component,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function createLazyPublicRoute(page, store) {
  try {
    // dynamically import the component, loader, and action from the page directory,
    const { action, loader, Component } = await import(
      `../../pages/public/${page}.jsx`
    );

    return {
      action: action
        ? ({ params, request }) => {
            return action(store, { params, request });
          }
        : undefined,
      loader: loader
        ? ({ params, request }) => {
            return loader(store, { params, request });
          }
        : undefined,
      Component,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function createLazyAdminRoute(page, store) {
  try {
    // dynamically import the component, loader, and action from the page directory,
    const { action, loader, Component } = await import(
      `../../pages/admin/${page}.jsx`
    );

    return {
      action: action
        ? ({ params, request }) => {
            return action(store, { params, request });
          }
        : undefined,
      loader: loader
        ? ({ params, request }) => {
            return loader(store, { params, request });
          }
        : undefined,
      Component,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
}
