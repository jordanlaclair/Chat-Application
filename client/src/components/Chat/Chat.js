import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import "./Chat.css";

let socket;

//react router dom has location prop to give url back
const Chat = ({ location }) => {
	const [room, setRoom] = useState("");
	const [name, setName] = useState("");
	const [messages, setMessages] = useState([]);
	const [message, setMessage] = useState("");
	const ENDPOINT = "localhost:5000";

	useEffect(() => {
		//query string returns an object from the url of location.search
		const { name, room } = queryString.parse(location.search);

		socket = io(ENDPOINT);

		setName(name);
		setRoom(room);

		socket.emit("join", { name, room }, () => {});

		return () => {
			socket.emit("disconnect");
			//turns this one instance of the client socket off (since the component was unmounted)
			socket.off();
		};
	}, [ENDPOINT, location.search]);

	//for handling messages
	useEffect(() => {
		//listener for the message emitter (the props of this listener are from the emitter)
		socket.on("message", (message) => {
			setMessages([...messages, message]);
		});
	}, [messages]);

	const sendMessage = (e) => {
		e.preventDefault();
		if (message) {
			socket.emit("sendMessage", message, () => {
				setMessage("");
			});
		}
	};

	console.log(message, messages);

	return (
		<div className="outerContainer">
			<div className="container">
				<input
					value={message}
					onChange={(e) => {
						setMessage(e.target.value);
					}}
					onKeyPress={(e) => (e.key === "Enter" ? sendMessage(e) : null)}
				/>
			</div>
		</div>
	);
};

export default Chat;