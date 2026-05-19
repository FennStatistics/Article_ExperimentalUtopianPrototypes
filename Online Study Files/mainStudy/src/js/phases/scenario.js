/* 
################### Scenario Text ###################
*/

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
      "Living together relies on <strong>continuous scientific and technological innovation combined with rational planning</strong> to overcome scarcity and optimize material well-being. Legitimate authority comes from science- and technology-enabled institutions and laws that keep the society well-functioning. Science/innovation capacity is treated as the main way collective problems get solved, so community choices keep leaning on continuous innovation despite environmental limits regarding raw materials and the challenge of recycling outdated technologies. The society continually seeks to optimize the provision of basic services and the way society is organized. Institutional and legal frameworks form the rules and organizational structure that are intended to ensure the smooth functioning of society.",
    Vignette_text3:
      "A key tension is maintaining trust in science- and technology-based systems while managing the environmental and social costs of continuous innovation.",
  },
  aicentered: {
    Vignette: "aicentered",
    Vignette_header: genericHeader,
    Vignette_text1: introText,
    Vignette_text2:
      "Living together is handled mainly through <strong>AI-centered governance and decision-making that uses allocation based on data and computer-based optimization</strong> to handle a level of complexity that human institutions struggle to manage. Legitimate authority is justified by efficiency, coordination gains, and reduced human bias produced by AI systems that steer allocation and order. AI is not a side tool but the core coordinator for how the community is run. The allocation of resources is data-driven rather than being decided by human judgment. The system is designed to reduce the influence of personal bias and favoritism.",
    Vignette_text3:
      "A key tension is making sure computer-based optimization stays aligned with the goals of fairness and order while handling complexity at scale.",
  },
  primitivist: {
    Vignette: "primitivist",
    Vignette_header: genericHeader,
    Vignette_text1: introText,
    Vignette_text2:
      "Living together is based on <strong>low-technology, small-scale communal organization, where “just enough” is the guiding principle</strong> for living in close harmony with nature. Technological reliance is kept minimal and intentionally rejected beyond fundamental necessities. Legitimate authority is minimized because there is reduced need for formal rules and institutions, with conduct guided by simple necessities and core moral beliefs. Technological reliance stays minimal, so daily organization avoids depending on advanced tools. Social organization stays small-scale and communal, shaping how people coordinate and keep expectations manageable. People only take what they need from the environment as part of living within natural limits.",
    Vignette_text3:
      "A key tension is keeping the low-institution approach workable while still coordinating society-wide services within a community that aims to live sustainably and sufficiently.",
  },
  moderngreen: {
    Vignette: "moderngreen",
    Vignette_header: genericHeader,
    Vignette_text1: introText,
    Vignette_text2:
      "Living together centers on <strong>sustainability combined with economic security, using selective and limited green technology</strong> to maintain long-term human–nature balance while avoiding poverty. Legitimate authority rests on institutions and shared moral commitments that support a well-functioning society with shared resources. Ecological sustainability targets make environmental protection a primary goal that guides what the society tries to achieve. Sufficiency orientation sets “just enough” as the guiding principle for what people aim to use and consume. Laws and institutions are arranged in a way to keep the society working reliably while balancing human desires and limited natural resources.",
    Vignette_text3:
      "A key tension is making sure green technology can support economic security and make sure there is enough for everyone while still protecting the environment.",
  },
  religious: {
    Vignette: "religious",
    Vignette_header: genericHeader,
    Vignette_text1: introText,
    Vignette_text2:
      "Living together is organized around <strong>holy scriptures and shared religious beliefs that provide moral guidelines and divine guidance</strong> to secure order and well-being. Legitimate authority is justified by religion’s pivotal role rather than by science, technology, or extensive institutions. Transcendent authority structures legitimacy and order, and thereby dictates what counts as right conduct. Acceptable behavior and coordination are defined through shared religious norms. Human and environmental limits are seen as something that supernatural powers, or true believers, can overcome by transforming society and the natural world.",
    Vignette_text3:
      "A key tension is keeping formal institutions limited while relying on religious norms and divine authority to keep society coordinated.",
  },
  lawBased: {
    Vignette: "lawBased",
    Vignette_header: genericHeader,
    Vignette_text1: introText,
    Vignette_text2:
      "Living together is regulated by robust institutions and <strong>clear legal frameworks that enforce behavior and coordinate collective life through the rule of law</strong>. Legitimate authority comes from a government of laws rather than of persons, aiming at stability and predictability. The laws are clear, so people are expected to know their duties and what they are allowed to do. Behavior is guided by external rules and transparent consequences rather than by people’s inner moral perfection. There are real penalties for breaking the rules to maintain obedience and reduce deviant behavior.",
    Vignette_text3:
      "A key tension is maintaining stability and predictability through strict rules while preventing authority from depending on the judgment of individual rulers.",
  },
  anarchic: {
    Vignette: "anarchic",
    Vignette_header: genericHeader,
    Vignette_text1: introText,
    Vignette_text2:
      "Living together is coordinated by the <strong>widespread internalization of pro-social norms and moral commitment of individuals</strong> rather than from coercive institutions or technological or law-based control. Legitimate authority is grounded in conscience-based regulation and inner morality and concern for others rather than formal governance or coercion. The intrinsic morality of each individual is treated as the backbone of order, with people expected to act for the common good without needing external pressure. Conscience takes the place of outside enforcement, guiding behavior through self-restraint and a strong inner sense of right and wrong. Resources are shared voluntarily and spontaneously rather than being distributed by formal institutions.",
    Vignette_text3:
      "A key tension is keeping coercion and formal authority low while relying on voluntary cooperation to keep society-wide life coordinated.",
  },
};
const arrayFutureSocieties = Object.values(different_futureSocieties);