const express = require("express");
const app = express();
const { Canvas } = require("canvas-constructor");
const canvas = require("canvas");

app.get("/", async (req, res) => {
  let image,
    x = 0,
    y = 0,
    color;

  image = new Canvas(550, 600)
    .setColor("#AF7FF4FF")
    .printRectangle(x, y, 12, 12)
    .toBuffer();

  console.log(image);

  res.set({ "Content-Type": "image/png" }); //setting content type as png image!
  res.send(image); //sending the image!
});

app.listen(8080); //deploying the app in localhost with port 8080
