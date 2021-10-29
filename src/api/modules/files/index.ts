import { instanceApiRequest } from "api/tools/requestCreator";
import { FileFromServerInterface } from "state/modules/selectedChat/types";
import { MethodType } from "api/tools/types";
import { UserInterface } from "../../../types/types";

export const FileUploadApi = {
  uploadUserAvatar(file: File) {
    const bodyFormData = new FormData();
    bodyFormData.append("file", file);

    return instanceApiRequest.createRequest<UserInterface>(
      "/upload-file/upload/avatar",
      MethodType.POST,
      {
        config: {
          headers: { "Content-Type": "multipart/form-data" }
        },
        data: bodyFormData
      }
    );
  },

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
