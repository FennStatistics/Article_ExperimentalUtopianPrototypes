/* 
################### Scenario Text ###################
*/

const scenarioText = `
<header>
 <h2>Please read the following text carefully. Afterwards we will ask you to answer several questions:</h2>
 </header>

<main class="content-horizontal-center content-vertical-center">
<div class="w-xxl text-justify">
<div class="page-item page-item-likert" style="margin-left:5%; margin-right: 5%">
  <div class="concept">
    <h2 id="vignette_title">XX</h2>
    <p id="vignette_first">XX1</p>
    <p id="vignette_second">XX2</p>
    <p id="vignette_third">XX3</p>
  </div>
  </div>
</main>

  <form id="page-form"> 
  </form>

  <footer class="content-vertical-center content-horizontal-right">
  <div class="w-xl text-justify" style="font-size:26px;">
  Do not press "Continue" until you have read the text carefully. The "Continue" button is locked for 15 seconds.
  </div>
  &nbsp; <button id="continue" type="submit" form="page-form">
  Continue &rarr;
</button>
</footer>
`;

// number of vignettes
const totalVignettes = 7;
const genericHeader = "Imagine Living in This Society";
const introText = `
Imagine a society in 100 years that has recently overcome a period of crisis. People are now living peacefully. Although food, energy, water and basic services are available, these resources are not abundant.
`;

const different_futureSocieties = {
  aicentered: {
    Vignette: "aicentered",
    Vignette_header: genericHeader,
    Vignette_text1: introText,
    Vignette_text2:
      "Living together is handled mainly through AI-centered governance and decision-making that uses allocation based on data and computer-based optimization to handle a level of complexity that human institutions struggle to manage. Legitimate authority is justified by efficiency, coordination gains, and reduced human bias produced by AI systems that steer allocation and order. AI is not a side tool but the core coordinator for how the community is run. The allocation of resources is data-driven rather than being decided by human judgement. The system is designed to reduce the influence of personal bias and favoritism.",
    Vignette_text3:
      "A key tension is making sure computer-based optimization stays aligned with the goals of fairness and order while handling complexity at scale.",
  },
  primitivist: {
    Vignette: "neutral",
    Vignette_header: "Self-Shading Facade",
    Vignette_text1: introText,
    Vignette_text2: "aaaaaaa",
    Vignette_text3: "aaaaaaa",
  },
};

var counter = 1; // global counter for scenarios
const ScenarioText_htmlForm = new lab.html.Form({
  title: "Scenario Text",
  content: scenarioText,
  messageHandlers: {
    run: () => {
      // overwrite text:
      const currentSociety = different_futureSocieties[futureSocietyCondition];

      $("#vignette_title").html(currentSociety.Vignette_header);
      $("#vignette_first").html(currentSociety.Vignette_text1);
      $("#vignette_second").html(currentSociety.Vignette_text2);
      $("#vignette_third").html(currentSociety.Vignette_text3);

      var trialNumber = counter; // Assuming you have a counter
      console.log("Trial number:", trialNumber);
      $("#vignette_title").html(
        `${genericHeader} (${trialNumber} of ${totalVignettes}):`,
      );
      counter++;

      // hide submit button
      document.querySelector("button").style.visibility = "hidden";
      setTimeout(
        () => (document.querySelector("button").style.visibility = "visible"),
        0, // 15000 (15 seconds)
      );
    },
    commit: () => {
      // progress bar
      numElementsCounter++;
      document.querySelector(".progress-bar").style.width =
        (numElementsCounter / numElements) * 100 + "%";

      if (
        !localTesting &&
        typeof jatos !== "undefined" &&
        typeof jatos.jQuery === "function"
      ) {
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

const SequenceLoop_Scenarios = new lab.flow.Sequence({
  title: "Sequence Loop Scenarios",
  shuffle: false,
  content: [ScenarioText_htmlForm],
});

const loop_Scenarios = new lab.flow.Loop({
  template: SequenceLoop_Scenarios,
  templateParameters: [
    {
      notNeeded: "",
    },
  ],
  sample: {
    mode: "draw-shuffle",
    n: totalVignettes,
  },
  indexParameter: "counterScenarios",
});
