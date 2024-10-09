import { StrictMode, createRef } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider as ReduxProvider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { initializeStore } from './lib/store/store';
import ComponentStateProvider from './providers/ComponentStateProvider';
import SnackbarProvider from './providers/SnackbarProvider';
import ThemeProvider from './providers/ThemeProvider';

const store = initializeStore();

const routes = [
  {
    path: '/',
    element: <Indexlayout />,
    errorElment: <ErrorBoundary />,
    children: [
      {
        index: true,
        nodeRef: createRef(),
        element: <Home />,
      },
      {
        path: 'examples',
        element: <Examples />,
        nodeRef: createRef(),
      },
      {
        path: 'components',
        element: <Components />,
        nodeRef: createRef(),
      },
      {
        path: 'utils',
        element: <Utils />,
        nodeRef: createRef(),
      },
    ],
  },
];

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ReduxProvider store={store}>
      <ThemeProvider>
        <ComponentStateProvider>
          <SnackbarProvider>
            <RouterProvider
              router={createBrowserRouter(routes)}
              future={{ v7_startTransition: true }}
            />
          </SnackbarProvider>
        </ComponentStateProvider>
      </ThemeProvider>
    </ReduxProvider>
  </StrictMode>
);
