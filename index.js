const jsonServer = require('json-server');
const cors = require('cors');
const path = require('path');
const Monitor = require('ping-monitor')
const myApi = new Monitor({
    website: 'https://zara-origins.netlify.app/',
    title: 'Zara',
    interval: 3,

    config: {
      intervalUnits: 'minutes' // seconds, milliseconds, minutes {default}, hours
    },

    expect: {
      statusCode: 200
    }
});


const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();

server.use(cors());
server.use(jsonServer.bodyParser);
server.use(middlewares);
server.use(router);

const PORT = 9000;

server.listen(PORT, () => {
  console.log(`JSON Server is running`)
})