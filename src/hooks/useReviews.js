import { useMutation } from '@apollo/client';
import { ADD_REVIEW } from '../graphql/mutations';


const useReviews = () => {
  const [ mutate, result ] = useMutation(ADD_REVIEW);
  const addReview = async ({ repositoryName, ownerName, rating, text }) => {
    const result = await mutate({ variables: {repositoryName: repositoryName, ownerName: ownerName, rating: rating, text: text} });
    return result;
  };
  return [addReview, result];
};

export default useReviews;