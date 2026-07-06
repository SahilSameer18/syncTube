require('dotenv').config();
const express = require('express');
const dns = require('dns');

//changing dns because of db not connected
dns.setServers(["1.1.1.1", "8.8.8.8"]);

// importing routes

// using routes

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});