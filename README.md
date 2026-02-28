# yanmengs-logs

Metaphorical 日志上报 SDK。

## 安装

```bash
npm install yanmengs-logs
```

## 使用方法

### 初始化 Client
 
 ```javascript
import LogsClient from 'yanmengs-logs';
 
// 初始化
const client = new LogsClient({
  appKey: 'sk_live_abcdef123456', // 从 Metaphorical 控制台获取
  tableKey: 'user_activity',      // 日志表 Key
  baseUrl: 'http://localhost:6500' // 可选，默认 http://localhost:3000，请确保指向正确的端口
});


// 上报日志
client.addMessage('info', {
  user_id: 12345,
  action: 'login_success'
}).then(success => {
  if (success) {
    console.log('Log reported successfully');
  } else {
    console.error('Failed to report log');
  }
});
```

### API

#### `new LogsClient(config)`

- `config.appKey` (String, required): 应用 Key。
- `config.tableKey` (String, required): 日志表 Key。
- `config.baseUrl` (String, optional): 日志服务地址，默认为 `http://localhost:3000`。

#### `client.addMessage(messageType, content)`

- `messageType` (String, required): 消息类型 (例如 `info`, `warn`, `error`)。
- `content` (Object | String, required): 日志内容。如果是对象，会自动序列化。
- 返回 `Promise<boolean>`: 上报成功返回 `true`，失败返回 `false`。
