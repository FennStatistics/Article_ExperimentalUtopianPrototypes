/* 
################### Start of Study ###################
*/

const greetingsText = `
   <header>
   <div class="row">
   <div class="column2">
   <h2>Thank you for participating in a study by the Cognition, Action, and Sustainability Unit of the University of
   Freiburg!</h2>
 </div>
   <div class="column">
   <img src="src/static/UniFreiburg_logo.png" alt="UniFreiburg_logo" style="width:70%; max-height: 150px; max-width: 150px;">
   </div>
 </div> 
 </header>
 <main class="content-horizontal-center content-vertical-center">
   <div class="w-xl text-justify">

        <i> Important note: You can always zoom in or out so you can read the text and images more easily: </i>
       <ul>
           <li>
               Windows: Hold down the <kbd>Ctrl</kbd> key and move your mouse wheel or press the <kbd>+</kbd> or
               <kbd>-</kbd> key on your keyboard
           </li>
           <li>Mac: Press and hold the <kbd>command</kbd> key and move your mouse wheel or press the <kbd>+</kbd> or
               <kbd>-</kbd> key on your keyboard
       </ul>
       <br>     
        <section>
             This study examines how people respond to different descriptions of possible future societies. During the study,
             we will record your responses and interaction data (for example, your choices, response times, and whether you leave full screen).
        </section>
        <br>
        <section>
            The study takes no more than <strong>XXX minutes</strong>. Please use a <strong>computer or
                laptop with a keyboard</strong> and make sure you are in a quiet place where you can speak into your microphone later in the study.
             Please complete the study without interruptions. On the next page, you will review the informed consent.
        </section>
   </div>
 </main>
 
 <form id="page-form">
 </form>
 
 <footer class="content-vertical-center content-horizontal-right">
   To continue the study, please press &nbsp;
   <button id="continue" type="submit" form="page-form">
       Continue &rarr;
   </button>
 </footer>
   `;

const informConText = `

<header>
  <h2>Informed Consent</h2>
</header>

<main class="content-horizontal-center content-vertical-center">
  <div class="w-xl text-justify">
    <p>Dear participant,</p>
    <p>Thank you for taking part in a study conducted by the Department of General Psychology at the University of Freiburg. Please read the information below carefully.</p>

    <p><b>Voluntariness.</b> Your participation in this study is <strong>voluntary</strong>. You may stop the study at any time without giving a reason and without any disadvantage. To do so, simply close the browser window. However, if you stop the study early, you will not be able to complete it and therefore will not be entitled to compensation.</p>
    <p>Participation in this online study <strong>does not involve any unusual burdens or risks</strong>. For taking part, you will receive the payment amount listed on Prolific.</p>


    <p><b>Anonymization and storage of the data.</b> The data collected in this online study will be <strong>fully anonymized</strong> during collection and storage. The data will be stored for at least 10 years. Because the data is collected anonymously, it cannot be linked back to your identity. For the same reason, we cannot identify or delete your individual data set after collection, including if you stop the study early.</p>


<p><b>Publication of collected data.</b> Your data will be used <strong>exclusively for scientific purposes</strong>. Any publications will feature only fully anonymized data—no audio files will be publicly shared. Anonymized datasets may be made publicly available through platforms like the Open Science Framework (OSF) or GitHub for scientific research purposes.</p>

    <p><b>Responsibilities.</b> This study follows the <strong>recommendations of the German Research Foundation (DFG) and the German Psychological Society (DGPs)</strong> for research quality and transparency.</p>
    
    <p>If you have any questions now or after the study, please contact the principal investigator Julius Fenn:</p>

    <p>
        <strong>Julius Fenn</strong><br>
        <a href="mailto:julius.fenn@psychologie.uni-freiburg.de">julius.fenn@psychologie.uni-freiburg.de</a> or <br>
        University of Freiburg<br>
        Institute of Psychology<br>
        Department of General Psychology<br>
        Engelbergerstrasse 41<br>
        79106 Freiburg, Germany
    </p>
    <br>
    <form id="page-form" style="display: block;" autocomplete="off">
      <div class="page-item page-item-radio" id="page-item-ques_dummycam">
        <p class="text-left font-weight-bold" style="margin: 1rem 0 0.25rem">
          Please choose one of the following options:
        </p>
        <p class="small text-muted hide-if-empty" style="margin: 0.25rem 0">
          If you do not consent, the study will end.
        </p>
        <table class="table-plain page-item-table">
          <colgroup>
            <col style="width: 7.5%">
            <col style="width: 92.5%">
          </colgroup>
          <tbody>
            <tr>
              <td>
                <input type="radio" name="dummy_informedconsent" value="1" id="dummy_informedconsent" required>
              </td>
              <td>
                <label for="dummy_informedconsent" class="text-left">
                  I confirm that I have understood the information above and <strong>agree</strong> to participate in the study.
                </label>
              </td>
            </tr>
            <tr>
              <td>
                <input type="radio" name="dummy_informedconsent" value="0" id="dummy_informedconsent2" required>
              </td>
              <td>
                <label for="dummy_informedconsent2" class="text-left">
                  I confirm that I have understood the information above and <strong>do not agree</strong> to participate in the study.
                </label>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </form>
  </div>
</main>

<footer class="content-vertical-center content-horizontal-right">
  <button id="continue" type="submit" form="page-form">
    Continue &rarr;
  </button>
</footer>
   `;

