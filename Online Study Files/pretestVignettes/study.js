/* 
################### global variables ###################
*/

/* for testing study */
// Required_Testing and localTesting are defined in src/js/globals.js

/* number of components / elements to set progress bar */
// Note: this is used for the simple footer progress bar; update when adding/removing phases.
const numElements = 18;
var numElementsCounter = 0;

/* global variables */
var URLparams_global;
var paracountclicks = 0;


// future society:
function shuffle(queslist) {
  let array_emp = []
  for (var i = 0; i < queslist.length; i++) {
    array_emp.push(i)
  }

  let j, x;
  for (i = array_emp.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = array_emp[i];
    array_emp[i] = array_emp[j];
    array_emp[j] = x;
  }
  return array_emp;
}

var index_futureSocieties = shuffle(arrayFutureSocieties);
console.log("futureSocieties index: ", index_futureSocieties);
console.log("futureSocieties: ", arrayFutureSocieties);

// visual traps (cognitive traps)
var index_visualTraps = shuffle(arrayVisualTraps);
console.log("visualTraps index: ", index_visualTraps);
console.log("visualTraps: ", arrayVisualTraps);

// var futureSocietyCondition = arrayFutureSocieties[index_futureSocieties[0]].Vignette; // randomize which future society is shown first
// var futureSocietyCondition = "aicentered"; // default
var futureSocietyCondition; // to be set in ScenarioText_htmlForm message handler

var nameFutureSociety = "described future society"; // Self-Shading Facade OR Soft Walker Robot
var codingFutureSociety; // to be set in ScenarioText_htmlForm message handler
/* 
################### Start of Study ###################
*/

// Define the sequence of components that define the study
const study = new lab.flow.Sequence({
  metadata: {
    title:
      "Public Perceptions of Bio-Inspired Technologies and Their Relationship to Sustainability: A Mixed-Methods Investigation",
    description:
      "This online study examines the conceptual association between bio-inspired technologies and sustainability in the public imagination.",
    repository: "https://github.com/FennStatistics/livMatS_MasterLab_2025",
    contributors: "study programmed by Julius Fenn",
  },
  plugins: [
    new lab.plugins.Metadata(),
    // new lab.plugins.Fullscreen(),
    new lab.plugins.Debug(), // comment out finally
    // new lab.plugins.Download(),
  ],
  content: [   
    // >>> introduction phase
    Greetings_htmlForm,

    InformCon_htmlForm,
    InformConsentNO_htmlForm,
    ExclusionCriteria_htmlForm,
    //AttentionCheck_htmlForm,
    SetupStudy_htmlForm,

    loop_VisualTraps,

    TransitionToScenario_htmlForm,

    ScenarioText_htmlForm,
    // loop_Scenarios,

    // >>> Snowball task
    // TransitionToAIT_htmlForm,
    loopOuter,

    // >>> survey scales
    understandingText_htmlForm,
    quesClearBiasUtopia_htmlForm,
    quesAttributesFutureSociety_htmlForm,
    quesPrototypeAssign_htmlForm,

    // >>> ending phase post
    // TransitionToFinal_htmlForm,

    // SocioDemo_htmlScreen,

    // >>> ending phase final
    // ConscientiousCompletion_htmlScreen,

    FeedbackScreen_htmlScreen,
    EndingScreen_htmlScreen,
  ],
});

// Start the study
if (!localTesting && typeof jatos !== "undefined" && typeof jatos.jQuery === "function") {
  jatos.onLoad(() => study.run());
} else {
  study.run();
}
