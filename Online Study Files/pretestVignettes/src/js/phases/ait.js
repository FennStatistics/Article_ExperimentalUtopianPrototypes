/* 
################### Association Task: Mini Snowball word association task ###################
*/

const transitionToAITText = `
  <header>
      <h2>Thank you for completing the Reaction Time Task!</h2>
</header>

<main class="content-horizontal-center content-vertical-center">
  <div class="w-xl text-justify">
          <section>
               <p>You have completed the reaction time task. Next, you will move on to the <strong>Word Association Task</strong>. This task involves responding to a specific word with the first thoughts or associations that come to mind. Please read the instructions for this task carefully before starting.</p>
          </section>
  </div>
</main>
<form id="page-form">
</form>

<footer class="content-vertical-center content-horizontal-right">
  <button id="continue" type="submit" form="page-form">
      Continue &rarr;
  </button>
</footer>
  `;

const AT_Snowball_Inst_Text = `
<header>
  <h2>Instructions: "Word Association Task"</h2>
</header>

<main class="content-horizontal-center content-vertical-center">
  <div class="w-xl text-justify">
    <strong>How it works...</strong>
    <section>
      A scenario will be described at the top of the screen. Please enter the first word or thought
      that comes to mind when you imagine this scenario.
    </section>
    <br>
    <section>
      Use the 
      <button style="padding:2px; margin-left:0px; margin-right: 0px; font-size: 30px;" disabled="disabled">Enter</button>
      key or click the 
      <button style="padding:2px; margin-left:0px; margin-right: 0px; font-size: 30px;" disabled="disabled">Next response</button>
      button to enter a total of five associations.
    </section>
    <br>
    <br>
    <strong>Notes:</strong>
    <section>
      <ul>
        <li>Please avoid repetitions and full sentences.</li>
        <li>Please only provide associations to the scenario described above.</li>
        <li>Respond as spontaneously as possible.</li>
      </ul>
    </section>
  </div>
</main>

<form id="page-form">
</form>

<footer class="content-vertical-center content-horizontal-right">
  <button id="continue" type="submit" form="page-form">
    Continue &rarr;
  </button>
</footer>
      `;

const AT_Snowball_Task_Text = `
       <main class="content-horizontal-center content-vertical-center">
      <div style="width: 90%; text-align: center;">
<span id="replaceTextTop">Enter words or thoughts that come to mind when you imagine the following:</span>
          <br>
          <br>
    <div style="align-items: display: flex;">
         <span id="cueWord" style="font-size: 36px;">replace me</span>

    </div>
    <br>
        <form id="affectiveImageryForm">
          <div class="affectiveImagery">
              <div class="form-group">
                  <input id="R1" name="R1" class="form-control" placeholder="Enter your first association." type="text"
                      autocorrect="off" autocapitalize="none" autofocus autocomplete="off" tabindex="1">
              </div>
              <div class="form-group">
                  <input id="R2" name="R2" class="form-control" placeholder="" type="text" autocorrect="off"
                      autocapitalize="none" autofocus="" autocomplete="off" tabindex="2" disabled="">
              </div>
              <div class="form-group">
                  <input id="R3" name="R3" class="form-control" placeholder="" type="text" autocorrect="off"
                      autocapitalize="none" autofocus="" autocomplete="off" tabindex="3" disabled="">
              </div>
              <div class="form-group">
                  <input id="R4" name="R4" class="form-control" placeholder="" type="text" autocorrect="off"
                      autocapitalize="none" autofocus="" autocomplete="off" tabindex="4" disabled="">
              </div>
              <div class="form-group">
                  <input id="R5" name="R5" class="form-control" placeholder="" type="text" autocorrect="off"
                      autocapitalize="none" autofocus="" autocomplete="off" tabindex="5" disabled="">
              </div>
    
              <small class="text-muted" id="progressLabel">Progress</small>
            
              <div class="progress" style="background: white;">
                <div class="progress-bar-AffectiveImg" style="background: #229954;"> 
              </div>
            </div>
    
    
            <div style="align-items: display: flex;">
            <!-- Prevent implicit submission of the form -->
            <button type="submit" disabled style="display: none" aria-hidden="true"></button>
          
<button type="button" class="btn btn-default" tabindex="-1" id="submitAssoButton">
  <span class="glyphicon glyphicon-plus"></span>&nbsp;Next response
</button>
<button type="submit" class="btn btn-default" tabindex="-1" id="finalResponse">
  <span class="glyphicon glyphicon-ok" form="affectiveImageryForm"></span>&nbsp;Finish
</button>
<button type="submit" class="btn btn-default" tabindex="-1" id="skipResponse">
  <span class="glyphicon glyphicon-minus" form="affectiveImageryForm"></span>&nbsp;No more entries
</button>
<button type="submit" class="btn btn-default" tabindex="-1" id="unknownResponse">
  <span class="glyphicon glyphicon-remove" form="affectiveImageryForm"></span>&nbsp;Unknown word
</button>

              </div>
          </div>
      </form>
      </div>
      
    </main>
        `;

