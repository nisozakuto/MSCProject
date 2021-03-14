const express = require("express");
const app = express();
const { Canvas } = require("canvas-constructor");
const canvas = require("canvas");

app.get("/", async (req, res) => {
  let image,
    x = 0,
    y = 0,
    color;
  // image = new Canvas(550, 267)
  //   .setColor("#FF7FF7FF")
  //   .printRectangle(5, 5, 100, 100)
  //   .setColor("#F7FF7FF")
  //   .printRectangle(5, 105, 100, 100)
  // //   .toBuffer();

  // for (let i = 0; i < 200; i++) {
  //   image = new Canvas(550, 600)
  //     .setColor("#FF7FF7FF")
  //     .printRectangle(x, y, 2, 2)
  //     .toBuffer();
  //   y += 2;
  // }

  image = new Canvas(550, 600)
    .setColor("#AF7FF4FF")
    .printRectangle(x, y, 12, 12)
    .toBuffer();

  console.log(image);
  // (image = setColor("11f764").printRectangle(10, 10, 2, 2).toBuffer());

  // for (let i = 0; i < 200; i++) {
  //   if (i % 2) color = "#117FF7FF";
  //   else if (i % 3) color = "#11f764";
  //   else if (i % 5) color = "#88f711";
  //   else color = "#88f711";

  //   y += 2;
  // }

  res.set({ "Content-Type": "image/png" }); //setting content type as png image!
  res.send(image); //sending the image!
});

app.listen(8080); //deploying the app in localhost with port 8080
