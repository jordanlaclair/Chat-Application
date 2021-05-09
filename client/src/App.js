import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Join from "./components/Join/Join";
import Chat from "./components/Chat/Chat";
import "./App.css";
const App = () => {
	return (
		<Router>
			<div className="app__wrapper">
				<Route path="/" exact component={Join} />
				<Route path="/chat" component={Chat} />
			</div>
		</Router>
	);
};

export default App;
