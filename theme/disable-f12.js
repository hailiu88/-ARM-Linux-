(function () {
    // 1. 彻底禁用网页右键菜单
    document.addEventListener('contextmenu', function (e) {
        e.preventDefault();
    });

    // 2. 拦截键盘快捷键（禁用 F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U）
    document.addEventListener('keydown', function (e) {
        // 禁用 F12 (KeyCode 123)
        if (e.keyCode === 123) {
            e.preventDefault();
            return false;
        }
        
        // 禁用 Ctrl+Shift+I (打开开发者工具) 和 Ctrl+Shift+J (打开控制台)
        if (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74)) {
            e.preventDefault();
            return false;
        }
        
        // 禁用 Mac 上的 Cmd+Opt+I
        if (e.metaKey && e.altKey && e.keyCode === 73) {
            e.preventDefault();
            return false;
        }

        // 禁用 Ctrl+U (查看网页源代码)
        if (e.ctrlKey && e.keyCode === 85) {
            e.preventDefault();
            return false;
        }
    });

    // 3. 终极反调试：如果盗版者通过浏览器菜单强行打开了 F12，直接用 debugger 让他的浏览器卡死
    setInterval(function () {
        (function () {
            return false;
        }['constructor']('debugger')());
    }, 50);
})();
