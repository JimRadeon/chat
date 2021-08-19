let socket;

socket = io();

let localname = prompt("Please enter your name: ");
socket.emit("Setupusername", localname);


function buildDive(message, name){
    let chat_box = document.getElementById("chat_massageBox");
    let newdiv = document.createElement("div")
    newdiv.innerHTML = name.bold() + ": " + message;
    chat_box.appendChild(newdiv);
}

function sendmessage(){
    let message = document.getElementById("message_input");
    // console.log("The message is: "+ message);   
    socket.emit("send_message", message.value);
    buildDive(message.value, localname);
    message.value = "";
}

function historyBackup(message){
    for (let im in message){
    // Looping through both keys and value of a object in javascript
        for (let [i,j] of Object.entries(message[im])){
            buildDive(j,i);
        }
    }
}

socket.on("build_MessageBlock", buildDive);

socket.on("backup past message", historyBackup);

let button = document.getElementById('sendbtn');
button.addEventListener('click', sendmessage);

