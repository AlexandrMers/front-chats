import { instanceApiRequest } from "api/tools/requestCreator";
import { FileFromServerInterface } from "state/modules/selectedChat/types";
import { MethodType } from "api/tools/types";

export const FileUploadApi = {
  loadFile(file: File) {
    const bodyFormData = new FormData();
    bodyFormData.append("file", file);

    return instanceApiRequest.createRequest<FileFromServerInterface>(
      "/upload-file/upload",
      MethodType.POST,
      {
        config: {
          headers: { "Content-Type": "multipart/form-data" }
        },
        data: bodyFormData
      }
    );
  },

  deleteFile({ publicId }: { publicId: string; uid: string }) {
    return instanceApiRequest.createRequest<any>(
      `/upload-file/delete/${publicId}`,
      MethodType.DELETE,
      {}
    );
  }
};
