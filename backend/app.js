const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const otpRoutes = require("./routes/otpRoutes");

require("dotenv").config();

const app = express();


app.use(cors());
app.use(bodyParser.json());



app.use("/api", otpRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
