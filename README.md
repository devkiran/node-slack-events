## Node Slack Events

This node module helps you listen to events from Slack's [Event API](https://api.slack.com/apis/connections/events-api)

### Installation

### Examples

```javascript
const http = require('http');
const slackWebhook = require('./src/slack');

const server = http.createServer();

const webhookHandler = slackWebhook({ path: '/webhook' }, server);

webhookHandler.on('*', (event) => {
  console.log(event);
});

server.listen(3005, () => {
  console.log('Server is running.');
});
```
