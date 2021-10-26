## Node Slack Events

This node module helps you listen to events from Slack's [Event API](https://api.slack.com/apis/connections/events-api)

### Installation

```javascript
npm i node-slack-events
```

### Examples

```javascript
const http = require('http');
const slackWebhook = require('node-slack-events');

const server = http.createServer();

const webhookHandler = slackWebhook({ path: '/webhook' }, server);

// Listen for specific event
webhookHandler.on('message', (event) => {
  console.log(event);
});

// Listen for all events
webhookHandler.on('*', (event) => {
  console.log(event);
});

server.listen(3005, () => {
  console.log('Server is running.');
});
```
