export interface Dataset {
  id: number;
  name: string;
  nickname: string;
  description: string;
  likes: number;
  downloads: number;
  path: string;
  repository_id: number;
  repository: {
    http_clone_url: string;
    ssh_clone_url: string;
  };
  private: boolean;
  user: {
    username: string;
    nickname: string;
    email: string;
  };
  source: string;
  sync_status: string;
  created_at: string;
  updated_at: string;
  hf_path: string;
  ms_path: string;
  csg_path: string;
}

export interface DatasetsResponse {
  data: Dataset[];
  total: number;
}

export interface PaginationParams {
  page: number;
  pageSize: number;
} 