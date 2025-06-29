const express = require("express")
const categories = require("./routes/categories")
const students = require("./routes/students")
const mongoose = require("mongoose")
const app = express()
const port = 3000

mongoose
  .connect("mongodb://localhost:27017/miniProject1", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err))

app.use(express.json())
app.use('/api/categories', categories);
app.use('/api/students', students)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
