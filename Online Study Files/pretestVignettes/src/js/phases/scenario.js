/* 
################### Scenario Text ###################
*/

const scenarioText = `
<header>
 <h2>Please read the following text carefully. Afterwards we will ask you to answer several questions:</h2>
 </header>

<main class="content-horizontal-center content-vertical-center">
<div class="w-xxl text-justify">
<div class="page-item page-item-likert" style="margin-left:10%; margin-right: 10%">
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

      if (!localTesting && typeof jatos !== "undefined" && typeof jatos.jQuery === "function") {
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
