/** todo 文档详情 */
export interface DocumentInfo {
  id: string;
  name?: string;
  lists?: TodoListInfo[];
}

export interface TodoListInfo {
  id: string;
  title: string;
  items: TodoItemInfo[];
}

export interface TodoItemInfo {
  id: string;
  content: string;
  subItems: SubItem[];
}

export interface SubItem {
  id: string;
  content: { type: string };
}
