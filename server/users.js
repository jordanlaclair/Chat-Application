const users = [];

const addUser = ({ id, name, room }) => {
	//removes all whitespace and convers to lowercase
	name = name.trim().toLowerCase();
	room = room.trim().toLowerCase();

	const existingUser = users.find((user) => {
		user.room === room && user.name === name;
	});

	if (existingUser) {
		return { error: "Username is currently taken." };
	}

	const user = { id, name, room };
	users.push(user);
	return { user };
};

const removeUser = (id) => {
	const index = users.findIndex((user) => user.id === id);

	//if index not found, findIndex returns -1
	if (index !== -1) {
		//removes user from array
		return users.splice(index, 1)[0];
	}
};

const getUser = (id) => users.find((user) => user.id === id);

const getUsersInRoom = (room) => users.filter((user) => user.room === room);

//CommonJS module export
module.exports = { addUser, removeUser, getUser, getUsersInRoom };
