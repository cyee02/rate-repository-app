import { useMutation } from '@apollo/client';
import { SIGN_IN } from '../graphql/mutations';
import useAuthStorage from '../hooks/useAuthStorage';
import { useApolloClient } from '@apollo/client';


const useSignIn = () => {
  const [ mutate, result ] = useMutation(SIGN_IN);
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const signIn = async ({ username, password }) => {
    const result = await mutate({ variables: {username: username, password: password} });
    authStorage.setAccessToken(result.data.authorize.accessToken);
    await apolloClient.resetStore();
    return result;
  };

  return [signIn, result];
};

export default useSignIn;