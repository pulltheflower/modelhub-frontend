import { useState, useEffect, useCallback, useRef } from 'react';
import { Model, ModelsResponse, PaginationParams } from '../types/model';
import { API_ENDPOINTS } from '../config';

interface UseModelsParams extends PaginationParams {
  search?: string;
}

export const useModels = (params: UseModelsParams) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [models, setModels] = useState<Model[]>([]);
  const [total, setTotal] = useState(0);
  const prevParamsRef = useRef<string>();

  const fetchModels = useCallback(async () => {
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
      
      const response = await fetch(`${API_ENDPOINTS.models}?${queryParams}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch models: ${response.status}`);
      }
      const data: ModelsResponse = await response.json();
      setModels(data.data);
      setTotal(data.total);
      setError(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      console.error('Error fetching models:', errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [params]);

  useEffect(() => {
    fetchModels();
  }, [fetchModels]);

  return { models, total, loading, error };
}; 