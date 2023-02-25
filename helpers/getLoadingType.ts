export const getLoadingType = (networkStatus: number) => {
  const loading = networkStatus === 1 || networkStatus === 2;
  const loadingMore = networkStatus === 3;

  return { loading, loadingMore };
};
