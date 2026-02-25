/* 
Affective Imagery: 
*/
var studyCondition_global = "PersonnelSelection"; // default is PersonnelSelection

var hasShownBeforeSecondOrderAssociations = false;

var AIT_cue_visibile = "placeholder"; // set cue for AIT task
var AIT_cue = "placeholder"; // set cue for AIT task

var boolSkipAffectImgInstruction = false;
var boolSkipAffectImgRating = false; // true if no associations are entered, here "false" because forcing participants to enter associations !!!

var currenText = undefined;

var AT_Snowball_Boolean = false; // set to true if snowball effect is used, otherwise false

const AIT_AT_Inst_htmlForm = new lab.html.Form({
  title: "AIT AT Instructions",
  content: `<span id="replaceInstructions">XXX</span>`,
  tardy: true,
  skip: "${boolSkipAffectImgInstruction}",
  messageHandlers: {
    run: () => {
      $("#replaceInstructions").html(currenText);
    },
    commit: () => {
      // progress bar
      numElementsCounter++;
      document.querySelector(".progress-bar").style.width =
        (numElementsCounter / numElements) * 100 + "%";
    },
  },
});

var unsucsessfulAssociations = [];
var sucsessfulAssociations = [];
let scenario_backup;

const AffectiveImagery_htmlForm = new lab.html.Form({
  title: "AIT AT associations",
  content: `<span id="replaceTask">XXX</span>`,
  messageHandlers: {
    run: () => {
      $("#replaceTask").html(currenText);

      console.log("AT_Snowball_Boolean: 1", AT_Snowball_Boolean);

      // overwrite cue word by loop parameter
      if (!AT_Snowball_Boolean) {
        // Level 1 Associations:
        let cue_shown;
        let cue_coding;

        cue_shown = nameFutureSociety; // "described ideal future society"
        cue_coding = codingFutureSociety; // "IdealFutureSociety";

        study.options.datastore.set("cue", cue_shown);
        study.options.datastore.set("cue_coding", cue_coding);

        // L1 cue for L2 associations
        scenario_backup = cue_shown;

        AIT_cue_visibile = `<strong style="font-size:40px">${cue_shown}</strong>`; // study.options.datastore.get("cue");
        AIT_cue = cue_coding; // study.options.datastore.get("cue_coding");
      } else {
        // Level 2 Associations:
        AIT_cue_visibile = sucsessfulAssociations[global_counterInner].response;
        AIT_cue = sucsessfulAssociations[global_counterInner].response.replace(
          /_/g,
          " "
        );

        // AIT_cue_visibile = AIT_cue_visibile + "im Kontext von dem folgenden Szenario:" + scenario_backup;
        AIT_cue_visibile = `
        <strong style="font-size:42px">${AIT_cue_visibile}</strong><br>
        <span style="font-size:30px">im Kontext von dem Szenario:</span><br>
        <strong>${scenario_backup}</strong>
        `;

        console.log("global_counterInner", global_counterInner);
        console.log("global_counterOuter", global_counterOuter);
        console.log("AT_Snowball_Boolean: 2", AT_Snowball_Boolean);
        console.log("AIT_cue_visibile: ", AIT_cue_visibile);
        console.log("AIT_cue: ", AIT_cue);

        study.options.datastore.set("cue_second", AIT_cue_visibile);

        study.options.datastore.set("cue_coding_second", AIT_cue);
      }

      $("#cueWord").html(AIT_cue_visibile);
      $("#unknownResponse").hide(); // hide unknown response message to force participants to enter associations !!!

      boolSkipAffectImgInstruction = true; // skip instruction page after first run

      var timesClicked = 1;
      const placeholderLabel = ["zweite", "dritte", "vierte", "fünfte"];

      var currentElement = undefined;
      var inputValue = undefined;
      var wordCount = undefined;

      $(function () {
        $("#skipResponse").hide();
        $("#finalResponse").hide();

        /*
         // remove individual naming of input elements to avoid large number of variables within datastore
         $("#R1").attr("name", AIT_cue + "_" + "R1");
         $("#R2").attr("name", AIT_cue + "_" + "R2");
         $("#R3").attr("name", AIT_cue + "_" + "R3");
         $("#R4").attr("name", AIT_cue + "_" + "R4");
         $("#R5").attr("name", AIT_cue + "_" + "R5");
          */

        // restrict keydown event to affectiveImageryForm
        $("#affectiveImageryForm").keydown(function (e) {
          if (e.keyCode == 13) {
            // Enter key
            if (timesClicked <= 4) {
              $("#submitAssoButton").click();
              $(document).unbind("keypress");
              return false;
            }
            if (timesClicked == 5) {
              currentElement = "#R" + timesClicked;
              // only if letters entered continue
              inputValue = document.querySelector(currentElement).value.trim();
              wordCount = inputValue.split(/\s+/).filter(Boolean).length;

              if (
                inputValue.replace(/[^a-zA-Z]+/g, "").length > 2 &&
                wordCount <= 3 &&
                inputValue.length < 200
              ) {
                $("#finalResponse").click();
              } else {
                unsucsessfulAssociations.push({
                  cue: AIT_cue,
                  response: document.querySelector(currentElement).value,
                  timestamp: new Date().toISOString(),
                  valence: undefined,
                });

                document.querySelector(currentElement).value = "";
                let warningMessage =
                  "Please enter a maximum of three words, each with at least three letters, and stay under 200 characters.";
                toastr.warning(
                  warningMessage,
                  "Please enter a valid association.",
                  {
                    closeButton: true,
                    timeOut: 3000,
                    positionClass: "toast-top-center",
                    preventDuplicates: true,
                  }
                );
              }

              $(document).unbind("keypress");
              return false;
            }
          }
        });

        //$(document).on('#finalResponse mouseout',".click", () => {
        $("#submitAssoButton, #finalResponse").on("click", () => {
          console.log("timesClicked: ", timesClicked);
          // increase counter

          currentElement = "#R" + timesClicked;
          var nextElement = "#R" + (timesClicked + 1);

          // only if letters entered continue
          inputValue = document.querySelector(currentElement).value.trim();
          wordCount = inputValue.split(/\s+/).filter(Boolean).length;

          if (
            inputValue.replace(/[^a-zA-Z]+/g, "").length > 2 &&
            wordCount <= 3 &&
            inputValue.length < 200
          ) {
            // console.log("currentElement: ", currentElement);
            sucsessfulAssociations.push({
              cue: AIT_cue,
              response: document.querySelector(currentElement).value,
              timestamp: new Date().toISOString(),
              valence: undefined,
            });
            // set skip to false:
            // boolSkipAffectImgRating = false; !!!

            $("#unknownResponse").hide();
            //$("#skipResponse").show();
            $("#skipResponse").hide(); // hide skip response message to force participants to enter 5 associations !!!

            if (currentElement != "#R5") {
              // change placeholder
              document.querySelector(nextElement).placeholder =
                "Geben Sie Ihre " +
                placeholderLabel[timesClicked - 1] +
                " Assoziation ein.";
              // set disabled to true or false
              document.querySelector(currentElement).disabled = true;
              document.querySelector(nextElement).disabled = false;
            }

            // adjust prograss bar of affective imagery
            document.querySelector(".progress-bar-AffectiveImg").style.width =
              (timesClicked / 5) * 100 + "%";

            timesClicked++;

            // focus on next element
            $(nextElement).focus();

            if (timesClicked == 5) {
              $("#submitAssoButton").hide();
              $("#finalResponse").show();
            }
          } else {
            unsucsessfulAssociations.push({
              cue: AIT_cue,
              response: document.querySelector(currentElement).value,
              timestamp: new Date().toISOString(),
              valence: undefined,
            });

            document.querySelector(currentElement).value = "";
            let warningMessage =
              "Please enter a maximum of three words, each with at least three letters, and stay under 200 characters.";
            toastr.warning(
              warningMessage,
              "Please enter a valid association.",
              {
                closeButton: true,
                timeOut: 3000,
                positionClass: "toast-top-center",
                preventDuplicates: true,
              }
            );
          }
        });
      });
    },
    commit: () => {
      console.log("sucsessfulAssociations: ", sucsessfulAssociations);
      console.log("unsucsessfulAssociations: ", unsucsessfulAssociations);
      // progress bar
      numElementsCounter++;
      document.querySelector(".progress-bar").style.width =
        (numElementsCounter / numElements) * 100 + "%";
    },
  },
});

