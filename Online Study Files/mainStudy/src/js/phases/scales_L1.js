/*
################### Main-study scales (revised, lab.html.Form) ###################
*/

function updateProgress() {
  numElementsCounter++;
  document.querySelector(".progress-bar").style.width =
    (numElementsCounter / numElements) * 100 + "%";
}

function submitToJatosIfAvailable() {
  if (!localTesting && typeof jatos !== "undefined" && typeof jatos.jQuery === "function") {
    const resultJson = study.options.datastore.exportJson();
    jatos.submitResultData(resultJson).catch(() => console.log("error"));
  }
}

// Fisher–Yates shuffle for randomizing item order per vignette
function shuffleArray(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const likertAnchors = [
  "Strongly disagree",
  "Disagree",
  "Somewhat disagree",
  "Neutral",
  "Somewhat agree",
  "Agree",
  "Strongly agree",
];

// --- Attribute items (5 retained + 1 added from former attitudinal block) ---
// Based on pretest η² values: kept Utopian, Desirable, Ideal, Innovative
// (strongest differentiators) plus Beneficial-for-greater-good (Lizzio-Wilson
// beneficence dimension). Dropped: Creative, Imaginative (redundant with
// Innovative), Possible (η² = 0.01, no differentiation).
// Added: att_live_in (personal-fit evaluation, retained from prior attitudinal set).
const attributeItems = [
  { label: "This society is utopian.", coding: "att_utopian" },
  { label: "This society is desirable.", coding: "att_desirable" },
  { label: "This society is ideal.", coding: "att_ideal" },
  { label: "This society is beneficial for the greater good.", coding: "att_beneficial" },
  { label: "This society is innovative.", coding: "att_innovative" },
  { label: "I would want to live in a society like the one just described.", coding: "att_live_in" },
];

const participativeEfficacyItems = [
  {
    label: "Ordinary people like me can play a part in bringing about this kind of society.",
    coding: "pe1",
  },
  {
    label: "This kind of society can be realized through the actions of ordinary individuals like me.",
    coding: "pe2",
  },
  { label: "Ordinary people can help realize this version of society.", coding: "pe3" },
  { label: "Ordinary people are needed to realize this version of society.", coding: "pe4" },
];

// --- Helper: build a Likert table block as HTML string ---
// Renders one Likert grid (rows = items, columns = anchors) inside the
// existing #page-form, so lab.js still collects responses on submit.
function buildLikertBlock(blockName, blockLabel, items, anchors) {
  const shuffled = shuffleArray(items);
 let html = `
    <div class="page-item page-item-likert locked-block" style="margin: 24px auto; width: 70%; padding: 16px; border: 1px solid #ccc; border-radius: 6px; background: #f0f0f0; transition: background-color 0.8s ease;">
      <div class="page-item-question" style="margin-bottom: 12px; font-weight: 600; text-align: left;">
        ${blockLabel}
      </div>
      <table class="likert-table" style="width:100%; border-collapse: collapse;">
        <thead>
          <tr>
            <th></th>
            ${anchors
              .map(
                (a) =>
                  `<th style="font-size: 0.85em; padding: 4px; text-align:center;">${a}</th>`,
              )
              .join("")}
          </tr>
        </thead>
        <tbody>
  `;
  shuffled.forEach((item) => {
    html += `<tr>
      <td style="padding: 8px; text-align: left;">${item.label}</td>`;
    anchors.forEach((_, idx) => {
      const value = idx + 1;
      html += `<td style="text-align: center; padding: 6px;">
        <input type="radio" name="${item.coding}" value="${value}" required>
      </td>`;
    });
    html += `</tr>`;
  });
  html += `
        </tbody>
      </table>
    </div>
  `;
  return html;
}

// --- Combined component HTML template ---
// Scenario at top, then the two Likert blocks injected inside #page-form.


function buildCombinedScenarioHTML() {
  const peBlock = buildLikertBlock(
    "participative_efficacy",
    "To what extent do you agree with the statement that ordinary citizens can actively contribute to making this society a reality?",
    participativeEfficacyItems,
    likertAnchors,
  );

  const attrBlock = buildLikertBlock(
    "attribute_ratings",
    "To what extent would you personally find each of the following characteristics true about this society?",
    attributeItems,
    likertAnchors,
  );

  return `
    <header>
      <h2>Please read the following text carefully and answer the questions below.</h2>
    </header>

    <main class="content-horizontal-center content-vertical-center">
      <div class="w-xxl text-justify">
        <div class="page-item page-item-likert"
             style="padding: 16px;
                    border: 1px solid #ccc; border-radius: 6px;
                    background: #fafafa; margin-bottom: 24px;">
          <div class="concept">
            <h2 id="vignette_title">XX</h2>
            <p id="vignette_first">XX1</p>
            <p id="vignette_second">XX2</p>
            <p id="vignette_third">XX3</p>
          </div>
        </div>
      </div>
    </main>

    <div id="read-notice" style="text-align:right; font-size:18px;
         margin: 8px 5% 16px 5%; color:#666;">
      Please read the text carefully. The questions below will become available after 15 seconds.
    </div>

    <form id="page-form">
      ${attrBlock}
      ${peBlock}
    </form>

    <footer class="content-vertical-center content-horizontal-right">
      <div class="w-xl text-justify" style="font-size:26px;">
        Please continue after you have read the text and answered all questions.
      </div>
      &nbsp;
      <button id="continue" type="submit" form="page-form">
        Continue &rarr;
      </button>
    </footer>
  `;
}

var counter = 0;

const CombinedScenarioForm = new lab.html.Form({
  title: "Scenario + Evaluations",
  content: buildCombinedScenarioHTML(),
  messageHandlers: {
    run: () => {
      // --- 1. Determine which vignette to display ---
      if (
        URLparams_global !== undefined &&
        URLparams_global.futureSocietyCondition !== undefined
      ) {
        futureSocietyCondition = URLparams_global.futureSocietyCondition;
      } else {
        futureSocietyCondition =
          arrayFutureSocieties[index_futureSocieties[counter]].Vignette;
      }
      const currentSociety = different_futureSocieties[futureSocietyCondition];
      codingFutureSociety = currentSociety.Vignette;

      // --- 2. Inject vignette text ---
      var trialNumber = counter + 1;
      $("#vignette_title").html(`${genericHeader} (${trialNumber} of ${totalVignettes})`);
      $("#vignette_first").html(currentSociety.Vignette_text1);
      $("#vignette_second").html(currentSociety.Vignette_text2);
      $("#vignette_third").html(currentSociety.Vignette_text3);

      window.currentTrialNumber = trialNumber;
      counter++;

   // --- 3. Hide Continue button + disable inputs for 15 seconds ---
const submitBtn = document.querySelector("#continue");
if (submitBtn) submitBtn.style.visibility = "hidden";

const inputs = document.querySelectorAll("#page-form input");
inputs.forEach((el) => (el.disabled = true));

const lockedBlocks = document.querySelectorAll(".locked-block");

setTimeout(() => {
  if (submitBtn) submitBtn.style.visibility = "visible";
  inputs.forEach((el) => (el.disabled = false));
  lockedBlocks.forEach((el) => el.classList.add("unlocked"));
  const notice = document.getElementById("read-notice");
  if (notice) notice.style.display = "none";
}, 15000);

      // --- 4. Click-tracking for the question blocks ---
      paracountclicks = 0;
      document.querySelectorAll("#page-form input").forEach((item) => {
        item.addEventListener("click", () => {
          paracountclicks++;
        });
      });
    },
    end: () => {
      const numberItems = document.querySelectorAll("#page-form tbody tr").length;
      study.options.datastore.set("para_countclicks", paracountclicks - numberItems);
    },
    commit: () => {
      study.options.datastore.set("condition_FutureSociety", codingFutureSociety);
      study.options.datastore.set("vignette_order_position", window.currentTrialNumber);
      study.options.datastore.set("vignette_id", codingFutureSociety);
      updateProgress();
      submitToJatosIfAvailable();
    },
  },
});

const SequenceLoop_Scenarios = new lab.flow.Sequence({
  title: "Sequence Loop Scenarios",
  shuffle: false,
  content: [CombinedScenarioForm],
});

const loop_Scenarios = new lab.flow.Loop({
  template: SequenceLoop_Scenarios,
  templateParameters: [{ notNeeded: "" }],
  sample: {
    mode: "draw-shuffle",
    n: totalVignettes,
  },
  indexParameter: "counterScenarios",
});
