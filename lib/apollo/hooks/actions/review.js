import { useMutation } from '@apollo/client';
import UpdateCustomerCompanyReview from 'graphql/mutations/updateCustomerCompanyReview.graphql';
import UpdateCustomerProductReview from 'graphql/mutations/updateCustomerProductReview.graphql';
import useNotifier from 'hooks/useNotifier';

export const useUpdateCustomerCompanyReview = ({ reviewId }) => {
  const { setError } = useNotifier();
  const [mutation, mutationState] = useMutation(UpdateCustomerCompanyReview);

  const mutate = async companyBody => {
    const updateCustomerCompanyReviewInput = {
      reviewId,
      companyBody,
    };

    try {
      await mutation({ variables: { input: updateCustomerCompanyReviewInput } });
    } catch (error) {
      setError(error);
    }
  };

  return [mutate, mutationState];
};

export const useUpdateCustomerProductReview = ({ reviewId }) => {
  const { setError } = useNotifier();
  const [mutation, mutationState] = useMutation(UpdateCustomerProductReview);

  const mutate = async productBody => {
    const updateCustomerProductReviewInput = {
      reviewId,
      productBody,
    };

    try {
      await mutation({ variables: { input: updateCustomerProductReviewInput } });
    } catch (error) {
      setError(error);
    }
  };

  return [mutate, mutationState];
};
