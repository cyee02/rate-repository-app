import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES, GET_REPOSITORY } from '../graphql/queries';

const useRepositories = (sorting, searchQueryDebounced) => {
  var orderDirection = '';
  var orderBy = '';
  switch (sorting) {
    case 'highRate':
      orderDirection = 'DESC';
      orderBy = 'RATING_AVERAGE';
      break
    case 'lowRate':
      orderDirection = 'ASC';
      orderBy = 'RATING_AVERAGE';
      break
    default:
      orderDirection = 'DESC';
      orderBy = 'CREATED_AT';
  }
  const { data, error, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables: {orderDirection: orderDirection, orderBy: orderBy, searchKeyword: searchQueryDebounced}
  });
  if (!loading) {
    var repositories = data.repositories;
  }
  return { repositories, loading };
};

export const useRepositorySingle = (id) => {
  const {data, error, loading} = useQuery(GET_REPOSITORY, {
    fetchPolicy: 'cache-and-network',
    variables: { id: id }
    },
  );
  if (!loading) {
    var repository = data.repository
  }
  return {repository}
}

export default useRepositories;