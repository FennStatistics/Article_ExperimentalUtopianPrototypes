/* 
################### global variables ###################
*/

/* for testing study */
const Required_Testing = true; // set to false for production !!!

/* number of components / elements to set progress bar */
const numElements = 11;
var numElementsCounter = 0;

/* global variables */
var URLparams_global;
var paracountclicks = 0;

var framingCondition = "neutral"; // default

var orderSurveys_Ecological_First = true; // default
var orderSurveys_Bioinspiration_First = false; // default

var technologyConditon = "Self-Shading Facade" // Self-Shading Facade OR Soft Walker Robot 




/* 
################### Start of Study ###################
*/

const Greetings_htmlForm = new lab.html.Form({
  title: "Greetings",
  content: textObj.greetings,
  messageHandlers: {
    run: function anonymous() {
      if (typeof jatos.jQuery === "function") {
        if (
          study.state.meta.screen_height < 700 &&
          study.state.meta.screen_width < 1200
        ) {
          alert(
            "It seems that your screen size you are using is smaller than 1200x700 pixels (height x width):\n" +
            "> your screen width: " +
            study.state.meta.screen_width +
            " your screen height: " +
            study.state.meta.screen_height +
            "\nStudy is aborted!"
          );
          jatos.abortStudy("study aborted - screen to small");
        }
      }
    },
    commit: () => {
      // progress bar
      numElementsCounter++;
      document.querySelector(".progress-bar").style.width =
        (numElementsCounter / numElements) * 100 + "%";

      // get URL params
      if (typeof jatos.jQuery === "function") {
        URLparams_global = jatos.urlQueryParameters;
        console.log("URLparams_global:", URLparams_global);

        // check if a prolific ID is provided via URL parameter PROLIFIC study
        if (typeof URLparams_global.PROLIFIC_PID === "undefined") {
          alert(
            "Sorry, there may be a technical error! It was not possible to obtain all the necessary data from prolific. Please write to the study director that an error has occurred."
          );
          jatos.abortStudy("study aborted - no prolific ID");
        } else {
          study.options.datastore.set(
            "PROLIFIC_PID",
            URLparams_global.PROLIFIC_PID
          );


          if (typeof URLparams_global.framingCondition != "undefined") {
            // overwrite global variable:
            framingCondition = URLparams_global.framingCondition;
            // store framing condition
            study.options.datastore.set(
              "framingCondition",
              URLparams_global.framingCondition
            );

            // update skip condition
            if (framingCondition == "neutral") {
              const ecologicalFirst = Math.random() < 0.5;
              orderSurveys_Ecological_First = ecologicalFirst;
              orderSurveys_Bioinspiration_First = !ecologicalFirst;
            } else if (framingCondition == "bioinspired") {
              orderSurveys_Ecological_First = false;
              orderSurveys_Bioinspiration_First = true;
            } else if (framingCondition == "sustainable") {
              orderSurveys_Ecological_First = true;
              orderSurveys_Bioinspiration_First = false;
            }
          }
        }
      }
    },
  },
});

const InformCon_htmlForm = new lab.html.Form({
  title: "InformedConsent",
  content: textObj.informCon,
  messageHandlers: {
    commit: function anonymous() {
      // progress bar
      numElementsCounter++;
      document.querySelector(".progress-bar").style.width =
        (numElementsCounter / numElements) * 100 + "%";

      if (typeof jatos.jQuery === "function") {
        // If JATOS is available, send data there
        var resultJson = study.options.datastore.exportJson();
        console.log("result data sent to JATOS first time");
        jatos
          .submitResultData(resultJson)
          .then(() => console.log("success"))
          .catch(() => console.log("error"));
      }
    },
  },
});

const InformConsentNO_htmlForm = new lab.html.Form({
  title: "InformedConsentNO",
  content: textObj.informConNo,
  tardy: true,
  skip: "${ study.state.dummy_informedconsent == 1}",
  messageHandlers: {
    run: function anonymous() {
      // progress bar 100%
      document.querySelector(".progress-bar").style.width = 100 + "%";
    },
  },
});

