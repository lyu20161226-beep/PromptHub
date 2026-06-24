# PromptHub

PromptHub 是一个中文 Prompt OS MVP。第一版只做一个闭环：

用户打开网站，搜索一个任务，填写变量，点击运行，拿到 AI 结果，然后复制或收藏。

## 当前 MVP

- Header
- Hero 搜索框
- 热门场景 Tabs
- Prompt 卡片瀑布流
- 自动解析 `{{变量}}` 并生成输入框
- `/api/run` 运行接口
- `/api/chat` DeepSeek 测试接口
- 20 条本地高质量 Prompt 数据
- 本地收藏
- 无登录、无支付、无数据库

## 技术栈

- Next.js App Router
- TypeScript
- Tailwind CSS
- Local TypeScript data
- DeepSeek API 可选接入

## 本地运行

```bash
npm install
npm run dev
```

访问：

```text
http://localhost:3000
```

## 生产构建

```bash
npm run build
npm start
```

## 环境变量

复制 `.env.example` 为 `.env.local`：

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
DEEPSEEK_API_KEY=你的 DeepSeek Key
DEEPSEEK_MODEL=deepseek-chat
```

如果不配置 `DEEPSEEK_API_KEY`，`/api/run` 会返回模拟结果，方便先测试 MVP 闭环。

`/api/chat` 用于测试真实 DeepSeek 对话调用，需要配置 `DEEPSEEK_API_KEY`。不要把 `deepseek-chat` 填到 `DEEPSEEK_API_KEY`，它是模型名，应放在 `DEEPSEEK_MODEL`。

部署到 Vercel 后，在项目的 Environment Variables 里添加：

```bash
DEEPSEEK_API_KEY=你的 DeepSeek Key
DEEPSEEK_MODEL=deepseek-chat
NEXT_PUBLIC_SITE_URL=https://你的域名
```

## 核心文件

- `data/prompts.ts`：MVP Prompt 数据
- `src/components/PromptOSHome.tsx`：首页搜索、Tabs、瀑布流
- `src/components/RunnablePromptCard.tsx`：可运行 Prompt 卡片
- `src/components/DeepSeekChatDemo.tsx`：前端调用 `/api/chat` 的测试组件
- `src/app/api/run/route.ts`：运行接口，支持 DeepSeek
- `src/app/api/chat/route.ts`：DeepSeek Chat 测试接口
