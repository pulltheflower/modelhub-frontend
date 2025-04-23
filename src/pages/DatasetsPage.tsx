import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import TagList from '../components/TagList';
import DatasetCard from '../components/DatasetCard';
import Pagination from '../components/Pagination';
import useMediaQuery from '../hooks/useMediaQuery';
import { useTags } from '../hooks/useTags';
import { useDatasets } from '../hooks/useDatasets';

const DatasetsPage: React.FC = () => {
  const [selectedTag, setSelectedTag] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 20;
  
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const location = useLocation();
  
  const scope = (location.pathname.split('/')[1] || 'dataset').replace(/s$/, '');
  
  const { groupedTags, loading: tagsLoading, error: tagsError } = useTags(scope);
  const { datasets, total, loading: datasetsLoading, error: datasetsError } = useDatasets({
    page: currentPage,
    pageSize,
  });

  const filteredDatasets = selectedTag === 'all'
    ? datasets
    : datasets.filter(dataset => {
        return true; // 暂时返回所有数据集
      });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  return (
    <div className="w-full px-8 py-6">
      <div className={`flex gap-8 items-start ${isDesktop ? 'flex-row' : 'flex-col'}`}>
        {/* 左侧标签列表 */}
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
          {datasetsLoading ? (
            <div className="text-center py-8">加载中...</div>
          ) : datasetsError ? (
            <div className="text-center py-8 text-red-500">Error: {datasetsError}</div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredDatasets.map((dataset) => (
                  <DatasetCard
                    key={dataset.id}
                    dataset={dataset}
                    tags={[]}
                  />
                ))}
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

export default DatasetsPage; 