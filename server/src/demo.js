import express from "express";
const route = express.Router();

route.post("/user/login", async (req, res) => {
  try {
    const email = req.body.email;
    if (!email) return res.status(400).json({ message: "Email is required" });
    return res.status(201).json({
      message: "Login successful",
      data: { name: "demo name", email: "demo email" },
    });
  } catch (error) {
    console.log(error.message);
  }
});

route.get("/user/profile/:id", async (req, res) => {
  try {
    return res.status(200).json({
      data: { name: "demo name", email: "demo email" },
    });
  } catch (error) {
    console.log(error.message);
  }
});

export default route;
