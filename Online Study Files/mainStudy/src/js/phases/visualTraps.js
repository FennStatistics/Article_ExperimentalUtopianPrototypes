/*
################### Visual Traps (Cognitive Traps) ###################

Source stimuli are copied from `study visual traps/stimuli/`.
Answer options are a harmonized 4-option set (not the original Qualtrics option counts).

This phase shows 6 visual trap items (Shape Overload excluded).
Order is randomized via `index_visualTraps` created in `study.js`.
*/

const visualTrapText = `
<header>
  <h2>Visual Perception and Reasoning</h2>
</header>

<main class="content-horizontal-center content-vertical-center">
  <div class="w-xxl text-justify visual-traps">

    <p class="trap-instruction">
      These are short visual perception and reasoning questions. Please look at each image carefully and choose the best answer. If you are unsure, please make your best guess.
    </p>

    <div class="trap-image-frame" aria-hidden="false">
      <img id="trapImage" class="trap-image" alt="Visual perception stimulus" />
    </div>

    <div class="page-item page-item-radio" style="margin: 0 5%;">
      <p id="trapQuestion" class="text-left font-weight-bold" style="margin: 0 0 0.75rem; font-size: 26px;"></p>

      <form id="visualTrapForm" autocomplete="off">
        <div id="trapOptions" class="trap-options-grid"></div>
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

const visualTrapHeader = "VISUAL PERCEPTION TASK";

const transitionToVisualTrapsText = `
<header>
  <h2>Visual Reasoning Task</h2>
</header>

<main class="content-horizontal-center content-vertical-center">
  <div class="w-xl text-justify">
    <section>
      <p>In this task, you will view a series of <strong>visual tasks</strong> designed to examine how people reason about and interpret visual information.</p>
    </section>
    <section>
      <p>There are no trick questions or "gotchas"—simply <strong>answer as accurately as you can</strong> based on what you observe. If you are genuinely uncertain, make your best reasoned guess.</p>
    </section>
  </div>
</main>

<form id="page-form"></form>

<footer class="content-vertical-center content-horizontal-right">
  <button id="continue" type="submit" form="page-form">
    Begin &rarr;
  </button>
</footer>
`;










const TransitionToVisualTraps_htmlForm = new lab.html.Form({
  title: "TransitionToVisualTraps",
  content: transitionToVisualTrapsText,
  messageHandlers: {
    commit: () => {
      numElementsCounter++;
      document.querySelector(".progress-bar").style.width =
        (numElementsCounter / numElements) * 100 + "%";
    },
  },
});


const transitionToScenarioText = `
<header>
  <h2>Next part of the study: Exploring Future Societies</h2>
</header>

<main class="content-horizontal-center content-vertical-center">
  <div class="w-xl text-justify">
    <section>
      <p>In this next section, you will read descriptions of <strong>several different future societies</strong>—each representing a distinct vision of how our world could develop.</p>
    </section>
    <section>
      <p>For each description, we ask that you <strong>take time to imagine living in that society</strong>. Consider what daily life might be like, what values would be prioritized, and how people might interact with each other and their environment.</p>
    </section>
    <section>
      <p>After reading each description, you will few questions about your impressions. There are <strong>no right or wrong answers</strong>—we are interested in your genuine thoughts and feelings about each vision.</p>
    </section>
    <section>
      <p style="font-size: 0.95em; color: #555; font-style: italic;">Please take your time with each description. You will have at least 15 seconds to read before you can answer the questions.</p>
    </section>
  </div>
</main>

<form id="page-form"></form>

<footer class="content-vertical-center content-horizontal-right">
  <button id="continue" type="submit" form="page-form">
    Begin &rarr;
  </button>
