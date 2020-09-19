import styleModule from "./style.module.scss";

export function calculateStylesContentMsg(isMe: boolean, isTyping: boolean) {
  return {
    [styleModule.messageWrapper__content_mine]: isMe,
    [styleModule.messageWrapper__content]: !isMe,
    [styleModule.messageWrapper__content_lightGray]: isTyping,
    [styleModule.messageWrapper__content_mine_lightGray]: isTyping,
  };
}
