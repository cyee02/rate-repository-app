import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES, GET_REPOSITORY } from '../graphql/queries';

const useRepositories = () => {
  const { data, error, loading } = useQuery(GET_REPOSITORIES, {
    nextFetchPolicy: 'cache-and-network'
  });
  if (!loading) {
    var repositories = data.repositories;
  }
  return { repositories, loading };
};

export const useRepositorySingle = (id) => {
  const {data, error, loading} = useQuery(
    GET_REPOSITORY,
    { variables: { id: id } }
  );
  if (!loading) {
    var repository = data.repository
  }
  return {repository}
}

export default useRepositories;