</footer>
`;







const TransitionToScenario_htmlForm = new lab.html.Form({
  title: "TransitionToScenario",
  content: transitionToScenarioText,
  messageHandlers: {
    run: () => {
      study.options.datastore.set("visualTrap_order", visualTrapOrder);
    },
    commit: () => {
      // progress bar
      numElementsCounter++;
      document.querySelector(".progress-bar").style.width =
        (numElementsCounter / numElements) * 100 + "%";
    },
  },
});

const different_visualTraps = {
  planets: {
    trapId: "Planets",
    imageSrc: "src/static/visualTraps/SurroundedPlanets.png",
    questionText:
      "Look at the 6 planets in this image. Each planet is surrounded by several shapes. Don't worry about the color, size, or type of shape - just count how many shapes surround each planet. Five planets have 5 shapes surrounding them. One planet has 4 shapes surrounding it. What color is the planet that has only 4 shapes surrounding it?",
    choices: [
      { value: "1", label: "Purple" },
      { value: "2", label: "Orange" },
      { value: "3", label: "Blue" },
      { value: "4", label: "Green" },
    ],
    correctValue: "2",
  },
  cafeWall: {
    trapId: "CafeWall",
    imageSrc: "src/static/visualTraps/ModifiedCafeWall.png",
    questionText:
      "Are all the gray lines PERFECTLY STRAIGHT / HORIZONTAL or SLANTED / DIAGONAL?",
    choices: [
      { value: "1", label: "Straight / Horizontal" },
      { value: "2", label: "Slightly curved" },
      { value: "3", label: "Slanted / Diagonal" },
      { value: "4", label: "Mixed: some straight, some slanted" },
    ],
    correctValue: "3",
  },
  collision: {
    trapId: "Collision",
    imageSrc: "src/static/visualTraps/CollidingOranges.png",
    questionText:
      "The largest circle will move straight to the left towards the smallest circle. What are the objects in the way, if any? That is, which objects, if any, would the largest circle collide with?",
    choices: [
      { value: "1", label: "Green Triangle Only" },
      { value: "2", label: "Green Triangle and Green Rectangle" },
      { value: "3", label: "Blue Triangle and Orange Circle" },
      { value: "4", label: "No object would be hit" },
    ],
    correctValue: "1",
  },
  robot: {
    trapId: "Robot",
    imageSrc: "src/static/visualTraps/MovingRobot.png",
    questionText:
      "Across each step, the robot moves with the same speed and trajectory. Where is it most likely that the robot will be located on Step 4?",
    choices: [
      { value: "1", label: "Mostly on the bottom left of the square" },
      { value: "2", label: "Mostly on the upper right of the square" },
      { value: "3", label: "Mostly around the center of the square" },
      { value: "4", label: "Off-screen (outside the square)" },
    ],
    correctValue: "3",
  },
  lines: {
    trapId: "Lines",
    imageSrc: "src/static/visualTraps/ModifiedMullerLyer.png",
    questionText: "Which is longer, the blue line or the red line?",
    choices: [
      { value: "1", label: "Blue Line" },
      { value: "2", label: "Red Line" },
      { value: "3", label: "NONE (they are the same size)" },
      { value: "4", label: "Cannot be determined from the image" },
    ],
    correctValue: "1",
  },
  circles: {
    trapId: "Circles",
    imageSrc: "src/static/visualTraps/ModifiedEbbinghaus.jpg",
    questionText: "Which is bigger, the blue circle or the red circle?",
    choices: [
      { value: "1", label: "Blue Circle" },
      { value: "2", label: "Red Circle" },
      { value: "3", label: "NONE (they are the same size)" },
      { value: "4", label: "Cannot be determined from the image" },
    ],
    correctValue: "2",
  },
};

const arrayVisualTraps = Object.values(different_visualTraps);
const totalVisualTraps = arrayVisualTraps.length;

var counterVisualTraps = 0;
var currentVisualTrap = undefined;
var currentVisualTrapChoicesShown = undefined;
var currentVisualTrapStartTime = undefined;
var visualTrapOrder = [];
var visualTrapTrials = [];

function shuffleArrayCopy(arr) {
  const copy = arr.slice();
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = copy[i];
    copy[i] = copy[j];
    copy[j] = tmp;
  }
  return copy;
}

function renderVisualTrapOptions(trap) {
  const container = document.getElementById("trapOptions");
  if (!container) return;

  const requiredAttr = Required_Testing ? " required" : "";
  let html = "";

  trap.choices.forEach((choice, idx) => {
    const req = idx === 0 ? requiredAttr : "";
    html += `
      <label class="trap-option">
        <input type="radio" name="visualTrapResponse" value="${choice.value}"${req}>
        <span class="trap-option-card">${choice.label}</span>
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
      const trapOriginal =
        arrayVisualTraps[index_visualTraps[counterVisualTraps]];
      const trap = Object.assign({}, trapOriginal);
      trap.choices = shuffleArrayCopy(trapOriginal.choices);

      currentVisualTrap = trap;
      currentVisualTrapChoicesShown = trap.choices;
      currentVisualTrapStartTime = Date.now();

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
      const rtMs =
        typeof currentVisualTrapStartTime === "number"
          ? Math.max(0, Date.now() - currentVisualTrapStartTime)
          : null;

      let selectedLabel = null;
      if (selected !== undefined && currentVisualTrapChoicesShown) {
        const hit = currentVisualTrapChoicesShown.find(
          (c) => String(c.value) === String(selected),
        );
        selectedLabel = hit ? hit.label : null;
      }

      const correct =
        selected !== undefined && selected === currentVisualTrap.correctValue;
      // console.log(`Visual Trap Response: trapId=${currentVisualTrap.trapId}, selected=${selected}, selectedLabel=${selectedLabel}, correct=${correct}, rtMs=${rtMs}`);

      // Store per-trap values (stable keys)
      study.options.datastore.set(
        "visualTrap_" + currentVisualTrap.trapId + "_response",
        selected || null,
      );
      study.options.datastore.set(
        "visualTrap_" + currentVisualTrap.trapId + "_responseLabel",
        selectedLabel,
      );
      study.options.datastore.set(
        "visualTrap_" + currentVisualTrap.trapId + "_correct",
        correct,
      );
      study.options.datastore.set(
        "visualTrap_" + currentVisualTrap.trapId + "_rtMs",
        rtMs,
      );
      study.options.datastore.set(
        "visualTrap_" + currentVisualTrap.trapId + "_optionOrder",
        (currentVisualTrapChoicesShown || []).map((c) => ({
          value: c.value,
          label: c.label,
        })),
      );

      // Store overall ordering + trial list
      /*
      visualTrapTrials.push({
        trapId: currentVisualTrap.trapId,
        response: selected || null,
        responseLabel: selectedLabel,
        correct: correct,
        rtMs: rtMs,
        optionOrder: (currentVisualTrapChoicesShown || []).map((c) => ({
          value: c.value,
          label: c.label,
        })),
        timestamp: new Date().toISOString(),
      });
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
             */
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
