/* 
################### Scenario Text ###################
*/

const scenarioText = `
<header>
 <h2>Please read the following text carefully. All upcoming questions and a word association task will refer to this future society.</h2>
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
  Do not press "Continue" until you have read the text carefully. The "Continue" button is invisible for 15 seconds.
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
  futurist: {
    Vignette: "futurist",
    Vignette_header: genericHeader,
    Vignette_text1: introText,
    Vignette_text2:
      "Living together relies on continuous scientific and technological innovation combined with rational planning to overcome scarcity and optimize material well-being. Legitimate authority comes from science- and technology-enabled institutions and laws that keep the society well-functioning. Science/innovation capacity is treated as the main way collective problems get solved, so community choices keep leaning on continuous innovation. The society continually seeks to optimize the provision of basic services and the way society is organized. Institutional and legal frameworks form the rules and organizational structure that are intended to ensure the smooth functioning of society.",
    Vignette_text3:
      "A key tension is keeping these science- and technology-based systems trusted and effective as the society continues to pursue more progress and material comfort.",
  },
  aicentered: {
    Vignette: "aicentered",
    Vignette_header: genericHeader,
    Vignette_text1: introText,
    Vignette_text2:
      "Living together is handled mainly through AI-centered governance and decision-making that uses allocation based on data and computer-based optimization to handle a level of complexity that human institutions struggle to manage. Legitimate authority is justified by efficiency, coordination gains, and reduced human bias produced by AI systems that steer allocation and order. AI is not a side tool but the core coordinator for how the community is run. The allocation of resources is data-driven rather than being decided by human judgment. The system is designed to reduce the influence of personal bias and favoritism.",
    Vignette_text3:
      "A key tension is making sure computer-based optimization stays aligned with the goals of fairness and order while handling complexity at scale.",
  },
  primitivist: {
    Vignette: "primitivist",
    Vignette_header: genericHeader,
    Vignette_text1: introText,
    Vignette_text2:
      "Living together is based on low-technology, small-scale communal organization, where “just enough” is the guiding principle for living in close harmony with nature. Legitimate authority is minimized because there is reduced need for formal rules and institutions, with conduct guided by simple necessities and core moral beliefs. Technological reliance stays minimal, so daily organization avoids depending on advanced tools. Social organization stays small-scale and communal, shaping how people coordinate and keep expectations manageable. People only take what they need from the environment as part of living within natural limits.",
    Vignette_text3:
      "A key tension is keeping the low-institution approach workable while still coordinating society-wide services within a community that aims to stay simple and sufficient.",
  },
  moderngreen: {
    Vignette: "moderngreen",
    Vignette_header: genericHeader,
    Vignette_text1: introText,
    Vignette_text2:
      "Living together centers on sustainability combined with economic security, using selectively adopted green technology to maintain long-term human–nature balance while avoiding poverty. Legitimate authority rests on institutions and shared moral commitments that support a well-functioning society with shared resources. Ecological sustainability targets make environmental protection a primary goal that guides what the society tries to achieve. Sufficiency orientation sets “just enough” as the guiding principle for what people aim to use and consume. Laws and institutions are arranged in a way to keep the society working reliably while balancing human desires and limited natural resources.",
    Vignette_text3:
      "A key tension is making sure green technology can support economic security and make sure there is enough for everyone while still protecting the environment.",
  },
  religious: {
    Vignette: "religious",
    Vignette_header: genericHeader,
    Vignette_text1: introText,
    Vignette_text2:
      "Living together is organized around holy scriptures providing moral guidelines and shared religious beliefs. Order and well-being are secured through divine guidance and religiously grounded norms. Legitimate authority is justified by religion’s pivotal role rather than by science, technology, or extensive institutions. Transcendent authority structures legitimacy and order, and thereby dictates what counts as right conduct. Acceptable behavior and coordination are defined through shared religious norms. Human and environmental limits are seen as something that supernatural powers, or true believers, can overcome by transforming society and the natural world.",
    Vignette_text3:
      "A key tension is keeping formal institutions limited while relying on religious norms and divine authority to keep society coordinated.",
  },
  lawBased: {
    Vignette: "lawBased",
    Vignette_header: genericHeader,
    Vignette_text1: introText,
    Vignette_text2:
      "Robust institutions and clear legal frameworks regulate behavior and coordinate collective life assuming that humans are not flawless and can make mistakes. Legitimate authority comes from the rule of law with enforceable sanctions, aiming at stability and predictability through a government of laws rather than persons. The laws are clear, so people are expected to know their duties and what they are allowed to do. Behavior is guided by external rules rather than by people’s inner moral perfection. There are real penalties for breaking the rules to maintain obedience and reduce deviant behavior.",
    Vignette_text3:
      "A key tension is maintaining stability and predictability through strict rules while preventing authority from depending on the judgment of individual rulers.",
  },
  anarchic: {
    Vignette: "anarchic",
    Vignette_header: genericHeader,
    Vignette_text1: introText,
    Vignette_text2:
      "Cooperation and order arise from the moral commitment and pro-social dispositions of individuals rather than from coercive institutions or technological or law-based control. Legitimate authority is grounded in conscience-based regulation and inner morality and concern for others rather than formal governance or coercion. The intrinsic morality of each individual is treated as the backbone of order, with people expected to act for the common good without needing external pressure. Conscience takes the place of outside enforcement, guiding behavior through self-restraint and a strong inner sense of right and wrong. Resources are shared voluntarily and spontaneously rather than being distributed by formal institutions.",
    Vignette_text3:
      "A key tension is keeping coercion and formal authority low while relying on voluntary cooperation to keep society-wide life coordinated.",
  },
};
const arrayFutureSocieties = Object.values(different_futureSocieties);

var counter = 0; // global counter for scenarios
const ScenarioText_htmlForm = new lab.html.Form({
  title: "Scenario Text",
  content: scenarioText,
  messageHandlers: {
    run: () => {
      // overwrite text:
      if (
        URLparams_global !== undefined &&
        URLparams_global.futureSocietyCondition !== undefined
      ) {
        futureSocietyCondition = URLparams_global.futureSocietyCondition;
      } else {
        futureSocietyCondition =
          arrayFutureSocieties[index_futureSocieties[counter]].Vignette; // randomize which future society is shown first
      }

      const currentSociety = different_futureSocieties[futureSocietyCondition];
      codingFutureSociety = currentSociety.Vignette;

      $("#vignette_title").html(currentSociety.Vignette_header);
      $("#vignette_first").html(currentSociety.Vignette_text1);
      $("#vignette_second").html(currentSociety.Vignette_text2);
      $("#vignette_third").html(currentSociety.Vignette_text3);

      var trialNumber = counter + 1; // Assuming you have a counter
      console.log("Trial number:", trialNumber);
      $("#vignette_title").html(`${genericHeader}:`);
      // `${genericHeader} (${trialNumber} of ${totalVignettes}):`,
      counter++;

      // hide submit button
      document.querySelector("button").style.visibility = "hidden";
      setTimeout(
        () => (document.querySelector("button").style.visibility = "visible"),
        15000, // 15000 (15 seconds)
      );
    },
    commit: () => {
      // progress bar
      numElementsCounter++;
      document.querySelector(".progress-bar").style.width =
        (numElementsCounter / numElements) * 100 + "%";

      // store condition of future society
      study.options.datastore.set(
        "condition_FutureSociety",
        codingFutureSociety,
      );

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
