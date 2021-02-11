<div class="colorSet">
  <div class="colorSettingBox">
    <p>Color 0</p>{" "}
    <div class="currentColor">
      <p>Current Color:</p>
      <div class="box showColor0" id="color0"></div>
    </div>{" "}
    <div class="setColor"> </div>
  </div>
  <div class="colorSettingBox">
    <p>Color 1</p>{" "}
    <div class="currentColor">
      <p>Current Color:</p>
      <div class="box showColor1" id="color1"></div>
    </div>{" "}
    <div class="setColor"> </div>
  </div>
  <div class="colorSettingBox">
    <p>Color 2</p>{" "}
    <div class="currentColor">
      <p>Current Color:</p>
      <div class="box showColor2" id="color2"></div>
    </div>{" "}
    <div class="setColor"> </div>
  </div>
  <div class="colorSettingBox">
    <p>Color 3</p>{" "}
    <div class="currentColor">
      <p>Current Color:</p>
      <div class="box showColor3" id="color3"></div>
    </div>{" "}
    <div class="setColor"> </div>
  </div>
  <div class="colorSettingBox">
    <p>Color 4</p>{" "}
    <div class="currentColor">
      <p>Current Color:</p>
      <div class="box showColor4" id="color4"></div>
    </div>{" "}
    <div class="setColor"> </div>
  </div>
  <div class="colorSettingBox">
    <p>Color 5</p>{" "}
    <div class="currentColor">
      <p>Current Color:</p>
      <div class="box showColor5" id="color5"></div>
    </div>{" "}
    <div class="setColor"> </div>
  </div>
  <div class="colorSettingBox">
    <p>Color 6</p>{" "}
    <div class="currentColor">
      <p>Current Color:</p>
      <div class="box showColor6" id="color6"></div>
    </div>{" "}
    <div class="setColor"> </div>
  </div>
  <div class="colorSettingBox">
    <p>Color 7</p>{" "}
    <div class="currentColor">
      <p>Current Color:</p>
      <div class="box showColor7" id="color7"></div>
    </div>{" "}
    <div class="setColor"> </div>
  </div>
  <div class="colorSettingBox">
    <p>Color 8</p>{" "}
    <div class="currentColor">
      <p>Current Color:</p>
      <div class="box showColor8" id="color8"></div>
    </div>{" "}
    <div class="setColor"> </div>
  </div>
  <div class="colorSettingBox">
    <p>Color 9</p>{" "}
    <div class="currentColor">
      <p>Current Color:</p>
      <div class="box showColor9" id="color9"></div>
    </div>{" "}
    <div class="setColor"> </div>
  </div>
</div>;

function getColors() {
  for (let i = 0; i < 10; i++) {
    boxes[i].style.backgroundColor = colors[i];
    colorColor[i] = document.getElementById(`currentColor${i}`);
    `color${i}Text`.innerText += colors[i];
  }
}

const showColor0 = document.getElementsByClassName("showColor0");
const showColor1 = document.getElementsByClassName("showColor1");
const showColor2 = document.getElementsByClassName("showColor2");
const showColor3 = document.getElementsByClassName("showColor3");
const showColor4 = document.getElementsByClassName("showColor4");
const showColor5 = document.getElementsByClassName("showColor5");
const showColor6 = document.getElementsByClassName("showColor6");
const showColor7 = document.getElementsByClassName("showColor7");
const showColor8 = document.getElementsByClassName("showColor8");
const showColor9 = document.getElementsByClassName("showColor9");

const boxes = document.querySelectorAll(".box");

const color0Text = document.getElementById("color0");
const color1Text = document.getElementById("color1");
const color2Text = document.getElementById("color2");
const color3Text = document.getElementById("color3");
const color4Text = document.getElementById("color4");
const color5Text = document.getElementById("color5");
const color6Text = document.getElementById("color6");
const color7Text = document.getElementById("color7");
const color8Text = document.getElementById("color8");
const color9Text = document.getElementById("color9");