const ExclusionCriteria_htmlForm = new lab.html.Form({
  title: "ExclusionCriteria",
  content: textObj.exclusionCriteria,
  messageHandlers: {
    run: function anonymous() { },
    commit: () => {
      // progress bar
      numElementsCounter++;
      document.querySelector(".progress-bar").style.width =
        (numElementsCounter / numElements) * 100 + "%";
    },
  },
});

// not needed: Attention Check
function continueornot() {
  if ($("fieldset :checkbox:checked").length > 0) {
    // ok
    return true;
  } else {
    alert("Please check at least one of these activities.");
    return false;
  }
}

const AttentionCheck_htmlForm = new lab.html.Form({
  title: "AttentionCheck",
  content: textObj.attentionCheck,
  messageHandlers: {
    run: function anonymous() { },
    commit: () => {
      var attCheck_array = [];
      $("fieldset :checkbox").each(function () {
        if (this.checked) {
          attCheck_array.push(this.id);
        }
      });
      attCheck_array;

      study.options.datastore.set("attCheck_array", attCheck_array);
      study.options.datastore.set(
        "attCheck_text",
        $("#attCheck_OtherText").val()
      );

      // progress bar
      numElementsCounter++;
      document.querySelector(".progress-bar").style.width =
        (numElementsCounter / numElements) * 100 + "%";
    },
  },
});

const SetupStudy_htmlForm = new lab.html.Form({
  title: "SetupStudy",
  content: textObj.setupStudy,
  messageHandlers: {
    commit: () => {
      // progress bar
      numElementsCounter++;
      document.querySelector(".progress-bar").style.width =
        (numElementsCounter / numElements) * 100 + "%";

      if (typeof jatos.jQuery === "function") {
        // If JATOS is available, send data there
        var resultJson = study.options.datastore.exportJson();
        console.log("result data sent to JATOS second time");
        jatos
          .submitResultData(resultJson)
          .then(() => console.log("success"))
          .catch(() => console.log("error"));
      }
    },
  },
});



