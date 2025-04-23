import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import TagList from '../components/TagList';
import Card from '../components/Card';
import DatasetCard from '../components/DatasetCard';
import Pagination from '../components/Pagination';
import useMediaQuery from '../hooks/useMediaQuery';
import { useTags } from '../hooks/useTags';
import { useModels } from '../hooks/useModels';
import { useDatasets } from '../hooks/useDatasets';
import { useDebounce } from '../hooks/useDebounce';

const ListPage: React.FC = () => {
  const [selectedTag, setSelectedTag] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 500); // 500ms 延迟
  const pageSize = 20;
  
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const location = useLocation();
  
  // 从路径获取当前页面类型，用作 scope，并去掉末尾的 s
  const scope = (location.pathname.split('/')[1] || 'model').replace(/s$/, '');

  // 当路由变化时重置状态
  useEffect(() => {
    console.log('Route changed to:', location.pathname);
    setSelectedTag('all');
    setCurrentPage(1);
    setSearchQuery('');
  }, [location.pathname]);
  
  // 获取标签
  const { groupedTags, loading: tagsLoading, error: tagsError } = useTags(scope);

  // 根据路由使用不同的 hook
  const params = { page: currentPage, pageSize, search: debouncedSearchQuery };
  console.log('Current scope:', scope);
  console.log('Request params:', params);

  const {
    data: items = [], // 提供默认值为空数组
    total = 0,
    loading: itemsLoading,
    error: itemsError
  } = (() => {
    switch (scope) {
      case 'dataset': {
        console.log('Fetching datasets...');
        const result = useDatasets(params);
        console.log('Datasets result:', result);
        return {
          data: result.datasets || [], // 添加默认值
          total: result.total || 0,
          loading: result.loading,
          error: result.error
        };
      }
      case 'model':
      default: {
        console.log('Fetching models...');
        const result = useModels(params);
        console.log('Models result:', result);
        return {
          data: result.models || [], // 添加默认值
          total: result.total || 0,
          loading: result.loading,
          error: result.error
        };
      }
    }
  })();

  // 根据选中的标签筛选项目
  const filteredItems = (selectedTag === 'all' ? items : items?.filter(item => true)) || [];

  const handlePageChange = (page: number) => {
    console.log('Page changed to:', page);
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    console.log('Search query changed to:', value);
    setSearchQuery(value);
    setCurrentPage(1); // 重置页码
  };

  const renderCard = (item: any) => {
    switch (scope) {
      case 'dataset':
        return <DatasetCard key={item.id} dataset={item} tags={[]} />;
      case 'model':
      default:
        return <Card key={item.id} model={item} tags={[]} />;
    }
  };

  // 监听数据变化
  useEffect(() => {
    console.log('Data updated:', {
      scope,
      itemsCount: items.length,
      total,
      loading: itemsLoading,
      error: itemsError
    });
  }, [scope, items, total, itemsLoading, itemsError]);

  return (
    <div className="w-full px-8 py-6">
      {/* 父级容器在桌面端设为横向排列 */}
      <div className={`flex gap-8 items-start ${isDesktop ? 'flex-row' : 'flex-col'}`}>
        {/* 左侧标签列表 - 在移动端隐藏 */}
        {isDesktop && (
          <div className="w-96 flex-shrink-0">
            <div className="sticky top-4 bg-white rounded-lg shadow p-6">
              <TagList
                groupedTags={groupedTags}
                selectedTag={selectedTag}
                onTagSelect={setSelectedTag}
                loading={tagsLoading}
                error={tagsError}
              />
            </div>
          </div>
        )}

        {/* 右侧内容区域 */}
        <div className="flex-1 min-w-0">
          {/* 搜索框 */}
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearch}
                placeholder="搜索..."
                className="w-full px-4 py-2 pl-10 pr-4 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              {searchQuery && itemsLoading && (
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg className="animate-spin h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
              )}
            </div>
          </div>

          {itemsLoading ? (
            <div className="text-center py-8">加载中...</div>
          ) : itemsError ? (
            <div className="text-center py-8 text-red-500">Error: {itemsError}</div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredItems?.map(renderCard)}
              </div>
              
              {total > pageSize && (
                <Pagination
                  currentPage={currentPage}
                  pageSize={pageSize}
                  total={total}
                  onChange={handlePageChange}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListPage; 