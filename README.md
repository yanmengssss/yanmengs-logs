# yanmengs-logs — 日志上报 SDK

> **npm 包名**：`yanmengs-logs`  
> **版本**：`^1.0.0`（已发布正式 npm 包）  
> **技术栈**：TypeScript

## 项目简介

`yanmengs-logs` 是 LifePilot 生态的**轻量级日志上报 SDK**，通过 HTTP POST 将结构化日志异步发送至 **Metaphorical 看板**（`metaphorical.yanmengsss.xyz`）进行集中存储与可视化，支持在任意 JavaScript / TypeScript 项目中使用。

**设计原则：**
- **非侵入性**：日志上报失败不会影响主应用正常运行（内部 try/catch 吞异常）
- **轻量**：无重型依赖，体积极小
- **时间戳自动注入**：无需手动传入时间，SDK 自动注入 ISO 8601 格式时间戳
- **多项目隔离**：通过 `projectKey + tableName` 区分不同项目和用途

---

## 安装

```bash
npm install yanmengs-logs
# 或
pnpm add yanmengs-logs
```

---

## 快速使用

```typescript
import { createLogger } from 'yanmengs-logs';

// 初始化（指定项目标识和日志表名）
const logger = createLogger({
  projectKey: 'lifepilot',       // 项目标识（对应 Metaphorical 中的项目）
  tableName: 'frontend_logs',    // 日志表名（对应 MongoDB Collection）
});

// 上报日志
logger.info('user_login', { userId: '123' });
logger.warn('api_slow', { url: '/chat', duration: 3200 });
logger.error('parse_failed', { error: err.message, file: 'doc.pdf' });
logger.debug('state_change', { from: 'idle', to: 'loading' });
```

---

## API 说明

| 方法 | 参数 | 说明 |
|------|------|------|
| `createLogger(config)` | `{ projectKey, tableName, endpoint? }` | 创建 Logger 实例 |
| `logger.info(msg, data?)` | `string, unknown?` | 上报 INFO 级别日志 |
| `logger.warn(msg, data?)` | `string, unknown?` | 上报 WARN 级别日志 |
| `logger.error(msg, data?)` | `string, unknown?` | 上报 ERROR 级别日志 |
| `logger.debug(msg, data?)` | `string, unknown?` | 上报 DEBUG 级别日志 |

---

## 日志数据结构

SDK 上报的每条日志包含以下字段：

```typescript
interface LogPayload {
  projectKey: string;    // 项目标识
  tableName: string;     // 目标日志表名
  level: 'info' | 'warn' | 'error' | 'debug';
  message: string;       // 日志描述
  data?: unknown;        // 附加数据（可选）
  timestamp: string;     // ISO 8601 时间戳（SDK 自动注入）
}
```

---

## 当前接入项目

| 项目 | projectKey | tableName |
|------|-----------|-----------|
| LifePilot 前端 | `lifepilot` | `frontend_logs` |

---

## 与 Metaphorical 的关系

`yanmengs-logs` 与 `Metaphorical` 是**配套关系**，两者通过 HTTP API 解耦：
- `yanmengs-logs`：负责埋点和上报（客户端 SDK）
- `Metaphorical`：负责接收、存储和可视化（服务端看板）

---

## 本地开发

### 本地开发与构建

```bash
# 1. 安装依赖
pnpm install

# 2. 开发模式（监听文件变化自动重新构建）
pnpm dev

# 3. 生产构建（输出 ESM + CJS + .d.ts）
pnpm build
```

### 发布到 npm

```bash
# 登录 npm
npm login

# 发布
npm publish
```

> **说明**：`yanmengs-logs` 是纯 TypeScript SDK（npm 包），无需独立部署也无 Docker 启动方式。安装到其他项目中使用即可：

```bash
npm install yanmengs-logs
# 或
pnpm add yanmengs-logs
```
