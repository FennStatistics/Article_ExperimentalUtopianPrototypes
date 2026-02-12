const Required_Testing = true; // set to false for production

/* number of components / elements to set slider */
const numElements = 13; // 8+5
var numElementsCounter = 5;



/* 
################### directly after drawing CAM ###################
*/
const break500 = new lab.html.Screen({
  content: `
  `,
  timeout: 500
})


const adaptive_meanValenece = new lab.html.Form({
  content:
    `
    <header>
    <h2>
    Bitte beantworten Sie die folgenden Frage zu Ihrer gezeichneten <i>Cognitive-Affective Map</i>:
    </h2>
  </header>
  <main class="content-horizontal-center content-vertical-center">
  <div class="w-l text-justify">
  <form id="page-form">
    Ihre gezeichnete <i>Mind-Map</i> hatte eine durchschnittliche emotionale Bewertung von 
    <span id="placeholder" style="font-weight: bold;">XXX</span>, bitte erklären Sie, warum Ihre insgesamt gezeichnete <i>Cognitive-Affective Map</i> 
    <span id="placeholder2" style="font-weight: bold;">XXX</span> war
      <textarea rows="10" name="ans1" style="width: 100%;" placeholder="Schreiben Sie hier Ihre Antwort..." required></textarea>
    </div>
</main>
</form>

<footer class="content-vertical-center content-horizontal-right">
<button id="continue" type="submit" form="page-form">
Weiter &rarr;
</button>
</footer>
  `,
  messageHandlers: {
    run: function anonymous() {
      $("#placeholder").text(Number(jatos.studySessionData.meanvalence.toFixed(2)));

      if (jatos.studySessionData.meanvalence < 0) {
        $("#placeholder2").text("negativ");
      } else if (jatos.studySessionData.meanvalence > 0) {
        $("#placeholder2").text("positiv");
      } else if (jatos.studySessionData.meanvalence == 0) {
        $("#placeholder2").text("neutral");
      }
    },
    commit: function anonymous() {
      // progress bar
      numElementsCounter++;
      document.querySelector(".progress-bar").style.width = (numElementsCounter / numElements) * 100 + "%";


      if (typeof jatos.jQuery === "function") {
        // If JATOS is available, send data there
        var resultJson2 = study.options.datastore.exportJson();
        if (typeof jatos.jQuery === "function") {
          console.log("my result data sent to JATOS first time: ", resultJson2);
          jatos.submitResultData(resultJson2)
            .then(() => console.log('success'))
            .catch(() => console.log('error'));
        }
      }
    }

  },
})


/* 
################### survey scales ###################
*/
// >>> Risk Perception Index Items - 1, 2, 3, 8
const Likert_Mixed1_htmlForm = new lab.html.Form({
  title: "Mixed1",
  content: textObj.mixedQuestions1,
  messageHandlers: {
    commit: () => {
      // progress bar
      numElementsCounter++;
      document.querySelector(".progress-bar").style.width =
        (numElementsCounter / numElements) * 100 + "%";
    },
  },
});

const Likert_Mixed2_htmlForm = new lab.html.Form({
  title: "Mixed2",
  content: textObj.mixedQuestions2,
  messageHandlers: {
    commit: () => {
      // progress bar
      numElementsCounter++;
      document.querySelector(".progress-bar").style.width =
        (numElementsCounter / numElements) * 100 + "%";
    },
  },
});

