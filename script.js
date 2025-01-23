// 定义标题文本 (保持不变)
const TITLES = {
    zh: "Bluesky 个性域名申请 | bsky.fog.moe",
    'zh-hant': "Bluesky 個性域名申請 | bsky.fog.moe",
    en: "Bluesky Custom Domain Application | bsky.fog.moe",
    ja: "Bluesky カスタムドメイン申請 | bsky.fog.moe" // 新增
};

// 语言切换功能 (使用事件委托和 dataset 属性)
document.querySelector('.lang-switch').addEventListener('click', (event) => {
    const target = event.target;
    if (target.tagName === 'A') {
        event.preventDefault(); // 阻止默认的锚点跳转行为
        const lang = target.dataset.lang;
        switchLang(lang);
    }
});

function switchLang(lang) {
    // 切换页面内容
    document.querySelectorAll('.zh, .zh-hant, .en, .ja').forEach(el => {
        el.classList.remove('active');
    });
    document.querySelectorAll('.' + lang).forEach(el => {
        el.classList.add('active');
    });

    // 切换导航栏激活状态
    document.querySelectorAll('.lang-switch a').forEach(el => {
        el.classList.remove('active');
    });
    document.querySelector(`.lang-switch a[data-lang="${lang}"]`).classList.add('active');

    // 更新页面标题
    document.title = TITLES[lang];

    // 更新 URL hash
    window.location.hash = '#' + lang;
}

// 根据URL hash初始化语言
function initLang() {
    const hash = window.location.hash.replace('#', '') || 'zh';
    switchLang(hash);
}

// 页面加载时初始化
window.addEventListener('load', initLang);
// 监听URL变化
window.addEventListener('hashchange', initLang);