# Agent Note: Editorial static wiki under wiki/

Status: implemented

[English](2026-08-14-editorial-static-wiki.md) | 中文

## Problem

正式文档树是一套受门禁约束、中英对照、有字数预算的语料，职责是契约、操作指南和生成目录。想一次读完循环、插件本体、目标模型，以及让这套 harness 与众不同的那些赌注，读者必须自行从 `docs/architecture.md`、包 README 和 Agent Note 里拼出叙事。那种拼装有一次性用处，却不是一份常设的正式文档。

## Decision

`wiki/` 是一份面向仓库的编辑性静态 HTML 图集：`index.html` 加若干面向页面、共用的 `assets/style.css`，以及负责导航、主题和循环步进器的少量 `assets/wiki.js`。它不属于文档网站，不是 `docs/` 页面，不做中英对照，也不受 `verify-doc-budgets`、`verify-md-links`、翻译配对或 VitePress 投影覆盖。

当 wiki 页面与正式来源冲突时，以正式来源为准：包 README、生成目录、`docs/architecture.md`、子系统页面，以及已落地的 Agent Note。wiki 可以引用这些归属，但不得成为第二套契约。

以静态文件提供服务（`python3 -m http.server --directory wiki`），或直接打开磁盘上的 `wiki/index.html`。

## Alternatives considered

**把图集放到 VitePress 文档网站上。** 这样叙事会有公开发布的 URL，也能走站点的链接检查，但会把一篇长编辑文拉进中英对照、有预算、面向用户指南的树里，并使每次刷新都经过配对和 doc-sync。网站的职责是产品和贡献者文档，不是榨汁文。

**把图集写成 `docs/` 下的 Markdown。** 正式文档已经拥有架构、子系统和 cookbook。新的 Markdown 归属要么重复那些契约，要么违反「一事实一归属」。静态 HTML 把编辑口吻留在受门禁语料之外。

**不写落地归属，把叙事留在对话里。** 对话会消失。这次请求要的是一份可本地打开的持久站点。

## Consequences

`wiki/` 可以在没有任何门禁变红的情况下与代码偏离。改循环、缝或模型默认值的作者必须先更新正式文档；刷新 wiki 是可选的编辑工作，不是合并前提。评审不应把 wiki 行文当作 README 或 Agent Note 契约的替代。

图集按版次管理。内核页面以现在时陈述当前坐次。`wiki/whats-new.html` 是上一版之后的补遗；下一次坐次把这些条目并入正文，并另起一份空白补遗。冲突时仍以正式来源为准。
