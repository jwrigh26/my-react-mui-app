import { useNavigation } from 'react-router-dom';

export const useIsLoading = (fetcher) => {
  const { state } = fetcher;
  const isLoading = state === 'submitting' || state === 'loading';

  return isLoading;
};

export const useNavigationIsLoading = () => {
  const navigation = useNavigation();

  // Check if navigation state is either 'submitting' or 'loading'
  const isLoading =
    navigation.state === 'submitting' || navigation.state === 'loading';

  return isLoading;
};