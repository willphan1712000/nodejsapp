const express = require("express")
const https = require('http')
const app = express()
const server = https.createServer(app)
const mysql = require('mysql')
const bodyParser = require("body-parser")
const fs = require('fs')

const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    passowrd: "",
    database: "allincli_p_htdocs"
})


app.set("view engine", "ejs")
app.use(express.static("public"))
app.use(bodyParser.json())
app.route("/").get(function(req, res) {
    res.render('index')
}).post(function(req, res) {
    if(req.body.product === "p") {
        conn.query("SELECT *FROM login", (error, data) => {
            if(error) {
                console.log("Error")
            } else {
                res.send(data)
            }
        })
    } else {
        res.send("Nothing found")
    }
})
app.route("/exp1").get(function(req, res) {
    fs.readFile("./text/exp1.txt", "utf-8", function(err, e) {
        if(!err) {
            const arr = e.split("\n")
            res.render('exp', {img: "complacency.jpg", heading: arr[0], subheading: arr[1], arr: arr})
        } else {
            res.writeHead(404)
            res.write("Error")
        }
    })
})
app.route("/exp2").get(function(req, res) {
    fs.readFile("./text/exp2.txt", "utf-8", function(err, e) {
        if(!err) {
            const arr = e.split("\n")
            res.render('exp', {img: "complacency.jpg", heading: arr[0], subheading: arr[1], arr: arr})
        } else {
            res.writeHead(404)
            res.write("Error")
        }
    })
})
server.listen(8080, () => {
    const { address, port } = server.address()
    console.log(address + port)
})