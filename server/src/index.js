import express from "express";
const app = express();
import cors from "cors";
import route from "./demo.js";
const PORT = process.env.PORT || 8800;


app.use(cors());
app.use(express.json());
app.use("/api", route)

app.listen(PORT, () => console.log("Server Connected to " + PORT+ " ✅"));