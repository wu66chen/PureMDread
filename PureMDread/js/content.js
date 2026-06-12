(function() {
  'use strict';

  const DEFAULT_FONT_SIZE = 16;

  // 配置marked
  marked.setOptions({
    breaks: true,
    gfm: true,
    highlight: function(code, lang) {
      if (lang && hljs.getLanguage(lang)) {
        return hljs.highlight(code, { language: lang }).value;
      }
      return hljs.highlightAuto(code).value;
    }
  });

  function renderMarkdown() {
    // 获取原始markdown内容
    const preElements = document.querySelectorAll('pre');
    let markdownContent = '';

    if (preElements.length > 0) {
      markdownContent = preElements[0].textContent;
    } else {
      markdownContent = document.body.textContent;
    }

    if (!markdownContent.trim()) return;

    // 解析markdown
    const htmlContent = marked.parse(markdownContent);

    // 创建美观的容器
    const container = document.createElement('div');
    container.className = 'markdown-body';
    container.innerHTML = htmlContent;

    // 创建包装器
    const wrapper = document.createElement('div');
    wrapper.id = 'markdown-reader-wrapper';
    wrapper.appendChild(container);

    // 清空body并添加新内容
    document.body.innerHTML = '';
    document.body.appendChild(wrapper);

    // 添加工具栏
    addToolbar();

    // 应用主题
    applyTheme();

    // 处理图片路径
    fixImagePaths();

    // 代码高亮
    document.querySelectorAll('pre code').forEach((block) => {
      hljs.highlightElement(block);
    });

    // 添加目录
    addTableOfContents();
  }

  function addToolbar() {
    const toolbar = document.createElement('div');
    toolbar.id = 'markdown-toolbar';
    toolbar.innerHTML = `
      <div class="toolbar-left">
        <span class="title">📄 PureMDread</span>
      </div>
      <div class="toolbar-right">
        <button id="toggle-toc" title="目录">📑</button>
        <button id="toggle-theme" title="切换主题">🌓</button>
        <button id="decrease-font" title="缩小字体">A-</button>
        <button id="reset-font" title="恢复默认字号">↺</button>
        <button id="increase-font" title="放大字体">A+</button>
        <button id="print-md" title="打印">🖨️</button>
      </div>
    `;
    document.body.insertBefore(toolbar, document.body.firstChild);

    // 绑定事件
    document.getElementById('toggle-toc').addEventListener('click', toggleTOC);
    document.getElementById('toggle-theme').addEventListener('click', toggleTheme);
    document.getElementById('increase-font').addEventListener('click', increaseFont);
    document.getElementById('decrease-font').addEventListener('click', decreaseFont);
    document.getElementById('reset-font').addEventListener('click', resetFont);
    document.getElementById('print-md').addEventListener('click', () => window.print());
  }

  function addTableOfContents() {
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    if (headings.length === 0) return;

    const toc = document.createElement('div');
    toc.id = 'markdown-toc';
    toc.className = 'toc-hidden';
    
    let tocHTML = '<div class="toc-header"><h3>📑 目录</h3><button id="close-toc">×</button></div><nav><ul>';
    
    headings.forEach((heading, index) => {
      const level = parseInt(heading.tagName.charAt(1));
      const id = `heading-${index}`;
      heading.id = id;
      
      const indent = (level - 1) * 16;
      tocHTML += `<li style="padding-left: ${indent}px"><a href="#${id}">${heading.textContent}</a></li>`;
    });
    
    tocHTML += '</ul></nav>';
    toc.innerHTML = tocHTML;
    document.body.appendChild(toc);

    document.getElementById('close-toc').addEventListener('click', () => {
      toc.classList.add('toc-hidden');
    });

    toc.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }

  function toggleTOC() {
    const toc = document.getElementById('markdown-toc');
    toc.classList.toggle('toc-hidden');
  }

  function toggleTheme() {
    chrome.storage.local.get(['darkMode'], (result) => {
      const newMode = !result.darkMode;
      chrome.storage.local.set({ darkMode: newMode }, () => {
        applyTheme();
      });
    });
  }

  function applyTheme() {
    chrome.storage.local.get(['darkMode'], (result) => {
      if (result.darkMode) {
        document.body.classList.add('dark-mode');
      } else {
        document.body.classList.remove('dark-mode');
      }
    });
  }

  function increaseFont() {
    const body = document.querySelector('.markdown-body');
    const currentSize = parseFloat(getComputedStyle(body).fontSize);
    body.style.fontSize = Math.min(currentSize + 1, 24) + 'px';
  }

  function decreaseFont() {
    const body = document.querySelector('.markdown-body');
    const currentSize = parseFloat(getComputedStyle(body).fontSize);
    body.style.fontSize = Math.max(currentSize - 1, 12) + 'px';
  }

  function resetFont() {
    const body = document.querySelector('.markdown-body');
    body.style.fontSize = DEFAULT_FONT_SIZE + 'px';
  }

  function fixImagePaths() {
    const basePath = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1);
    document.querySelectorAll('img').forEach(img => {
      const src = img.getAttribute('src');
      if (src && !src.startsWith('http') && !src.startsWith('data:') && !src.startsWith('file:')) {
        img.src = basePath + src;
      }
    });
  }

  // 初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderMarkdown);
  } else {
    renderMarkdown();
  }
})();
