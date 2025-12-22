const { startStandaloneServer } = require('@apollo/server/standalone');
const server = require('./server.js');


const PORT = process.env.PORT || 4003;

async function start() {
    const { url } = await startStandaloneServer(server, {
        listen: { port: PORT },
    });
    console.log(`Server ready at ${url}`);
}

start();