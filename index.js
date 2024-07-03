const express = require("express");
const app = express();
const router = require("./routes/index");
const cors = require("cors");
require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//initialize cors
app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        // allowedHeaders: ["Content-Type", "Authorization"],
    })
);
app.use("/api", router);
app.use("/", async(req, res)=>{
  res.json({message:"Welcome to HNG Internship level 0"})
})
const port = process.env.PORT | 8080;
app.listen(port, () => {
  try {
    console.log(`App running on port ${port}`);
  } catch (error) {
    console.log(`Error starting server: ${error.message}`);
  }
});