const informConNoText = `
   <header></header>
   <main class="content-horizontal-center content-vertical-center">
   <div class="w-xl text-justify">
   <section>
        You did not agree to the informed consent, so the study cannot continue. You may now close this screen. Press the <kbd>Esc</kbd> key to exit fullscreen mode.
   </section>
 </div>
 </main>
   `;

const exclusionCriteriaText = `
   <header>
       <h2>Before you begin</h2>
  </header>
  
  <main class="content-horizontal-center content-vertical-center">
      <div class="w-xl text-justify">
          <section>
               Please keep the following in mind while completing the study:
          </section>
          <br>
          <ul>
               <li>Please complete the study carefully and with your full attention.</li>
               <li>Please stay on the study page unless you are explicitly asked to do something else.</li>
               <li>Please read all instructions carefully before responding.</li>
               <li>Please do not use bots or AI tools (for example, ChatGPT) to answer any part of this study.</li>
           </ul>
 <br>
 We care about data quality. To measure your views as accurately as possible, please answer each question thoughtfully and honestly.
 <br>
<form id="page-form">
  <div aria-hidden="true" style="position:absolute; left:-9999px; width:1px; height:1px; opacity:0; overflow:hidden;">
    <label for="hp_exclusionCriteria">Instruction check: please type EXACTLY "I read the instructions" in the box below.</label>
    <input type="text" id="hp_exclusionCriteria" name="hp_exclusionCriteria" autocomplete="off" tabindex="-1">
  </div>
<!-- see: https://www.qualtrics.com/blog/attention-checks-and-data-quality/ -->
<!-- multiple choice + text field --> 
<div class="page-item page-item-radio" id="page-item-ques_dummycam">
 <p class="text-left font-weight-bold" style="margin: 1rem 0 0.25rem">
   Do you agree to provide thoughtful answers in this survey?
 </p>
 <p class="text-left small text-muted hide-if-empty" style="margin: 0.25rem 0">
 </p>

 <table class="table-plain page-item-table">
   <colgroup>
     <col style="width: 7.5%">
     <col style="width: 92.5%">
   </colgroup>
<tbody>
<!--ans1--> 
<tr>
 <td>
   <input type="radio" name="commCheck" value="0" id="commCheck" required="">
 </td>
 <td>
   <label for="commCheck" class="text-left" style="font-size:26px">
    I can't promise that
   </label>
 </td>
</tr>
<!--ans2--> 
<tr>
 <td>
   <input type="radio" name="commCheck" value="1" id="commCheck2" required="">
 </td>
 <td>
   <label for="commCheck2" class="text-left" style="font-size:26px">
    Yes, I will
      </label>
 </td>
</tr>
<tr>
 <td>
   <input type="radio" name="commCheck" value="2" id="commCheck3" required="">
 </td>
 <td>
   <label for="commCheck3" class="text-left" style="font-size:26px">
    No, I will not
      </label>
 </td>
</tr>
</tbody>
</table>
</div>
<!-- END multiple choice + text field --> 


     </div>
 </main>

 </form>
 
 <footer class="content-vertical-center content-horizontal-right">
     <button id="continue" type="submit" form="page-form">
         Continue &rarr;
     </button>
 </footer>
   `;

