# PromptHub

一个使用 Next.js App Router、TypeScript、Tailwind CSS 和本地 JSON 数据构建的中文 AI 提示词库。

## 功能

- Midjourney、即梦、ChatGPT 三个提示词分类
- 全站实时搜索与标签筛选
- 提示词详情页与一键复制
- 基于 LocalStorage 的本地收藏
- 动态 Metadata、sitemap 和 robots.txt

## 本地运行

```bash
npm install
npm run dev
```

访问 `http://localhost:3000`。

## 生产构建

```bash
npm run build
npm start
```

## 环境变量

部署时将正式站点地址写入：

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```
