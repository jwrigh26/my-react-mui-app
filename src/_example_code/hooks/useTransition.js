import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export function useTransition() {
  const disableTransitionAnimation = useCallback(() => {
    const drawer = document.getElementById('navigation');
    drawer.classList.add('disable-transition');
  }, []);

  const enableTransitionAnimation = useCallback(() => {
    const drawer = document.getElementById('navigation');
    drawer.classList.remove('disable-transition');
  }, []);

  const setDocNavigationDirection = useCallback((direction) => {
    // ensure only direction of value 'page-forward' or 'page-back' is set
    if (direction !== 'page-forward' && direction !== 'page-back') {
      throw new Error('Invalid direction');
    }
    const node = document.getElementById('document-details');
    if (direction === 'page-back') {
      node.classList.add('page-back');
      node.classList.remove('page-forward');
    }

    if (direction === 'page-forward') {
      node.classList.add('page-forward');
      node.classList.remove('page-back');
    }
  }, []);

  const setPageNavigationDirection = useCallback((direction) => {
    // ensure only direction of value 'page-forward' or 'page-back' is set
    if (direction !== 'page-forward' && direction !== 'page-back') {
      throw new Error('Invalid direction');
    }
    const drawer = document.getElementById('navigation');
    if (direction === 'page-back') {
      drawer.classList.add('page-back');
      drawer.classList.remove('page-forward');
    }

    if (direction === 'page-forward') {
      drawer.classList.add('page-forward');
      drawer.classList.remove('page-back');
    }
  }, []);

  return {
    disableTransitionAnimation,
    enableTransitionAnimation,
    setDocNavigationDirection,
    setPageNavigationDirection,
  };
}

export function useNavigateTransition() {
  const { enableTransitionAnimation } = useTransition();
  const navigate = useNavigate();

  const handleNavigate = useCallback(
    (path) => async () => {
      enableTransitionAnimation();
      navigate(path);
    },
    []
  );

  return handleNavigate;
}

export function useNavigateNoTransition() {
  const { disableTransitionAnimation } = useTransition();
  const navigate = useNavigate();

  const handleNavigate = useCallback(
    (path) => async () => {
      disableTransitionAnimation();
      navigate(path);
    },
    []
  );

  return handleNavigate;
}