const attentionCheckText = `
   <header>
      <h2>Before starting the study, we'd like to get to know you:</h2>
   </header>
   
   <main class="content-horizontal-center content-vertical-center">
   <div class="w-xl text-justify">
 <section>
 Most modern theories of decision-making recognize the fact that decisions do not take place in a vacuum. Individual preferences and knowledge, along with situational variables, 
 can greatly impact the decision process. To facilitate our research on attitudes towards emerging technologies, we are interested in knowing certain factors about you, 
 the decision-maker. Specifically, we are interested in whether you take the time to read the instructions; if not, then some of the specific characteristics of 
 the described emerging technologies can be overlooked. So, to demonstrate that you have read the instructions, please ignore the sports items below and instead 
  select the box marked "Other" and type "I read the instructions" in the text box, then click continue. Thank you very much.
 </section>
 <br>
 <br>
 <section >
 <b>Which of these activities do you engage in regularly?</b>
 <br>
 Please check all that apply.
 <br>
 <fieldset id="checkArray"  style="text-align: left; padding: 5px;">
   <div>
     <input type="checkbox" id="attCheck_Skiing" name="attCheck_Skiing">
     <label for="attCheck_Skiing">Skiing</label>
   </div>
   <div>
     <input type="checkbox" id="attCheck_Swimming" name="attCheck_Swimming">
     <label for="attCheck_Swimming">Swimming</label>
   </div>
   <div>
   <input type="checkbox" id="attCheck_Soccer" name="attCheck_Soccer">
   <label for="attCheck_Soccer">Soccer</label>
 </div>
 <div>
 <input type="checkbox" id="attCheck_Tennis" name="attCheck_Tennis">
 <label for="attCheck_Tennis">Tennis</label>
 </div>
 <div>
 <input type="checkbox" id="attCheck_Snowboarding" name="attCheck_Snowboarding">
 <label for="attCheck_Snowboarding">Snowboarding</label>
 </div>
 <div>
 <input type="checkbox" id="attCheck_Basketball" name="attCheck_Basketball">
 <label for="attCheck_Basketball">Basketball</label>
 </div>
 <div>
 <input type="checkbox" id="attCheck_Jogging" name="attCheck_Jogging">
 <label for="attCheck_Jogging">Jogging</label>
 </div>
 <div>
 <input type="checkbox" id="attCheck_Cycling" name="attCheck_Cycling">
 <label for="attCheck_Cycling">Cycling</label>
 </div>
 <div>
 <input type="checkbox" id="attCheck_Pingpong" name="attCheck_Pingpong">
 <label for="attCheck_Pingpong">Ping-pong</label>
 </div>
 <div>
 <input type="checkbox" id="attCheck_Other" name="attCheck_Other">
 <label for="attCheck_Other">Other</label>
 <input type="text" id="attCheck_OtherText" name="attCheck_OtherText"></input>
 </fieldset>
 </div>
 </section>
 <br>
   </div>
 </main>
 
 
   <form id="page-form"> 
   </form>
   
   <footer class="content-vertical-center content-horizontal-right">
     <button id="continue" form="page-form" onclick="return continueornot();">
     Continue &rarr;
     </button>
   </footer>
   `;

