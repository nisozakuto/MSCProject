const express = require("express")();

const app = express;

const { createCanvas, loadImage } = require("canvas");
const canvas = createCanvas(200, 200);
const ctx = canvas.getContext("2d");

app.get("/image", async (req, res) => {
  ctx.font = "30px Impact";
  ctx.rotate(0.1);
  ctx.fillText("Awesome!", 50, 100);

  // Draw line under text
  var text = ctx.measureText("Awesome!");
  ctx.strokeStyle = "rgba(0,0,0,0.5)";
  ctx.beginPath();
  ctx.lineTo(50, 102);
  ctx.lineTo(50 + text.width, 102);
  ctx.stroke();

  // Draw cat with lime helmet
  loadImage("./home.png").then((image) => {
    ctx.drawImage(image, 50, 0, 70, 70);
    // console.log('<img src="' + canvas.toDataURL() + '" />');
  });

  res.write('<img src="' + canvas + '" />');

  //   res.set({ "Content-Type": "image/png" });
  //   res.send(canvas);
});

app.listen(8080);
