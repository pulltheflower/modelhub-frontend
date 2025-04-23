import { useState, useEffect, useCallback, useRef } from 'react';
import { Dataset, DatasetsResponse, PaginationParams } from '../types/dataset';
import { API_ENDPOINTS } from '../config';

interface UseDatasetsParams extends PaginationParams {
  search?: string;
}

export const useDatasets = (params: UseDatasetsParams) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [total, setTotal] = useState(0);
  const prevParamsRef = useRef<string>();

  const fetchDatasets = useCallback(async () => {
    const paramsKey = JSON.stringify(params);
    // 如果参数没有变化，不重新请求
    if (prevParamsRef.current === paramsKey) {
      return;
    }
    prevParamsRef.current = paramsKey;

    try {
      setLoading(true);
      const queryParams = new URLSearchParams({
        page: params.page.toString(),
        page_size: params.pageSize.toString(),
      });

      if (params.search) {
        queryParams.append('search', params.search);
      }
      
      console.log('Fetching datasets from:', `${API_ENDPOINTS.datasets}?${queryParams}`);
      const response = await fetch(`${API_ENDPOINTS.datasets}?${queryParams}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch datasets: ${response.status}`);
      }
      const data: DatasetsResponse = await response.json();
      setDatasets(data.data);
      setTotal(data.total);
      setError(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      console.error('Error fetching datasets:', errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [params]);

  useEffect(() => {
    fetchDatasets();
  }, [fetchDatasets]);

  return { datasets, total, loading, error };
}; 