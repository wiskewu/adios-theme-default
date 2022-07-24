// ==== Utilities ===== //
// 修改主题
var themeMgr = {
    LOCAL_THEME_KEY: 'themeMode',
    LIGHT_THEME_CLS: 'theme-light',
    DARK_THEME_CLS: 'theme-dark',
    HIGH_LIGHT_LINK_ID: 'hl-github',
    toLight(useEl, save) {
        useEl.setAttribute('xlink:href', '#sun');
        document.body.classList.remove(themeMgr.DARK_THEME_CLS);
        document.body.classList.add(themeMgr.LIGHT_THEME_CLS);
        if (save) {
            localStorage.setItem(themeMgr.LOCAL_THEME_KEY, themeMgr.LIGHT_THEME_CLS);
        }
    },
    toDark(useEl, save) {
        useEl.setAttribute('xlink:href', '#moon');
        document.body.classList.remove(themeMgr.LIGHT_THEME_CLS);
        document.body.classList.add(themeMgr.DARK_THEME_CLS);
        if (save) {
            localStorage.setItem(themeMgr.LOCAL_THEME_KEY, themeMgr.DARK_THEME_CLS);
        }
    },
    getUseEl(container) {
        var useEls = container.getElementsByTagName('use');
        if (useEls && useEls.length) {
            return useEls[0];
        }
        return null;
    },
    getHlLinkEl() {
        return document.getElementById(themeMgr.HIGH_LIGHT_LINK_ID);
    },
    changeHlStyle(toDarkStyle) {
        var hlLinkEl = themeMgr.getHlLinkEl();
        if (hlLinkEl) {
            if (toDarkStyle) {
                hlLinkEl.href = hlLinkEl.href.replace('github.css', 'github-dark.css');
            } else {
                hlLinkEl.href = hlLinkEl.href.replace('github-dark.css', 'github.css');
            }
        }
    }
};

// 初始化主题
function initTheme() {
    var btnEls = document.querySelectorAll('.theme-btn');

    function toDark(btnEl) {
        var useEl = themeMgr.getUseEl(btnEl);
        if (useEl) themeMgr.toDark(useEl, false);
        useEl = null;
    }
    function toLight(btnEl) {
        var useEl = themeMgr.getUseEl(btnEl);
        if (useEl) themeMgr.toLight(useEl, false);
        useEl = null;
    }
    var themeVal = localStorage.getItem(themeMgr.LOCAL_THEME_KEY);
    var prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
    var isDark = false;
    if (themeVal) {
        isDark = themeVal === themeMgr.DARK_THEME_CLS;
    } else if (prefersDarkScheme) {
        isDark = true;
    }

    if (btnEls && btnEls.length) {
        btnEls.forEach(isDark ? toDark : toLight);
    } else {
        var addCls = isDark ? themeMgr.DARK_THEME_CLS : themeMgr.LIGHT_THEME_CLS;
        var rmCls = isDark ? themeMgr.LIGHT_THEME_CLS : themeMgr.DARK_THEME_CLS;
        document.body.classList.remove(rmCls);
        document.body.classList.add(addCls);
        localStorage.setItem(themeMgr.LOCAL_THEME_KEY, addCls);
    }
    themeMgr.changeHlStyle(isDark);
    btnEls = null;
}

// 切换主题
function toggleTheme(el) {
    var useEl = themeMgr.getUseEl(el);
    if (useEl) {
        if (document.body.classList.contains(themeMgr.LIGHT_THEME_CLS)) {
            themeMgr.toDark(useEl, true);
            themeMgr.changeHlStyle(true);
        } else {
            themeMgr.toLight(useEl, true);
            themeMgr.changeHlStyle(false);
        }
        useEl = null;
    }
}

// ==== 图标 ====== //
// 加载页面图标
function injectIcons() {
    // Thanks to https://heroicons.dev/
    var iconSymbols = {
        'tag': '<symbol id="tag" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path></symbol>',
        'home': '<symbol id="home" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></symbol>',
        'folder': '<symbol id="folder" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path></symbol>',
        'chevron-up': '<symbol id="chevron-up" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"></path></symbol>',
        'arrow-left': '<symbol id="arrow-left" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></symbol>',
        'arrow-right': '<symbol id="arrow-right" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></symbol>',
        'arrow-up': '<symbol id="arrow-up" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path></symbol>',
        'arrow-down': '<symbol id="arrow-down" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></symbol>',
        'sun': '<symbol id="sun" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></symbol>',
        'moon': '<symbol id="moon" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></symbol>',
        'archive': '<symbol id="archive" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path></symbol>',
        'at-symbol': '<symbol id="at-symbol" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"></path></symbol>',
        'calendar': '<symbol id="calendar" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></symbol>',
        'code': '<symbol id="code" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></symbol>',
        'dots-horizontal': '<symbol id="dots-horizontal" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></symbol>',
        'dots-vertical': '<symbol id="dots-vertical" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path></symbol>',
        'pencil-alt': '<symbol id="pencil-alt" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></symbol>',
        'rss': '<symbol id="rss" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 5c7.18 0 13 5.82 13 13M6 11a7 7 0 017 7m-6 0a1 1 0 11-2 0 1 1 0 012 0z"></path></symbol>',
        'user': '<symbol id="user" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></symbol>',
        'users': '<symbol id="users" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></symbol>',
        'user-circle': '<symbol id="user-circle" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></symbol>',
        'user-group': '<symbol id="user-group" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></symbol>',
        'cog': '<symbol id="cog" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></symbol>',
        'flag': '<symbol id="flag" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"></path></symbol>',
    };

    var symbolStr = Object.values(iconSymbols).join('');
    var div = document.createElement('div');
    div.innerHTML = `<svg aria-hidden="true" style="position: absolute; width: 0px; height: 0px; overflow: hidden;">${symbolStr}</svg>`;
    document.head.appendChild(div.firstChild);
    div.remove();
    div = null;
}

// ==== Entry ==== //
function init() {
    injectIcons();
    initTheme();
    registerEvents();
}

function registerEvents() {
}

window.onload = init();