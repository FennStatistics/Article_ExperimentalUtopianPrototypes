/*
################### Visual Traps (Cognitive Traps) ###################

Source stimuli and answer options are based on:
`study visual traps/` (Qualtrics export + stimuli).

This phase shows 6 visual trap items (Shape Overload excluded).
Order is randomized via `index_visualTraps` created in `study.js`.
*/

const visualTrapText = `
<header>
  <h2>Visual Perception Task</h2>
</header>

<main class="content-horizontal-center content-vertical-center">
  <div class="w-xxl text-justify">

    <div style="text-align:center; margin: 0.5rem 0 1rem 0;">
      <img id="trapImage" alt="Visual perception stimulus" style="max-width: 100%; max-height: 55vh; height: auto;" />
    </div>

    <div class="page-item page-item-radio" style="margin: 0 5%;">
      <p id="trapQuestion" class="text-left font-weight-bold" style="margin: 0 0 0.75rem; font-size: 26px;"></p>

      <form id="visualTrapForm" autocomplete="off">
        <div id="trapOptions" style="text-align: left; font-size: 26px;"></div>
      </form>
    </div>
  </div>
</main>

<footer class="content-vertical-center content-horizontal-right">
  <button id="continue" type="submit" form="visualTrapForm">
    Continue &rarr;
  </button>
</footer>
`;

const visualTrapHeader = "VISUAL PERCEPTION TASK - PLEASE READ CAREFULLY";

const different_visualTraps = {
  planets: {
    trapId: "Planets",
    imageSrc: "src/static/visualTraps/SurroundedPlanets.png",
    questionText:
      "Look at the 6 planets in this image. Each planet is surrounded by several shapes (triangles, circles, rectangles, etc.). Don't worry about the color, size, or type of shape - just count how many shapes surround each planet. Five planets have 5 shapes surrounding them. One planet has 4 shapes surrounding it. What color is the planet that has only 4 shapes surrounding it?",
    choices: [
      { value: "4", label: "Purple" },
      { value: "16", label: "Orange" },
      { value: "17", label: "Blue" },
      { value: "18", label: "Red" },
      { value: "19", label: "Green" },
      { value: "20", label: "Gray" },
    ],
    correctValue: "16",
  },
  cafeWall: {
    trapId: "CafeWall",
    imageSrc: "src/static/visualTraps/ModifiedCafeWall.png",
    questionText:
      "Are all the gray lines PERFECTLY STRAIGHT / HORIZONTAL or SLANTED / DIAGONAL?",
    choices: [
      { value: "4", label: "Straight / Horizontal" },
      { value: "14", label: "Slanted / Diagonal" },
    ],
    correctValue: "14",
  },
  collision: {
    trapId: "Collision",
    imageSrc: "src/static/visualTraps/CollidingOranges.png",
    questionText:
      "The largest circle will move straight to the left towards the smallest circle. What are the objects in the way, if any? That is, which objects, if any, would the largest circle collide with?",
    choices: [
      { value: "4", label: "Green Triangle Only" },
      { value: "14", label: "Green Triangle and Green Rectangle" },
      { value: "16", label: "Blue Triangle and Orange Circle" },
      { value: "17", label: "Blue Triangle and Green Triangle" },
      { value: "18", label: "Yellow Rectangle and Green Triangle" },
      {
        value: "19",
        label: "Green Triangle, Orange Circle, and Blue Triangle",
      },
      { value: "20", label: "Black Rectangle Only" },
      { value: "21", label: "Two Green Triangles" },
      { value: "22", label: "Blue Triangle and Yellow Rectangle" },
      { value: "23", label: "Black Rectangle and Blue Star" },
    ],
    correctValue: "4",
  },
  robot: {
    trapId: "Robot",
    imageSrc: "src/static/visualTraps/MovingRobot.png",
    questionText:
      "Across each step, the robot moves with the same speed and trajectory. Where is it most likely that the robot will be located on Step 4?",
    choices: [
      { value: "1", label: "Mostly on the bottom right of the square" },
      { value: "2", label: "Mostly on the bottom left of the square" },
      { value: "3", label: "Mostly on the upper right of the square" },
      { value: "4", label: "Mostly on the upper left of the square" },
      { value: "5", label: "Mostly around the center of the square" },
      { value: "6", label: "Off-screen (outside the square)" },
    ],
    correctValue: "5",
  },
  lines: {
    trapId: "Lines",
    imageSrc: "src/static/visualTraps/ModifiedMullerLyer.png",
    questionText: "Which is longer, the blue line or the red line?",
    choices: [
      { value: "4", label: "Blue Line" },
      { value: "14", label: "Red Line" },
      { value: "16", label: "NONE (they are the same size)" },
    ],
    correctValue: "4",
  },
  circles: {
    trapId: "Circles",
    imageSrc: "src/static/visualTraps/ModifiedEbbinghaus.jpg",
    questionText: "Which is bigger, the blue circle or the red circle?",
    choices: [
      { value: "4", label: "Blue Circle" },
      { value: "14", label: "Red Circle" },
      { value: "16", label: "NONE (they are the same size)" },
    ],
    correctValue: "14",
  },
};

