/* 
Affective Imagery: 
*/
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

const AffectiveImagery_htmlForm = new lab.html.Form({
  title: "AIT AT associations",
  content: `<span id="replaceTask">XXX</span>`,
  messageHandlers: {
    run: () => {
      $("#replaceTask").html(currenText);

        console.log("AT_Snowball_Boolean: 1", AT_Snowball_Boolean);

      // overwrite cue word by loop parameter
      if (!AT_Snowball_Boolean) {
        AIT_cue_visibile = study.options.datastore.get("cue");
        AIT_cue = study.options.datastore.get("cue_coding");
      } else {
        AIT_cue_visibile = sucsessfulAssociations[global_counterInner].response;
        AIT_cue = sucsessfulAssociations[global_counterInner].response.replace(/_/g, " ");

        console.log("global_counterInner", global_counterInner);
        console.log("global_counterOuter", global_counterOuter);
        console.log("AT_Snowball_Boolean: 2", AT_Snowball_Boolean);
        console.log("AIT_cue_visibile: ", AIT_cue_visibile);
        console.log("AIT_cue: ", AIT_cue);


        study.options.datastore.set(
          "cue_second",
          AIT_cue_visibile
        );

        study.options.datastore.set(
          "cue_coding_second",
          AIT_cue
        );


      }

      $("#cueWord").html(AIT_cue_visibile);
      $("#unknownResponse").hide(); // hide unknown response message to force participants to enter associations !!!


      boolSkipAffectImgInstruction = true; // skip instruction page after first run

      var timesClicked = 1;
      const placeholderLabel = ["second", "third", "fourth", "fifth"];

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
                  timestamp: new Date().toISOString()
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
              timestamp: new Date().toISOString()
            });
            // set skip to false:
            boolSkipAffectImgRating = false;

            $("#unknownResponse").hide();
            //$("#skipResponse").show();
            $("#skipResponse").hide(); // hide skip response message to force participants to enter 5 associations !!!

            if (currentElement != "#R5") {
              // change placeholder
              document.querySelector(nextElement).placeholder =
                "Enter your " +
                placeholderLabel[timesClicked - 1] +
                " association.";
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
              timestamp: new Date().toISOString()
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