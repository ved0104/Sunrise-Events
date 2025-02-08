require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors');
const app = express();
app.use(cors())
app.use(express.json())

// Database connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error(err));

app.get("/", (req, res) => {
    res.send("Hello")
})
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`)
})