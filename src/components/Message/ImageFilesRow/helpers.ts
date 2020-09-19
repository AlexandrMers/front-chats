import styleModule from "./style.module.scss";
import { AlignRow } from "./index";

export function calculateAlignForAttachments(
  alignRow: AlignRow,
  isOneAttachment: boolean,
  isExistText: boolean
) {
  return {
    [styleModule.attachmentsWrapper_end]: alignRow === AlignRow.END,
    [styleModule.attachmentsWrapper_start]: alignRow === AlignRow.START,
    [styleModule.attachmentsWrapper_end_big]:
      alignRow === AlignRow.END && isOneAttachment,
    [styleModule.attachmentsWrapper_start_big]:
      alignRow === AlignRow.START && isOneAttachment,
    [styleModule.attachmentsWrapper_end_big_withText]:
      alignRow === AlignRow.END && isOneAttachment && isExistText,
    [styleModule.attachmentsWrapper_start_big_withText]:
      alignRow === AlignRow.START && isOneAttachment && isExistText,
  };
}
