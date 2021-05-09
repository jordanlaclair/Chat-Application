//imports of CommonJS
const express = require("express");
const cors = require("cors");

const http = require("http");

const { removeUser, addUser, getUsersInRoom, getUser } = require("./users");

const PORT = process.env.PORT || 5000;

const router = require("./router");
const { isObject } = require("util");

const app = express();
//creates http server on your computer
const server = http.createServer(app);

const socketio = require("socket.io")(server, {
	cors: {
		origin: "*",
		methods: ["GET", "POST"],
		allowedHeaders: ["my-custom-header"],
		credentials: true,
	},
});
//instance of socket

//client side socket when the user connects
socketio.on("connection", (socket) => {
	//listens for the client to emit "join" along with its arguments it passed (here it deconstructs name and room)
	socket.on("join", ({ name, room }, callback) => {
		//addUser returns either an error or user object which is why it is deconstructed here

		const { error, user } = addUser({ id: socket.id, name, room });

		if (error) return callback(error);
		//sends to front end
		socket.emit("message", {
			user: "admin",
			text: `${user.name}, welcome to the room ${user.room}`,
		});
		//lets everyone know besides that user
		socket.broadcast
			.to(user.room)
			.emit("message", { user: "admin", text: `${user.name} has joined!` });
		//joins a room
		socket.join(user.room);

		socketio
			.to(user.room)
			.emit("roomData", { room: user.room, users: getUsersInRoom(user.room) });

		callback();
	});
	//waiting for front end
	//emmitter function
	socket.on("sendMessage", (message, callback) => {
		//gets this specific socket instance id from up above
		const user = getUser(socket.id);
		socketio.to(user.room).emit("message", { user: user.name, text: message });
		socketio
			.to(user.room)
			.emit("roomData", { room: user.room, users: getUsersInRoom(user.room) });

		callback();
	});

	//when the user disconnects from that socket
	socket.on("disconnect", () => {
		const user = removeUser(socket.id);

		if (user) {
			socketio.to(user.room).emit("message", {
				user: "Admin",
				text: `${user.name} has left.`,
			});
			socketio.to(user.room).emit("roomData", {
				room: user.room,
				users: getUsersInRoom(user.room),
			});
		}
	});
});

app.use(cors());
app.use(router);

server.listen(PORT, () => {
	console.log(`Server has started on port ${PORT}`);
});
