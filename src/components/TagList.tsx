import React, { useState, useEffect } from 'react';
import { Tag, GroupedTags } from '../types/tag';

interface TagListProps {
  groupedTags: GroupedTags;
  selectedTag: string;
  onTagSelect: (tagName: string) => void;
  loading?: boolean;
  error?: string | null;
}

const TagList: React.FC<TagListProps> = ({
  groupedTags,
  selectedTag,
  onTagSelect,
  loading = false,
  error = null
}) => {
  const categories = Object.keys(groupedTags);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    categories.length > 0 ? categories[0] : null
  );

  // 当 groupedTags 改变时，如果没有选中的分类但有可用分类，则选中第一个
  useEffect(() => {
    if (!selectedCategory && categories.length > 0) {
      setSelectedCategory(categories[0]);
    }
  }, [groupedTags]);

  if (loading) {
    return <div className="p-4">加载中...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>;
  }

  const currentTags = selectedCategory && groupedTags[selectedCategory] ? groupedTags[selectedCategory] : [];

  return (
    <div className="space-y-6">
      {/* 顶部分类列表 */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category === selectedCategory ? null : category)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              category === selectedCategory
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category.replace(/_/g, ' ')}
          </button>
        ))}
      </div>

      {/* 标签列表 - 单列瀑布流布局 */}
      {selectedCategory && Array.isArray(currentTags) && currentTags.length > 0 && (
        <div className="space-y-2">
          <div className="flex flex-wrap gap-2">
            {currentTags.map((tag) => (
              <button
                key={tag.id}
                onClick={() => onTagSelect(tag.name)}
                className={`inline-block px-3 py-1.5 rounded-lg text-xs ${
                  selectedTag === tag.name
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span>{tag.show_name || tag.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TagList; 