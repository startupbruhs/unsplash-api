var app = require("express")();
var server = require("http").Server(app);
var io = require("socket.io")(server);

module.exports = () => {
  server.listen(9090);
  io.on("connection", function(socket) {
    console.log("connected");
    socket.emit("news", { hello: "world" });
    socket.emit("chat", { new: "message" });
    socket.on("disconnect", function() {
      console.log("disconnected");
    });
  });
};
