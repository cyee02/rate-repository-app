import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = () => {
  const { data, error, loading } = useQuery(GET_REPOSITORIES, {
    nextFetchPolicy: 'cache-and-network'
  });
  if (!loading) {
    var repositories = data.repositories;
  }

  return { repositories, loading };
};

export default useRepositories;