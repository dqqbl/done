import { get } from "request";
import type { Response } from "request";
import { DocumentInfo } from "@/types/todo";

/** 获取文档列表 */
export const getDocuments = (): Promise<Response<DocumentInfo[]>> => get(`/todo/listDocuments`);

/** 获取文档详情 */
export const getDocumentDetails = (id: string): Promise<Response<DocumentInfo>> => get(`/todo/${id}`);
