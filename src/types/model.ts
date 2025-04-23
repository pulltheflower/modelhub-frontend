export interface Model {
  id: number;
  name: string;
  nickname: string;
  description: string;
  likes: number;
  downloads: number;
  path: string;
  repository_id: number;
  private: boolean;
  user: {
    username: string;
    nickname: string;
    email: string;
  };
  repository: {
    http_clone_url: string;
    ssh_clone_url: string;
  };
  default_branch: string;
  created_at: string;
  updated_at: string;
  widget_type: string;
  status: string;
  user_likes: boolean;
  source: string;
  sync_status: string;
  enable_inference: boolean;
  enable_finetune: boolean;
  enable_evaluation: boolean;
  base_model: string;
  license: string;
  namespace: {
    Path: string;
    Type: string;
    Avatar: string;
  };
}

export interface ModelsResponse {
  data: Model[];
  total: number;
}

export interface PaginationParams {
  page: number;
  pageSize: number;
}

export interface ModelMetadata {
  model_params: number;
  tensor_type: string;
  architecture: string;
  mini_gpu_memory_gb: number;
  model_type: string;
  class_name: string;
}

export interface ModelNamespace {
  Path: string;
  Type: string;
  Avatar: string;
}

export interface ModelRepository {
  http_clone_url: string;
  ssh_clone_url: string;
}

export interface ModelUser {
  username: string;
  nickname: string;
  email: string;
}

export interface ModelDetail {
  id: number;
  name: string;
  nickname: string;
  description: string;
  likes: number;
  downloads: number;
  path: string;
  repository_id: number;
  private: boolean;
  user: ModelUser;
  readme: string;
  repository: ModelRepository;
  default_branch: string;
  created_at: string;
  updated_at: string;
  widget_type: string;
  status: string;
  user_likes: boolean;
  source: string;
  sync_status: string;
  enable_inference: boolean;
  enable_finetune: boolean;
  enable_evaluation: boolean;
  base_model: string;
  license: string;
  can_write: boolean;
  can_manage: boolean;
  namespace: ModelNamespace;
  scores: any;
  sensitive_check_status: string;
  mirror_last_updated_at: string;
  metadata: ModelMetadata;
  report_url: string;
  medium_risk_count: number;
  high_risk_count: number;
  hf_path: string;
  ms_path: string;
  csg_path: string;
}

export interface FileCommit {
  id: string;
  committer_name: string;
  committer_email: string;
  committer_date: string;
  created_at: string;
  message: string;
  author_name: string;
  author_email: string;
  authored_date: string;
}

export interface FileInfo {
  name: string;
  type: string;
  size: number;
  commit: FileCommit;
  path: string;
  mode: string;
  sha: string;
  url: string;
  content: string;
  lfs: boolean;
  lfs_pointer_size: number;
  lfs_relative_path: string;
  last_commit_sha: string;
} 