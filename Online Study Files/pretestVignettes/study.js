/* 
################### global variables ###################
*/

/* for testing study */
// Required_Testing and localTesting are defined in src/js/globals.js

/* number of components / elements to set progress bar */
const numElements = 11;
var numElementsCounter = 0;

/* global variables */
var URLparams_global;
var paracountclicks = 0;

var futureSocietyCondition = "aicentered"; // default

var nameFutureSociety = "described future society"; // Self-Shading Facade OR Soft Walker Robot
var codingFutureSociety = futureSocietyCondition;

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
        ScenarioText_htmlForm,

    // >>> introduction phase
    Greetings_htmlForm,

    InformCon_htmlForm,
    InformConsentNO_htmlForm,
    ExclusionCriteria_htmlForm,
    //AttentionCheck_htmlForm,
    SetupStudy_htmlForm,

    ScenarioText_htmlForm,

    // >>> Snowball task
    TransitionToAIT_htmlForm,
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
