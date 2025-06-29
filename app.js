const express = require("express")
const categories = require("./routes/categories")
const students = require("./routes/students")
const mongoose = require("mongoose")
const app = express()
require('dotenv').config();

const PORT = process.env.PORT || 3000
const mongoURL = process.env.MONGODB_URL_LOCAL;

mongoose
  .connect(mongoURL)
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err))

app.use(express.json())
app.use('/api/categories', categories);
app.use('/api/students', students)

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
