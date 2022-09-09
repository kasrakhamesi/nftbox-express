const { Server } = require('socket.io')
const io = new Server(process.env.SOCKET_PORT, {
  cors: {
    origin: '*'
  }
})

module.exports = io
