import { useMutation } from '@apollo/client';
import { DELETE_REVIEW } from '../graphql/mutations';


const useDeleteReview = () => {
  const [ mutate, result ] = useMutation(DELETE_REVIEW);
  const deleteReview = async ({ id }) => {
    const result = await mutate({ variables: {id: id} });
    return result;
  };
  return [deleteReview, result];
};

export default useDeleteReview;