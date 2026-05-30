/*
################### Main-study dispositional scales (L2) ###################
*/

function updateProgressL2() {
  numElementsCounter++;
  document.querySelector(".progress-bar").style.width =
    (numElementsCounter / numElements) * 100 + "%";
}

const makeLikertPage = function (title, name, label, items, anchors) {
  return new lab.html.Page({
    title,
    items: [
      {
        required: Required_Testing,
        type: "likert",
        items,
        width: String(anchors.length),
        anchors,
        label,
        shuffle: false,
        name,
      },
    ],
    submitButtonText: "Continue ->",
    submitButtonPosition: "right",
    width: "l",
    messageHandlers: {
      run: function () {
        $('button[type="submit"][form="page-form"]').attr("id", "continue");

        // adjust size of scale
        document.querySelectorAll("div")[0].classList = ["text-left"];
        document.querySelectorAll("main")[1].classList = ["w-xxl"];
        document.querySelectorAll(".page-item-table colgroup")[0].innerHTML = `
<col style="width: 25%">  <!-- Question text (larger) -->
<col style="width: 6.67%"> <!-- Scale point 1 -->
<col style="width: 6.67%"> <!-- Scale point 2 -->
<col style="width: 6.67%"> <!-- Scale point 3 -->
<col style="width: 6.67%"> <!-- Scale point 4 -->
<col style="width: 6.67%"> <!-- Scale point 5 -->
<col style="width: 6.67%"> <!-- Scale point 6 -->
<col style="width: 6.67%"> <!-- Scale point 7 -->
<col style="width: 6.67%"> <!-- Scale point 8 -->
<col style="width: 6.67%"> <!-- Scale point 9 -->
<col style="width: 6.67%"> <!-- Scale point 10 -->
      `;

        // Remove "small" class from question text cells
        document
          .querySelectorAll(".page-item-table tbody td.small")
          .forEach((cell) => {
            cell.classList.remove("small");
            cell.style.fontSize = "22px"; // or your preferred size
          });
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
      commit: function () {
        updateProgressL2();
      },
    },
  });
};

const NFC_Scale_htmlForm = makeLikertPage(
  "Need for Chaos",
  "nfc_scale",
  "Please indicate how much you agree with the following statements.",
  items_nfc,
  [
    "Strongly disagree",
    "Disagree",
    "Somewhat disagree",
    "Neutral",
    "Somewhat agree",
    "Agree",
    "Strongly agree",
  ],
);

const ARIS_Scale_htmlForm = makeLikertPage(
  "Need for Chaos - Violence (ARIS-adapted)",
  "aris_scale",
  "Thinking about the future society you would most like to live in, please indicate how much you agree with each statement.",
  items_aris,
  [
    "Strongly disagree",
    "Disagree",
    "Somewhat disagree",
    "Neutral",
    "Somewhat agree",
    "Agree",
    "Strongly agree",
  ],
);

const SWLS_Scale_htmlForm = makeLikertPage(
  "Satisfaction With Life Scale",
  "swls_scale",
  "Please indicate how much you agree with each statement.",
  items_swls,
  [
    "Strongly disagree",
    "Disagree",
    "Somewhat disagree",
    "Neutral",
    "Somewhat agree",
    "Agree",
    "Strongly agree",
  ],
);

const SJS_Scale_htmlForm = makeLikertPage(
  "System Justification Scale",
  "sjs_scale",
  "Please indicate how much you agree with the following statements.",
  items_sjs,
  [
    "1 - Strongly disagree",
    "2",
    "3",
    "4",
    "5 - Neutral",
    "6",
    "7",
    "8",
    "9 - Strongly agree",
  ],
);

const UTOP_Scale_htmlForm = makeLikertPage(
  "Utopianism",
  "utopianism_scale",
  "Please indicate how much you agree with each statement.",
  items_utopianism,
  [
    "Strongly disagree",
    "Disagree",
    "Somewhat disagree",
    "Neutral",
    "Somewhat agree",
    "Agree",
    "Strongly agree",
  ],
);

const ANTIUTOP_Scale_htmlForm = makeLikertPage(
  "Anti-utopianism",
  "anti_utopianism_scale",
  "Please indicate how much you agree with each statement.",
  items_antiutopianism,
  [
    "Strongly disagree",
    "Disagree",
    "Somewhat disagree",
    "Neutral",
    "Somewhat agree",
    "Agree",
    "Strongly agree",
  ],
);

const PRDS_Scale_htmlForm = makeLikertPage(
  "Personal Relative Deprivation Scale",
  "prds_scale",
  "Please indicate how much you agree with the following statements.",
  items_prds,
  [
    "Strongly disagree",
    "Disagree",
    "Somewhat disagree",
    "Somewhat agree",
    "Agree",
    "Strongly agree",
  ],
);

const CMQ_Scale_htmlForm = makeLikertPage(
  "Conspiracy Mentality Questionnaire",
  "cmq_scale",
  "For each statement, indicate how likely you think it is to be true.",
  items_cmq,
  [
    "0 - Certainly not",
    "10%",
    "20%",
    "30%",
    "40%",
    "50%",
    "60%",
    "70%",
    "80%",
    "90%",
    "10 - Certain",
  ],
);

const BRS_Scale_htmlForm = makeLikertPage(
  "Brief Resilience Scale",
  "brs_scale",
  "Please indicate how much you agree with each statement.",
  items_brs,
  [
    "1 - Strongly disagree",
    "2 - Disagree",
    "3 - Neutral",
    "4 - Agree",
    "5 - Strongly agree",
  ],
);

const transitionToL2Text = `
<header>
  <h2>Final part of the study</h2>
</header>

<main class="content-horizontal-center content-vertical-center">
  <div class="w-xl text-justify">
    <section>
      In this last part, you will <strong>answer questions about yourself</strong>.
    </section>
    <br>
    <section>
      Previously, you answered questions about different future societies. The following statements are different — they ask about <strong>your own experiences, beliefs, and attitudes</strong>.
    </section>
    <br>
    <section>
      There are no right or wrong answers. Please respond thoughtfully and honestly.
    </section>
  </div>
</main>

<form id="page-form"></form>

<footer class="content-vertical-center content-horizontal-right">
  <button id="continue" type="submit" form="page-form">
    Continue &rarr;
  </button>
</footer>
`;

const TransitionToL2Scales_htmlForm = new lab.html.Form({
  title: "TransitionToL2Scales",
  content: transitionToL2Text,
  messageHandlers: {
    commit: () => {
      if (
        !localTesting &&
        typeof jatos !== "undefined" &&
        typeof jatos.jQuery === "function"
      ) {
        // If JATOS is available, send data there
        var resultJson = study.options.datastore.exportJson();
        console.log("data sent to JATOS");
        jatos
          .submitResultData(resultJson)
          .then(() => console.log("success"))
          .catch(() => console.log("error"));
      }

      numElementsCounter++;
      document.querySelector(".progress-bar").style.width =
        (numElementsCounter / numElements) * 100 + "%";
    },
  },
});

const Sequence_Scales = new lab.flow.Sequence({
  title: "Sequence Scales",
  shuffle: true,
  content: [
    NFC_Scale_htmlForm,
    ARIS_Scale_htmlForm,
    SWLS_Scale_htmlForm,
    SJS_Scale_htmlForm,
    UTOP_Scale_htmlForm,
    ANTIUTOP_Scale_htmlForm,
    PRDS_Scale_htmlForm,
    CMQ_Scale_htmlForm,
    BRS_Scale_htmlForm,
  ],
});
