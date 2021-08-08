import { useMemo } from "react";

// Types
import { UploadFile } from "antd/lib/upload/interface";

export function useSendDisabledByMessageAndFilesList({
  messageText,
  fileList
}: {
  messageText: string;
  fileList: UploadFile[];
}) {
  const isAllFilesSuccess = useMemo(
    () => fileList.every((file) => file.status === "success"),
    [fileList]
  );

  return useMemo(() => {
    const isExistFiles = fileList.length > 0;

    if (!isExistFiles) {
      return !messageText;
    }

    return !isAllFilesSuccess;
  }, [isAllFilesSuccess, messageText, fileList]);
}
