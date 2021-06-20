import { merge } from "ramda";

// Types
import {
  FileFromServerInterface,
  SelectedChatInitialStateInterface
} from "./types";

export function updateFileIntoState({
  state,
  uid,
  rewriteFields
}: {
  state: SelectedChatInitialStateInterface;
  uid: string;
  rewriteFields: Partial<FileFromServerInterface>;
}) {
  const index = state.attachedFiles.findIndex((element) => element.uid === uid);

  if (index === -1) {
    return;
  }

  const foundFile = state.attachedFiles[index];
  state.attachedFiles[index] = merge(foundFile, rewriteFields);
}

export function deleteOneFileFromState(
  state: SelectedChatInitialStateInterface,
  fileInfo: { uid: string; publicId: string }
) {
  const index = state.attachedFiles.findIndex(
    (file) => file.uid === fileInfo.uid
  );

  if (index === -1) {
    return;
  }

  state.attachedFiles.splice(index, 1);
}
