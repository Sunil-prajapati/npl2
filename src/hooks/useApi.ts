import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchData, postData, clearApiState } from '../store/slices/apiSlice';

const useApi = () => {
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector((state) => state.api);

  // Get data from API
  const getData = useCallback((endpoint: string, params?: any, requiresAuth: boolean = true) => {
    return dispatch(fetchData({ endpoint, params, requiresAuth }));
  }, [dispatch]);

  // Post data to API
  const sendData = useCallback((endpoint: string, data: any, requiresAuth: boolean = true) => {
    return dispatch(postData({ endpoint, data, requiresAuth }));
  }, [dispatch]);

  // Clear API state
  const clearData = useCallback(() => {
    dispatch(clearApiState());
  }, [dispatch]);

  return {
    data,
    loading,
    error,
    getData,
    sendData,
    clearData,
  };
};

export default useApi;
