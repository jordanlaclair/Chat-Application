import React from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import Message from "../Message/Message";
import "./Messages.css";
const Messages = ({ messages, name }) => {
	return (
		//consistently scrolls to bottom after each message
		<ScrollToBottom className="messages">
			{messages.map((message, i) => (
				//different key each time, so no errors
				<div key={i}>
					<Message message={message} name={name} />
				</div>
			))}
		</ScrollToBottom>
	);
};

export default Messages;
