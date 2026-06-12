<p align="center">
  <img src="icons/icon.svg" alt="PureMDread Logo" width="128" height="128">
</p>

<h1 align="center">PureMDread</h1>

<p align="center">
  <a href="https://github.com/wu66chen/PureMDread/stargazers">
    <img src="https://img.shields.io/github/stars/wu66chen/PureMDread?style=flat-square" alt="Stars">
  </a>
  <a href="https://github.com/wu66chen/PureMDread/network/members">
    <img src="https://img.shields.io/github/forks/wu66chen/PureMDread?style=flat-square" alt="Forks">
  </a>
  <a href="https://github.com/wu66chen/PureMDread/issues">
    <img src="https://img.shields.io/github/issues/wu66chen/PureMDread?style=flat-square" alt="Issues">
  </a>
  <a href="https://github.com/wu66chen/PureMDread/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/wu66chen/PureMDread?style=flat-square" alt="License">
  </a>
</p>

<p align="center">
  <img src="icons/icon.svg" alt="PureMDread Logo" width="128" height="128">
</p>

<h1 align="center">PureMDread</h1>

<p align="center">
  <strong>纯净的本地Markdown阅读器 Chrome 扩展</strong>
  <br>
  一键美观阅读，无需转换 · 明暗双主题 · 代码高亮 · 自动目录
</p>

<p align="center">
  <a href="#功能特性">功能特性</a> •
  <a href="#安装方法">安装方法</a> •
  <a href="#使用说明">使用说明</a> •
  <a href="#配置说明">配置说明</a> •
  <a href="#技术栈">技术栈</a>
</p>

---

## ✨ 功能特性

### 🎨 核心渲染
- **自动检测渲染** - 自动识别并渲染浏览器中打开的 `.md` / `.markdown` / `.mdown` / `.mkd` 文件
- **GitHub 风格** - 完美复刻 GitHub Markdown 渲染风格
- **GFM 语法支持** - 完整支持表格、任务列表、删除线等 GitHub Flavored Markdown
- **全语言代码高亮** - 内置 Highlight.js，支持几乎所有编程语言

### 🌓 主题系统
- **明暗双主题** - 一键切换浅色/深色模式
- **设置记忆** - 主题选择自动保存，下次打开自动应用
- **护眼配色** - 浅色模式采用柔和 `#e0e0e0` 灰色背景，长时间阅读不疲劳

### 📑 阅读体验
- **智能目录生成** - 自动提取文档标题生成可点击跳转的目录
- **字号调节** - A- / 恢复默认 / A+ 三档字号控制，12px-24px 范围
- **一键打印/PDF** - 内置打印按钮，直接导出美观的 PDF 文档
- **相对路径图片修复** - 自动修复本地 Markdown 中的相对路径图片

### ⚡ 性能优势
- **零延迟渲染** - `document_start` 时机注入，页面加载即渲染
- **无网络依赖** - 纯本地运行，不收集任何数据
- **轻量无负担** - 完整包体 < 500KB，内存占用极低

---

## 🚀 安装方法

1. 下载本仓库 ZIP 或克隆到本地
2. 打开 Chrome 浏览器，地址栏输入 `chrome://extensions/`
3. 开启右上角 **开发者模式**
4. 点击 **加载已解压的扩展程序**
5. 选择 `markdown-reader-extension` 文件夹
6. ⚠️ **重要**：点击插件卡片的「详情」→ 开启 **允许访问文件网址**

---

## 📖 使用说明

### 基础使用
1. 直接在 Chrome 中拖入本地 `.md` 文件
2. 或在地址栏输入本地文件路径 `file:///path/to/your/file.md`
3. 插件自动完成渲染，享受美观的阅读体验

### 工具栏功能
| 按钮 | 功能 |
|------|------|
| 📑 | 显示/隐藏文档目录 |
| 🌓 | 切换明暗主题 |
| **A-** | 减小字号 |
| **↺** | 恢复默认字号 (16px) |
| **A+** | 增大字号 |
| 🖨️ | 打印/导出 PDF |

---

## ⚙️ 配置说明

### 文件类型匹配
插件默认自动渲染以下扩展名的本地文件：
- `.md`
- `.markdown`
- `.mdown`
- `.mkd`

如需添加更多扩展名，可在 `manifest.json` 的 `content_scripts.matches` 中配置。

### 权限说明
- `storage` - 用于保存用户主题偏好设置
- `file:///*` - 用于访问本地 Markdown 文件（必须手动开启）

---

## 🛠️ 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| Chrome Extension | Manifest V3 | 扩展框架 |
| Marked.js | v11.1.1 | Markdown 解析引擎 |
| Highlight.js | v11.9.0 | 代码语法高亮 |
| GitHub Markdown CSS | v5.5.0 | 渲染样式 |
| 原生 JavaScript | ES6+ | 业务逻辑 |

> **无框架依赖** - 纯原生实现，无 React/Vue 等框架，性能极致

---

## 📁 项目结构

```
markdown-reader-extension/
├── manifest.json              # 扩展配置文件
├── popup.html                 # 工具栏弹出面板
├── README.md                  # 本文件
├── css/
│   ├── style.css              # 自定义主题样式
│   ├── github-markdown.css    # GitHub Markdown 样式
│   └── highlight-github.css   # 代码高亮样式
├── js/
│   ├── content.js             # 核心渲染逻辑
│   ├── popup.js               # 弹出面板逻辑
│   ├── marked.min.js          # Marked.js 库
│   └── highlight.min.js       # Highlight.js 库
└── icons/
    ├── icon.svg               # SVG 矢量图标
    ├── icon16.png             # 16×16 工具栏图标
    ├── icon48.png             # 48×48 扩展管理图标
    └── icon128.png            # 128×128 商店图标
```

---

## 🤝 参与贡献

欢迎提交 Issue 和 Pull Request！

### 开发建议
1. Fork 本仓库
2. 创建功能分支 `git checkout -b feature/AmazingFeature`
3. 提交更改 `git commit -m 'Add some AmazingFeature'`
4. 推送到分支 `git push origin feature/AmazingFeature`
5. 开启 Pull Request

---

## 📝 更新日志

### v1.0.0 (2026-06-12)
- ✅ 初始版本发布
- ✅ Markdown 自动渲染
- ✅ 明暗双主题切换
- ✅ 智能目录生成
- ✅ 字号调节功能
- ✅ 代码语法高亮
- ✅ 本地图片路径修复

---

## 📄 开源协议

本项目采用 **MIT License** 开源协议 - 详见 [LICENSE](LICENSE) 文件

---

<p align="center">
  <strong>Made with ❤️ for developers who love reading Markdown</strong>
  <br>
  <sub>如果觉得好用，欢迎给个 ⭐ Star 支持</sub>
</p>
