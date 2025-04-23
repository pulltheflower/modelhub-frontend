import React from 'react';
import { Dataset } from '../types/dataset';

interface DatasetCardProps {
  dataset: Dataset;
  tags?: string[];
}

const DatasetCard: React.FC<DatasetCardProps> = ({ dataset, tags = [] }) => {
  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition-all duration-200 border border-gray-100">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors">
              {dataset.nickname || dataset.name}
            </h3>
            <p className="text-sm text-gray-500 mt-1 font-mono">{dataset.path}</p>
          </div>
          <div className="flex items-center text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
            <svg 
              className="w-4 h-4 mr-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            <span className="font-medium">{dataset.downloads}</span>
          </div>
        </div>

        {dataset.user && (
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <span className="flex items-center">
              <svg 
                className="w-4 h-4 mr-1" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              {dataset.user.nickname || dataset.user.username}
            </span>
          </div>
        )}

        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DatasetCard; 