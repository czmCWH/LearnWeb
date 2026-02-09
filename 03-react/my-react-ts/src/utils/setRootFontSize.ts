function setRootFontSize(): void {
  const docEl = document.documentElement;
  let clientWidth = docEl.clientWidth;
  if (!clientWidth) return;
  const baseFontSize = 16; // 基准字体大小
  const designWidth = 375; // 设计稿宽度
  
  const maxWidth = 600;    // 屏幕最大适配宽度
  // 如果屏幕宽度超过 600px，计算字号时锁定为 600px 的比例
  if (clientWidth > maxWidth) {
    clientWidth = maxWidth;
  }
  
  docEl.style.fontSize = (baseFontSize * (clientWidth / designWidth)) + 'px';
}
export default setRootFontSize;