import "./index.css";
import nameGenerator from "./name-generator";
import isDef from "./is-def";

// Store/retrieve the name in/from a cookie.
const cookies = document.cookie.split(";");
console.log(cookies);
let wsname = cookies.find(function(c) {
  if (c.match(/wsname/) !== null) return true;
  return false;
});
if (isDef(wsname)) {
  wsname = wsname.split("=")[1];
} else {
  wsname = nameGenerator();
  document.cookie = "wsname=" + encodeURIComponent(wsname);
}

let color = cookies.find(function(c) {
  if (c.match(/color/) !== null) return true;
  return false;
});
if (isDef(color)) {
  color = "#" + color.split("%")[1];
} else {
  color = "#" + Math.floor(Math.random() * 16777215).toString(16);
  document.cookie = "color=" + encodeURIComponent(color);
}

// Set the name in the header
document.querySelector("header>p").textContent = decodeURIComponent(wsname);

// Create a WebSocket connection to the server
const ws = new WebSocket("ws://" + window.location.host + "/socket");

// We get notified once connected to the server
ws.onopen = event => {
  console.log("We are connected.");
};

// Listen to messages coming from the server. When it happens, create a new <li> and append it to the DOM.
const messages = document.querySelector("#messages");
const aside = document.querySelector("#aside");
let line;
let idCanvas;
ws.onmessage = event => {
  if (event.data.includes("RLfPPLof;NQo$S4@D[N")) {
    var parsedDrawing = JSON.parse(
      event.data.substring(event.data.indexOf("{"))
    );
    draw(parsedDrawing);
  } else if (event.data.includes("F-HDR};R`oTayx=8Hs4")) {
    let id = JSON.parse(event.data.substring(event.data.indexOf("{")));

    let room = document.createElement("input");
    room.setAttribute("type", "button");
    room.setAttribute("id", "dessin" + id.idCanvas);
    room.setAttribute("value", "Dessin " + id.idCanvas);

    let zoneDessin = document.createElement("canvas");
    zoneDessin.setAttribute("id", "canvas" + id.idCanvas);
    zoneDessin.setAttribute("width", 1000);
    zoneDessin.setAttribute("height", 1000);
    zoneDessin.className = "classcanvas";
    zoneDessin.addEventListener("mousedown", e => mousedownEvent(e));
    zoneDessin.addEventListener("mousemove", e => mousemoveEvent(e));

    document.getElementById("section").appendChild(zoneDessin);

    listeCanvas.push(zoneDessin);

    room.addEventListener("click", e => displayCanvas(e));

    idCanvas = id.idCanvas++;
  } else {
    line = document.createElement("li");
    line.textContent = event.data;
    messages.appendChild(line);
    aside.scrollTop = aside.scrollHeight;
  }
};

let listeCanvas = [];

// Retrieve the input element. Add listeners in order to send the content of the input when the "return" key is pressed.
function sendMessage(event) {
  event.preventDefault();
  event.stopPropagation();
  if (sendInput.value !== "") {
    // Send data through the WebSocket
    ws.send(sendInput.value);
    sendInput.value = "";
  }
}

//isDrawing indicates when the mouse produces a drawing on the canvas or not
let isDrawing = false;
let x = 0;
let y = 0;

const canvas = document.getElementById("canvas");
listeCanvas.push(canvas);
const context = canvas.getContext("2d");

const rect = canvas.getBoundingClientRect();

const mousedownEvent = e => {
  x =
    e.offsetX *
    (1000 / document.getElementById(e.target.id).getBoundingClientRect().width);
  y =
    e.offsetY *
    (1000 /
      document.getElementById(e.target.id).getBoundingClientRect().height);
  isDrawing = true;
};

const mousemoveEvent = e => {
  if (isDrawing === true) {
    var drawing = {
      oldX: x,
      oldY: y,
      x:
        e.offsetX *
        (1000 /
          document.getElementById(e.target.id).getBoundingClientRect().width),
      y:
        e.offsetY *
        (1000 /
          document.getElementById(e.target.id).getBoundingClientRect().height),
      color: color,
      id: document.getElementById(e.target.id).id,
      key: "RLfPPLof;NQo$S4@D[N"
    };

    x =
      e.offsetX *
      (1000 /
        document.getElementById(e.target.id).getBoundingClientRect().width);
    y =
      e.offsetY *
      (1000 /
        document.getElementById(e.target.id).getBoundingClientRect().height);

    ws.send(JSON.stringify(drawing));
  }
};

const mouseupEvent = e => {
  if (isDrawing === true) {
    x = 0;
    y = 0;
    isDrawing = false;
  }
};

//EventListeners
canvas.addEventListener("mousedown", e => mousedownEvent(e));

canvas.addEventListener("mousemove", e => mousemoveEvent(e));

window.addEventListener("mouseup", e => mouseupEvent(e));

function drawLine(context, x1, y1, x2, y2, color) {
  context.beginPath();
  context.strokeStyle = color;
  context.lineWidth = 5;
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.stroke();
  context.closePath();
}

function draw(drawing) {
  drawLine(
    document.getElementById(drawing.id).getContext("2d"),
    drawing.oldX,
    drawing.oldY,
    drawing.x,
    drawing.y,
    drawing.color
  );
}


const displayCanvas = e => {
  listeCanvas.forEach(canvas => {
    canvas.style.visibility = "hidden";
    canvas.style.opacity = "0";
    canvas.style.display = "none";
  });

  document.getElementById("canvas" + id).style.visibility = "hidden";
  document.getElementById("canvas" + id).style.opacity = "0";
  document.getElementById("canvas" + id).style.display = "none";
  document.getElementById("canvas" + id).getBoundingClientRect();
};

const sendForm = document.querySelector("form");
const sendInput = document.querySelector("form input");
sendForm.addEventListener("submit", sendMessage, true);
sendForm.addEventListener("blur", sendMessage, true);
