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

const socioDemoLeftRightQuestion = `
<div class="page-item page-item-likert">
  <p class="font-weight-bold" style="margin: 1rem 0 0.25rem; font-size: 24px;">
    People sometimes use the terms "left" and "right" to describe political views. Thinking about your own political views, where would you place yourself on the following scale?
  </p>
  <span style="margin-left: 2%; display: inline-block; width: 80px; font-size: 16px;">Left (1)</span>
  <span style="float: right; display: inline-block; width: 90px; font-size: 16px;">Right (11)</span>
  <table class="page-item-table">
    <colgroup>
      <col style="width: 6%"><col style="width: 6%"><col style="width: 6%"><col style="width: 6%"><col style="width: 6%"><col style="width: 6%"><col style="width: 6%"><col style="width: 6%"><col style="width: 6%"><col style="width: 6%"><col style="width: 6%">
    </colgroup>
    <thead class="sticky-top">
      <tr>
        <th class="sticky-top text-center small">1</th><th class="sticky-top text-center small">2</th><th class="sticky-top text-center small">3</th><th class="sticky-top text-center small">4</th><th class="sticky-top text-center small">5</th><th class="sticky-top text-center small">6</th><th class="sticky-top text-center small">7</th><th class="sticky-top text-center small">8</th><th class="sticky-top text-center small">9</th><th class="sticky-top text-center small">10</th><th class="sticky-top text-center small">11</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="text-center"><label style="height: 100%; padding: 10px 0"><input type="radio" name="lrscale" value="1" required></label></td>
        <td class="text-center"><label style="height: 100%; padding: 10px 0"><input type="radio" name="lrscale" value="2" required></label></td>
        <td class="text-center"><label style="height: 100%; padding: 10px 0"><input type="radio" name="lrscale" value="3" required></label></td>
        <td class="text-center"><label style="height: 100%; padding: 10px 0"><input type="radio" name="lrscale" value="4" required></label></td>
        <td class="text-center"><label style="height: 100%; padding: 10px 0"><input type="radio" name="lrscale" value="5" required></label></td>
        <td class="text-center"><label style="height: 100%; padding: 10px 0"><input type="radio" name="lrscale" value="6" required></label></td>
        <td class="text-center"><label style="height: 100%; padding: 10px 0"><input type="radio" name="lrscale" value="7" required></label></td>
        <td class="text-center"><label style="height: 100%; padding: 10px 0"><input type="radio" name="lrscale" value="8" required></label></td>
        <td class="text-center"><label style="height: 100%; padding: 10px 0"><input type="radio" name="lrscale" value="9" required></label></td>
        <td class="text-center"><label style="height: 100%; padding: 10px 0"><input type="radio" name="lrscale" value="10" required></label></td>
        <td class="text-center"><label style="height: 100%; padding: 10px 0"><input type="radio" name="lrscale" value="11" required></label></td>
      </tr>
    </tbody>
  </table>
</div>
`;

