import React from "react";
import ReactEmoji from "react-emoji";
import "./Message.css";
const Message = ({ message: { user, text }, name }) => {
	let sentByCurrentUser = false;
	const trimmedName = name.trim().toLowerCase();

	if (user === trimmedName) {
		sentByCurrentUser = true;
	}

	return sentByCurrentUser ? (
		<div className="messageContainer justifyEnd">
			<p className="sentText pr-10">{trimmedName}</p>
			<div className="messageBox backgroundBlue">
				<p class="messageText colorWhite">{ReactEmoji.emojify(text)}</p>
			</div>
		</div>
	) : (
		<div className="messageContainer justifyStart">
			<div className="messageBox backgroundGray">
				<p class="messageText colorWhite">{ReactEmoji.emojify(text)}</p>
			</div>
			<p className="sentText pl-10">{user}</p>
		</div>
	);
};

export default Message;
