/*
################### Main-study L2 + ending ###################
*/

function updateProgressEnding() {
  numElementsCounter++;
  document.querySelector(".progress-bar").style.width =
    (numElementsCounter / numElements) * 100 + "%";
}

function submitIfJatosEnding() {
  if (!localTesting && typeof jatos !== "undefined" && typeof jatos.jQuery === "function") {
    const resultJson = study.options.datastore.exportJson();
    jatos.submitResultData(resultJson).catch(() => console.log("error"));
  }
}

const rankingTaskText = `
<header><h2>Ordering Task</h2></header>
<p>Please rank all seven future societies from 1 (least preferred) to 7 (most preferred). Use each rank once.</p>
<main class="content-horizontal-center content-vertical-center">
  <div class="w-xl text-justify">
    <form id="rankingForm">
      <table>
        <tr><td>Futurist Utopia</td><td><input type="number" min="1" max="7" required name="rank_futurist" class="w-100"></td></tr>
        <tr><td>AI-Centered Utopia</td><td><input type="number" min="1" max="7" required name="rank_ai_centered" class="w-100"></td></tr>
        <tr><td>Primitivist (Arcadian) Utopia</td><td><input type="number" min="1" max="7" required name="rank_primitivist" class="w-100"></td></tr>
        <tr><td>Modern Green Utopia</td><td><input type="number" min="1" max="7" required name="rank_modern_green" class="w-100"></td></tr>
        <tr><td>Religious Utopia</td><td><input type="number" min="1" max="7" required name="rank_religious" class="w-100"></td></tr>
        <tr><td>Institutional (Law-Based) Utopia</td><td><input type="number" min="1" max="7" required name="rank_institutional" class="w-100"></td></tr>
        <tr><td>Moral Commonwealth (Anarchic) Utopia</td><td><input type="number" min="1" max="7" required name="rank_moral_anarchic" class="w-100"></td></tr>
      </table>
    </form>
  </div>
</main>
<footer class="content-vertical-center content-horizontal-right">
  <button id="continue" type="submit" form="rankingForm">Continue -></button>
</footer>
`;

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
      },
      commit: function () {
        updateProgressEnding();
      },
    },
  });
};

var valueAttention = undefined;
const BlueDotTask_htmlForm = new lab.html.Form({
  title: "BlueDotTask",
  content: `
  <header><h2>Attention check</h2></header>
  <main class="content-horizontal-center content-vertical-center">
    <div class="w-xl text-justify">
      <form id="blueDotForm">
        <p>Please select the <strong>blue</strong> option below.</p>
        <div>
          <button class="scale-button" type="button">Red</button>
          <button class="scale-button" type="button">Green</button>
          <button class="scale-button" id="blueDot" type="button">Blue</button>
          <button class="scale-button" type="button">Orange</button>
        </div>
      </form>
    </div>
  </main>
  <footer class="content-vertical-center content-horizontal-right">
    <button id="continue" type="submit" form="blueDotForm">Continue -></button>
  </footer>
  `,
  messageHandlers: {
    run: function () {
      valueAttention = undefined;
      $(".scale-button").off("click").on("click", function () {
        valueAttention = this.id === "blueDot" ? 1 : 0;
      });
    },
    commit: function () {
      study.options.datastore.set("attCheck", valueAttention);
      updateProgressEnding();
      submitIfJatosEnding();
    },
  },
});

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
  "Thinking about the future society you would most like to live in, indicate your agreement.",
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
  "Please indicate your agreement.",
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

const EmploymentStatus_htmlForm = new lab.html.Form({
  title: "Employment Status",
  content: `
  <header><h2>Employment status</h2></header>
  <main class="content-horizontal-center content-vertical-center"><div class="w-xl">
  <form id="employmentForm">
    <select id="employmentStatus" name="employment_status" required class="w-100">
      <option value="">- Please select -</option>
      <option value="full_time">Employed full-time</option>
      <option value="part_time">Employed part-time</option>
      <option value="self_employed">Self-employed</option>
      <option value="student">Student</option>
      <option value="unemployed">Unemployed</option>
      <option value="retired">Retired</option>
      <option value="other">Other</option>
    </select>
  </form></div></main>
  <footer class="content-vertical-center content-horizontal-right"><button id="continue" type="submit" form="employmentForm">Continue -></button></footer>
  `,
  messageHandlers: {
    commit: function () {
      const v = document.getElementById("employmentStatus").value;
      const employed = v === "full_time" || v === "part_time" || v === "self_employed";
      study.options.datastore.set("employment_status", v);
      study.options.datastore.set("employment_is_employed", employed ? 1 : 0);
      updateProgressEnding();
    },
  },
});