const AffectiveImageryAffect_htmlForm = new lab.html.Page({
  title: "AIT Task ratings",
  tardy: true,
  skip: "${boolSkipAffectImgRating}",
  items: [
    {
      required: true,
      type: "likert",
      items: [
        {
          label: "entry1",
          coding: "AR1",
        },
        {
          label: "entry2",
          coding: "AR2",
        },
        {
          label: "entry3",
          coding: "AR3",
        },
        {
          label: "entry4",
          coding: "AR4",
        },
        {
          label: "entry5",
          coding: "AR5",
        },
      ],
      width: "7",
      anchors: [
        "sehr negativ",
        "negativ",
        "etwas negativ",
        "neutral",
        "etwas positiv",
        "positiv",
        "sehr positiv",
      ],
    
label: `Bitte geben Sie an, inwieweit Sie Ihre genannten Worte oder Gedanken zu 
<br><strong id="cueWord_rating" style="font-size: 16px; display: inline-block; margin-left: 25px;">XXX</strong>
<br> als positiv oder negativ wahrnehmen:`,
      help: "Lesen Sie jeden Ihrer Worte oder Gedanken und markieren Sie dann die Antwortoption, die am besten zutrifft.",
      shuffle: true,
      name: "${AIT_cue}",
    },
  ],
  submitButtonText: "Weiter →",
  submitButtonPosition: "right",
  width: "l",
  messageHandlers: {
    run: function anonymous() {
      // add id to button
      $('button[type="submit"][form="page-form"]').attr("id", "continue");

      $("#cueWord_rating").html(AIT_cue_visibile);

      $("td.small:contains('entry1')").html(sucsessfulAssociations[0].response);
      $("td.small:contains('entry2')").html(sucsessfulAssociations[1].response);
      $("td.small:contains('entry3')").html(sucsessfulAssociations[2].response);
      $("td.small:contains('entry4')").html(sucsessfulAssociations[3].response);
      $("td.small:contains('entry5')").html(sucsessfulAssociations[4].response);

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

      // remove empty elements
      if ($(".page-item-table > tbody > tr > td")[32].innerText.length == 0) {
        $(".page-item-table > tbody > tr")[4].remove();
      }
      if ($(".page-item-table > tbody > tr > td")[24].innerText.length == 0) {
        $(".page-item-table > tbody > tr")[3].remove();
      }
      if ($(".page-item-table > tbody > tr > td")[16].innerText.length == 0) {
        $(".page-item-table > tbody > tr")[2].remove();
      }
      if ($(".page-item-table > tbody > tr > td")[8].innerText.length == 0) {
        $(".page-item-table > tbody > tr")[1].remove();
      }
      if ($(".page-item-table > tbody > tr > td")[0].innerText.length == 0) {
        $(".page-item-table > tbody > tr")[0].remove();
      }

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

      // Get the choosen values
      $("tbody tr").each(function () {
        let rowLabel = $(this).find("td.small").text().trim();
        let selected = $(this).find('input[type="radio"]:checked').val();
        let name = $(this).find('input[type="radio"]').attr("name");

        /*
        console.log({
          label: rowLabel,
          name: name,
          selectedValue: selected || null,
        });
        */

        sucsessfulAssociations.forEach((element) => {
          if (element.response == rowLabel) {
            element.valence = selected || null;
          }
        });
      });
    },
  },
  commit: () => {
    // progress bar
    numElementsCounter++;
    document.querySelector(".progress-bar").style.width =
      (numElementsCounter / numElements) * 100 + "%";
  },
});
