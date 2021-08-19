const express = require('express');
const app = express();
const port = 3000;

const httpServer = require('http').createServer(app);

const io = require('socket.io')(httpServer,{});


app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/js', express.static(__dirname + 'public/js'));


app.get('/', (req, res)=>{
	res.sendFile(__dirname + '/index.html');
});

let user = {}

let history = {};
let numofMessage = 0; // Number of messages that have went by

io.on("connection", socket =>{
	console.log("Someone has Join the party!");

	socket.on("disconnect", ()=>{
		console.log("Someone disconnected!");
	})

	socket.on("send_message", (message)=>{
		console.log("Server have got the message from "+ socket.id + " "+ message);
		const username = user[socket.id];
		socket.broadcast.emit("build_MessageBlock", message, username);
		history[numofMessage] = {}
		history[numofMessage][username] = message;
		numofMessage ++;
	})

	socket.on("Setupusername", (name)=>{
		console.log("I have got the name of the client " + socket.id + " The person's name is " + name)
		user[socket.id] = name;
	})

	socket.emit("backup past message", history);
});

httpServer.listen(port, ()=>{
	console.log("Working in "+ port);
});