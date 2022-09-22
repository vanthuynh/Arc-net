const express = require("express");
const app = express();
const userRoutes = require("./routes/userRoutes");
const User = require("./models/User");
const room = ["general", "tech", "finance", "crypto"];
const cors = require("cors");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use("/users", userRoutes);
require("./connection");

const server = require("http").createServer(app);
const PORT = 5001;
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

app.get("/rooms", (req, res) => {
  res.json(rooms);
});

// helper function that get messages that match certain conditions with aggregate()
async function getLastMessagesFromRoom(room) {
  let roomMessages = await Message.aggregate([
    { $match: { to: room } },
    { $group: { _id: "$date", messagesByDate: { $push: "$$ROOT" } } },
  ]);
  return roomMessages;
}

// helper function to order message by date
function sortRoomMessagesByDate(messages) {
  return messages.sort(function (a, b) {
    let date1 = a._id.split("/");
    let date2 = b._id.split("/");

    date1 = date1[2] + date1[0] + date1[1];
    date2 = date2[2] + date2[0] + date2[1];

    return date1 < date2 ? -1 : 1;
  });
}

// socket connection (each user is assigned a socket)
io.on("connection", (socket) => {
  socket.on("new-user", async () => {
    const members = await User.find();

    // emit the messages to all uses that have connection to that socket
    io.emit("new-user", members);
  });

  socket.on("join-room", async (room) => {
    socket.join(room);
    let roomMessages = await getLastMessagesFromRoom(room);
    roomMessages = sortRoomMessagesByDate(roomMessages);

    // send the room messages back to client
    socket.emit("room-messages", roomMessages);
  });
});

server.listen(PORT, () => {
  console.log("listenning to port", PORT);
});
