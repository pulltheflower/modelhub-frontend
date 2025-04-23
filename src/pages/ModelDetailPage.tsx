import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useModelDetail } from '../hooks/useModelDetail';
import ReactMarkdown from 'react-markdown';
import { formatDate } from '../utils/date';

const DEFAULT_AVATAR = 'https://cdn.casbin.org/img/casbin.svg';

type TabType = 'intro' | 'files' | 'discussion';

interface TabItem {
  key: TabType;
  label: string;
  icon: React.ReactNode;
}

const ModelDetailPage: React.FC = () => {
  const { namespace, name } = useParams<{ namespace: string; name: string }>();
  const [activeTab, setActiveTab] = useState<TabType>('intro');
  
  const { modelDetail, readme, files, loading, error } = useModelDetail(`${namespace}/${name}`);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !modelDetail) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-red-500">
        <svg className="w-12 h-12 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <span className="text-lg">{error || '模型不存在'}</span>
      </div>
    );
  }

  const renderTabs = () => {
    const tabs: TabItem[] = [
      {
        key: 'intro',
        label: '简介',
        icon: (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        ),
      },
      {
        key: 'files',
        label: '文件列表',
        icon: (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
          </svg>
        ),
      },
      {
        key: 'discussion',
        label: '讨论',
        icon: (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        ),
      },
    ];

    return (
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map(({ key, label, icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`
                py-4 px-4 border-b-2 font-medium text-sm flex items-center space-x-2
                ${activeTab === key
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
                transition-colors duration-200
              `}
            >
              {icon}
              <span>{label}</span>
            </button>
          ))}
        </nav>
      </div>
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'intro':
        return (
          <div className="prose prose-blue max-w-none">
            <ReactMarkdown>{readme || '暂无简介'}</ReactMarkdown>
          </div>
        );
      case 'files':
        return (
          <div className="space-y-1">
            {files.map((file) => (
              <div
                key={file.path}
                className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg group transition-colors duration-200"
              >
                <div className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {file.type === 'file' ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                    )}
                  </svg>
                  <span className="text-gray-600 group-hover:text-gray-900">{file.name}</span>
                  <span className="text-sm text-gray-400">{(file.size / 1024).toFixed(2)} KB</span>
                </div>
                <div className="text-sm text-gray-500">
                  {formatDate(file.commit.created_at)}
                </div>
              </div>
            ))}
          </div>
        );
      case 'discussion':
        return (
          <div className="flex flex-col items-center justify-center py-12 text-gray-500">
            <svg className="w-16 h-16 mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span className="text-lg">讨论功能开发中...</span>
          </div>
        );
      default:
        return null;
    }
  };

  const renderMetadata = () => {
    const metadataItems = [
      {
        label: '模型类型',
        value: modelDetail.metadata.model_type || '未指定',
        show: true,
      },
      {
        label: '参数量',
        value: modelDetail.metadata.model_params ? `${modelDetail.metadata.model_params.toLocaleString()} 参数` : '未知',
        show: modelDetail.metadata.model_params > 0,
      },
      {
        label: '架构',
        value: modelDetail.metadata.architecture || '未指定',
        show: !!modelDetail.metadata.architecture,
      },
      {
        label: 'GPU 内存',
        value: modelDetail.metadata.mini_gpu_memory_gb ? `${modelDetail.metadata.mini_gpu_memory_gb} GB` : '未知',
        show: modelDetail.metadata.mini_gpu_memory_gb > 0,
      },
    ].filter(item => item.show);

    return metadataItems.length > 0 ? (
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">模型参数</h3>
        <div className="grid grid-cols-2 gap-4">
          {metadataItems.map(({ label, value }) => (
            <div key={label}>
              <div className="text-sm text-gray-500">{label}</div>
              <div className="mt-1 font-medium">{value}</div>
            </div>
          ))}
        </div>
      </div>
    ) : null;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 上部分 */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex items-start justify-between">
            <div className="max-w-2xl">
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={modelDetail.namespace?.Avatar || DEFAULT_AVATAR}
                  alt={modelDetail.user?.nickname || modelDetail.name}
                  className="h-10 w-10 rounded-full"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = DEFAULT_AVATAR;
                  }}
                />
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    {modelDetail.nickname || modelDetail.name}
                  </h1>
                  <p className="text-sm text-gray-500 font-mono mt-1">{modelDetail.path}</p>
                </div>
              </div>
              <p className="text-lg text-gray-500 mb-4">{modelDetail.description}</p>
              <div className="flex items-center space-x-4">
                {modelDetail.license && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    {modelDetail.license}
                  </span>
                )}
                <span className="inline-flex items-center text-gray-500">
                  <svg className="w-5 h-5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {formatDate(modelDetail.created_at)}
                </span>
              </div>
            </div>
            <div className="flex items-start space-x-6">
              <div className="text-center">
                <div className="text-3xl font-semibold text-gray-900">{modelDetail.downloads.toLocaleString()}</div>
                <div className="text-sm text-gray-500 mt-1">下载</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-semibold text-gray-900">{modelDetail.likes.toLocaleString()}</div>
                <div className="text-sm text-gray-500 mt-1">点赞</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 下部分 */}
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex gap-8">
          {/* 左侧内容 */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow">
              <div className="p-6">
                {renderTabs()}
                <div className="mt-6">
                  {renderTabContent()}
                </div>
              </div>
            </div>
          </div>

          {/* 右侧信息 */}
          <div className="w-80 space-y-6">
            {renderMetadata()}
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900 mb-4">仓库信息</h3>
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-500">创建者</div>
                  <div className="mt-1 flex items-center">
                    <img
                      src={modelDetail.namespace?.Avatar || DEFAULT_AVATAR}
                      alt={modelDetail.user?.nickname || modelDetail.name}
                      className="h-6 w-6 rounded-full"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = DEFAULT_AVATAR;
                      }}
                    />
                    <span className="ml-2 font-medium">
                      {modelDetail.user?.nickname || modelDetail.name}
                    </span>
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">创建时间</div>
                  <div className="mt-1">{formatDate(modelDetail.created_at)}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">最后更新</div>
                  <div className="mt-1">{formatDate(modelDetail.updated_at)}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">克隆地址</div>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center justify-between bg-gray-50 rounded p-2 text-sm">
                      <code className="text-gray-600">{modelDetail.repository.http_clone_url}</code>
                      <button className="text-blue-600 hover:text-blue-700" onClick={() => navigator.clipboard.writeText(modelDetail.repository.http_clone_url)}>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelDetailPage; 