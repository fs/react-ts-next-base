import { useQuery } from '@apollo/client';
import SellerProductReviews from 'graphql/queries/sellerProductReviews.graphql';
import BuyerProductReviews from 'graphql/queries/buyerProductReviews.graphql';
import SellerCompanyReviews from 'graphql/queries/sellerCompanyReviews.graphql';
import BuyerCompanyReviews from 'graphql/queries/buyerCompanyReviews.graphql';
import ProductReviews from 'graphql/queries/productReviews.graphql';
import ProductsReviews from 'graphql/queries/productsReviews.graphql';
import CompaniesReviews from 'graphql/queries/companiesReviews.graphql';
import { getLoadingType } from 'helpers';

export const useSellerProductReviews = ({ sellerCompanyId, first }) => {
  const { data, networkStatus, error, refetch, fetchMore } = useQuery(SellerProductReviews, {
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
    notifyOnNetworkStatusChange: true,
    variables: {
      sellerCompanyId,
      first,
    },
  });

  const { loading, loadingMore } = getLoadingType(networkStatus);

  return {
    sellerProductReviews: data?.sellerProductReviews?.edges.map(review => review.node) || [],
    pageInfo: data?.sellerProductReviews?.pageInfo || {},
    loading,
    loadingMore,
    error,
    refetch,
    fetchMore,
  };
};

export const useSellerCompanyReviews = ({ sellerCompanyId, first }) => {
  const { data, networkStatus, error, refetch, fetchMore } = useQuery(SellerCompanyReviews, {
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
    notifyOnNetworkStatusChange: true,
    variables: {
      sellerCompanyId,
      first,
    },
  });

  const { loading, loadingMore } = getLoadingType(networkStatus);

  return {
    sellerCompanyReviews: data?.sellerCompanyReviews?.edges.map(review => review.node) || [],
    pageInfo: data?.sellerCompanyReviews?.pageInfo || {},
    loading,
    loadingMore,
    error,
    refetch,
    fetchMore,
  };
};

export const useBuyerProductReviews = ({ buyerCompanyId, first }) => {
  const { data, networkStatus, error, refetch, fetchMore } = useQuery(BuyerProductReviews, {
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
    notifyOnNetworkStatusChange: true,
    variables: {
      buyerCompanyId,
      first,
    },
  });

  const { loading, loadingMore } = getLoadingType(networkStatus);

  return {
    buyerProductReviews: data?.buyerProductReviews?.edges.map(review => review.node) || [],
    pageInfo: data?.buyerProductReviews?.pageInfo || {},
    loading,
    loadingMore,
    error,
    refetch,
    fetchMore,
  };
};

export const useBuyerCompanyReviews = ({ buyerCompanyId, first }) => {
  const { data, networkStatus, error, refetch, fetchMore } = useQuery(BuyerCompanyReviews, {
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
    notifyOnNetworkStatusChange: true,
    variables: {
      buyerCompanyId,
      first,
    },
  });

  const { loading, loadingMore } = getLoadingType(networkStatus);

  return {
    buyerCompanyReviews: data?.buyerCompanyReviews?.edges.map(review => review.node) || [],
    pageInfo: data?.buyerCompanyReviews?.pageInfo || {},
    loading,
    loadingMore,
    error,
    refetch,
    fetchMore,
  };
};

export const useProductReviews = ({ productId, first = 12, after }) => {
  const { data, error, networkStatus, refetch, fetchMore } = useQuery(ProductReviews, {
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
    notifyOnNetworkStatusChange: true,
    variables: {
      productId,
      first,
      after,
    },
  });

  const { loading, loadingMore } = getLoadingType(networkStatus);

  return {
    productReviews: data?.productReviews?.edges.map(review => review.node) || [],
    pageInfo: data?.productReviews?.pageInfo || {},
    loading,
    loadingMore,
    error,
    refetch,
    fetchMore,
  };
};

export const useProductsReviews = ({ first, after, searchQuery, orderBy }) => {
  const { data, error, networkStatus, fetchMore } = useQuery(ProductsReviews, {
    fetchPolicy: 'cache-and-network',
    notifyOnNetworkStatusChange: true,
    variables: {
      searchQuery,
      first,
      after,
      orderBy,
    },
  });

  const { loading, loadingMore } = getLoadingType(networkStatus);

  return {
    reviews: data?.productsReviews?.edges.map(review => review.node) || [],
    pageInfo: data?.productsReviews?.pageInfo || {},
    loading,
    loadingMore,
    error,
    fetchMore,
  };
};

export const useCompaniesReviews = ({ first, after, companyName, orderBy }) => {
  const { data, error, networkStatus, fetchMore } = useQuery(CompaniesReviews, {
    fetchPolicy: 'cache-and-network',
    notifyOnNetworkStatusChange: true,
    variables: {
      companyName,
      first,
      after,
      orderBy,
    },
  });

  const { loading, loadingMore } = getLoadingType(networkStatus);

  return {
    reviews: data?.companiesReviews?.edges.map(review => review.node) || [],
    pageInfo: data?.companiesReviews?.pageInfo || {},
    loading,
    loadingMore,
    error,
    fetchMore,
  };
};
