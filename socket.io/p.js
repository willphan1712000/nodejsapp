const express = require("express")
const app = express()
const http = require("http")
const server = http.createServer(app)
const { Server } = require("socket.io")
const io = new Server(server)
const port = process.env.PORT || 3000;

app.use(express.static("public"))

io.on("connect", (socket) => {
    console.log("a user connected")

    socket.on("ping", (data) => {
        console.log("your name is " + data.name )
        let i = 0;
        setInterval(()=>{
            i++;
            if(i === 3) {
                socket.emit("pong", {age: 20})
            }
        }, 500)
    })
    socket.on("disconnect", () => {
        console.log("a user disconnected")
    })
})

server.listen(port, () => {
    console.log(`listening on port ${port}`)
})

const {circle, rectangle} = require('./function.js')
const cir = circle(7)
const rec = rectangle(6,4)
console.log(cir)
console.log(rec)