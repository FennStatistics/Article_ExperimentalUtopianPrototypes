/* 
################### Survey Scales ###################
*/

const postClearBiasText = `
<header>
  <h2>
    Please answer the following questions:
  </h2>
</header>

<p>Please refer to the text about the future society when answering the questions.</p>

<main class="content-horizontal-center content-vertical-center">
  <div class="w-xl text-justify">
    <form id="demography">
      <table>

        <!-- Clarity -->
        <tr style="height: 100px">
          <td class="font-weight-bold text-left">
            Do you feel that the information you just read was clear?
          </td>
          <td>
            <select id="clearUtopia" name="clearUtopia" required class="w-100">
              <option value="" selected>
                -- Please select --
              </option>
              <option value="4">It was completely clear.</option>
              <option value="3">It was somewhat clear.</option>
              <option value="2">It was somewhat unclear.</option>
              <option value="1">It was completely unclear.</option>
            </select>
          </td>
        </tr>

        <!-- Clarity follow-up -->
        <tr id="hideClearUtopiatext" style="height: 100px">
          <td class="font-weight-bold text-left">
            Why do you think the information about the future society was unclear?
            <br>
            <p class="text-left small text-muted hide-if-empty" style="margin: 0.25rem 0">
              Please write a short answer.
            </p>
          </td>
          <td>
            <textarea id="clearUtopiatext" name="clearUtopiatext" class="w-100" rows="3"></textarea>
          </td>
        </tr>

        <!-- Neutrality / Bias -->
        <tr style="height: 100px">
          <td class="font-weight-bold text-left">
            Do you feel that the information you just read was biased?
          </td>
          <td>
            <select id="biasUtopia" name="biasUtopia" required class="w-100">
              <option value="" selected>
                -- Please select --
              </option>
              <option value="3">It was supportive of this future society.</option>
              <option value="2">It was neutral, and did not support or oppose this future society.</option>
              <option value="1">It was opposed to this future society.</option>
            </select>
          </td>
        </tr>

        <!-- Bias follow-up -->
        <tr id="hideBiasUtopiatext" style="height: 100px">
          <td class="font-weight-bold text-left">
            Why do you think the information about the future society was not neutral?
            <br>
            <p class="text-left small text-muted hide-if-empty" style="margin: 0.25rem 0">
              Please write a short answer.
            </p>
          </td>
          <td>
            <textarea id="biasUtopiatext" name="biasUtopiatext" class="w-100" rows="3"></textarea>
          </td>
        </tr>

        <!-- Column balance -->
        <colgroup>
          <col style="width: 50%">
          <col style="width: 50%">
        </colgroup>
      </table>
    </form>
  </div>
</main>

<footer class="content-vertical-center content-horizontal-right">
  <div class="w-l text-justify"></div>
  <button id="continue" type="submit" form="demography">
    Continue &rarr;
  </button>
</footer>
  `;

const understandingText = `
<header>
  <h2>
    Please answer the following questions:
  </h2>
</header>

<p>When answering the questions, please refer to the text about the future society that you have just read.</p>

<main class="content-horizontal-center content-vertical-center">
  <div class="w-xl text-justify">
    <form id="demography">
      <table>

        <!-- General understanding -->
        <tr style="height: 100px">
          <td class="font-weight-bold text-left">
            Please describe the future society presented in the text.
            <br>
            <p class="text-left small text-muted hide-if-empty" style="margin: 0.25rem 0">
              Please write a short answer.
            </p>
          </td>
          <td>
            <textarea id="undUtopiaGeneral" name="undUtopiaGeneral" class="w-100" rows="3" required></textarea>
          </td>
        </tr>

        <!-- Goals -->
        <tr style="height: 100px">
          <td class="font-weight-bold text-left">
            What are the main goals of this future society?
            <br>
            <p class="text-left small text-muted hide-if-empty" style="margin: 0.25rem 0">
              Please write a short answer.
            </p>
          </td>
          <td>
            <textarea id="undUtopiaGoal" name="undUtopiaGoal" class="w-100" rows="3" required></textarea>
          </td>
        </tr>

        <!-- Mechanisms -->
        <tr style="height: 100px">
          <td class="font-weight-bold text-left">
            How does this society work to achieve these goals (e.g., rules, institutions, or practices)?
            <br>
            <p class="text-left small text-muted hide-if-empty" style="margin: 0.25rem 0">
              Please write a short answer.
            </p>
          </td>
          <td>
            <textarea id="undUtopiaHow" name="undUtopiaHow" class="w-100" rows="3" required></textarea>
          </td>
        </tr>

        <!-- Column balance -->
        <colgroup>
          <col style="width: 50%">
          <col style="width: 50%">
        </colgroup>
      </table>
    </form>
  </div>
</main>

<footer class="content-vertical-center content-horizontal-right">
  <div class="w-l text-justify"></div>
  <button id="continue" type="submit" form="demography">
    Continue &rarr;
  </button>
</footer>
  `;