const GJSS_Scale_htmlForm = makeLikertPage(
  "Generic Job Satisfaction Scale",
  "gjss_scale",
  "Please indicate your agreement with the following work-related statements.",
  items_gjss,
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

GJSS_Scale_htmlForm.options.messageHandlers.run = function () {
  if (study.options.datastore.state.employment_is_employed !== 1) {
    this.end();
    return;
  }
  $('button[type="submit"][form="page-form"]').attr("id", "continue");
};

const ECAS_Scale_htmlForm = makeLikertPage(
  "Environmental Cognitive Alternatives Scale",
  "ecas_scale",
  "Please indicate your agreement.",
  items_ecas,
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
  "Please indicate your agreement with the following statements.",
  items_sjs,
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

const UTOP_Scale_htmlForm = makeLikertPage(
  "Utopianism",
  "utopianism_scale",
  "Please indicate your agreement.",
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
  "Please indicate your agreement.",
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

const CollectiveAction_Scale_htmlForm = makeLikertPage(
  "Collective Action Intentions",
  "collective_action_scale",
  "How likely is it that you will do the following in the next 12 months?",
  items_collective_action,
  [
    "Very unlikely",
    "Unlikely",
    "Somewhat unlikely",
    "Neither likely nor unlikely",
    "Somewhat likely",
    "Likely",
    "Very likely",
  ],
);

const Pia_Scale_htmlForm = makeLikertPage(
  "Pia's Scales (Placeholder)",
  "pia_placeholder_scale",
  "Placeholder block for future scale integration.",
  items_pia_placeholder,
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

const Sequence_Scales = new lab.flow.Sequence({
  title: "Sequence Scales",
  shuffle: true,
  content: [
    BlueDotTask_htmlForm,
    NFC_Scale_htmlForm,
    ARIS_Scale_htmlForm,
    SWLS_Scale_htmlForm,
    EmploymentStatus_htmlForm,
    GJSS_Scale_htmlForm,
    ECAS_Scale_htmlForm,
    SJS_Scale_htmlForm,
    UTOP_Scale_htmlForm,
    ANTIUTOP_Scale_htmlForm,
    CollectiveAction_Scale_htmlForm,
    Pia_Scale_htmlForm,
  ],
});

const JobBackground_htmlForm = new lab.html.Form({
  title: "JobBackground",
  content: `
  <header><h2>Job and qualification</h2></header>
  <main class="content-horizontal-center content-vertical-center"><div class="w-xl text-justify">
  <form id="jobBackgroundForm">
    <p><strong>Current job:</strong></p>
    <textarea name="job_current_text" class="w-100" rows="3" required></textarea>
    <p><strong>Optional current job category (US SOC major group):</strong></p>
    <select name="job_current_soc" class="w-100">
      <option value="">- Optional -</option>
      <option value="11">Management Occupations</option>
      <option value="13">Business and Financial Operations Occupations</option>
      <option value="15">Computer and Mathematical Occupations</option>
      <option value="17">Architecture and Engineering Occupations</option>
      <option value="19">Life, Physical, and Social Science Occupations</option>
      <option value="21">Community and Social Service Occupations</option>
      <option value="23">Legal Occupations</option>
      <option value="25">Educational Instruction and Library Occupations</option>
      <option value="27">Arts, Design, Entertainment, Sports, and Media Occupations</option>
      <option value="29">Healthcare Practitioners and Technical Occupations</option>
      <option value="31">Healthcare Support Occupations</option>
      <option value="33">Protective Service Occupations</option>
      <option value="35">Food Preparation and Serving Related Occupations</option>
      <option value="37">Building and Grounds Cleaning and Maintenance Occupations</option>
      <option value="39">Personal Care and Service Occupations</option>
      <option value="41">Sales and Related Occupations</option>
      <option value="43">Office and Administrative Support Occupations</option>
      <option value="45">Farming, Fishing, and Forestry Occupations</option>
      <option value="47">Construction and Extraction Occupations</option>
      <option value="49">Installation, Maintenance, and Repair Occupations</option>
      <option value="51">Production Occupations</option>
      <option value="53">Transportation and Material Moving Occupations</option>
      <option value="55">Military Specific Occupations</option>
    </select>
    <p><strong>Qualification / field of training:</strong></p>
    <textarea name="job_qualification_text" class="w-100" rows="3" required></textarea>
    <p><strong>Dream job in your preferred future society:</strong></p>
    <textarea name="job_dream_utopia_text" class="w-100" rows="3" required></textarea>
    <p><strong>How closely does your current job match your qualification/training?</strong></p>
    <select name="job_training_match" class="w-100" required>
      <option value="">- Please select -</option>
      <option value="1">Not at all</option>
      <option value="2">Somewhat</option>
      <option value="3">Mostly</option>
      <option value="4">Completely</option>
    </select>
  </form></div></main>
  <footer class="content-vertical-center content-horizontal-right"><button id="continue" type="submit" form="jobBackgroundForm">Continue -></button></footer>
  `,
  messageHandlers: {
    commit: function () {
      updateProgressEnding();
    },
  },
});

const SocioDemo_htmlForm = new lab.html.Form({
  title: "SocioDemo",
  content: `
  <header><h2>Demographics</h2></header>
  <main class="content-horizontal-center content-vertical-center">
    <div class="w-xl text-justify">
      <form id="demography">
        <table>
          <tr><td>Religiosity (1-7)</td><td><input name="religiosity" type="number" min="1" max="7" required class="w-100"></td></tr>
          <tr><td>Political left-right (1-7)</td><td><input name="left_right" type="number" min="1" max="7" required class="w-100"></td></tr>
          <tr><td>Age (years)</td><td><input name="age" type="number" min="18" max="120" required class="w-100"></td></tr>
          <tr><td>Gender</td><td><select name="gender" required class="w-100"><option value="">- Please select -</option><option value="woman">Woman</option><option value="man">Man</option><option value="non_binary">Non-binary</option><option value="self_describe">Prefer to self-describe</option><option value="prefer_not">Prefer not to say</option></select></td></tr>
          <tr><td>Education (lowest to highest)</td><td><select name="education" required class="w-100"><option value="">- Please select -</option><option value="less_hs">Less than high school</option><option value="hs">High school</option><option value="some_college">Some college</option><option value="bachelor">Bachelor's</option><option value="master">Master's</option><option value="doctoral">Doctoral</option><option value="professional">Professional degree</option></select></td></tr>
        </table>
      </form>
    </div>
  </main>
  <footer class="content-vertical-center content-horizontal-right"><button id="continue" type="submit" form="demography">Continue -></button></footer>
  `,
  messageHandlers: {
    commit: () => {
      updateProgressEnding();
    },
  },
});

const FeedbackScreen_htmlScreen = new lab.html.Form({
  title: "FeedbackScreen",
  content: `
  <header><h2>Final feedback (optional)</h2></header>
  <main class="content-horizontal-center content-vertical-center">
    <div class="w-xl">
      <form id="feedbackFinalForm">
        <textarea name="feedback_critic" class="w-100" rows="8"></textarea>
      </form>
    </div>
  </main>
  <footer class="content-vertical-center content-horizontal-right">
    <button id="continue" type="submit" form="feedbackFinalForm">Continue -></button>
  </footer>
  `,
  messageHandlers: {
    commit: () => {
      updateProgressEnding();
      submitIfJatosEnding();
    },
  },
});

const EndingScreen_htmlScreen = new lab.html.Screen({
  title: "EndingScreen",
  tardy: true,
  content: `
  <header><h2>Thank you very much for your participation!</h2></header>
  <main class="content-horizontal-center content-vertical-center">
    <div class="w-xl text-justify">
      <p>The experiment will end in a few seconds. You will then be redirected back to Prolific.</p>
    </div>
  </main>
  `,
  timeout: 9000,
  messageHandlers: {
    run: () => {
      updateProgressEnding();
    },
    epilogue: () => {
      if (!localTesting && typeof jatos !== "undefined" && typeof jatos.jQuery === "function") {
        const resultJson = study.options.datastore.exportJson();
        jatos.submitResultData(resultJson).catch(() => console.log("error"));
        jatos.endStudyAndRedirect(
          "https://app.prolific.com/submissions/complete?cc=CT77F9FI",
          true,
          "everything worked fine",
        );
      }
    },
  },
});

const RankingTask_htmlForm = new lab.html.Form({
  title: "RankingTask",
  content: rankingTaskText,
  messageHandlers: {
    commit: () => {
      updateProgressEnding();
    },
  },
});
