import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Model } from '../types/model';

interface CardProps {
  model: Model;
  tags?: string[];
}

const Card: React.FC<CardProps> = ({ model, tags }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/models/${model.path}`);
  };

  return (
    <div
      className="bg-white rounded-lg shadow hover:shadow-lg transition-all duration-200 border border-gray-100 cursor-pointer"
      onClick={handleClick}
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {model.nickname || model.name}
            </h3>
            <p className="text-sm text-gray-500 mt-1 font-mono">{model.path}</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-sm text-gray-500">
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
              <span>{model.downloads || 0}</span>
            </div>
            <div className="flex items-center text-sm text-gray-500">
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
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              <span>{model.likes || 0}</span>
            </div>
          </div>
        </div>

        <p className="text-sm text-gray-500 mb-4 line-clamp-2">
          {model.description || '暂无描述'}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {model.license && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                {model.license}
              </span>
            )}
            {tags?.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="flex items-center space-x-2">
            {model.namespace?.Avatar && (
              <img
                src={model.namespace.Avatar}
                alt={model.user?.nickname || model.name}
                className="h-6 w-6 rounded-full"
              />
            )}
            <span className="text-sm text-gray-600">
              {model.user?.nickname || model.name}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card; 