// 页面加载完成后自动渲染所有公式
document$.subscribe(({ body }) => {
  renderMathInElement(body, {
    delimiters: [
      { left: "$$", right: "$$", display: true },   // 块级公式：$$ ... $$
      { left: "$", right: "$", display: false },    // 行内公式：$ ... $
      { left: "\\(", right: "\\)", display: false }, // 行内公式：\( ... \)
      { left: "\\[", right: "\\]", display: true }   // 块级公式：\[ ... \]
    ]
  });
});