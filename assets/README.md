# AI 数字人官网对话组件

这是一个可直接嵌入官网的二维数字人对话组件，包含：

- `index.html`：完整演示页
- `ai-widget.css`：组件样式与动画
- `ai-widget.js`：组件交互、演示回复、接口接入位
- `assets/ai-digital-human.png`：二维数字人形象

## 当前效果

页面打开后，数字人会常驻在右下角，不需要点击才出现。

- 自动显示“你好，我在这里”的聊天气泡
- 数字人会有轻微待机呼吸动效
- 数字人会周期性挥手
- 数字人会周期性眨眼
- 点击数字人后展开完整对话窗口

## 快速接入

把以下文件复制到官网项目中：

```text
ai-widget.css
ai-widget.js
assets/ai-digital-human.png
```

在官网页面底部加入：

```html
<link rel="stylesheet" href="/path/to/ai-widget.css" />

<script>
  window.AI_DIGITAL_HUMAN_CONFIG = {
    brandName: "AI 智能助手",
    greeting: "你好，我是官网 AI 助手。你可以问我产品、方案、价格或预约演示。",
    presenceTitle: "你好，我在这里",
    presenceMessage: "我是你的 AI 数字人助手，有问题可以直接问我。",
    avatar: "/path/to/assets/ai-digital-human.png",
    endpoint: "/api/chat"
  };
</script>
<script src="/path/to/ai-widget.js"></script>
```

## 接口格式

组件会向 `endpoint` 发送：

```json
{
  "message": "用户输入的问题"
}
```

后端返回以下任意字段即可：

```json
{
  "answer": "AI 回复内容"
}
```

或：

```json
{
  "message": "AI 回复内容"
}
```

## 自定义

你可以在 `window.AI_DIGITAL_HUMAN_CONFIG` 中修改：

```js
{
  brandName: "你的品牌助手名称",
  greeting: "打开对话窗口后的第一句话",
  presenceTitle: "页面打开后气泡标题",
  presenceMessage: "页面打开后气泡内容",
  avatar: "数字人图片路径",
  endpoint: "你的 AI 对话接口地址",
  quickQuestions: ["产品介绍", "价格咨询", "预约演示", "售后支持"]
}
```
