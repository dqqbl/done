/** todo 文档详情 */
export interface DocumentInfo {
  id: string;
  name: string;
  lists: TodoItemInfo[];
}

export interface TodoItemInfo {
  id: string;
  title: string;
  items: TodoItem[];
}

export interface TodoItem {
  id: string;
  content: string;
  subItems: SubItem[];
}

export interface SubItem {
  id: string;
  content: { type: string };
}
