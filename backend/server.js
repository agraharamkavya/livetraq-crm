require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const customerRoutes = require("./routes/customerRoutes");
const authRoutes = require("./routes/authRoutes");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/customers", customerRoutes);
app.use("/api/auth", authRoutes);
mongoose.connect("mongodb+srv://agragomika1723_db_user:7DQHHeec5nSXFJZQ@cluster0.19q5bij.mongodb.net/livetraqCRM?retryWrites=true&w=majority")
  .then(() => console.log("MongoDB Atlas Connected ✅"))
  .catch(err => console.log(err));

app.get("/", (req, res) => {
  res.send("CRM Backend Running 🚀");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});