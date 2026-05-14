/*
################### Main-study scales ###################
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

const likertAnchors = [
  "Strongly disagree",
  "Disagree",
  "Somewhat disagree",
  "Neutral",
  "Somewhat agree",
  "Agree",
  "Strongly agree",
];

const attitudinalItems = [
  { label: "I would like to live in a society like this.", coding: "att_live_in" },
  {
    label: "I can imagine having a satisfying life in this society.",
    coding: "att_satisfying_life",
  },
  {
    label: "I would support societal changes toward this kind of future.",
    coding: "att_support_change",
  },
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

const attributeItems = [
  { label: "This society is utopian.", coding: "att_utopian" },
  { label: "This society is desirable.", coding: "att_desirable" },
  { label: "This society is ideal.", coding: "att_ideal" },
  { label: "This society is beneficial for the greater good.", coding: "att_beneficial" },
  { label: "This society is imaginative.", coding: "att_imaginative" },
  { label: "This society is innovative.", coding: "att_innovative" },
  { label: "This society is creative.", coding: "att_creative" },
  { label: "This society is possible.", coding: "att_possible" },
];

const Attitudinal_htmlPage = new lab.html.Page({
  title: "L1 Attitudinal Items",
  items: [
    {
      required: Required_Testing,
      type: "likert",
      items: attitudinalItems,
      width: "7",
      anchors: likertAnchors,
      label: "Please answer the following items about the society you just read.",
      name: "attitudinal_items",
    },
  ],
  submitButtonText: "Continue ->",
  submitButtonPosition: "right",
  width: "l",
  messageHandlers: {
    commit: () => {
      study.options.datastore.set("vignette_id_for_attitudes", codingFutureSociety);
      updateProgress();
    },
  },
});

const ParticipativeEfficacy_htmlPage = new lab.html.Page({
  title: "L1 Participative Efficacy",
  items: [
    {
      required: Required_Testing,
      type: "likert",
      items: participativeEfficacyItems,
      width: "7",
      anchors: likertAnchors,
      label: "Please answer the following items about the same society.",
      name: "participative_efficacy",
    },
  ],
  submitButtonText: "Continue ->",
  submitButtonPosition: "right",
  width: "l",
  messageHandlers: {
    commit: () => {
      study.options.datastore.set("vignette_id_for_pe", codingFutureSociety);
      updateProgress();
    },
  },
});

const AttributeRatings_htmlPage = new lab.html.Page({
  title: "L1 Attribute Ratings",
  items: [
    {
      required: Required_Testing,
      type: "likert",
      items: attributeItems,
      width: "7",
      anchors: likertAnchors,
      label: "Please rate the following statements about the same society.",
      name: "attribute_ratings",
    },
  ],
  submitButtonText: "Continue ->",
  submitButtonPosition: "right",
  width: "l",
  messageHandlers: {
    run: () => {
      paracountclicks = 0;
      document.querySelectorAll("input").forEach((item) => {
        item.addEventListener("click", () => {
          paracountclicks++;
        });
      });
    },
    end: () => {
      const numberItems = document.querySelectorAll("tbody tr").length;
      study.options.datastore.set("para_countclicks", paracountclicks - numberItems);
    },
    commit: () => {
      study.options.datastore.set("vignette_id_for_attributes", codingFutureSociety);
      updateProgress();
      submitToJatosIfAvailable();
    },
  },
});

const SequenceLoop_Scenarios = new lab.flow.Sequence({
  title: "Sequence Loop Scenarios",
  shuffle: false,
  content: [
    ScenarioText_htmlForm,
    Attitudinal_htmlPage,
    ParticipativeEfficacy_htmlPage,
    AttributeRatings_htmlPage,
  ],
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
