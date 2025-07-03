import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchData, postData, clearApiState } from '../store/slices/apiSlice';
import { API_ENDPOINTS } from '../constants/ApiEndPoints';

const useApi = (endpoint?: string) => {
  const dispatch = useAppDispatch();
  const apiState = useAppSelector((state) => state.api);
  
  const getData = () => {
    if (!endpoint) return apiState.singleData;
    
    if (endpoint === API_ENDPOINTS.GET_SINGLE_DATA) {
      return apiState.singleData;
    } else if (endpoint === API_ENDPOINTS.GET_DOUBLE_DATA) {
      return apiState.doubleData;
    } else if(endpoint === API_ENDPOINTS.MONTH_REPORT){
      return apiState.report;
    }
    
    return null;
  };
  
  const fetchData = useCallback((endpoint: string, params?: any, requiresAuth: boolean = true) => {
    return dispatch(fetchData({ endpoint, params, requiresAuth }));
  }, [dispatch]);


  const sendData = useCallback((endpoint: string, data: any, requiresAuth: boolean = true) => {
    return dispatch(postData({ endpoint, data, requiresAuth }));
  }, [dispatch]);


  const clearData = useCallback(() => {
    dispatch(clearApiState());
  }, [dispatch]);

  return {
    data: getData(),
    loading: apiState.loading,
    error: apiState.error,
    fetchData,
    sendData,
    clearData,
  };
};

export default useApi;