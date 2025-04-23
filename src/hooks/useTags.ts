import { useState, useEffect, useCallback, useRef } from 'react';
import { Tag, TagResponse, GroupedTags } from '../types/tag';
import { API_ENDPOINTS } from '../config';

export const useTags = (scope: string) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [groupedTags, setGroupedTags] = useState<GroupedTags>({});
  const prevScopeRef = useRef<string>();

  const fetchTags = useCallback(async () => {
    // 如果 scope 没有变化，不重新请求
    if (prevScopeRef.current === scope) {
      return;
    }
    prevScopeRef.current = scope;

    try {
      setLoading(true);
      console.log('Fetching tags from:', API_ENDPOINTS.tags);
      const response = await fetch(API_ENDPOINTS.tags);
      if (!response.ok) {
        throw new Error(`Failed to fetch tags: ${response.status}`);
      }
      const data: TagResponse = await response.json();
      console.log('Received tags data:', data);
      
      // 过滤出当前 scope 的 tags 并按 category 分组
      const filteredTags = data.data.filter(tag => tag.scope === scope);
      console.log('Filtered tags for scope:', scope, filteredTags);
      
      const grouped = filteredTags.reduce((acc: GroupedTags, tag: Tag) => {
        if (!acc[tag.category]) {
          acc[tag.category] = [];
        }
        acc[tag.category].push(tag);
        return acc;
      }, {});
      console.log('Grouped tags:', grouped);

      setGroupedTags(grouped);
      setError(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      console.error('Error fetching tags:', errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [scope]);

  useEffect(() => {
    fetchTags();
  }, [fetchTags]);

  return { groupedTags, loading, error };
}; 