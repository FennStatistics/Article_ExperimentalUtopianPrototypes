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
<p>Drag future societies from the left list into the right list and arrange them from 1 (most preferred) to 7 (least preferred).</p>
<main class="content-horizontal-center content-vertical-center">
  <div class="w-xl text-justify">
    <form id="rankingForm">
      <style>
        .ranking-columns { display: flex; gap: 20px; align-items: flex-start; }
        .ranking-column { flex: 1; }
        .ranking-column h3 { margin: 0 0 8px 0; font-size: 20px; }
        .ranking-list {
          list-style: none;
          margin: 0;
          padding: 8px;
          min-height: 600px;
          border: 1px solid #bdbdbd;
          border-radius: 8px;
          background: #fafafa;
        }
        .ranking-item {
          margin: 6px 0;
          padding: 10px 12px;
          border: 1px solid #d5d5d5;
          border-radius: 6px;
          background: #fff;
          cursor: move;
        }
        .ranking-rank {
          display: inline-block;
          min-width: 28px;
          font-weight: 700;
        }
        .ranking-placeholder {
          border: 2px dashed #8e8e8e;
          border-radius: 6px;
          height: 44px;
          margin: 6px 0;
          background: #f0f0f0;
        }
        #rankingError {
          margin-top: 10px;
          color: #b00020;
          font-weight: 600;
          visibility: hidden;
        }
      </style>
      <div class="ranking-columns">
        <div class="ranking-column">
          <h3>Available societies (A-Z)</h3>
          <ul id="rankingPool" class="ranking-list"></ul>
        </div>
        <div class="ranking-column">
          <h3>Your ranking (top = 1, bottom = 7)</h3>
          <ul id="rankingTarget" class="ranking-list"></ul>
        </div>
      </div>
      <div id="rankingError">Please move all 7 societies to the right list before continuing.</div>
    </form>
  </div>
</main>
<footer class="content-vertical-center content-horizontal-right">
  <button id="continue" type="submit" form="rankingForm">Continue -></button>
