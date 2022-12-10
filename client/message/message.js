
var socket = io();
let self_name = localStorage.getItem("self_name");
//let personList = JSON.parse(localStorage.getItem("personList"));
function texts() {
  let people = document.querySelectorAll("#personButton");
  for (let i = 0; i < people.length; i++) {
    people[i].addEventListener('click', function() {
      let messages = document.querySelector(".Texts");
      messages.innerHTML = `
  <input type="text" id="textmessage" name="newtext">
  <button type="button" id="sendBtn" onClick="sendMSG()">SEND</button>
  `;
      send(messages.innerHTML);
    });
  }
}


document.getElementById("AddBtn").addEventListener('click', function() {
  let person = document.getElementById('Addperson').value;
  // if(personList.includes(person))
  // {
  document.getElementById("ListOfNames").innerHTML += `<li id="nameList">
                        <button type="button" id="personButton">${person}</button>
                    </li>`;
  document.getElementById('Addperson').value = "";
  texts();
  //}
});


//let wss = new WebSocket('wss://Node-JS-Stuff.jaithrapagadala.repl.co');
wss.binaryType = "arraybuffer";
let encoder = new TextEncoder();
let decoder = new TextDecoder();

function send(message) {
  socket.emit('chat message', message.value);
}
function decode_buffer(input) {
  return JSON.parse(decoder.decode(input)).data;
}

wss.addEventListener('open', function() {
  alert("Websocket is open!");
});


socket.on('chat message', function(msg) {
  split = msg.split(';');
  if (split[0] == "M:") {
    if (split[2] == self_name) {
      alert(msg);
      //add to textbook split[2]
      let personWhoSent = document.querySelectorAll("#personButton");
      for (let i = 0; i < personWhoSent.length; i++) {
        if (personWhoSent[i].value == split[1])
          personWhoSent[i].addEventListener('click', function() {
            let sentTexts = document.querySelector(".Texts");
            sentTexts.innerHTML += `<p>${split[3]}</p>`;
          });
      }
    }
  }
});




function sendMSG() {
  send("M:;" + self_name + ";Jaithra;" + document.getElementById('textmessage').value + "");
  document.getElementById('textmessage').value = "";
}

texts();

