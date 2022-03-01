const net = require('net');
const port = 8124;
const canvas = require('./canvas.js')

const server = net.createServer(socket => {
    console.log('client connected');
    socket.write('hello\r\n');
    let can = new canvas()

    socket.on('data', data => {
        const command = data.toString().split(" ");
        queue.push(data)

        var val = 0
        while (val < command.length) {
          if (command[val] == "steps") {
            can.step(parseInt(command[val + 1]))
            val += 2
          } else if (command[val] == "left" || command[val] == "right") {
            can.changeDirections(command[val], parseInt(command[val+1]))
            val += 2
          } else if (command[val] == "hover\r\n" || command[val] == "draw\r\n" || command[val] == "eraser\r\n") {
            can.setBrushMode(command[val])
            val += 1
          } else if (command[val] == "coord\r\n") {
            socket.write(can.getCoord());
            val += 1
          } else if (command[val] == "render\r\n") {
            socket.write(can.render());
            val += 1
          } else if (command[val] == "clear\r\n") {
            can.clear()
            val += 1
          } else if (command[val] == "quit\r\n") {
            console.log("quit called")
            socket.write("\r\n");
            socket.end();
            socket.destroy();
            val += 1
          } else {
            val += 1
          }
        }
    })
  });

  server.listen(8124, () => {
    console.log('Listening on 8124');
  });