</footer>
`;

let rankingDndEvents = [];
let rankingDndStartTs = null;
let rankingDndFirstInteractionTs = null;
let rankingDndMoveCount = 0;
let rankingDndReorderCount = 0;

const socioDemoLeftRightQuestion = `
<div class="page-item page-item-likert">
  <p class="font-weight-bold" style="margin: 1rem 0 0.25rem; font-size: 24px;">
    Many people use the terms "left" and "right" to describe different political attitudes. We have a scale here that runs from left to right. Thinking about your own political views, where would you place them on this scale?
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
    People describe themselves as differing in how religious they are. Below is a scale from "not at all religious" to "very religious." Thinking about yourself, where would you place yourself on this scale?
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
  <header><h2>Demographics</h2></header>
  <main class="content-horizontal-center content-vertical-center">
    <div class="w-xl text-justify">
      <form id="demography">
        <table>
          <tr><td>How old are you (in years)?</td><td><input name="age" type="number" min="18" max="120" required class="w-100"></td></tr>
          <tr><td>What is your current employment status?</td><td><select id="employmentStatus" name="employment_status" required class="w-100"><option value="">- Please select -</option><option value="full_time">Employed full-time</option><option value="part_time">Employed part-time</option><option value="self_employed">Self-employed</option><option value="student">Student</option><option value="unemployed">Unemployed</option><option value="retired">Retired</option><option value="other">Other</option></select></td></tr>
          <tr><td>What is your gender?</td><td><select name="gender" required class="w-100"><option value="">- Please select -</option><option value="woman">Woman</option><option value="man">Man</option><option value="non_binary">Non-binary</option><option value="prefer_not">Prefer not to say</option></select></td></tr>
          <tr><td>What is your highest level of education?</td><td><select name="education" required class="w-100"><option value="">- Please select -</option><option value="less_hs">Less than high school</option><option value="hs">High school</option><option value="some_college">Some college</option><option value="bachelor">Bachelor's</option><option value="master">Master's</option><option value="doctoral">Doctoral</option><option value="professional">Professional degree</option></select></td></tr>
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
    run: function () {
      const societies = [
        { code: "rank_ai_centered", label: "AI-Centered Utopia" },
        { code: "rank_futurist", label: "Futurist Utopia" },
        { code: "rank_institutional", label: "Institutional (Law-Based) Utopia" },
        { code: "rank_modern_green", label: "Modern Green Utopia" },
        { code: "rank_moral_anarchic", label: "Moral Commonwealth (Anarchic) Utopia" },
        { code: "rank_primitivist", label: "Primitivist (Arcadian) Utopia" },
        { code: "rank_religious", label: "Religious Utopia" },
      ];

      rankingDndEvents = [];
      rankingDndStartTs = Date.now();
      rankingDndFirstInteractionTs = null;
      rankingDndMoveCount = 0;
      rankingDndReorderCount = 0;

      const $pool = $("#rankingPool");
      const $target = $("#rankingTarget");
      const $error = $("#rankingError");
      const $continue = $("#continue");

      $pool.empty();
      $target.empty();

      societies
        .slice()
        .sort((a, b) => a.label.localeCompare(b.label))
        .forEach((item) => {
          $pool.append(`<li class="ranking-item" data-code="${item.code}"><span class="ranking-rank"></span>${item.label}</li>`);
        });

      const updateRanksAndValidity = function () {
        $("#rankingTarget .ranking-item").each(function (idx) {
          $(this).find(".ranking-rank").text(`${idx + 1}. `);
        });
        $("#rankingPool .ranking-item").find(".ranking-rank").text("");

        const valid = $("#rankingTarget .ranking-item").length === 7;
        $continue.prop("disabled", !valid);
        $error.css("visibility", valid ? "hidden" : "visible");
      };

      const logEvent = function (evtType, ui, fromList, toList) {
        const ts = Date.now();
        if (!rankingDndFirstInteractionTs) rankingDndFirstInteractionTs = ts;
        const $item = ui.item;
        rankingDndEvents.push({
          type: evtType,
          item_code: $item.attr("data-code"),
          from: fromList,
          to: toList,
          to_index: $item.index(),
          ts,
          ms_since_start: ts - rankingDndStartTs,
        });
      };

      $("#rankingPool, #rankingTarget").sortable({
        connectWith: ".ranking-list",
        placeholder: "ranking-placeholder",
        tolerance: "pointer",
        start: function (_event, ui) {
          ui.item.data("fromList", this.id);
        },
        receive: function (_event, ui) {
          rankingDndMoveCount++;
          logEvent("receive", ui, ui.item.data("fromList"), this.id);
          updateRanksAndValidity();
        },
        update: function (_event, ui) {
          if (this.id === "rankingTarget" && ui.sender == null) {
            rankingDndReorderCount++;
            rankingDndMoveCount++;
            logEvent("reorder", ui, this.id, this.id);
          }
          updateRanksAndValidity();
        },
      });

      updateRanksAndValidity();
    },
    commit: () => {
      const orderCodes = $("#rankingTarget .ranking-item")
        .map(function () {
          return $(this).attr("data-code");
        })
        .get();

      if (orderCodes.length !== 7) {
        document.getElementById("rankingError").style.visibility = "visible";
        return;
      }

      orderCodes.forEach((code, idx) => {
        study.options.datastore.set(code, idx + 1);
      });
      study.options.datastore.set("ranking_final_order", orderCodes);
      study.options.datastore.set("ranking_dnd_events", rankingDndEvents);
      study.options.datastore.set("ranking_dnd_move_count", rankingDndMoveCount);
      study.options.datastore.set("ranking_dnd_reorder_count", rankingDndReorderCount);
      study.options.datastore.set(
        "ranking_dnd_duration_ms",
        rankingDndFirstInteractionTs ? Date.now() - rankingDndFirstInteractionTs : 0,
      );

      updateProgressEnding();
    },
  },
});
