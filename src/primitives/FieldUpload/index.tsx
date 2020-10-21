import React, { memo, useRef } from "react";

export enum FileAccept {
  ALL = "*",
  IMAGE = ".jpeg, .jpg, .png, .bmp"
}

export interface FileInterface {
  accept?: FileAccept;
  multiple?: boolean;
  onFilesLoaded?: (files: File[]) => void;
  view: (openDialog: () => void) => JSX.Element;
}

const FieldUpload = ({
  view,
  accept,
  multiple,
  onFilesLoaded
}: FileInterface) => {
  const fileInput = useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    fileInput.current = document.createElement("input");
    fileInput.current.accept = accept;
    fileInput.current.type = "file";
    fileInput.current.multiple = multiple;
    fileInput.current.style.display = "none";
    fileInput.current.onchange = (event) => {
      const selectedFiles = Array.from(
        (event.target as HTMLInputElement).files
      );
      fileInput.current.value = "";
      onFilesLoaded(selectedFiles);
    };
    document.body.appendChild(fileInput.current);
    return () => document.body.removeChild(fileInput.current);
    // eslint-disable-next-line
  }, [multiple]);

  return view(() => fileInput.current && fileInput.current.click());
};

export default memo(FieldUpload);