/* 
################### Association Task: Mini Snowball word association task ###################
*/
// Transition from APT to AIT
const TransitionToAIT_htmlForm = new lab.html.Form({
  title: "TransitionToWAG",
  content: textObj.TransitionToAIT,
  messageHandlers: {
    commit: () => {
      // progress bar
      numElementsCounter++;
      document.querySelector(".progress-bar").style.width =
        (numElementsCounter / numElements) * 100 + "%";

      if (typeof jatos.jQuery === "function") {
        // If JATOS is available, send data there
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


// task
let global_counterInner = 0;
let global_counterOuter = 0;
// loop inner
const text = new lab.html.Screen({
  title: "random text",
  content: `
  <span id="replaceText">XXX</span> 
  `,
  timeout: 200,
  messageHandlers: {
    run: () => {
      $("#replaceText").html(global_counterOuter + "aa" + global_counterInner);
      global_counterInner++;
    },
  },
});



const updateParams_inner_before = new lab.html.Screen({
  title: "updateParams inner before AT",
  content: `
  `,
  timeout: 100,
  messageHandlers: {
    run: () => {
      AT_Snowball_Boolean = true; // set boolean to true
    },
  },
});

const updateParams_inner_after = new lab.html.Screen({
  title: "updateParams after before AT",
  content: `
  `,
  timeout: 100,
  messageHandlers: {
    run: () => {
      global_counterInner++;

      AT_Snowball_Boolean = false; // set boolean to true
    },
  },
});

const SequenceTestInner = new lab.flow.Sequence({
  title: "Sequence Test Inner",
  shuffle: false,
  content: [
    updateParams_inner_before,
    AffectiveImagery_htmlForm,
    updateParams_inner_after,
  ],
});

const loopInner = new lab.flow.Loop({
  template: SequenceTestInner,
  templateParameters: [
    {
      not_needed: "",
    },
  ],
  sample: {
    mode: "draw-shuffle",
    n: "5",
  },
});

// loop outer
const updateParams_outer = new lab.html.Screen({
  title: "updateParams outer loop",
  content: `
  `,
  timeout: 100,
  messageHandlers: {
    run: () => {
      // store associations arrays in datastore
      study.options.datastore.set(
        "unsucsessfulAssociations",
        unsucsessfulAssociations
      );
      study.options.datastore.set(
        "sucsessfulAssociations",
        sucsessfulAssociations
      );


      global_counterOuter++;
      global_counterInner = 0; // reset inner counter

      // reset associations arrays
      sucsessfulAssociations = [];
      unsucsessfulAssociations = [];
    },
  },
});


let instructionsResetDone_AT_Snowball = false; // <-- flag to track if reset has happened

const updateText_Inst_AT_Snowball = new lab.html.Screen({
  title: "Update Text AT Snowball Instructions",
  content: `
  `,
  timeout: 50,
  messageHandlers: {
    run: () => {
      currenText = textObj.AT_Snowball_Inst;

      if (!instructionsResetDone_AT_Snowball) {
        boolSkipAffectImgInstruction = false;

        instructionsResetDone_AT_Snowball = true; // mark as done
      } else {
        boolSkipAffectImgInstruction = true; // skip instruction page after first run
      }
    },
  },
});


const updateText_Task_AT_Snowball = new lab.html.Screen({
  title: "Update Text AT Snowball Task",
  content: `
  `,
  timeout: 50,
  messageHandlers: {
    run: () => {
      currenText = textObj.AT_Snowball_Task;
    },
  },
});


const SequenceTestOuter = new lab.flow.Sequence({
  title: "Sequence Test Outer",
  shuffle: false,
  content: [
    updateText_Inst_AT_Snowball,
    AIT_AT_Inst_htmlForm,
    updateText_Task_AT_Snowball,
    AffectiveImagery_htmlForm,
    loopInner,
    updateParams_outer
  ],
});



const loopOuter = new lab.flow.Loop({
  template: SequenceTestOuter,
  templateParameters: [
    {
      cue: "Person with <strong>overweight</strong>",
      cue_coding: "overweight",
    },
  ],
  sample: {
    mode: "draw-shuffle",
    n: "1",
  },
});




/* 
################### Scenario Text ###################
*/
const framings_SRW = {
  neutral: {
    Vignette: "neutral",
    Vignette_header: "Self-Shading Facade",
    Vignette_text1: "The Self-Shading Facade is a recent development in innovative materials for architecture. Its surface is made up of hundreds of small, curved modules suspended across window frames.",
    Vignette_text2: "These modules are made of layered materials that bend in response to changing humidity. As humidity rises or falls, the facade’s individual elements autonomously curl or flatten, adjusting how much light and heat pass through. The movement is driven by the structure of the materials themselves, without the need for motors or electronics.",
    Vignette_text3: "This technology contributes to innovative architecture materials and building energy regulation. It is a <b>functional system designed using recent advances in materials science</b>.",
  },
  bioinspired: {
    Vignette: "bioinspired",
    Vignette_header: "Self-Shading Facade",
    Vignette_text1: "The Self-Shading Facade is a recent development in innovative materials for architecture. Its surface is made up of hundreds of small, curved modules suspended across window frames.",
    Vignette_text2: "These modules are made of layered materials that bend in response to changing humidity. The design draws inspiration from natural plant structures, particularly pine cones, which open and close in response to humidity. The layers are inspired by how cellulose fibers are arranged in these plants to guide the direction of bending.",
    Vignette_text3: "This technology brings ideas from the natural world into architectural innovation. Its <b>function and movement are grounded in biomimetic design</b>."
  },
  sustainable: {
    Vignette: "sustainable",
    Vignette_header: "Self-Shading Facade",
    Vignette_text1: "The Self-Shading Facade is a recent development in innovative materials for architecture. Its  surface is made up of hundreds of small, curved modules suspended across window frames.",
    Vignette_text2: "These modules are made of layered materials that react to humidity changes without needing external energy. Their composition helps reduce reliance on synthetic or carbon-intensive materials. Because the facade adjusts shading based on weather, it offers a way to reduce energy use  in buildings.",
    Vignette_text3: "This technology supports climate-friendly architectural innovation and resource efficiency. Its <b>passive, energy-autonomous operation reflects sustainable design principles</b>."
  }
}



// Transition from AIT to survey scales
const ScenarioText_htmlForm = new lab.html.Form({
  title: "Scenario Text",
  content: textObj.ScenarioText,
  messageHandlers: {
    run: () => {
      // overwrite text:
      const currentFraming = framings_SRW[framingCondition];

      $("#vignette_title").html(currentFraming.Vignette_header);
      $("#vignette_first").html(currentFraming.Vignette_text1);
      $("#vignette_second").html(currentFraming.Vignette_text2);
      $("#vignette_third").html(currentFraming.Vignette_text3);

      // hide submit button
      document.querySelector("button").style.visibility = "hidden";
      setTimeout(
        () => (document.querySelector("button").style.visibility = "visible"),
        15000 // 15000 (15 seconds)
      );
    },
    commit: () => {
      // progress bar
      numElementsCounter++;
      document.querySelector(".progress-bar").style.width =
        (numElementsCounter / numElements) * 100 + "%";

      if (typeof jatos.jQuery === "function") {
        // If JATOS is available, send data there
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


/* 
################### Survey Scales ###################
*/

// >>> Perceived ecological dimension 
const EcologicalDimension_Scale_htmlForm = new lab.html.Page({
  title: "Ecological Dimension Scale",
  items: [
    {
      required: Required_Testing,
      type: "likert",
      items: items_Ecology,
      width: "7",
      anchors: [
        "I strongly disagree",
        "I moderately disagree",
        "I<br>slightly disagree",
        "neutral",
        "I slightly agree",
        "I moderately agree",
        "I strongly agree",
      ],
      label: "Answer the following statements and indicate to what extent you agree with them.",
      help: "Please answer each statement, even if you're not entirely sure what your answer should be.",
      shuffle: false,
      name: "EcologicalDimension",
    },
  ],
  submitButtonText: "Continue →",
  submitButtonPosition: "right",
  width: "l",
  messageHandlers: {
    run: function anonymous() {
      // overwrite technology placeholder
      $('[id="techname"]').each(function () {
        $(this).text(technologyConditon);
      });

      // add id to button
      $('button[type="submit"][form="page-form"]').attr('id', 'continue');

      // adjust size of scale
      document.querySelectorAll("div")[0].classList = ["text-left"];
      document.querySelectorAll("main")[1].classList = ["w-xxl"];
      document.querySelectorAll(".page-item-table colgroup")[0].innerHTML = `
     <col style=\"width: 43%\">
     <col style=\"width: 7%\">
     <col style=\"width: 7%\">
      <col style=\"width: 7%\">
      <col style=\"width: 7%\">
      <col style=\"width: 7%\">
      <col style=\"width: 7%\">
      <col style=\"width: 7%\">
     `;
      // sticky labels to front
      $("thead").first().css("z-index", "20");
      // collect paradata
      paracountclicks = 0;
      document.querySelectorAll("input").forEach((item) => {
        item.addEventListener("click", (event) => {
          paracountclicks++;
          console.log("input clicked", paracountclicks);
        });
      });
    },
    end: function anonymous() {
      // collect paradata: number of clicks
      let numberitems = document.querySelectorAll("tbody tr").length;
      paracountclicks -= numberitems;
      study.options.datastore.set("para_countclicks", paracountclicks);
    },
    commit: function anonymous() {
      // progress bar
      numElementsCounter++;
    },
  },
});


// >>> Perceived bioinspiration
const Bioinspiration_Scale_htmlForm = new lab.html.Page({
  title: "Bioinspiration Scale",
  items: [
    {
      required: Required_Testing,
      type: "likert",
      items: items_Bioinspiration,
      width: "5",
      anchors: [
        "Strongly disagree",
        "Disagree",
        "Neutral",
        "Agree",
        "Strongly agree",
      ],
      label: "Please read each statement carefully and indicate how much you agree with it.",
      help: "Please answer each statement, even if you're not entirely sure what your answer should be.",
      shuffle: false,
      name: "Bioinspiration",
    },
  ],
  submitButtonText: "Continue →",
  submitButtonPosition: "right",
  width: "l",
  messageHandlers: {
    run: function anonymous() {
      // overwrite technology placeholder
      $('[id="techname"]').each(function () {
        $(this).text(technologyConditon);
      });

      // add id to button
      $('button[type="submit"][form="page-form"]').attr('id', 'continue');

      // adjust size of scale
      document.querySelectorAll("div")[0].classList = ["text-left"];
      document.querySelectorAll("main")[1].classList = ["w-xl"];
      document.querySelectorAll(".page-item-table colgroup")[0].innerHTML = `
     <col style=\"width: 30%\">
     <col style=\"width: 7%\">
     <col style=\"width: 7%\">
      <col style=\"width: 7%\">
      <col style=\"width: 7%\">
      <col style=\"width: 7%\">
     `;
      // sticky labels to front
      $("thead").first().css("z-index", "20");
      // collect paradata
      paracountclicks = 0;
      document.querySelectorAll("input").forEach((item) => {
        item.addEventListener("click", (event) => {
          paracountclicks++;
          console.log("input clicked", paracountclicks);
        });
      });
    },
    end: function anonymous() {
      // collect paradata: number of clicks
      let numberitems = document.querySelectorAll("tbody tr").length;
      paracountclicks -= numberitems;
      study.options.datastore.set("para_countclicks", paracountclicks);
    },
    commit: function anonymous() {
      // progress bar
      numElementsCounter++;
    },
  },
});



const Sequence_Ecological_Bioinspiration = new lab.flow.Sequence({
  title: "Sequence Ecological Bioinspiration",
  tardy: true,
  skip: "${ !orderSurveys_Ecological_First }",
  shuffle: false,
  content: [
    EcologicalDimension_Scale_htmlForm,
    Bioinspiration_Scale_htmlForm,
  ],
});



const Sequence_Bioinspiration_Ecological = new lab.flow.Sequence({
  title: "Sequence Bioinspiration Ecological",
  tardy: true,
  skip: "${ !orderSurveys_Bioinspiration_First }",
  shuffle: false,
  content: [
    Bioinspiration_Scale_htmlForm,
    EcologicalDimension_Scale_htmlForm,
  ],
});




/* 
################### End of Study ###################
*/
// Transition from AIT to survey scales
const TransitionToFinal_htmlForm = new lab.html.Form({
  title: "TransitionToFinal",
  content: textObj.TransitionToFinal,
  messageHandlers: {
    commit: () => {
      // progress bar
      numElementsCounter++;
      document.querySelector(".progress-bar").style.width =
        (numElementsCounter / numElements) * 100 + "%";

      if (typeof jatos.jQuery === "function") {
        // If JATOS is available, send data there
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




// socio demographic questions
const SocioDemo_htmlScreen = new lab.html.Form({
  title: "socio demographic questions",
  content: textObj.socioDemo,
  messageHandlers: {
    run: () => {
      $("#techname").html(technologyConditon);


      $(document).ready(function () {
        // Extract country names from the dropdown
        let countries = [];
        $("#country option").each(function () {
          let countryName = $(this).text();
          if (countryName.trim() !== "country") {
            countries.push(countryName);
          }
        });

        // Initialize autocomplete
        $("#autocomplete-country").autocomplete({
          source: countries,
          select: function (event, ui) {
            // When an option is selected, set it in the dropdown
            let selectedCountry = ui.item.value;
            $("#country option")
              .filter(function () {
                return $(this).text() === selectedCountry;
              })
              .prop("selected", true);
          },
        });
      });
    },
    commit: () => {
      // progress bar
      numElementsCounter++;
      document.querySelector(".progress-bar").style.width =
        (numElementsCounter / numElements) * 100 + "%";
    },
  },
});



// feedback screen conscientious completion
const ConscientiousCompletion_htmlScreen = new lab.html.Form({
  title: "ConscientiousCompletion",
  content: textObj.ConscientiousCompletion,
  messageHandlers: {
    commit: () => {
      // progress bar
      numElementsCounter++;
      document.querySelector(".progress-bar").style.width =
        (numElementsCounter / numElements) * 100 + "%";
    },
  },
});


// feedback screen general
const FeedbackScreen_htmlScreen = new lab.html.Form({
  title: "FeedbackScreen",
  content: textObj.feedbackQues,
  messageHandlers: {
    commit: () => {
      // progress bar
      numElementsCounter++;
      document.querySelector(".progress-bar").style.width =
        (numElementsCounter / numElements) * 100 + "%";

      if (typeof jatos.jQuery === "function") {
        // If JATOS is available, send data there
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

// ending screen
const EndingScreen_htmlScreen = new lab.html.Screen({
  title: "EndingScreen",
  tardy: true,
  content: `
  <header>
  <h2> Thank you very much for your participation ! </h2>
  </header>

  <main class="content-horizontal-center content-vertical-center">
  <div class="w-xl text-justify">
  <br>
  <div>
  <i>The experiment will end in a few seconds and you will be automatically redirected back to Prolific.</i> 
  <br>
  <br>
  <br>
  If you have any questions, please contact the study director Julius Fenn (julius.fenn@psychologie.uni-freiburg.de).
  </div>
  </main>
  `,
  timeout: 9000, // 9 seconds
  messageHandlers: {
    run: function anonymous() {
      // progress bar
      numElementsCounter++;
      document.querySelector(".progress-bar").style.width =
        (numElementsCounter / numElements) * 100 + "%";

      // alert(numElementsCounter);
    },
    epilogue: function anonymous() {
      if (typeof jatos.jQuery === "function") {
        // If JATOS is available, send data there
        var resultJson = study.options.datastore.exportJson();
        console.log("my result data sent to JATOS final time");
        jatos
          .submitResultData(resultJson)
          .then(() => console.log("success"))
          .catch(() => console.log("error"));

        // then redirect
        if (
          study.options.datastore.extract("sender").includes("FeedbackScreen")
        ) {
          jatos.endStudyAndRedirect(
            "https://app.prolific.com/submissions/complete?cc=CP2ZDXDH", // !!!
            true,
            "everything worked fine"
          );
        } else {
          alert(
            "It seems that you did not go through the entire study because you did not see the previous feedback screen."
          );
          jatos.abortStudy("study aborted - copied submission link");
        }
      }
    },
  },
});



// Define the sequence of components that define the study
const study = new lab.flow.Sequence({
  metadata: {
    title:
      "Public Perceptions of Bio-Inspired Technologies and Their Relationship to Sustainability: A Mixed-Methods Investigation",
    description:
      "This online study examines the conceptual association between bio-inspired technologies and sustainability in the public imagination.",
    repository:
      "https://github.com/FennStatistics/livMatS_MasterLab_2025",
    contributors:
      "Stephanie Bugler, Julius Fenn, Michael Gorki, Roland Thomaschke, Andrea Kiesel; study programmed by Katja Pollak and Julius Fenn",
  },
  plugins: [
    new lab.plugins.Metadata(),
    // new lab.plugins.Fullscreen(),
    // new lab.plugins.Debug(), // comment out finally
    // new lab.plugins.Download()
  ],
  content: [
    // >>> introduction phase
    Greetings_htmlForm,

    InformCon_htmlForm,
    InformConsentNO_htmlForm,
    ExclusionCriteria_htmlForm,
    //AttentionCheck_htmlForm,
    SetupStudy_htmlForm,

    ScenarioText_htmlForm,

    // >>> survey scales
    // randomize order depending on framing
    // > if sustainability framing first sus
    // > if bioinspired framing first bioins
    // > if neutral framing randomize it
    Sequence_Ecological_Bioinspiration,
    Sequence_Bioinspiration_Ecological,


    // >>> Snowball task
    //TransitionToAIT_htmlForm,
    //loopOuter,


    // >>> ending phase post
    TransitionToFinal_htmlForm,

    SocioDemo_htmlScreen,

    // >>> ending phase final
    ConscientiousCompletion_htmlScreen,

    FeedbackScreen_htmlScreen,
    EndingScreen_htmlScreen,
  ],
});

// Start the study
if (typeof jatos.jQuery === "function") {
  jatos.onLoad(() => study.run());
} else {
  study.run();
}