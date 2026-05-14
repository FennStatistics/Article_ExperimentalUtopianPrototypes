/*
Participant-level scale item banks
*/

function shuffle(queslist) {
  const idx = [];
  for (let i = 0; i < queslist.ques.length; i++) idx.push(i);
  for (let i = idx.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const x = idx[i];
    idx[i] = idx[j];
    idx[j] = x;
  }
  return idx;
}

function createitems(queslist, quesindex) {
  const quesitems = [];
  for (let i = 0; i < queslist.ques.length; i++) {
    quesitems.push({
      label: queslist.ques[quesindex[i]],
      coding: queslist.scale[quesindex[i]],
    });
  }
  return quesitems;
}

const nfcList = {
  ques: [
    "I think society should be burned to the ground.",
    "I fantasize about a natural disaster wiping out most of humanity so that society can start anew.",
    "I need chaos around me - it's too boring if nothing is going on.",
    "Sometimes I just feel like destroying beautiful things.",
    "I get a kick when natural disasters strike in foreign countries.",
    "I enjoy when a new political or social movement disrupts the status quo.",
  ],
  scale: ["nfc1", "nfc2", "nfc3", "nfc4", "nfc5", "nfc6"],
};

const arisList = {
  ques: [
    "I would join or belong to an organization that works to promote this kind of society.",
    "I would donate money to organization that works towards this kind of society.",
    "I would volunteer my time (e.g., write petitions, distribute flyers, recruit people, etc.) for an organization that promote this kind of society.",
    "I would travel for one hour to join in a public rally, protest, or demonstration in support of an organization supporting this kind of society.",
    "I would continue to support an organization that works toward this kind of society even if the organization sometimes breaks the law.",
    "I would continue to support an organization that works toward this kind of society even if the organization sometimes resorts to violence.",
    "I would participate in a public protest in support of this kind of society even if I thought the protest might turn violent.",
    "I would attack police or security forces if I saw them beating people who were supporting this kind of society.",
  ],
  scale: ["ais1", "ais2", "ais3", "ais4", "ris1", "ris2", "ris3", "ris4"],
};

const swlsList = {
  ques: [
    "In most ways my life is close to my ideal.",
    "The conditions of my life are excellent.",
    "I am satisfied with my life.",
    "So far I have gotten the important things I want in life.",
    "If I could live my life over, I would change almost nothing.",
  ],
  scale: ["swls1", "swls2", "swls3", "swls4", "swls5"],
};

const gjssList = {
  ques: [
    "I receive recognition for a job well done.",
    "I feel close to the people at work.",
    "I feel good about my job.",
    "I feel secure about my job.",
    "I believe management is concerned about me.",
    "On the whole, I believe work is good for my physical health.",
    "My wages are good.",
    "All my talents and skills are used at work.",
    "My opinion is respected at work.",
    "I am happy in my work.",
  ],
  scale: ["gjss1", "gjss2", "gjss3", "gjss4", "gjss5", "gjss6", "gjss7", "gjss8", "gjss9", "gjss10"],
};

const ecasList = {
  ques: [
    "I can imagine a world where people and nature are in balance.",
    "I can imagine a society where environmental protection is prioritized over short-term profit.",
    "I can imagine people making major lifestyle changes for the environment.",
    "I can imagine governments implementing strong climate policies that people support.",
    "I can imagine businesses operating in ways that restore ecosystems.",
    "I can imagine cities designed for sustainability and wellbeing.",
    "I can imagine communities sharing resources to reduce environmental harm.",
    "I can imagine future generations living better because of environmental action taken now.",
    "I can imagine global cooperation successfully addressing climate change.",
    "I can imagine a fair transition to a low-carbon society.",
  ],
  scale: ["ecas1", "ecas2", "ecas3", "ecas4", "ecas5", "ecas6", "ecas7", "ecas8", "ecas9", "ecas10"],
};

const sjsList = {
  ques: [
    "In general, the American political system operates as it should.",
    "American society is set up so that people usually get what they deserve.",
    "Most policies serve the greater good.",
    "Everyone has a fair shot at wealth and happiness.",
    "Society is getting worse every year.",
    "It is hard to succeed in the U.S. if you are not lucky.",
    "The U.S. society is fair.",
    "In general, I find society to be fair.",
  ],
  scale: ["sjs1", "sjs2", "sjs3", "sjs4", "sjs5r", "sjs6r", "sjs7", "sjs8"],
};

const utopianismList = {
  ques: [
    "I often think about what an ideal society might look like.",
    "I spend a lot of time thinking about an ideal society.",
    "It is important that people think about an ideal version of society.",
    "Thinking about ideal societies helps us improve the real world.",
  ],
  scale: ["uto1", "uto2", "uto3", "uto4"],
};

const antiUtopianismList = {
  ques: [
    "Dreaming about an ideal society could be dangerous.",
    "Focusing on an ideal society can have negative consequences.",
    "People should not try to envision an ideal society.",
    "Utopian thinking usually creates more problems than it solves.",
  ],
  scale: ["antiuto1", "antiuto2", "antiuto3", "antiuto4"],
};

const collectiveActionList = {
  ques: [
    "Sign a petition about environmental protection.",
    "Contact a public official about environmental issues.",
    "Donate money to an environmental organization.",
    "Volunteer for an environmental group.",
    "Attend a peaceful environmental protest.",
    "Share environmental action information on social media.",
    "Join a local environmental campaign.",
    "Boycott products from environmentally harmful companies.",
    "Vote for candidates with strong environmental policies.",
    "Encourage friends or family to participate in environmental action.",
  ],
  scale: ["ca1", "ca2", "ca3", "ca4", "ca5", "ca6", "ca7", "ca8", "ca9", "ca10"],
};

const piaPlaceholderList = {
  ques: ["Placeholder item for Pia's scales (to be specified)."],
  scale: ["pia_placeholder1"],
};

var items_nfc = createitems(nfcList, shuffle(nfcList));
var items_aris = createitems(arisList, shuffle(arisList));
var items_swls = createitems(swlsList, shuffle(swlsList));
var items_gjss = createitems(gjssList, shuffle(gjssList));
var items_ecas = createitems(ecasList, shuffle(ecasList));
var items_sjs = createitems(sjsList, shuffle(sjsList));
var items_utopianism = createitems(utopianismList, shuffle(utopianismList));
var items_antiutopianism = createitems(antiUtopianismList, shuffle(antiUtopianismList));
var items_collective_action = createitems(collectiveActionList, shuffle(collectiveActionList));
var items_pia_placeholder = createitems(piaPlaceholderList, [0]);