const assignmentTaskText = `
<header>
  <h2>Please answer the following question:</h2>
</header>

<p>
  Please refer to the text about the future society you have just read.
</p>

<main class="content-horizontal-center content-vertical-center">
  <div class="w-xl text-justify">

    <!-- 
      IMPORTANT:
      Set the correct prototype for the currently shown vignette in data-correct-prototype.
      Example values:
      futurist, ai_centered, primitivist_arcadian, modern_green,
      religious_millennial, institutional_law, moral_commonwealth_anarchic
    -->
    <form id="protoAssignForm" data-correct-prototype="futurist" novalidate>

      <!-- Prototype assignment -->
      <div class="proto-block">
        <div class="font-weight-bold text-left">
          Which Utopian Prototype does this future society most closely represent?
          <p class="text-left small text-muted hide-if-empty" style="margin: 0.25rem 0 0 0">
            Please select the one option that fits best.
          </p>
        </div>

        <div id="protoRadioGroup" class="w-100" style="margin-top: 0.75rem;">

          <label for="proto_futurist" class="proto-option">
            <input type="radio" id="proto_futurist" name="utopiaPrototypeAssignment" value="futurist" required>
            <span>
              <strong>Futurist</strong> — A society organized around continuous scientific and technological innovation, rational planning, and optimization to solve collective problems.
            </span>
          </label>

          <label for="proto_ai_centered" class="proto-option">
            <input type="radio" id="proto_ai_centered" name="utopiaPrototypeAssignment" value="ai_centered">
            <span>
              <strong>AI-Centered</strong> — A society primarily coordinated by AI systems that use data-driven decisions to manage resources, fairness, and social order.
            </span>
          </label>

          <label for="proto_primitivist_arcadian" class="proto-option">
            <input type="radio" id="proto_primitivist_arcadian" name="utopiaPrototypeAssignment" value="primitivist_arcadian">
            <span>
              <strong>Primitivist (Arcadian)</strong> — A low-technology, small-scale society that lives simply and communally in close harmony with nature.
            </span>
          </label>

          <label for="proto_modern_green" class="proto-option">
            <input type="radio" id="proto_modern_green" name="utopiaPrototypeAssignment" value="modern_green">
            <span>
              <strong>Modern Green</strong> — A society that balances ecological sustainability and economic security through shared resources, institutions, and selective green technology.
            </span>
          </label>

          <label for="proto_religious_millennial" class="proto-option">
            <input type="radio" id="proto_religious_millennial" name="utopiaPrototypeAssignment" value="religious_millennial">
            <span>
              <strong>Religious (Millennial)</strong> — A society guided by sacred beliefs and transcendent moral authority, where social order is grounded in religion and spiritual norms.
            </span>
          </label>

          <label for="proto_institutional_law" class="proto-option">
            <input type="radio" id="proto_institutional_law" name="utopiaPrototypeAssignment" value="institutional_law">
            <span>
              <strong>Institutional (Law-Based)</strong> — A society coordinated through strong institutions, clear laws, and enforceable rules to maintain stability and predictability.
            </span>
          </label>

          <label for="proto_moral_commonwealth_anarchic" class="proto-option">
            <input type="radio" id="proto_moral_commonwealth_anarchic" name="utopiaPrototypeAssignment" value="moral_commonwealth_anarchic">
            <span>
              <strong>Moral Commonwealth (Anarchic)</strong> — A society held together by internalized morality, voluntary cooperation, and minimal coercive authority.
            </span>
          </label>
        </div>
      </div>

<!-- Confidence -->
<div class="proto-block" style="margin-top: 1rem;">
  <div class="font-weight-bold text-left">
    How confident are you in your choice?
    <p class="text-left small text-muted hide-if-empty" style="margin: 0.25rem 0 0 0">
      Please select one option.
    </p>
  </div>

  <div id="protoConfidenceGroup" style="margin-top: 0.6rem;">
<label for="conf_1" class="conf-option">
  <input type="radio" id="conf_1" name="protoConfidenceRadio" value="1" required>
  <span>1<br><small>Not at all<br>confident</small></span>
</label>

<label for="conf_2" class="conf-option">
  <input type="radio" id="conf_2" name="protoConfidenceRadio" value="2">
  <span>2<br><small>Slightly<br>confident</small></span>
</label>

<label for="conf_3" class="conf-option">
  <input type="radio" id="conf_3" name="protoConfidenceRadio" value="3">
  <span>3<br><small>Somewhat<br>confident</small></span>
</label>

<label for="conf_4" class="conf-option">
  <input type="radio" id="conf_4" name="protoConfidenceRadio" value="4">
  <span>4<br><small>Moderately<br>confident</small></span>
</label>

<label for="conf_5" class="conf-option">
  <input type="radio" id="conf_5" name="protoConfidenceRadio" value="5">
  <span>5<br><small>Fairly<br>confident</small></span>
</label>

<label for="conf_6" class="conf-option">
  <input type="radio" id="conf_6" name="protoConfidenceRadio" value="6">
  <span>6<br><small>Highly<br>confident</small></span>
</label>

<label for="conf_7" class="conf-option">
  <input type="radio" id="conf_7" name="protoConfidenceRadio" value="7">
  <span>7<br><small>Very<br>confident</small></span>
</label>
  </div>

</div>

      <!-- Optional follow-up if low confidence -->
      <div id="hideProtoReason" class="proto-block" style="margin-top: 1rem;">
        <div class="font-weight-bold text-left">
          What made the classification difficult?
          <p class="text-left small text-muted hide-if-empty" style="margin: 0.25rem 0 0 0">
            Optional short answer (shown only when confidence is low).
          </p>
        </div>

        <div style="margin-top: 0.6rem;">
          <textarea id="protoReasonText" name="protoReasonText" class="w-100" rows="5" placeholder="Please provide a short answer..."></textarea>
        </div>
      </div>
    </form>

  </div>
</main>

<footer class="content-vertical-center content-horizontal-right">
  <button id="continue" type="submit" form="protoAssignForm">
    Continue &rarr;
  </button>
</footer>
  `;

const understandingText_htmlForm = new lab.html.Form({
  title: "understandingText",
  content: understandingText,
  messageHandlers: {
    commit: function anonymous() {
      // progress bar
      numElementsCounter++;
      document.querySelector(".progress-bar").style.width =
        (numElementsCounter / numElements) * 100 + "%";

      if (!localTesting && typeof jatos !== "undefined" && typeof jatos.jQuery === "function") {
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
  content: postClearBiasText,
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

      if (!localTesting && typeof jatos !== "undefined" && typeof jatos.jQuery === "function") {
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
  content: assignmentTaskText,
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
      if (!localTesting && typeof jatos !== "undefined" && typeof jatos.jQuery === "function") {
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
