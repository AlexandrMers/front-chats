import { createSelector } from "reselect";

// Types
import { UploadFile } from "antd/lib/upload/interface";
import { StateInterface } from "state/store";

const getFilesSelector = (state: StateInterface): UploadFile[] => {
  const files = state.selectedChatModule.attachedFiles;

  return files.map((file, index) => ({
    ...file,
    name: file.originalName,
    thumbUrl: file.url
  }));
};

const selectFilesSelector = createSelector(
  (state: StateInterface) => state,
  getFilesSelector
);

export { selectFilesSelector };
