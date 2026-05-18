/* global variables */
const numElements = 62;
var numElementsCounter = 0;
var URLparams_global;
var paracountclicks = 0;
var futureSocietyCondition;
var codingFutureSociety;

function shuffle(arrayLike) {
  const index = [];
  for (let i = 0; i < arrayLike.length; i++) {
    index.push(i);
  }
  for (let i = index.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = index[i];
    index[i] = index[j];
    index[j] = tmp;
  }
  return index;
}

var index_futureSocieties = shuffle(arrayFutureSocieties);
var index_visualTraps = shuffle(arrayVisualTraps);

const study = new lab.flow.Sequence({
  metadata: {
    title:
      "Main Study: Visions of Progress: A Within-Subject Experimental Analysis of Utopian Prototypes, Profiles, and Systemic Attitudes",
    description: "Main study with 7 randomized utopian vignettes and L2 measures.",
    repository:
      "https://github.com/FennStatistics/Article_ExperimentalUtopianPrototypes",
    contributors: "study programmed by Julius Fenn",
  },
  plugins: [
    new lab.plugins.Metadata(),
    // new lab.plugins.Fullscreen(),
    new lab.plugins.Debug(), // comment out finally !!!
    // new lab.plugins.Download()
  ],
  content: [
    TransitionToL2Scales_htmlForm,

        
    Greetings_htmlForm,
    InformCon_htmlForm,
    InformConsentNO_htmlForm,
    ExclusionCriteria_htmlForm,
    SetupStudy_htmlForm,
    TestAudio_htmlForm,
    TransitionToVisualTraps_htmlForm,
    // visual traps
    loop_VisualTraps,
    // within part L1
    TransitionToScenario_htmlForm,
    loop_Scenarios,
    // evaluate utopias
    RankingWithAudio_htmlForm,
    MissingUtopiaAudio_htmlForm,
    // dispositional scales L2
    TransitionToL2Scales_htmlForm,
    Sequence_Scales,
    // socio demographic-questions
    SocioDemo_htmlForm,
    // ending screen
    FeedbackScreen_htmlScreen,
    EndingScreen_htmlScreen,
  ],
});

// Start the study
if (
  !localTesting &&
  typeof jatos !== "undefined" &&
  typeof jatos.jQuery === "function"
) {
  jatos.onLoad(() => study.run());
} else {
  study.run();
}
