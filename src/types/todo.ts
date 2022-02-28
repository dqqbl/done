/** todo 文档详情 */
export interface DocumentInfo {
  id: string;
  name?: string;
  lists?: TodoListInfo[];
  createdAt?: Date
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
  subItems: SubItemInfo[];
  isDone: boolean
}

export interface SubItemInfo {
  id: string;
  content: string;
  isDone: boolean
}
