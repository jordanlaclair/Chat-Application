import React from "react";
import "./InfoBar.css";
import closeIcon from "../../icons/close_icon.png";
import onlineIcon from "../../icons/online_icon.png";

const InfoBar = ({ room }) => {
	return (
		<div className="infoBar">
			<div className="leftInnerContainer">
				<img src={onlineIcon} alt="online" className="onlineIcon" />
				<h3 className="info__room">{room}</h3>
			</div>
			<div className="rightInnerContainer">
				<a href="/">
					<img src={closeIcon} alt="close" />
				</a>
			</div>
		</div>
	);
};

export default InfoBar;
