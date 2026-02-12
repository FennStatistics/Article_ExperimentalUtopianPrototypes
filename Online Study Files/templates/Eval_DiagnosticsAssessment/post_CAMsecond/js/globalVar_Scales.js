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
/* items van der Linden - Biospheric Values 2015 */
let vanLindenBiosphericList = {
  ques: ["Respekt vor der Erde (Harmonie mit anderen Arten)",
  "Schutz der Umwelt (Erhaltung der Natur)",
  "Vermeidung von Umweltverschmutzung (Schutz der natürlichen Ressourcen)",
  "Einheit mir der Natur (Einfügen in die Natur)"],
  scale: ["1biospheric","2biospheric","3biospheric","4biospheric"]
};

var index_vanLindenBiosphericList = shuffle(vanLindenBiosphericList);
console.log("vanLindenBiosphericList: ", vanLindenBiosphericList);
console.log("vanLindenBiosphericList index: ", index_vanLindenBiosphericList);

var items_vanLindenBiospheric = createitems(vanLindenBiosphericList, index_vanLindenBiosphericList);
console.log(items_vanLindenBiospheric.slice(0, 4));


/* items van der Linden - Risk Perception 2015 */
let vanLindenRiskList = {
  ques: ["Wie ernst ist Ihrer Meinung nach die Bedrohung, die der Klimawandel  für die natürliche Umwelt darstellt?",
  "Wie ernst würden Sie die Auswirkungen des Klimawandels auf der ganzen Welt einschätzen?",
  "Wie ernst ist Ihrer Meinung nach die Bedrohung, die der Klimawandel für Sie persönlich darstellt?",
  "Wie ernst würden Sie die Auswirkungen des Klimawandels für Deutschland einschätzen?"],
  scale: ["1riskProb","2riskProb","3riskProb","4riskProb"]
};

var index_vanLindenRiskList = shuffle(vanLindenRiskList);
console.log("vanLindenRiskList: ", vanLindenRiskList);
console.log("vanLindenRiskList index: ", index_vanLindenRiskList);

var items_vanLindenRisk = createitems(vanLindenRiskList, index_vanLindenRiskList);
console.log(items_vanLindenRisk.slice(0, 4));

/* policy items */
let policyItemsList = {
  ques: ["Ausbau der öffentlichen Verkehrsmittel (Busse, Straßenbahnen, Züge).",
  "Verbot des Verkaufs von Autos mit Diesel- und Benzinmotoren.",
  "Erhöhung der Subventionen für Alternativen zum Fliegen.",
  "Erhöhung oder Einführung von Steuern auf Flugreisen.",
  "Erhöhung der Subventionen für erneuerbare Energieprojekte (z.B. Wind- und Solarenergie).",
  "Erhöhung der Preise für den Stromverbrauch in Spitzenzeiten.",
  "Erhöhung oder Einführung von Steuern auf rotes Fleisch (z. B. Rindfleisch, Lammfleisch, Kalbfleisch).",
  "Erhöhung der Subventionen für Lebensmittel mit geringen Treibhausgasemissionen (z. B. Obst, Gemüse, Hülsenfrüchte, Getreide)."],
  scale: ["1","2","3","4","5","6","7","8"]
};

var index_policyItemsList = shuffle(policyItemsList);
console.log("policyItemsList: ", policyItemsList);
console.log("policyItemsList index: ", index_policyItemsList);

var items_policyItems = createitems(policyItemsList, index_policyItemsList);
console.log(items_policyItems.slice(0, 4));