const AffectiveImageryInst_Text = `
  <header>
  <h2>Instructions "Word Association Game" </h2>
</header>

<main class="content-horizontal-center content-vertical-center">
  <div class="w-xl text-justify">
      <strong>How it works...</strong>
      <section>
          At the top of the screen, a word will be shown. Enter the first word that comes to mind when reading that
          word.
      </section>
      <br>
      <section>
              Use the <kbd>Enter</kbd> key or press the <button style="padding:2px; margin-left:0px; margin-right: 0px; font-size: 30px;" disabled="disabled">Next
              response</button> button to add five associations.
      </section>
      <br>
      <br>
      <strong>Hint</strong>
      <section>
          Only give associations to the word on top of the screen (not to your previous responses!).
      </section>
  </div>
</main>
<form id="page-form">
</form>

<footer class="content-vertical-center content-horizontal-right">
  <button id="continue" type="submit" form="page-form">
      Continue &rarr;
  </button>
</footer>
  `;

const AffectiveImageryInst_full_Text = `
   <header>
   <h2>Instructions "Word Association Game" </h2>
 </header>
 
 <main class="content-horizontal-center content-vertical-center">
   <div class="w-xl text-justify">
       <strong>How it works...</strong>
       <section>
           At the top of the screen, a word will be shown. Enter the first word that comes to mind when reading that
           word. Only if you really don't know that word, press <button
               style="padding:2px; margin-left:0px; margin-right: 0px;" disabled="disabled">Unknown word</button>.
       </section>
       <br>
       <section>
           Press <button style="padding:2px; margin-left:0px; margin-right: 0px;" disabled="disabled">Next
               response</button> to add up to five words or press <button
               style="padding:2px; margin-left:0px; margin-right: 0px;" disabled="disabled">No more
               entries</button> if you can't think of any more.
               <br>
               <br>
               Use the <kbd>Enter</kbd> key or press the <button style="padding:2px; margin-left:0px; margin-right: 0px;" disabled="disabled;>Next
               response</button> button to add associations.
       </section>
       <br>
       <br>
        <strong>  Some hints:</strong>
       <section>
           Only give associations to the word on top of the screen (not to your previous responses!).
       </section>
   </div>
 </main>
 <form id="page-form">
 </form>
 
 <footer class="content-vertical-center content-horizontal-right">
   <button id="continue" type="submit" form="page-form">
       Continue &rarr;
   </button>
 </footer>
   `;