const arrayVisualTraps = Object.values(different_visualTraps);
const totalVisualTraps = arrayVisualTraps.length;

var counterVisualTraps = 0;
var currentVisualTrap = undefined;
var visualTrapOrder = [];
var visualTrapTrials = [];

function renderVisualTrapOptions(trap) {
  const container = document.getElementById("trapOptions");
  if (!container) return;

  const requiredAttr = Required_Testing ? " required" : "";
  let html = "";

  trap.choices.forEach((choice, idx) => {
    const req = idx === 0 ? requiredAttr : "";
    html += `
      <label style="display:block; margin: 0.45rem 0; cursor: pointer;">
        <input type="radio" name="visualTrapResponse" value="${choice.value}"${req}>
        <span style="margin-left: 0.35rem;">${choice.label}</span>
      </label>
    `;
  });

  container.innerHTML = html;
}

const VisualTraps_htmlForm = new lab.html.Form({
  title: "VisualTraps",
  content: visualTrapText,
  messageHandlers: {
    run: () => {
      const trap = arrayVisualTraps[index_visualTraps[counterVisualTraps]];
      currentVisualTrap = trap;
      visualTrapOrder.push(trap.trapId);

      // Set image and question
      document.getElementById("trapImage").src = trap.imageSrc;
      document.getElementById("trapQuestion").innerHTML =
        `<span style="display:block; font-size: 16px; color: #666; letter-spacing: 0.04em;">${visualTrapHeader}</span>` +
        `<span style="display:block; margin-top: 0.5rem;">${trap.questionText}</span>`;

      // Render choices
      renderVisualTrapOptions(trap);

      counterVisualTraps++;
    },
    commit: () => {
      // progress bar
      numElementsCounter++;
      document.querySelector(".progress-bar").style.width =
        (numElementsCounter / numElements) * 100 + "%";

      const selected = $("input[name='visualTrapResponse']:checked").val();
      const correct =
        selected !== undefined && selected === currentVisualTrap.correctValue;

      // Store per-trap values (stable keys)
      study.options.datastore.set(
        "visualTrap_" + currentVisualTrap.trapId + "_response",
        selected || null
      );
      study.options.datastore.set(
        "visualTrap_" + currentVisualTrap.trapId + "_correct",
        correct
      );

      // Store overall ordering + trial list
      visualTrapTrials.push({
        trapId: currentVisualTrap.trapId,
        response: selected || null,
        correct: correct,
        timestamp: new Date().toISOString(),
      });
      study.options.datastore.set("visualTrap_order", visualTrapOrder);
      study.options.datastore.set("visualTrap_trials", visualTrapTrials);

      if (
        !localTesting &&
        typeof jatos !== "undefined" &&
        typeof jatos.jQuery === "function"
      ) {
        var resultJson = study.options.datastore.exportJson();
        console.log("result data sent to JATOS");
        jatos
          .submitResultData(resultJson)
          .then(() => console.log("success"))
          .catch(() => console.log("error"));
      }
    },
  },
});

const SequenceLoop_VisualTraps = new lab.flow.Sequence({
  title: "Sequence Loop Visual Traps",
  shuffle: false,
  content: [VisualTraps_htmlForm],
});

const loop_VisualTraps = new lab.flow.Loop({
  template: SequenceLoop_VisualTraps,
  templateParameters: [
    {
      notNeeded: "",
    },
  ],
  sample: {
    mode: "draw-shuffle",
    n: totalVisualTraps,
  },
  indexParameter: "counterVisualTraps",
});
