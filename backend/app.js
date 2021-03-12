const express = require("express")();
const app = express;
const { Canvas } = require("canvas-constructor");
// const canvas = require("canvas");

app.get("/image", async (req, res) => {
  let image = new Canvas(300, 300)
    .setColor("#FF7FF7FF")
    .printRectangle(5, 5, 260, 260)
    .setColor("#117FF7FF")
    .printText("hello", 10, 10)
    .toBuffer();

  res.set({ "Content-Type": "image/png" });
  res.send(image);
});

app.listen(8080);
