/* 
Survey Scales: 
*/



/*
Use the modern version of the Fisher–Yates shuffle algorithm:
https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_modern_algorithm
*/
function shuffle(queslist) {
  let array_emp = [];
  for (var i = 0; i < queslist.ques.length; i++) {
    array_emp.push(i);
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

function createitems(queslist, quesindex) {
  let quesitems = [];
  for (i = 0; i < queslist.ques.length; i++) {
    let tmp_ques = queslist.ques[quesindex[i]];
    let tmp_label = queslist.scale[quesindex[i]];

    quesitems.push({
      label: tmp_ques,
      coding: tmp_label,
    });
  }
  return quesitems;
}


/* items of perceived ecological dimension */
let EcologyItemsList = {
  ques: [
    `The <span id="techname">XXX</span> is environmentally friendly.`,
    `The <span id="techname">XXX</span> helps to save resources.`,
    `The <span id="techname">XXX</span> has more environmental benefits compared to similar products.`,
    `The <span id="techname">XXX</span> has a positive impact on the environment in that it extends the life of discarded materials. `
  ],
  scale: ["1", "2", "3", "4"]
};

var index_EcologyItemsList = shuffle(EcologyItemsList);
console.log("EcologyItemsList: ", EcologyItemsList);
console.log("EcologyItemsList index: ", index_EcologyItemsList);

var items_Ecology = createitems(EcologyItemsList, index_EcologyItemsList);
console.log(items_Ecology.slice(0, 4));



/* items of perceived bioinspiration */
let BioinspirationItemsList = {
  ques: [
    // Visual Resemblance to Nature 
    `The <span id="techname">XXX</span> sounds like something I might find in the natural world.`,
    `The <span id="techname">XXX</span>’s description reminds me of an animal, plant, or natural environment.`,
    `In this <span id="techname">XXX</span>  I can easily imagine forms that imitate living creatures or natural patterns.`,
    `Imagining the look of the <span id="techname">XXX</span>, I do not think of examples from the natural world.`,
    // Intentionality & Perceived Inspiration 
    `It seems clear the designers deliberately took ideas from living nature for <span id="techname">XXX</span>.`,
    `The <span id="techname">XXX</span> does not seem to be directly modeled on observations of living beings.`,
    `I feel the designers of the <span id="techname">XXX</span> made a purposeful attempt to take inspiration from the natural world.`,
    `I believe the <span id="techname">XXX</span>  was planned with examples from living nature firmly in mind.`,
    // Perceived Naturalness
    `The <span id="techname">XXX</span> gives off a natural vibe, like it belongs in a natural environment.`,
    `The <span id="techname">XXX</span> does not strike me as a typical human-made device.`,
    `The <span id="techname">XXX</span> fits seamlessly with natural surroundings when I imagine it in place.`,
    `Overall, the <span id="techname">XXX</span> comes across as a naturally derived, rather than purely engineered, object.`
  ],
  scale: ["VRtN1", "VRtN2", "VRtN3", "VRtN4r", "IPI1", "IPI2r", "IPI3", "IPI4", "PN1", "PN2r", "PN3", "PN4"]
};



var index_BioinspirationItemsList = shuffle(BioinspirationItemsList);
console.log("BioinspirationItemsList: ", BioinspirationItemsList);
console.log("BioinspirationItemsList index: ", BioinspirationItemsList);

var items_Bioinspiration = createitems(BioinspirationItemsList, index_BioinspirationItemsList);
console.log(items_Bioinspiration.slice(0, 4));

/* IF PICTURED TECH IS A ROBOT, THEN USE THESE ITEMS 
  ques: [
    // Visual Resemblance to Nature 
  `The <span id="techname">XXX</span> looks like something I might find in the natural world.`,
  `The <span id="techname">XXX</span>’s overall shape reminds me of an animal, plant, or natural environment.`,
  `In this <span id="techname">XXX</span> I can easily spot forms that imitate living creatures or natural patterns.`,
  `Looking at the <span id="techname">XXX</span>, I do not think of examples from the natural world.`,
  // Intentionality & Perceived Inspiration 
  `It seems clear the designers deliberately took ideas from living nature for the <span id="techname">XXX</span>.`,
  `The <span id="techname">XXX</span> does not appear to be directly modeled on observations of living beings.`,
  `I feel the designers of the <span id="techname">XXX</span> made a purposeful attempt to take inspiration from the natural world.`,
  `I believe the <span id="techname">XXX</span> was planned with examples from living nature firmly in mind.`,
  // Perceived Naturalness
  `The <span id="techname">XXX</span> gives off a natural vibe, like it belongs in a natural environment.`,
  `The <span id="techname">XXX</span> does not strike me as a typical human-made device.`,
  `The <span id="techname">XXX</span> fits seamlessly with natural surroundings when I imagine it in place.`,
  `Overall, the <span id="techname">XXX</span> comes across as a naturally derived, rather than purely engineered, object.`
  ],

*/