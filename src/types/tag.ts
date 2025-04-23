export interface Tag {
  id: number;
  name: string;
  category: string;
  group: string;
  scope: string;
  built_in: boolean;
  show_name: string;
  created_at: string;
  updated_at: string;
}

export interface TagResponse {
  data: Tag[];
}

// 按 category 分组后的 tags
export interface GroupedTags {
  [category: string]: Tag[];
} 