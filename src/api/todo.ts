import { get } from "request";
import type { Response } from "request";
import { DocumentInfo } from "@/types/todo";

export const getDocuments = (): Promise<Response<DocumentInfo[]>> => get(`/todo/listDocuments`);
