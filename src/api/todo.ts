import { del, get, post, put } from "request";
import type { Response } from "request";
import { DocumentInfo } from "@/types/todo";

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
export const updateDocument = (params: UpdateDocumentParams) => put(`/todo/${params.id}`, params);

/** 修改文档 */
export const deleteDocument = (id: string) => del(`/todo/${id}`);

/** 获取文档列表 */
export const getDocuments = (): Promise<Response<DocumentInfo[]>> => get(`/todo/listDocuments`);

/** 获取文档详情 */
export const getDocumentDetails = (id: string): Promise<Response<DocumentInfo>> => get(`/todo/${id}`);

interface CreateListParams {
  id: string;
  title: string;
}

/** 创建 文档 - list */
export const createList = (params: CreateListParams) => post(`/todo/${params.id}/createList`, params);
