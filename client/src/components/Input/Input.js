import React from "react";

import "./Input.css";

const Input = ({ message, sendMessage, setMessage }) => {
	return (
		<div className="input__wrapper">
			<form
				action="
    "
				className="form"
			>
				<input
					className="input"
					placeholder="Type a message"
					value={message}
					onChange={(e) => setMessage(e.target.value)}
					onKeyPress={(e) => (e.key === "Enter" ? sendMessage(e) : null)}
					type="text"
				/>
				<button className="sendButton" onClick={(e) => sendMessage(e)}>
					Send
				</button>
			</form>
		</div>
	);
};

export default Input;
