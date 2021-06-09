import { useQuery } from '@apollo/client';
import { GET_AUTHORIZED_USER } from '../graphql/queries';

const useAuthUser = (includeReviews) => {
  const { data, error, loading } = useQuery(GET_AUTHORIZED_USER, {
    fetchPolicy: 'cache-and-network',
    variables: { includeReviews: includeReviews }
  });
  if (!loading) {
    var user = data.authorizedUser
  }
  return { user, loading }
};

export default useAuthUser;