require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const customerRoutes = require("./routes/customerRoutes");
const authRoutes = require("./routes/authRoutes");
const inventoryRoutes = require("./routes/inventoryRoutes");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/customers", customerRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/inventory", inventoryRoutes);
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Atlas Connected ✅"))
  .catch(err => console.log(err));

app.get("/", (req, res) => {
  res.send("CRM Backend Running 🚀");
});
const path = require("path");

app.use(express.static(path.join(__dirname, "../frontend/build")));


app.listen(5000, () => {
  console.log("Server running on port 5000");
});
