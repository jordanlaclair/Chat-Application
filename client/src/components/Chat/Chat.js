import React, { useState, useEffect } from "react";
import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";
import Messages from "../Messages/Messages";
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
	const [users, setUsers] = useState("");

	const ENDPOINT = "https://chat--application-react.herokuapp.com/";

	useEffect(() => {
		//query string returns an object from the url of location.search
		const { name, room } = queryString.parse(location.search);

		socket = io(ENDPOINT);
		//joins the user according to the url
		setName(name);
		setRoom(room);

		socket.emit("join", { name, room }, (error) => {
			if (error) {
				alert(error);
			}
		});
		//disconnect the user
		return () => {
			socket.emit("disconnect");
			//turns this one instance of the client socket off (since the component was unmounted)
			socket.off();
		};
	}, [ENDPOINT, location.search]);

	//for handling messages
	useEffect(() => {
		socket.on("roomData", ({ users }) => {
			setUsers(users);
		});
		//listener for the message emitter (the props of this listener are from the emitter)
		socket.on("message", (message) => {
			setMessages((messages) => [...messages, message]);
		});
	}, []);

	const sendMessage = (e) => {
		e.preventDefault();
		if (message) {
			socket.emit("sendMessage", message, () => {
				setMessage("");
			});
		}
	};

	return (
		<div className="outerContainer">
			<div className="container">
				<InfoBar users={users} className="infobar" room={room} />
				<Messages className="messages" messages={messages} name={name} />
				<div id="input">
					<Input
						message={message}
						setMessage={setMessage}
						sendMessage={sendMessage}
					/>
				</div>
			</div>
		</div>
	);
};

export default Chat;
