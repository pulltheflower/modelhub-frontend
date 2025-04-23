import { useState, useEffect } from 'react';
import { API_ENDPOINTS } from '../config';
import { ModelDetail, FileInfo } from '../types/model';

interface UseModelDetailResult {
  modelDetail: ModelDetail | null;
  readme: string;
  files: FileInfo[];
  loading: boolean;
  error: string | null;
}

export function useModelDetail(path: string): UseModelDetailResult {
  const [modelDetail, setModelDetail] = useState<ModelDetail | null>(null);
  const [readme, setReadme] = useState<string>('');
  const [files, setFiles] = useState<FileInfo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        // 获取模型详情
        const detailResponse = await fetch(`${API_ENDPOINTS.models}/${path}`);
        const detailData = await detailResponse.json();
        
        if (!detailResponse.ok) {
          throw new Error(detailData.msg || '获取模型详情失败');
        }
        
        setModelDetail(detailData.data);

        // 获取 README
        const readmeResponse = await fetch(`${API_ENDPOINTS.models}/${path}/raw/README.md`);
        const readmeData = await readmeResponse.json();
        
        if (readmeResponse.ok) {
          setReadme(readmeData.data);
        }

        // 获取文件列表
        const filesResponse = await fetch(`${API_ENDPOINTS.models}/${path}/tree`);
        const filesData = await filesResponse.json();
        
        if (!filesResponse.ok) {
          throw new Error(filesData.msg || '获取文件列表失败');
        }
        
        setFiles(filesData.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : '未知错误');
      } finally {
        setLoading(false);
      }
    };

    if (path) {
      fetchData();
    }
  }, [path]);

  return { modelDetail, readme, files, loading, error };
} 