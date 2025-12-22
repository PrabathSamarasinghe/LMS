const { startStandaloneServer } = require('@apollo/server/standalone');
const server = require('./server.js');

async function start() {
    const { url } = await startStandaloneServer(server, {
        listen: { port: 4001 },
    });

    console.log(`Server ready at ${url}`);
}

start();