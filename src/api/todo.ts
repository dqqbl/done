import { del, get, post, put } from "request";
import type { Response } from "request";
import { DocumentInfo, TodoListInfo } from "@/types/todo";

interface CreateDocumentParams {
  name: string;
}
interface UpdateDocumentParams {
  id: string;
  name?: string;
}

/** 新建文档 */
export const createDocument = (params: CreateDocumentParams) => post(`/todo/createDocument`, params);

/** 修改文档 */
export const updateDocument = (params: UpdateDocumentParams) => put(`/todo/doc/${params.id}`, params);

/** 删除文档 */
export const deleteDocument = (id: string) => del(`/todo/doc/${id}`);

/** 获取文档列表 */
export const getDocuments = (): Promise<Response<DocumentInfo[]>> => get(`/todo/listDocuments`);

/** 获取文档详情 */
export const getDocumentDetails = (id: string): Promise<Response<DocumentInfo>> => get(`/todo/doc/${id}`);

interface CreateListParams {
  docId: string;
  title: string;
}

interface UpdateListParams {
  listId: string;
  title: string;
}

/** 创建 list */
export const createList = (params: CreateListParams) => post(`/todo/list/createList`, params);

/** 删除 list  */
export const deleteList = (listId: string) => del(`/todo/list/${listId}`);

/** 编辑 list  */
export const updateList = (params: UpdateListParams) => put("/todo/list/updateList", params);

/** 获取 doc - list 详情  */
export const getListDetails = (listId: string): Promise<Response<TodoListInfo>> => get(`/todo/list/${listId}`);

interface CreateItemParams {
  listId: string;
  content: string;
}

interface UpdateItemParams {
  itemId: string;
  content?: string;
  isDone?: boolean
}

/** 创建 doc - list - item */
export const createItem = (params: CreateItemParams) => post(`/todo/item/createItem`, params);

/** 编辑 doc - list - item */
export const updateItem = (params: UpdateItemParams) => put(`/todo/item/updateItem`, params);

/** 删除 doc - list - item */
export const deleteItem = (itemId: string) => del(`/todo/item/${itemId}`);
