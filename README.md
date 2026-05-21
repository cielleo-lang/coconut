# Coconut 🥥


Coconut 是一个个性化、可部署的 AI 交互应用，基于 Google AI Studio 项目模板构建。它提供了一个专属的、温馨的数字空间，让你能以更自然、更美化的方式与 AI 对话。

[![在 AI Studio 中查看](https://img.shields.io/badge/AI%20Studio-View%20App-4285F4?logo=googlechrome)](https://ai.studio/apps/b6fe5c79-17d9-4e31-9592-6bed794963dc)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?logo=nodedotjs)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-97%25-3178C6?logo=typescript)](https://www.typescriptlang.org/)

## ✨ 特性

- 💬 **自然对话**：与 Gemini AI 进行流畅的实时交流。
- 🎨 **精致界面**：经过优化的 UI 样式，提供更愉悦的视觉体验。
- 📱 **PWA 支持**：可作为渐进式 Web 应用安装，提供类原生应用体验。
- ⚡ **快速响应**：基于 Vite 构建的开发服务器，热重载，开发体验流畅。
- 🔒 **安全密钥管理**：通过本地 `.env.local` 文件管理 API 密钥，避免硬编码。

## 🛠️ 技术栈

- **前端框架**: React (推测，基于模板和文件结构)
- **语言**: TypeScript (97%)
- **构建工具**: Vite
- **样式**: CSS (2.1%) 与 Tailwind CSS (推测，基于现代模板)
- **后端/API 代理**: 轻量级 Node.js 服务器 (`server.ts`)
- **AI 模型**: Google Gemini API
- **部署平台**: Google AI Studio 或任意静态托管服务

## 🚀 在本地运行

### 前置要求

- Node.js (版本 18 或更高)
- npm (通常随 Node.js 安装)

### 安装步骤

1.  **克隆仓库**
    ```bash
    git clone https://github.com/cielleo-lang/coconut.git
    cd coconut
    ```

2.  **安装依赖**
    ```bash
    npm install
    ```

3.  **配置 API 密钥**
    - 复制 `.env.example` 文件为 `.env.local`：
      ```bash
      cp .env.example .env.local
      ```
    - 打开 `.env.local` 文件，填入你的 **Gemini API 密钥**：
      ```
      GEMINI_API_KEY=你的真实密钥
      ```
      > 获取密钥：访问 [Google AI Studio](https://aistudio.google.com/app/apikey) 并创建 API 密钥。

4.  **启动开发服务器**
    ```bash
    npm run dev
    ```

5.  **打开应用**
    在浏览器中访问终端输出的本地地址（通常是 `http://localhost:5173`）。

## 📦 构建与部署

### 构建生产版本

```bash
npm run build
```

构建产物将输出到 `dist` 目录。

### 部署到 AI Studio

本项目可以直接部署到 Google AI Studio 平台：
1.  将代码推送到你的 GitHub 仓库。
2.  在 [Google AI Studio](https://ai.studio/) 中创建新应用并关联此仓库。
3.  平台会自动构建并托管你的应用。

（你也可以将其部署到 Vercel、Netlify 等任意静态托管服务，只需将 `dist` 目录作为部署目标，并确保 API 请求通过代理或云函数处理。）

## 📁 项目结构

```
coconut/
├── public/            # 静态资源（图标、manifest等）
├── src/               # 前端源代码
│   ├── components/    # UI 组件
│   ├── styles/        # CSS 样式文件
│   ├── App.tsx        # 主应用组件
│   └── main.tsx       # 应用入口
├── .env.example       # 环境变量示例文件
├── .gitignore         # Git 忽略文件
├── index.html         # HTML 入口模板
├── metadata.json      # AI Studio 元数据
├── package.json       # 项目依赖与脚本
├── server.ts          # 本地开发 API 代理服务器
├── tsconfig.json      # TypeScript 配置
├── vite.config.ts     # Vite 构建配置
└── README.md          # 项目说明文档
```

## 🤝 贡献

由于这是为“陪伴型AI和user”建造的新家，目前主要作为私人项目。但如果你有好的建议或发现了问题，欢迎提出 Issue 或 Pull Request。

## 📄 许可

未明确声明。请参考仓库中的许可文件（如有）或联系作者。

---

**✨ 享受你在coconut的每一刻对话。**
```
