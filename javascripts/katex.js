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

//回车
document.addEventListener("DOMContentLoaded", function() {
    // 找到所有我们自定义样式的解密按钮
    var buttons = document.querySelectorAll(".decryption-btn");

    buttons.forEach(function(btn) {
        // 绑定 'click' 事件（同时兼容手机触摸）
        btn.addEventListener("click", function(e) {
            
            // 1. 阻止默认行为，防止手机端页面跳动
            e.preventDefault();
            e.stopPropagation();

            // 2. 找到按钮前面的那个密码输入框
            // 假设结构是：[输入框] [按钮]，所以用 previousElementSibling
            var input = btn.previousElementSibling;

            if (input && input.tagName === 'INPUT') {
                // 3. 核心黑科技：手动制造一个“回车键”被按下的事件
                var enterEvent = new KeyboardEvent('keyup', {
                    key: 'Enter',
                    code: 'Enter',
                    keyCode: 13,
                    which: 13,
                    bubbles: true // 必须允许冒泡，插件才能监听到
                });

                // 4. 将这个事件发送给输入框
                input.dispatchEvent(enterEvent);
                
                // 5. 额外保险：如果插件用的是 change 事件，也触发一下
                input.dispatchEvent(new Event('change', { bubbles: true }));
                
                // 6. 收起手机键盘 (让输入框失去焦点)
                input.blur();
            }
        });
    });
});