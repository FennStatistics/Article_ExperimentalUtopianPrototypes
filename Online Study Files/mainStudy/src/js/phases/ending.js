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
          <tr><td>Employment status</td><td><select id="employmentStatus" name="employment_status" required class="w-100"><option value="">- Please select -</option><option value="full_time">Employed full-time</option><option value="part_time">Employed part-time</option><option value="self_employed">Self-employed</option><option value="student">Student</option><option value="unemployed">Unemployed</option><option value="retired">Retired</option><option value="other">Other</option></select></td></tr>
          <tr><td>Gender</td><td><select name="gender" required class="w-100"><option value="">- Please select -</option><option value="woman">Woman</option><option value="man">Man</option><option value="non_binary">Non-binary</option><option value="prefer_not">Prefer not to say</option></select></td></tr>
          <tr><td>Education (lowest to highest)</td><td><select name="education" required class="w-100"><option value="">- Please select -</option><option value="less_hs">Less than high school</option><option value="hs">High school</option><option value="some_college">Some college</option><option value="bachelor">Bachelor's</option><option value="master">Master's</option><option value="doctoral">Doctoral</option><option value="professional">Professional degree</option></select></td></tr>
        </table>
      </form>
    </div>
  </main>
  <footer class="content-vertical-center content-horizontal-right"><button id="continue" type="submit" form="demography">Continue -></button></footer>
  `,
  messageHandlers: {
    commit: function () {
      const v = document.getElementById("employmentStatus").value;
      const employed = v === "full_time" || v === "part_time" || v === "self_employed";
      study.options.datastore.set("employment_is_employed", employed ? 1 : 0);
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
