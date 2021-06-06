import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

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
  const variables = {orderDirection: orderDirection, orderBy: orderBy, searchKeyword: searchQueryDebounced, first: 3 }
  const { data, error, loading, fetchMore, ...result } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables: variables
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;
    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        variables,
      },
    });
  };

  return {
    repositories: data?.repositories,
    fetchMore: handleFetchMore,
    loading,
    ...result,
  };
};

export default useRepositories;