const socioDemoReligiosityQuestion = `
<div class="page-item page-item-likert">
  <p class="font-weight-bold" style="margin: 1rem 0 0.25rem; font-size: 24px;">
    People differ in how religious they consider themselves to be. Thinking about yourself, where would you place yourself on the following scale?
  </p>
  <span style="margin-left: 2%; display: inline-block; width: 190px; font-size: 16px;">Not at all religious (1)</span>
  <span style="float: right; display: inline-block; width: 140px; font-size: 16px;">Very religious (11)</span>
  <table class="page-item-table">
    <colgroup>
      <col style="width: 6%"><col style="width: 6%"><col style="width: 6%"><col style="width: 6%"><col style="width: 6%"><col style="width: 6%"><col style="width: 6%"><col style="width: 6%"><col style="width: 6%"><col style="width: 6%"><col style="width: 6%">
    </colgroup>
    <thead class="sticky-top">
      <tr>
        <th class="sticky-top text-center small">1</th><th class="sticky-top text-center small">2</th><th class="sticky-top text-center small">3</th><th class="sticky-top text-center small">4</th><th class="sticky-top text-center small">5</th><th class="sticky-top text-center small">6</th><th class="sticky-top text-center small">7</th><th class="sticky-top text-center small">8</th><th class="sticky-top text-center small">9</th><th class="sticky-top text-center small">10</th><th class="sticky-top text-center small">11</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="text-center"><label style="height: 100%; padding: 10px 0"><input type="radio" name="rlgdgr" value="1" required></label></td>
        <td class="text-center"><label style="height: 100%; padding: 10px 0"><input type="radio" name="rlgdgr" value="2" required></label></td>
        <td class="text-center"><label style="height: 100%; padding: 10px 0"><input type="radio" name="rlgdgr" value="3" required></label></td>
        <td class="text-center"><label style="height: 100%; padding: 10px 0"><input type="radio" name="rlgdgr" value="4" required></label></td>
        <td class="text-center"><label style="height: 100%; padding: 10px 0"><input type="radio" name="rlgdgr" value="5" required></label></td>
        <td class="text-center"><label style="height: 100%; padding: 10px 0"><input type="radio" name="rlgdgr" value="6" required></label></td>
        <td class="text-center"><label style="height: 100%; padding: 10px 0"><input type="radio" name="rlgdgr" value="7" required></label></td>
        <td class="text-center"><label style="height: 100%; padding: 10px 0"><input type="radio" name="rlgdgr" value="8" required></label></td>
        <td class="text-center"><label style="height: 100%; padding: 10px 0"><input type="radio" name="rlgdgr" value="9" required></label></td>
        <td class="text-center"><label style="height: 100%; padding: 10px 0"><input type="radio" name="rlgdgr" value="10" required></label></td>
        <td class="text-center"><label style="height: 100%; padding: 10px 0"><input type="radio" name="rlgdgr" value="11" required></label></td>
      </tr>
    </tbody>
  </table>
</div>
`;


const SocioDemo_htmlForm = new lab.html.Form({
  title: "SocioDemo",
  content: `
  <header><h2>About you</h2></header>
  <main class="content-horizontal-center content-vertical-center">
    <div class="w-xl text-justify">
      <form id="demography">
        <table>
          <tr><td>How old are you, in years?</td><td><input name="age" type="number" min="18" max="120" required class="w-100"></td></tr>
          <tr><td>What is your current employment status?</td><td><select id="employmentStatus" name="employment_status" required class="w-100"><option value="">- Please select -</option><option value="full_time">Employed full-time</option><option value="part_time">Employed part-time</option><option value="self_employed">Self-employed</option><option value="student">Student</option><option value="unemployed">Unemployed</option><option value="retired">Retired</option><option value="other">Other</option></select></td></tr>
          <tr><td>What is your gender?</td><td><select name="gender" required class="w-100"><option value="">- Please select -</option><option value="woman">Woman</option><option value="man">Man</option><option value="non_binary">Non-binary</option><option value="prefer_not">Prefer not to say</option></select></td></tr>
          <tr><td>What is the highest level of education you have completed?</td><td><select name="education" required class="w-100"><option value="">- Please select -</option><option value="less_hs">Less than high school</option><option value="hs">High school</option><option value="some_college">Some college</option><option value="bachelor">Bachelor's</option><option value="master">Master's</option><option value="doctoral">Doctoral</option><option value="professional">Professional degree</option></select></td></tr>
        </table>
        <br>
        ${socioDemoLeftRightQuestion}
        <br>
        ${socioDemoReligiosityQuestion}
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
        <p style="text-align: left;">Please use this space for any comments about the study, including anything that felt unclear or difficult.</p>
        <textarea name="feedback_critic" class="w-100" rows="8" style="font-size: 22px;"></textarea>
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
  <header><h2>Thank you very much for your participation.</h2></header>
  <main class="content-horizontal-center content-vertical-center">
    <div class="w-xl text-justify">
      <p>The study will end in a few seconds, and you will then be redirected back to Prolific.</p>
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