const setupStudyText = `
   <header>
       <h2>What to expect</h2>
    </header>
    
    <main class="content-horizontal-center content-vertical-center">
    <div class="w-xl text-justify">
  <section>
   This study has three main parts, each with its own brief introduction:
  </section>
  <br>
  <ol style="text-align: left; margin-left: 2rem;">
    <li><strong>Visual reasoning:</strong> A short task to examine how you interpret visual information.</li>
    <br>
    <li><strong>Future societies:</strong> You will read descriptions of different possible futures and share your reactions. You will also rank them and briefly explain your choices.</li>
    <br>
    <li><strong>About you:</strong> Finally, you will answer questions about your own beliefs, experiences, and attitudes.</li>
  </ol>
  <br>
  <section>
   There are no right or wrong answers. Please answer thoughtfully and honestly.
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

const Greetings_htmlForm = new lab.html.Form({
  title: "Greetings",
  content: greetingsText,
  messageHandlers: {
    run: function anonymous() {
      if (!localTesting && typeof jatos !== "undefined" && typeof jatos.jQuery === "function") {
        if (
          study.state.meta.screen_height < 700 &&
          study.state.meta.screen_width < 1200
        ) {
          alert(
            "It seems that your screen size you are using is smaller than 1200x700 pixels (height x width):\n" +
              "> your screen width: " +
              study.state.meta.screen_width +
              " your screen height: " +
              study.state.meta.screen_height +
              "\nStudy is aborted!"
          );
          jatos.abortStudy("study aborted - screen to small");
        }
      }
    },
    commit: () => {
      // progress bar
      numElementsCounter++;
      document.querySelector(".progress-bar").style.width =
        (numElementsCounter / numElements) * 100 + "%";

      // get URL params
      if (!localTesting && typeof jatos !== "undefined" && typeof jatos.jQuery === "function") {
        URLparams_global = jatos.urlQueryParameters;
        console.log("URLparams_global:", URLparams_global);

        // check if a prolific ID is provided via URL parameter PROLIFIC study
        if (typeof URLparams_global.PROLIFIC_PID === "undefined") {
          alert(
            "Sorry, there may be a technical error! It was not possible to obtain all the necessary data from prolific. Please write to the study director that an error has occurred."
          );
          jatos.abortStudy("study aborted - no prolific ID");
        } else {
          study.options.datastore.set(
            "PROLIFIC_PID",
            URLparams_global.PROLIFIC_PID
          );

          if (typeof URLparams_global.futureSocietyCondition != "undefined") {
            // overwrite global variable:
            console.log("futureSocietyCondition set via URL parameter: ", URLparams_global.futureSocietyCondition);
          }
        }
      }
    },
  },
});


const InformCon_htmlForm = new lab.html.Form({
  title: "InformedConsent",
  content: informConText,
  messageHandlers: {
    commit: function anonymous() {
      // progress bar
      numElementsCounter++;
      document.querySelector(".progress-bar").style.width =
        (numElementsCounter / numElements) * 100 + "%";

      if (!localTesting && typeof jatos !== "undefined" && typeof jatos.jQuery === "function") {
        // If JATOS is available, send data there
        var resultJson = study.options.datastore.exportJson();
        console.log("result data sent to JATOS first time");
        jatos
          .submitResultData(resultJson)
          .then(() => console.log("success"))
          .catch(() => console.log("error"));
      }
    },
  },
});

const InformConsentNO_htmlForm = new lab.html.Form({
  title: "InformedConsentNO",
  content: informConNoText,
  tardy: true,
  skip: "${ study.state.dummy_informedconsent == 1}",
  messageHandlers: {
    run: function anonymous() {
      // progress bar 100%
      document.querySelector(".progress-bar").style.width = 100 + "%";
    },
  },
});

const ExclusionCriteria_htmlForm = new lab.html.Form({
  title: "ExclusionCriteria",
  content: exclusionCriteriaText,
  messageHandlers: {
    run: function anonymous() {},
    commit: () => {
      const honeypotValue = $("#hp_exclusionCriteria").val();
      if (honeypotValue && honeypotValue.trim().length > 0) {
        study.options.datastore.set("hp_exclusionCriteria", true);
        study.options.datastore.set("hp_exclusionCriteria_value", honeypotValue);
      } else {
        study.options.datastore.set("hp_exclusionCriteria", false);
      }

      // progress bar
      numElementsCounter++;
      document.querySelector(".progress-bar").style.width =
        (numElementsCounter / numElements) * 100 + "%";
    },
  },
});

// not needed: Attention Check
function continueornot() {
  if ($("fieldset :checkbox:checked").length > 0) {
    // ok
    return true;
  } else {
    alert("Please check at least one of these activities.");
    return false;
  }
}

const AttentionCheck_htmlForm = new lab.html.Form({
  title: "AttentionCheck",
  content: attentionCheckText,
  messageHandlers: {
    run: function anonymous() {},
    commit: () => {
      var attCheck_array = [];
      $("fieldset :checkbox").each(function () {
        if (this.checked) {
          attCheck_array.push(this.id);
        }
      });
      attCheck_array;

      study.options.datastore.set("attCheck_array", attCheck_array);
      study.options.datastore.set(
        "attCheck_text",
        $("#attCheck_OtherText").val()
      );

      // progress bar
      numElementsCounter++;
      document.querySelector(".progress-bar").style.width =
        (numElementsCounter / numElements) * 100 + "%";
    },
  },
});

const SetupStudy_htmlForm = new lab.html.Form({
  title: "SetupStudy",
  content: setupStudyText,
  messageHandlers: {
    commit: () => {
      // progress bar
      numElementsCounter++;
      document.querySelector(".progress-bar").style.width =
        (numElementsCounter / numElements) * 100 + "%";

      if (!localTesting && typeof jatos !== "undefined" && typeof jatos.jQuery === "function") {
        // If JATOS is available, send data there
        var resultJson = study.options.datastore.exportJson();
        console.log("result data sent to JATOS second time");
        jatos
          .submitResultData(resultJson)
          .then(() => console.log("success"))
          .catch(() => console.log("error"));
      }
    },
  },
});
