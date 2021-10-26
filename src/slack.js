const EventEmitter = require('events').EventEmitter;

function SlackEvent(options, server) {
  if (options.path === undefined) {
    throw new Error('Must provide a webhook path.');
  }

  if (server === null) {
    throw new Error('A server instance is missing.');
  }

  this.path = options.path;
  this.httpServer = server;

  this.verifyEndpoint = (challenge, res) => {
    const response = JSON.stringify({
      challenge: challenge,
    });

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(response);
  };

  this.handleEvent = (body, res) => {
    if ('type' in body && body.type === 'url_verification') {
      this.verifyEndpoint(body.challenge, res);
      return;
    }

    const { event } = body;

    this.emit(event.type, event);
    this.emit('*', event);

    res.end();
  };

  this.handleRequest = (req, res) => {
    if (req.url != this.path) {
      return;
    }

    let body = [];

    req.on('data', (chunk) => {
      body.push(chunk);
    });

    req.on('end', () => {
      body = Buffer.concat(body);

      this.handleEvent(JSON.parse(body), res);
    });
  };

  this.httpServer.on('request', this.handleRequest);
}

SlackEvent.prototype = Object.create(EventEmitter.prototype);

module.exports = (options, server) => {
  return new SlackEvent(options, server);
};
