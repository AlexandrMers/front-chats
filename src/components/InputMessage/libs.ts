import { ExtendedFile } from "./types";
import { v4 as uuidv4 } from "uuid";

export const formatFilesData = (files: File[]): ExtendedFile[] =>
  files.map((file) => ({
    name: file.name,
    size: file.size,
    type: file.type,
    uid: uuidv4()
  }));

export const filterFileListById = (id: string) => (
  prevFileList: ExtendedFile[]
) => prevFileList.filter((file) => file.uid !== id);
