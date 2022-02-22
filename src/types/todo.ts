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
  isDone: boolean
}

export interface TodoItemInfo {
  id: string;
  content: string;
  subItems: SubItem[];
  isDone: boolean
}

export interface SubItem {
  id: string;
  content: { type: string };
}