const AffectiveImagery_Text = `
   <main class="content-horizontal-center content-vertical-center">
   <div>
       Enter words or thoughts that come to mind when you imagine the following scenario:
       <br>
       <br>
 <div style="align-items: display: flex;"> <strong style="font-size: 22px;">
      <span id="cueWord" style="font-size: 36px;">replace me</span>
 </strong>
 </div>
 <br>
     <form id="affectiveImageryForm">
       <div class="affectiveImagery">
           <div class="form-group">
               <input id="R1" name="R1" class="form-control" placeholder="Enter your first association" type="text"
                   autocorrect="off" autocapitalize="none" autofocus autocomplete="off" tabindex="1">
           </div>
           <div class="form-group">
               <input id="R2" name="R2" class="form-control" placeholder="" type="text" autocorrect="off"
                   autocapitalize="none" autofocus="" autocomplete="off" tabindex="2" disabled="">
           </div>
           <div class="form-group">
               <input id="R3" name="R3" class="form-control" placeholder="" type="text" autocorrect="off"
                   autocapitalize="none" autofocus="" autocomplete="off" tabindex="3" disabled="">
           </div>
           <div class="form-group">
               <input id="R4" name="R4" class="form-control" placeholder="" type="text" autocorrect="off"
                   autocapitalize="none" autofocus="" autocomplete="off" tabindex="4" disabled="">
           </div>
           <div class="form-group">
               <input id="R5" name="R5" class="form-control" placeholder="" type="text" autocorrect="off"
                   autocapitalize="none" autofocus="" autocomplete="off" tabindex="5" disabled="">
           </div>
 
           <small class="text-muted" id="progressLabel">Progress</small>
         
           <div class="progress" style="background: white;">
             <div class="progress-bar-AffectiveImg" style="background: #229954;"> 
           </div>
         </div>
 
 
         <div style="align-items: display: flex;">
         <!-- Prevent implicit submission of the form -->
         <button type="submit" disabled style="display: none" aria-hidden="true"></button>
       
               <button type="button" class="btn btn-default" tabindex="-1" id="submitAssoButton"><span
                       class="glyphicon glyphicon-plus"></span>&nbsp;Next response</button>
               <button type="submit" class="btn btn-default" tabindex="-1" id="finalResponse"><span
                        class="glyphicon glyphicon-ok" form="affectiveImageryForm"></span>&nbsp;Finish</button>
               <button type="submit" class="btn btn-default" tabindex="-1" id="skipResponse"><span
                       class="glyphicon glyphicon-minus" form="affectiveImageryForm"></span>&nbsp;No more entries</button>
               <button type="submit" class="btn btn-default" tabindex="-1" id="unknownResponse"><span
                       class="glyphicon glyphicon-remove" form="affectiveImageryForm"></span>&nbsp;Unknown word</button>
           </div>
       </div>
   </form>
   </div>
   
 </main>
   `;

const beforeSecondOrderAssociationsText = "";

// Transition from APT to AIT
const TransitionToAIT_htmlForm = new lab.html.Form({
  title: "TransitionToWAG",
  content: transitionToAITText,
  messageHandlers: {
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
        <span style="font-size:30px">in the context of the scenario:</span><br>
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
        "very negative",
        "negative",
        "somewhat negative",
        "neutral",
        "somewhat positive",
        "positive",
        "very positive",
      ],

label: `Please indicate how positive or negative you perceive the words or thoughts you listed for 
<br><strong id="cueWord_rating" style="font-size: 16px; display: inline-block; margin-left: 25px;">XXX</strong>`,
      help: "Read each of your words or thoughts and then select the response option that fits best.",
      shuffle: true,
      name: "${AIT_cue}",
    },
  ],
  submitButtonText: "Continue →",
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

// task
let global_counterInner = 0;
let global_counterOuter = 0;
// loop inner
const text = new lab.html.Screen({
  title: "random text",
  content: `
  <span id="replaceText">XXX</span> 
  `,
  timeout: 200,
  messageHandlers: {
    run: () => {
      $("#replaceText").html(global_counterOuter + "aa" + global_counterInner);
      global_counterInner++;
    },
  },
});