// >>> policy items
const LikertPolicyItems_htmlForm = new lab.html.Page({
  title: "policyItems",
  items: [
    {
      required: Required_Testing,
      type: "likert",
      items: items_policyItems,
      width: "7",
      anchors: [
        "1 (starke Ablehnung)",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7 (starke Unterstützung)"
      ],
      label:
        "Wir werden Sie nach Ihrer Sicht auf verschiedene öffentliche Maßnahmen fragen. Bitte beantworten Sie die Fragen so wahrheitsgemäß wie möglich. Viele Länder haben neue politische Maßnahmen eingeführt, um das Risiko des Klimawandels zu verringern. Dazu gehören Maßnahmen, die Anreize für die Reduzierung von Treibhausgasemissionen in verschiedenen Bereichen und von verschiedenen Akteuren schaffen oder vorschreiben. Bitte geben Sie an, inwieweit Sie diese Maßnahmen ablehnen oder unterstützen.",
      help: "Beantworten Sie bitte jede Aussage, auch wenn Sie sich nicht ganz sicher sind, was Sie antworten sollen.",
      shuffle: false,
      name: "policyItems",
    },
  ],
  submitButtonText: "Weiter →",
  submitButtonPosition: "right",
  width: "l",
  messageHandlers: {
    run: function anonymous() {
      // adjust size of scale
      document.querySelectorAll("div")[0].classList = ["text-left"];
      document.querySelectorAll("main")[1].classList = ["w-xl"];
      document.querySelectorAll(".page-item-table colgroup")[0].innerHTML = `
     <col style=\"width: 35%\">
     <col style=\"width: 10%\">
     <col style=\"width: 10%\">
     <col style=\"width: 10%\">
     <col style=\"width: 10%\">
     <col style=\"width: 10%\">
     <col style=\"width: 10%\">
     <col style=\"width: 10%\">
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


// >>> van der Linden - Biospheric Values 2015
const Likert_Biospheric_htmlForm = new lab.html.Page({
  title: "Biospheric",
  items: [
    {
      required: Required_Testing,
      type: "likert",
      items: items_vanLindenBiospheric,
      width: "9",
      anchors: [
        "-1 (Gegensätzlich zu meinen Werten)",
        "0 (nicht wichtig)",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7 (von höchster Wichtigkeit)"
      ],
      label: 'Bitte bewerten Sie die Bedeutung dieser Werte als Leitprinzipien in Ihrem Leben.',
      help: "Beantworten Sie bitte jede Aussage, auch wenn Sie sich nicht ganz sicher sind, was Sie antworten sollen.",
      shuffle: false,
      name: "Biospheric",
    },
  ],
  submitButtonText: "Weiter →",
  submitButtonPosition: "right",
  width: "l",
  messageHandlers: {
    run: function anonymous() {
      // adjust size of scale
      document.querySelectorAll("div")[0].classList = ["text-left"];
      document.querySelectorAll("main")[1].classList = ["w-xl"];
      document.querySelectorAll(".page-item-table colgroup")[0].innerHTML = `
      <col style=\"width: 20%\">
      <col style=\"width: 7%\">
      <col style=\"width: 7%\">
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



// >>> policy items
const Likert_Risk_htmlForm = new lab.html.Page({
  title: "Risk",
  items: [
    {
      required: Required_Testing,
      type: "likert",
      items: items_vanLindenRisk,
      width: "7",
      anchors: [
        "1 (überhaupt nicht schlimm)",
        "2",
        "3",
        "4 (neutral)",
        "5",
        "6",
        "7 (sehr schlimm)"
      ],
      label:
        "Bitte geben Sie an, wie schwerwiegend sie die Aussagen einschätzen.",
      help: "Beantworten Sie bitte jede Aussage, auch wenn Sie sich nicht ganz sicher sind, was Sie antworten sollen.",
      shuffle: false,
      name: "Risk",
    },
  ],
  submitButtonText: "Weiter →",
  submitButtonPosition: "right",
  width: "l",
  messageHandlers: {
    run: function anonymous() {
      // adjust size of scale
      document.querySelectorAll("div")[0].classList = ["text-left"];
      document.querySelectorAll("main")[1].classList = ["w-xl"];
      document.querySelectorAll(".page-item-table colgroup")[0].innerHTML = `
     <col style=\"width: 40%\">
     <col style=\"width: 8.5%\">
     <col style=\"width: 8.5%\">
     <col style=\"width: 8.5%\">
     <col style=\"width: 8.5%\">
     <col style=\"width: 8.5%\">
     <col style=\"width: 8.5%\">
     <col style=\"width: 8.5%\">
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
################### Carbon Emission Task ###################
*/
// >>> CET info screen
const CETinfo_htmlScreen = new lab.html.Form({
  title: "CETinfo",
  content: textObj.CETinfo,
  messageHandlers: {
    run: function anonymous() {
      document.querySelector("button").style.visibility = "hidden";
      setTimeout(
        () => (document.querySelector("button").style.visibility = "visible"),
        15000 // 10000 (10 seconds)
      );
    },
    commit: () => {
      // progress bar
      numElementsCounter++;
      document.querySelector(".progress-bar").style.width =
        (numElementsCounter / numElements) * 100 + "%";
    },
  },
});


// >>> CET practice screen
const CETpractice_htmlScreen = new lab.html.Form({
  title: "CETpractice",
  content: textObj.CETpractice,
  messageHandlers: {
    run: function anonymous() {
      $("#continue").prop("disabled", true);
      $("#optionA, #optionB").on("change click", function () {
        $("#continue").prop("disabled", false);
        $("#continue").text("Weiter →");
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

// >>> CET control question
const CETcontrolQUestion_htmlScreen = new lab.html.Form({
  title: "CETcontrolQUestion",
  content: textObj.CETcontrolQUestion,
  messageHandlers: {
    commit: () => {
      // progress bar
      numElementsCounter++;
      document.querySelector(".progress-bar").style.width =
        (numElementsCounter / numElements) * 100 + "%";
    },
  },
});


const template = new lab.html.Form({
  content: `
<!-- CET -->
<div class="page-item page-item-likert" style="margin-left:40%; margin-right: 40%">
<form id="ratingBasalAttributes">
    <div style="display: flex; justify-content: space-around">
    <!-- Option A -->
    <label>
    <table align="center" border="1" cellpadding="1" cellspacing="1" style="width:400px; margin-right:50px;">
 <tbody>
  <tr>
   <td colspan="2" style="text-align: center;"><strong>Option A</strong></td>
  </tr>
  <tr>
   <td>&nbsp;CO2 Emissionen<br/>`
   + '&nbsp;<strong> ${ parameters.CE_A } kg CO2 <br/>(~${ parameters.CM_A }km mit dem Auto)</strong></td>' + `
   <td>&nbsp;Bonuszahlung<br/>
   `
   + '   &nbsp;<strong>${ parameters.BP_A } Cent<br/><br/></strong></td>' + `
  </tr>
  <tr>
   </tbody>
</table>
<input type="radio" name="choosenOption" value="optionA" id="optionA" style="transform: scale(2); margin-top: 10px;">
</label>

<br>

<!-- Option B -->
<label>
<table align="center" border="1" cellpadding="1" cellspacing="1" style="width:400px;">
<tbody>
<tr>
<td colspan="2" style="text-align: center;"><strong>Option B</strong></td>
</tr>
<tr>
<td>&nbsp;CO2 Emissionen<br/>`
+ '&nbsp;<strong> ${ parameters.CE_B } kg CO2 <br/>(~${ parameters.CM_B }km mit dem Auto)</strong></td>' + `
<td>&nbsp;Bonuszahlung<br/>
`
+ '   &nbsp;<strong>${ parameters.BP_B } Cent<br/><br/></strong></td>' + `
</tr>
<tr>
</tbody>
</table>
<input type="radio" name="choosenOption" value="optionB" id="optionB" style="transform: scale(2); margin-top: 10px;">
</label>
</div>
    </div>
  </form>
<br>
    <button id="continue" type="submit" form="ratingBasalAttributes">
    Bitte klicken Sie auf eine der Optionen, um fortzufahren
  </button>
`,
  tardy: true,
  timeout: 15000,
  messageHandlers: {
    run: function anonymous() {
      $("#continue").prop("disabled", true);
      $("#optionA, #optionB").on("change click", function () {
        $("#continue").prop("disabled", false);
        $("#continue").text("Weiter →");
      });

      /*
      // this.parent.end() !!!s
      var tmp_this = this;
      $(document).one('keydown', function (e) {
        if (e.keyCode == 90) {
          console.log("clicked z");
          tmp_this.parent.end();
        }
      });
      */

    },
    end: function anonymous() {
     
    },
  },
})

const CETparams = new lab.flow.Loop({
  template: template,
  templateParameters: [{"CE_A":"0","CE_B":"0","CM_A":"0","CM_B":"0","BP_A":"20","BP_B":"0"},{"CE_A":"0.1","CE_B":"0","CM_A":"0.58","CM_B":"0","BP_A":"20","BP_B":"0"},{"CE_A":"0.46","CE_B":"0","CM_A":"2.66","CM_B":"0","BP_A":"20","BP_B":"0"},{"CE_A":"2","CE_B":"0","CM_A":"11.65","CM_B":"0","BP_A":"20","BP_B":"0"},{"CE_A":"9","CE_B":"0","CM_A":"51.86","CM_B":"0","BP_A":"20","BP_B":"0"},{"CE_A":"0","CE_B":"0","CM_A":"0","CM_B":"0","BP_A":"40","BP_B":"0"},{"CE_A":"0.1","CE_B":"0","CM_A":"0.58","CM_B":"0","BP_A":"20","BP_B":"0"},{"CE_A":"0.46","CE_B":"0","CM_A":"2.66","CM_B":"0","BP_A":"40","BP_B":"0"},{"CE_A":"2","CE_B":"0","CM_A":"11.65","CM_B":"0","BP_A":"40","BP_B":"0"},{"CE_A":"9","CE_B":"0","CM_A":"51.86","CM_B":"0","BP_A":"40","BP_B":"0"},{"CE_A":"0","CE_B":"0","CM_A":"0","CM_B":"0","BP_A":"60","BP_B":"0"},{"CE_A":"0.1","CE_B":"0","CM_A":"0.58","CM_B":"0","BP_A":"60","BP_B":"0"},{"CE_A":"0.46","CE_B":"0","CM_A":"2.66","CM_B":"0","BP_A":"60","BP_B":"0"},{"CE_A":"2","CE_B":"0","CM_A":"11.65","CM_B":"0","BP_A":"60","BP_B":"0"},{"CE_A":"9","CE_B":"0","CM_A":"51.86","CM_B":"0","BP_A":"60","BP_B":"0"},{"CE_A":"0","CE_B":"0","CM_A":"0","CM_B":"0","BP_A":"80","BP_B":"0"},{"CE_A":"0.1","CE_B":"0","CM_A":"0.58","CM_B":"0","BP_A":"80","BP_B":"0"},{"CE_A":"0.46","CE_B":"0","CM_A":"2.66","CM_B":"0","BP_A":"80","BP_B":"0"},{"CE_A":"2","CE_B":"0","CM_A":"11.65","CM_B":"0","BP_A":"80","BP_B":"0"},{"CE_A":"9","CE_B":"0","CM_A":"51.86","CM_B":"0","BP_A":"80","BP_B":"0"},{"CE_A":"0","CE_B":"0","CM_A":"0","CM_B":"0","BP_A":"100","BP_B":"0"},{"CE_A":"0.1","CE_B":"0","CM_A":"0.58","CM_B":"0","BP_A":"100","BP_B":"0"},{"CE_A":"0.46","CE_B":"0","CM_A":"2.66","CM_B":"0","BP_A":"100","BP_B":"0"},{"CE_A":"2","CE_B":"0","CM_A":"11.65","CM_B":"0","BP_A":"100","BP_B":"0"},{"CE_A":"9","CE_B":"0","CM_A":"51.86","CM_B":"0","BP_A":"100","BP_B":"0"}],
  sample: {
    mode: "draw-shuffle",
    n: "25",
  },
})

const CETRating = new lab.html.Frame({
  context: `
    <header>
      <h3>Bitte wählen Sie zwischen Option A und Option B:</h3>
    </header>
    <br>
    <main style="width: 100%;">
      <!-- this is where stimuli will be inserted -->
    </main>
  `,
  contextSelector: 'main',
  content: CETparams,
})


// >>>> ALL SCALES
const SCALES_CET = new lab.flow.Sequence({
  title: "SCALES CET",
  shuffle: false,
  content: [
    CETinfo_htmlScreen,
    CETpractice_htmlScreen,
    CETcontrolQUestion_htmlScreen,
    CETRating,
  ],
});

/* 
################### ending phase ###################
*/
// >>> socio-demographic questions
const SocioDemo_htmlScreen = new lab.html.Form({
  title: "socioDemo",
  content: textObj.socioDemo,
  messageHandlers: {
    commit: () => {
      // progress bar
      numElementsCounter++;
      document.querySelector(".progress-bar").style.width =
        (numElementsCounter / numElements) * 100 + "%";
    },
  },
});


// >>> feedback screen
// to get random bonus payment
function shuffleArray(array) {
  let array_emp = []
  for (var i = 0; i < array.length; i++) {
    array_emp.push(i)
  }

  let j, x;
  for (i = array_emp.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = array_emp[i];
    array_emp[i] = array_emp[j];
    array_emp[j] = x;
  }
  return array_emp;
}


const FeedbackScreen_htmlScreen = new lab.html.Form({
  title: "FeedbackScreen",
  content: textObj.feedbackQues,
  messageHandlers: {
    commit: () => {
      /*
      // save bonus payment
      let bonuspayment = study.options.datastore.extract("BP_A");
      let choosenA = study.options.datastore.extract("choosenOption");
      
      let result = bonuspayment.filter((value, index) => choosenA[index] === "optionA");
      
      study.options.datastore.set(
        "CETbonuspayment",
        shuffleArray(result)[0]
      );
      */

      // progress bar
      numElementsCounter++;
      document.querySelector(".progress-bar").style.width =
        (numElementsCounter / numElements) * 100 + "%";
    },
  },
});

// >>> ending screen
const EndingScreen_htmlScreen = new lab.html.Screen({
  title: "EndingScreen",
  tardy: true,
  content: `
  <header>
  <h2> Vielen Dank für Ihre Teilnahme! </h2>
</header>

<main class="content-horizontal-center content-vertical-center">
  <div class="w-l text-justify">

    <br>
    <div>
      <i>Die Studie wird in wenigen Sekunden enden und Sie werden automatisch zurück auf unsere Institutsseite umgeleitet - gerne weitersagen :-).</i> 
      <br>
      <br>
      <br>
      Wenn Sie Fragen haben, kontaktieren Sie bitte die Studienleiterin Irina Monno (irina.monno@psychologie.uni-freiburg.de) oder den Programmierer der Studie Julius Fenn (julius.fenn@psychologie.uni-freiburg.de).
    </div>
  </main>

  `,
  timeout: 6000,
  messageHandlers: {
    run: function anonymous() {
      // progress bar
      numElementsCounter++;
      document.querySelector(".progress-bar").style.width = 100 + "%";

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
            "https://www.psychologie.uni-freiburg.de/abteilungen/Allgemeine.Psychologie/lehre/masterthemen",  // !!! ""
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



// >>>> ALL SCALES
const SCALES_sequence = new lab.flow.Sequence({
  title: "SCALES Sequence",
  shuffle: true,
  content: [
    // van der Linden 2015
    Likert_Risk_htmlForm,
    Likert_Biospheric_htmlForm,
    Likert_Mixed1_htmlForm,
    Likert_Mixed2_htmlForm,

    // own items
    LikertPolicyItems_htmlForm,

    // CET
    SCALES_CET
  ],
});



// Define the sequence of components that define the study
const study = new lab.flow.Sequence({
  metadata: {
    title: "CAMspiracy t2 Germany CAM",
    description: "CAMspiracy t2",
    repository: "",
    contributors: "Julius Fenn, Christophe Becht",
  },
  plugins: [
    //new lab.plugins.Metadata(),
    //new lab.plugins.Debug(), // comment out finally
    //new lab.plugins.Download()
  ],
  content: [
    // break500,
    CAMfeedbackGeneral_htmlForm,
    adaptive_meanValenece,

    //SCALES_sequence,
    //SocioDemo_htmlScreen,
    FeedbackScreen_htmlScreen,
    EndingScreen_htmlScreen,
  ],
})

// Start the study (uncomment to run)
if (typeof jatos.jQuery === "function") {
  jatos.onLoad(() => study.run());
} else {
  study.run();
}