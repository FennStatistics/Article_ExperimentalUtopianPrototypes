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

var futureSocietyCondition = "neutral"; // default

var nameFutureSociety = "described future society"; // Self-Shading Facade OR Soft Walker Robot
var codingFutureSociety = futureSocietyCondition;

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

          if (typeof URLparams_global.futureSocietyCondition != "undefined") {
            // overwrite global variable:
            futureSocietyCondition = URLparams_global.futureSocietyCondition;
            // store futureSocietyCondition condition
            study.options.datastore.set(
              "futureSocietyCondition",
              URLparams_global.futureSocietyCondition
            );
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
    run: function anonymous() {},
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
    run: function anonymous() {},
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
################### Scenario Text ###################
*/
const different_futureSocieties = {
  neutral: {
    Vignette: "neutral",
    Vignette_header: "Self-Shading Facade",
    Vignette_text1:
      "The Self-Shading Facade is a recent development in innovative materials for architecture. Its surface is made up of hundreds of small, curved modules suspended across window frames.",
    Vignette_text2:
      "These modules are made of layered materials that bend in response to changing humidity. As humidity rises or falls, the facade’s individual elements autonomously curl or flatten, adjusting how much light and heat pass through. The movement is driven by the structure of the materials themselves, without the need for motors or electronics.",
    Vignette_text3:
      "This technology contributes to innovative architecture materials and building energy regulation. It is a <b>functional system designed using recent advances in materials science</b>.",
  },
  bioinspired: {
    Vignette: "bioinspired",
    Vignette_header: "Self-Shading Facade",
    Vignette_text1:
      "The Self-Shading Facade is a recent development in innovative materials for architecture. Its surface is made up of hundreds of small, curved modules suspended across window frames.",
    Vignette_text2:
      "These modules are made of layered materials that bend in response to changing humidity. The design draws inspiration from natural plant structures, particularly pine cones, which open and close in response to humidity. The layers are inspired by how cellulose fibers are arranged in these plants to guide the direction of bending.",
    Vignette_text3:
      "This technology brings ideas from the natural world into architectural innovation. Its <b>function and movement are grounded in biomimetic design</b>.",
  },
  sustainable: {
    Vignette: "sustainable",
    Vignette_header: "Self-Shading Facade",
    Vignette_text1:
      "The Self-Shading Facade is a recent development in innovative materials for architecture. Its  surface is made up of hundreds of small, curved modules suspended across window frames.",
    Vignette_text2:
      "These modules are made of layered materials that react to humidity changes without needing external energy. Their composition helps reduce reliance on synthetic or carbon-intensive materials. Because the facade adjusts shading based on weather, it offers a way to reduce energy use  in buildings.",
    Vignette_text3:
      "This technology supports climate-friendly architectural innovation and resource efficiency. Its <b>passive, energy-autonomous operation reflects sustainable design principles</b>.",
  },
};

// Transition from AIT to survey scales
const ScenarioText_htmlForm = new lab.html.Form({
  title: "Scenario Text",
  content: textObj.ScenarioText,
  messageHandlers: {
    run: () => {
      // overwrite text:
      const currentSociety = different_futureSocieties[futureSocietyCondition];

      $("#vignette_title").html(currentSociety.Vignette_header);
      $("#vignette_first").html(currentSociety.Vignette_text1);
      $("#vignette_second").html(currentSociety.Vignette_text2);
      $("#vignette_third").html(currentSociety.Vignette_text3);

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

      // do not show affective imagery rating after first round
      boolSkipAffectImgRating = true;
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
    n: "1",
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

// !!!
const beforeSecondOrderAssociations_htmlForm = new lab.html.Form({
  title: "before second order associations",
  content: textObj.beforeSecondOrderAssociations,
  skip: "${ hasShownBeforeSecondOrderAssociations }",
  messageHandlers: {
    run: function anonymous() {
      if (studyCondition_global == "PersonnelSelection") {
        $("#scenarioText").html(
          "Ein Mensch beaufsichtigt KI, die Personalauswahl durchführt."
        );
      } else {
        $("#scenarioText").html(
          "Ein Mensch beaufsichtigt KI, die medizinische Diagnostik durchführt."
        );
      }
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
    AffectiveImageryAffect_htmlForm,
    // beforeSecondOrderAssociations_htmlForm,
    // loopInner,
    updateParams_outer,
  ],
});

const loopOuter = new lab.flow.Loop({
  template: SequenceTestOuter,
  templateParameters: [
    {
      not_needed2: "",
    },
  ],
  sample: {
    mode: "draw-shuffle",
    n: "1",
  },
});

/* 
################### Survey Scales ###################
*/

const understandingText_htmlForm = new lab.html.Form({
  title: "understandingText",
  content: textObj.understandingText,
  messageHandlers: {
    commit: function anonymous() {
      // progress bar
      numElementsCounter++;
      document.querySelector(".progress-bar").style.width =
        (numElementsCounter / numElements) * 100 + "%";

      if (typeof jatos.jQuery === "function") {
        // If JATOS is available, send data there
        var resultJson = study.options.datastore.exportJson();
        jatos
          .submitResultData(resultJson)
          .then(() => console.log("success"))
          .catch(() => console.log("error"));
      }
    },
  },
});

const quesClearBiasUtopia_htmlForm = new lab.html.Form({
  title: "quesClearBiasUtopia",
  content: textObj.postClearBias, // or rename if you create a new text object
  messageHandlers: {
    run: function anonymous() {
      $("#hideClearUtopiatext").hide();
      $("#hideBiasUtopiatext").hide();

      $("#clearUtopia").on("input", () => {
        var tmpValue = $("#clearUtopia option:selected")[0].value;

        if (tmpValue <= 2) {
          $("#hideClearUtopiatext").show();
        } else {
          $("#hideClearUtopiatext").hide();
        }
      });

      $("#biasUtopia").on("input", () => {
        var tmpValue2 = $("#biasUtopia option:selected")[0].value;

        if (tmpValue2 != 2) {
          $("#hideBiasUtopiatext").show();
        } else {
          $("#hideBiasUtopiatext").hide();
        }
      });
    },

    commit: function anonymous() {
      // progress bar
      numElementsCounter++;
      document.querySelector(".progress-bar").style.width =
        (numElementsCounter / numElements) * 100 + "%";

      if (typeof jatos.jQuery === "function") {
        // If JATOS is available, send data there
        var resultJson = study.options.datastore.exportJson();
        jatos
          .submitResultData(resultJson)
          .then(() => console.log("success"))
          .catch(() => console.log("error"));
      }
    },
  },
});

// lab.js component for Utopian Prototype assignment task
const quesPrototypeAssign_htmlForm = new lab.html.Form({
  title: "quesPrototypeAssign",
  content: textObj.assignmentTask, // <-- set this to the HTML string above
  messageHandlers: {
    run: function () {
      $(document).off(".protoAssign");
      $("#protoAssignForm").off(".protoAssign");

      // jQuery UI styling (optional)
      if ($.fn.checkboxradio) {
        $("#protoRadioGroup input[type='radio']").checkboxradio();
        $("#protoConfidenceGroup input[type='radio']").checkboxradio({
          icon: false,
        });
      }

      // Hide optional follow-up initially
      $("#hideProtoReason").hide();

      // ---------- Confidence radio handling ----------
      // Ensure hidden confidence field has default value
      const initialConf =
        $("input[name='protoConfidenceRadio']:checked").val() || "4";
      $("#protoConfidence").val(initialConf);

      // Show/hide follow-up based on initial value
      if (Number(initialConf) <= 3) {
        $("#hideProtoReason").show();
      } else {
        $("#hideProtoReason").hide();
        $("#protoReasonText").val("");
      }

      // Delegated handler works reliably with jQuery UI
      $(document).on(
        "change.protoAssign",
        "input[name='protoConfidenceRadio']",
        function () {
          const conf = Number($(this).val());
          $("#protoConfidence").val(String(conf));
          console.log("Confidence selected:", conf);

          if (conf <= 3) {
            $("#hideProtoReason").show();
          } else {
            $("#hideProtoReason").hide();
            $("#protoReasonText").val("");
          }
        }
      );

      // ---------- Form validation ----------
      $("#protoAssignForm").on("submit.protoAssign", function (e) {
        if (!$("input[name='utopiaPrototypeAssignment']:checked").length) {
          e.preventDefault();
          alert("Please select the Utopian Prototype that fits best.");
          return false;
        }

        if (!$("input[name='protoConfidenceRadio']:checked").length) {
          e.preventDefault();
          alert("Please select how confident you are in your choice.");
          return false;
        }
      });
    },

    commit: function () {
      // progress bar (same pattern as your other pages)
      numElementsCounter++;
      document.querySelector(".progress-bar").style.width =
        (numElementsCounter / numElements) * 100 + "%";

      // JATOS submit (same pattern as your other pages)
      if (typeof jatos !== "undefined" && typeof jatos.jQuery === "function") {
        var resultJson = study.options.datastore.exportJson();
        jatos
          .submitResultData(resultJson)
          .then(() => console.log("success"))
          .catch(() => console.log("error"));
      }
    },
  },
});

const quesAttributesFutureSociety_htmlForm = new lab.html.Page({
  title: "quesAttributes",
  items: [
    {
      required: true,
      type: "likert",
      items: items_quesAttributes,
      width: "7",
      anchors: [
        "Strongly Disagree",
        "Disagree",
        "Somewhat Disagree",
        "Neutral",
        "Somewhat Agree",
        "Agree",
        "Strongly Agree",
      ],
      label:
        "Please rate the described society on the following attributes. The described society is...",
      help: "Read each of these statements and then mark the answer option that most applies.",
      shuffle: false,
      name: "attributesFutureSociety",
    },
  ],
  submitButtonText: "Continue →",
  submitButtonPosition: "right",
  width: "l",
  messageHandlers: {
    run: function anonymous() {
      // adjust size of scale
      document.querySelectorAll("div")[0].classList = ["text-left"];
      document.querySelectorAll("main")[1].classList = ["w-xl"];
      document.querySelectorAll(".page-item-table colgroup")[0].innerHTML = `
     <col style=\"width: 65%\">
     <col style=\"width: 5%\">
     <col style=\"width: 5%\">
     <col style=\"width: 5%\">
     <col style=\"width: 5%\">
     <col style=\"width: 5%\">
     <col style=\"width: 5%\">
     <col style=\"width: 5%\">
     `;
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
      // collect paradata
      let numberitems = document.querySelectorAll("tbody tr").length;
      paracountclicks -= numberitems;
      study.options.datastore.set("para_countclicks", paracountclicks);
    },
    commit: function anonymous() {
      // progress bar
      numElementsCounter++;
      document.querySelector(".progress-bar").style.width =
        (numElementsCounter / numElements) * 100 + "%";
    },
  },
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
      $("#techname").html(nameFutureSociety);

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
    repository: "https://github.com/FennStatistics/livMatS_MasterLab_2025",
    contributors: "study programmed by Julius Fenn",
  },
  plugins: [
    new lab.plugins.Metadata(),
    // new lab.plugins.Fullscreen(),
    new lab.plugins.Debug(), // comment out finally
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
if (typeof jatos.jQuery === "function") {
  jatos.onLoad(() => study.run());
} else {
  study.run();
}
