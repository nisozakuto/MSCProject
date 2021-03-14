const express = require("express")();
const app = express;
const { Canvas } = require("canvas-constructor");
// const canvas = require("canvas");

app.get("/image", async (req, res) => {
  let color,
    x = 0,
    y = 0;
  let image = new Canvas(600, 600)
    .setColor("#FF7FF7FF")
    .printRectangle(5, 5, 100, 100)
    .setColor("#117FF7FF")
    .printText("hellsso", 10, 10)
    .toBuffer();

  image.setColor("#117FF7FF").printRectangle(105, 105, 100, 100);
  //   for (let i = 0; i < 200; i++) {
  //     if (i % 2) color = "#117FF7FF";
  //     else if (i % 3) color = "#11f764";
  //     else if (i % 5) color = "#88f711";
  //     else color = "#88f711";

  //     image.setColor(color).printRectangle(x, y, 2, 2);

  //     x += 2;
  //     y += 2;
  //   }

  res.set({ "Content-Type": "image/png" });
  res.send(image);
});

app.listen(8080);
