/*
################### Main-study L2 + ending ###################
*/

function updateProgressEnding() {
  numElementsCounter++;
  document.querySelector(".progress-bar").style.width =
    (numElementsCounter / numElements) * 100 + "%";
}

const rankingTaskText = `
<header><h2>Ordering Task</h2></header>
<p>Please rank all seven future societies from 1 (least preferred) to 7 (most preferred).</p>
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


const socioDemoText = `
<header><h2>Demographics</h2></header>
<main class="content-horizontal-center content-vertical-center">
  <div class="w-xl text-justify">
    <form id="demography">
      <table>
        <tr><td>Age (years)</td><td><input name="age" type="number" min="21" max="120" required class="w-100"></td></tr>
        <tr><td>Gender</td><td><select name="gender" required class="w-100"><option value="">- Please select -</option><option value="woman">Woman</option><option value="man">Man</option><option value="non_binary">Non-binary</option><option value="self_describe">Prefer to self-describe</option><option value="prefer_not">Prefer not to say</option></select></td></tr>
        <tr><td>Religiosity (1-7)</td><td><input name="religiosity" type="number" min="1" max="7" required class="w-100"></td></tr>
        <tr><td>Political left-right (1-7)</td><td><input name="left_right" type="number" min="1" max="7" required class="w-100"></td></tr>
        <tr><td>Education</td><td><select name="education" required class="w-100"><option value="">- Please select -</option><option value="less_hs">Less than high school</option><option value="hs">High school</option><option value="some_college">Some college</option><option value="bachelor">Bachelor's</option><option value="master">Master's</option><option value="doctoral">Doctoral</option><option value="professional">Professional degree</option></select></td></tr>
        <tr><td>Current job title</td><td><input name="job_current" type="text" required class="w-100"></td></tr>
        <tr><td>Dream job in your preferred future society</td><td><input name="job_dream_utopia" type="text" required class="w-100"></td></tr>
      </table>
    </form>
  </div>
</main>
<footer class="content-vertical-center content-horizontal-right">
  <button id="continue" type="submit" form="demography">Continue -></button>
</footer>
`;

const endingScreenText = `
<header><h2>Thank you very much for your participation!</h2></header>
<main class="content-horizontal-center content-vertical-center">
  <div class="w-xl text-justify">
    <p>The experiment will end in a few seconds. You will then be redirected back to Prolific.</p>
  </div>
</main>
`;

const RankingTask_htmlForm = new lab.html.Form({
  title: "RankingTask",
  content: rankingTaskText,
  messageHandlers: {
    commit: () => {
      updateProgressEnding();
    },
  },
});

const ARISScale_htmlPage = new lab.html.Page({
  title: "ARISScale",
  items: [
    {
      required: Required_Testing,
      type: "likert",
      width: "7",
      anchors: [
        "Strongly disagree",
        "Disagree",
        "Somewhat disagree",
        "Neutral",
        "Somewhat agree",
        "Agree",
        "Strongly agree",
      ],
      label: "Thinking about the future society I would most like to live in...",
      name: "aris_ais_ris",
      items: [
        { label: "I would join or belong to an organization that works to promote this kind of society.", coding: "ais1" },
        { label: "I would donate money to organization that works towards this kind of society.", coding: "ais2" },
        { label: "I would volunteer my time (e.g., write petitions, distribute flyers, recruit people, etc.) for an organization that promote this kind of society.", coding: "ais3" },
        { label: "I would travel for one hour to join in a public rally, protest, or demonstration in support of an organization supporting this kind of society.", coding: "ais4" },
        { label: "I would continue to support an organization that works toward this kind of society even if the organization sometimes breaks the law.", coding: "ris1" },
        { label: "I would continue to support an organization that works toward this kind of society even if the organization sometimes resorts to violence.", coding: "ris2" },
        { label: "I would participate in a public protest in support of this kind of society even if I thought the protest might turn violent.", coding: "ris3" },
        { label: "I would attack police or security forces if I saw them beating people who were supporting this kind of society.", coding: "ris4" },
      ],
    },
  ],
  submitButtonText: "Continue ->",
  submitButtonPosition: "right",
  width: "l",
  messageHandlers: {
    commit: () => {
      updateProgressEnding();
    },
  },
});

const SocioDemo_htmlForm = new lab.html.Form({
  title: "SocioDemo",
  content: socioDemoText,
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
      if (!localTesting && typeof jatos !== "undefined" && typeof jatos.jQuery === "function") {
        const resultJson = study.options.datastore.exportJson();
        jatos.submitResultData(resultJson).catch(() => console.log("error"));
      }
    },
  },
});

const EndingScreen_htmlScreen = new lab.html.Screen({
  title: "EndingScreen",
  tardy: true,
  content: endingScreenText,
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
