# 企业智能体官网前端

企业智能体 SaaS 官网前端，包含：

- 2D 数字人顾问入口
- 企业方案展示
- 智能体目录
- 短视频获客智能体详情页
- AI 生成视频智能体表单

## 本地查看

直接打开：

```text
index.html
```

短视频生成接口默认调用：

```text
http://127.0.0.1:8888/api/video-agent/generate
```

请先启动 FastAPI 后端。

## 官网 AI 顾问接口

## 预约演示接口

预约表单会提交到：

```text
POST /api/bookings
```

如果预约接口部署在阿里云独立域名，请在 `index.html` 里配置：

```js
window.BOOKING_API_BASE = "https://your-aliyun-api-domain.com";
window.BOOKING_API_URL = "https://your-aliyun-api-domain.com/api/bookings";
```

实际请求会变成：

```text
POST https://your-aliyun-api-domain.com/api/bookings
```

页面右下角数字人顾问默认调用：

```text
POST http://8.210.39.222/v1/chat
```

部署前需要配置公司官网知识库的内部 `api_key`。编辑：

```text
assets/ai-config.js
```

填入：

```js
window.COMPANY_AI_ENDPOINT = "http://8.210.39.222/v1/chat";
window.COMPANY_AI_API_KEY = "replace-with-company-tenant-api-key";
```

`api_key` 来自云端命令：

```bash
cd /opt/ai-customer-service
docker compose exec api python scripts/import_company_knowledge.py --replace
```

接口请求格式：

```json
{
  "api_key": "公司官网知识库 key",
  "session_id": "website-user-001",
  "message": "介绍一下你们的新媒体运营智能体"
}
```