const updateParams_inner_before = new lab.html.Screen({
  title: "updateParams inner before AT",
  content: `
  `,
  timeout: 100,
  messageHandlers: {
    run: () => {
      AT_Snowball_Boolean = true; // set boolean to true

      // do not show affective imagery rating after first round
      boolSkipAffectImgRating = true;
    },
  },
});

const updateParams_inner_after = new lab.html.Screen({
  title: "updateParams after before AT",
  content: `
  `,
  timeout: 100,
  messageHandlers: {
    run: () => {
      global_counterInner++;
    },
  },
});

const SequenceTestInner = new lab.flow.Sequence({
  title: "Sequence Test Inner",
  shuffle: false,
  content: [
    updateParams_inner_before,
    AffectiveImagery_htmlForm,
    updateParams_inner_after,
  ],
});

const loopInner = new lab.flow.Loop({
  template: SequenceTestInner,
  templateParameters: [
    {
      not_needed: "",
    },
  ],
  sample: {
    mode: "draw-shuffle",
    n: "1",
  },
});

// loop outer
const updateParams_outer = new lab.html.Screen({
  title: "updateParams outer loop",
  content: `
  `,
  timeout: 100,
  messageHandlers: {
    run: () => {
      // store associations arrays in datastore
      study.options.datastore.set(
        "unsucsessfulAssociations",
        unsucsessfulAssociations
      );
      study.options.datastore.set(
        "sucsessfulAssociations",
        sucsessfulAssociations
      );

      global_counterOuter++;
      global_counterInner = 0; // reset inner counter

      // reset associations arrays
      sucsessfulAssociations = [];
      unsucsessfulAssociations = [];
    },
  },
});

let instructionsResetDone_AT_Snowball = false; // <-- flag to track if reset has happened

const updateText_Inst_AT_Snowball = new lab.html.Screen({
  title: "Update Text AT Snowball Instructions",
  content: `
  `,
  timeout: 50,
  messageHandlers: {
    run: () => {
      currenText = AT_Snowball_Inst_Text;

      if (!instructionsResetDone_AT_Snowball) {
        boolSkipAffectImgInstruction = false;

        instructionsResetDone_AT_Snowball = true; // mark as done
      } else {
        boolSkipAffectImgInstruction = true; // skip instruction page after first run
      }
    },
  },
});

const updateText_Task_AT_Snowball = new lab.html.Screen({
  title: "Update Text AT Snowball Task",
  content: `
  `,
  timeout: 50,
  messageHandlers: {
    run: () => {
      currenText = AT_Snowball_Task_Text;
    },
  },
});

// !!!
const beforeSecondOrderAssociations_htmlForm = new lab.html.Form({
  title: "before second order associations",
  content: beforeSecondOrderAssociationsText,
  skip: "${ hasShownBeforeSecondOrderAssociations }",
  messageHandlers: {
    run: function anonymous() {
      if (studyCondition_global == "PersonnelSelection") {
        $("#scenarioText").html(
          "A person supervises AI that conducts personnel selection."
        );
      } else {
        $("#scenarioText").html(
          "A person supervises AI that performs medical diagnostics."
        );
      }
    },
  },
});

const SequenceTestOuter = new lab.flow.Sequence({
  title: "Sequence Test Outer",
  shuffle: false,
  content: [
    updateText_Inst_AT_Snowball,
    AIT_AT_Inst_htmlForm,
    updateText_Task_AT_Snowball,
    AffectiveImagery_htmlForm,
    AffectiveImageryAffect_htmlForm,
    // beforeSecondOrderAssociations_htmlForm,
    // loopInner,
    updateParams_outer,
  ],
});

const loopOuter = new lab.flow.Loop({
  template: SequenceTestOuter,
  templateParameters: [
    {
      not_needed2: "",
    },
  ],
  sample: {
    mode: "draw-shuffle",
    n: "1",
  },
});
