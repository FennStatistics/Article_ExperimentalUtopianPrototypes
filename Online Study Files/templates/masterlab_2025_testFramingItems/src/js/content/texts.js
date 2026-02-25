const textObj = {
// ################### Start of Study ###################
   greetings: `
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

       <i> Important note in advance: You can always enlarge or reduce the text and images of the study so that you can
           read them better: </i>
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
           With our research, we aim to get a better understanding of human behavior and mental processes. For this
           purpose, in the following study, your behavior will be measured (e.g., choices, reaction times, whether you left fullscreen).
       </section>
       <br>
       <section>
           The duration of the study is <b>approximately 6 minutes</b>. Please use a <strong>computer or
               laptop with a keyboard</strong> for the study. Please ensure that you can
           participate in the study without being disturbed. First of all, we would like to ask you to agree to the informed consent on the following page.
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
   `,
   informCon: `

<header>
  <h2>Informed Consent</h2>
</header>

<main class="content-horizontal-center content-vertical-center">
  <div class="w-xl text-justify">
 <p>Dear participant,</p>
    <p>Thank you for taking part in a study conducted by the Department of General Psychology at the University of Freiburg! Please read the information below carefully.</p>

    <p><b>Voluntariness.</b> Your participation in this study is <strong>voluntary</strong>. You may end this online study at any time without providing a reason and without experiencing any disadvantages. To do so, simply close the browser window. However, if you terminate the online study early, you will not be able to complete it and will therefore not be entitled to compensation.</p>
    <p>Participation in this online study <strong>does not involve any unusual burdens or risks</strong> for you. For participating in this study, you will receive the payment amount listed on Prolific.</p>


    <p><b>Anonymization and storage of the data.</b> The data collected as part of this online study will be <strong>fully anonymized</strong> during collection and storage. The collected data will be stored for at least 10 years. Since the data is collected anonymously, it is not possible to draw any conclusions about your identity. For this reason, however, we are also unable to identify your data set after collection, and therefore cannot delete your data. Even if you terminate the online study early, deletion of the data is not possible for the same reason.</p>


    <p><b>Publication of the collected data.</b> Your data will be used <strong>exclusively for scientific purposes</strong>. Any future publication of the data will be in fully anonymized form and also solely for scientific research purposes. The fully anonymized data will be made publicly available, for example, via the Open Science Framework (OSF) and/or GitHub.</p>

    <p><b>Responsibilities.</b> This study follows the <strong>recommendations of the German Research Foundation (DFG) and the German Psychological Society (DGPs)</strong> for ensuring quality and transparency in research.</p>
    <p>If you have any questions now or after the study, please contact the principal investigators Julius Fenn or Stephanie Bugler:</p>


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
          Please select one of the following options:
        </p>
        <p class="small text-muted hide-if-empty" style="margin: 0.25rem 0">
          Refusal to give consent will end the study.
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
                  I confirm that I have understood the above information and <strong>agree</strong> to participate in the study.
                </label>
              </td>
            </tr>
            <tr>
              <td>
                <input type="radio" name="dummy_informedconsent" value="0" id="dummy_informedconsent2" required>
              </td>
              <td>
                <label for="dummy_informedconsent2" class="text-left">
                  I confirm that I have understood the above information and <strong>do not agree</strong> to participate in the study.
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
   `,
   informConNo: `
   <header></header>
   <main class="content-horizontal-center content-vertical-center">
   <div class="w-xl text-justify">
   <section>
       You have not agreed to the informed consent. Unfortunately, this means that the study is over for you. You can
       now close the screen. Press the <kbd>Esc</kbd> key to exit fullscreen mode. 
   </section>
 </div>
 </main>
   `,
   exclusionCriteria: `
   <header>
     <h2>Thank you for agreeing to the conditions of participation. </h2>
 </header>
 
 <main class="content-horizontal-center content-vertical-center">
     <div class="w-xl text-justify">
         <section>
             Before we begin, we would like to draw your attention to the following rules during the online study:
         </section>
         <br>
         <ul>
             <li>Please answer the study in a focused manner.</li>
             <li>Do not leave the browser screen of the study unless you are explicitly asked to do so. </li>
             <li>Please read all instructions carefully and comply with them.</li>
         </ul>
<br>
<br>
We care about the quality of our experimental and survey data. To get the most accurate measures of your opinions, it is important that you provide thoughtful answers to each questions in this survey. 
<br>
<form id="page-form">
<!-- see: https://www.qualtrics.com/blog/attention-checks-and-data-quality/ -->
<!-- multiple choice + text field --> 
<div class="page-item page-item-radio" id="page-item-ques_dummycam">
 <p class="text-left font-weight-bold" style="margin: 1rem 0 0.25rem">
 Do you commit to providing thoughtful answers in this survey?
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
   I can't promise either way
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
   `,
   attentionCheck: `
   <header>
     <h2>Before starting the study we would like to get to know you:</h2>
   </header>
   
   <main class="content-horizontal-center content-vertical-center">
   <div class="w-xl text-justify">
 <section>
 Most modern theories of decision-making recognize the fact that decisions do not take place in a vacuum. Individual preferences and knowledge, along with situational variables, 
 can greatly impact the decision process. To facilitate our research on attitudes towards emerging technologies, we are interested in knowing certain factors about you, 
 the decision-maker. Specifically, we are interested in whether you take the time to read the instructions; if not, then some of the specific characteristics of 
 the described emerging technologies can be overlooked. So, to demonstrate that you have read the instructions, please ignore the sports items below and instead 
 select the box marked "other" and type "I read the instructions" in the text box, then click continue. Thank you very much.
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
   `,
   // not needed
   setupStudy: `
   <header>
     <h2>Overview of the study:</h2>
   </header>
   
   <main class="content-horizontal-center content-vertical-center">
   <div class="w-xl text-justify">
 <section>
This study is divided into two parts:
       </section>
 <br>
<table>
  <tr>
    <td>1) Read a short text describing a future society.</td>
  </tr>
  <tr>
    <td>2) Based on the text, answer a few questions about how clear and understandable it is.</td>
  </tr>
</table>
 <br>
 <section>
 Within each task, you will receive detailed instructions to help you understand what is expected. Please make sure to read them carefully.
   </div>
 </main>
   <form id="page-form"> 
   </form>
   
   <footer class="content-vertical-center content-horizontal-right">
     <button id="continue" type="submit" form="page-form">
     Continue &rarr;
     </button>
   </footer>
   `,
  // ################### Scenario Text ###################
ScenarioText: `
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
`,




// ################### Survey Scales ###################
  postClearBias: `
<header>
  <h2>
    Please answer the following questions:
  </h2>
</header>

<p>Please refer to the text about the future society when answering the questions.</p>

<main class="content-horizontal-center content-vertical-center">
  <div class="w-xl text-justify">
    <form id="demography">
      <table>

        <!-- Clarity -->
        <tr style="height: 100px">
          <td class="font-weight-bold text-left">
            Do you feel that the information you just read was clear?
          </td>
          <td>
            <select id="clearUtopia" name="clearUtopia" required class="w-100">
              <option value="" selected>
                -- Please select --
              </option>
              <option value="4">It was completely clear.</option>
              <option value="3">It was somewhat clear.</option>
              <option value="2">It was somewhat unclear.</option>
              <option value="1">It was completely unclear.</option>
            </select>
          </td>
        </tr>

        <!-- Clarity follow-up -->
        <tr id="hideClearUtopiatext" style="height: 100px">
          <td class="font-weight-bold text-left">
            Why do you think the information about the future society was unclear?
            <br>
            <p class="text-left small text-muted hide-if-empty" style="margin: 0.25rem 0">
              Please write a short answer.
            </p>
          </td>
          <td>
            <textarea id="clearUtopiatext" name="clearUtopiatext" class="w-100" rows="3"></textarea>
          </td>
        </tr>

        <!-- Neutrality / Bias -->
        <tr style="height: 100px">
          <td class="font-weight-bold text-left">
            Do you feel that the information you just read was biased?
          </td>
          <td>
            <select id="biasUtopia" name="biasUtopia" required class="w-100">
              <option value="" selected>
                -- Please select --
              </option>
              <option value="3">It was supportive of this future society.</option>
              <option value="2">It was neutral, and did not support or oppose this future society.</option>
              <option value="1">It was opposed to this future society.</option>
            </select>
          </td>
        </tr>

        <!-- Bias follow-up -->
        <tr id="hideBiasUtopiatext" style="height: 100px">
          <td class="font-weight-bold text-left">
            Why do you think the information about the future society was not neutral?
            <br>
            <p class="text-left small text-muted hide-if-empty" style="margin: 0.25rem 0">
              Please write a short answer.
            </p>
          </td>
          <td>
            <textarea id="biasUtopiatext" name="biasUtopiatext" class="w-100" rows="3"></textarea>
          </td>
        </tr>

        <!-- Column balance -->
        <colgroup>
          <col style="width: 50%">
          <col style="width: 50%">
        </colgroup>
      </table>
    </form>
  </div>
</main>

<footer class="content-vertical-center content-horizontal-right">
  <div class="w-l text-justify"></div>
  <button id="continue" type="submit" form="demography">
    Continue &rarr;
  </button>
</footer>
  `,
  
  understandingText: `
<header>
  <h2>
    Please answer the following questions:
  </h2>
</header>

<p>When answering the questions, please refer to the text about the future society that you have just read.</p>

<main class="content-horizontal-center content-vertical-center">
  <div class="w-xl text-justify">
    <form id="demography">
      <table>

        <!-- General understanding -->
        <tr style="height: 100px">
          <td class="font-weight-bold text-left">
            Please describe the future society presented in the text.
            <br>
            <p class="text-left small text-muted hide-if-empty" style="margin: 0.25rem 0">
              Please write a short answer.
            </p>
          </td>
          <td>
            <textarea id="undUtopiaGeneral" name="undUtopiaGeneral" class="w-100" rows="3" required></textarea>
          </td>
        </tr>

        <!-- Goals -->
        <tr style="height: 100px">
          <td class="font-weight-bold text-left">
            What are the main goals of this future society?
            <br>
            <p class="text-left small text-muted hide-if-empty" style="margin: 0.25rem 0">
              Please write a short answer.
            </p>
          </td>
          <td>
            <textarea id="undUtopiaGoal" name="undUtopiaGoal" class="w-100" rows="3" required></textarea>
          </td>
        </tr>

        <!-- Mechanisms -->
        <tr style="height: 100px">
          <td class="font-weight-bold text-left">
            How does this society work to achieve these goals (e.g., rules, institutions, or practices)?
            <br>
            <p class="text-left small text-muted hide-if-empty" style="margin: 0.25rem 0">
              Please write a short answer.
            </p>
          </td>
          <td>
            <textarea id="undUtopiaHow" name="undUtopiaHow" class="w-100" rows="3" required></textarea>
          </td>
        </tr>

        <!-- Column balance -->
        <colgroup>
          <col style="width: 50%">
          <col style="width: 50%">
        </colgroup>
      </table>
    </form>
  </div>
</main>

<footer class="content-vertical-center content-horizontal-right">
  <div class="w-l text-justify"></div>
  <button id="continue" type="submit" form="demography">
    Continue &rarr;
  </button>
</footer>
  `,


    assignmentTask: `
<header>
  <h2>Please answer the following question:</h2>
</header>

<p>
  Please refer to the text about the future society you have just read.
</p>

<main class="content-horizontal-center content-vertical-center">
  <div class="w-xl text-justify">

    <!-- 
      IMPORTANT:
      Set the correct prototype for the currently shown vignette in data-correct-prototype.
      Example values:
      futurist, ai_centered, primitivist_arcadian, modern_green,
      religious_millennial, institutional_law, moral_commonwealth_anarchic
    -->
    <form id="protoAssignForm" data-correct-prototype="futurist" novalidate>

      <!-- Prototype assignment -->
      <div class="proto-block">
        <div class="font-weight-bold text-left">
          Which Utopian Prototype does this future society most closely represent?
          <p class="text-left small text-muted hide-if-empty" style="margin: 0.25rem 0 0 0">
            Please select the one option that fits best.
          </p>
        </div>

        <div id="protoRadioGroup" class="w-100" style="margin-top: 0.75rem;">

          <label for="proto_futurist" class="proto-option">
            <input type="radio" id="proto_futurist" name="utopiaPrototypeAssignment" value="futurist" required>
            <span>
              <strong>Futurist</strong> — A society organized around continuous scientific and technological innovation, rational planning, and optimization to solve collective problems.
            </span>
          </label>

          <label for="proto_ai_centered" class="proto-option">
            <input type="radio" id="proto_ai_centered" name="utopiaPrototypeAssignment" value="ai_centered">
            <span>
              <strong>AI-Centered</strong> — A society primarily coordinated by AI systems that use data-driven decisions to manage resources, fairness, and social order.
            </span>
          </label>

          <label for="proto_primitivist_arcadian" class="proto-option">
            <input type="radio" id="proto_primitivist_arcadian" name="utopiaPrototypeAssignment" value="primitivist_arcadian">
            <span>
              <strong>Primitivist (Arcadian)</strong> — A low-technology, small-scale society that lives simply and communally in close harmony with nature.
            </span>
          </label>

          <label for="proto_modern_green" class="proto-option">
            <input type="radio" id="proto_modern_green" name="utopiaPrototypeAssignment" value="modern_green">
            <span>
              <strong>Modern Green</strong> — A society that balances ecological sustainability and economic security through shared resources, institutions, and selective green technology.
            </span>
          </label>

          <label for="proto_religious_millennial" class="proto-option">
            <input type="radio" id="proto_religious_millennial" name="utopiaPrototypeAssignment" value="religious_millennial">
            <span>
              <strong>Religious (Millennial)</strong> — A society guided by sacred beliefs and transcendent moral authority, where social order is grounded in religion and spiritual norms.
            </span>
          </label>

          <label for="proto_institutional_law" class="proto-option">
            <input type="radio" id="proto_institutional_law" name="utopiaPrototypeAssignment" value="institutional_law">
            <span>
              <strong>Institutional (Law-Based)</strong> — A society coordinated through strong institutions, clear laws, and enforceable rules to maintain stability and predictability.
            </span>
          </label>

          <label for="proto_moral_commonwealth_anarchic" class="proto-option">
            <input type="radio" id="proto_moral_commonwealth_anarchic" name="utopiaPrototypeAssignment" value="moral_commonwealth_anarchic">
            <span>
              <strong>Moral Commonwealth (Anarchic)</strong> — A society held together by internalized morality, voluntary cooperation, and minimal coercive authority.
            </span>
          </label>
        </div>
      </div>

<!-- Confidence -->
<div class="proto-block" style="margin-top: 1rem;">
  <div class="font-weight-bold text-left">
    How confident are you in your choice?
    <p class="text-left small text-muted hide-if-empty" style="margin: 0.25rem 0 0 0">
      Please select one option.
    </p>
  </div>

  <div id="protoConfidenceGroup" style="margin-top: 0.6rem;">
<label for="conf_1" class="conf-option">
  <input type="radio" id="conf_1" name="protoConfidenceRadio" value="1" required>
  <span>1<br><small>Not at all<br>confident</small></span>
</label>

<label for="conf_2" class="conf-option">
  <input type="radio" id="conf_2" name="protoConfidenceRadio" value="2">
  <span>2<br><small>Slightly<br>confident</small></span>
</label>

<label for="conf_3" class="conf-option">
  <input type="radio" id="conf_3" name="protoConfidenceRadio" value="3">
  <span>3<br><small>Somewhat<br>confident</small></span>
</label>

<label for="conf_4" class="conf-option">
  <input type="radio" id="conf_4" name="protoConfidenceRadio" value="4">
  <span>4<br><small>Moderately<br>confident</small></span>
</label>

<label for="conf_5" class="conf-option">
  <input type="radio" id="conf_5" name="protoConfidenceRadio" value="5">
  <span>5<br><small>Fairly<br>confident</small></span>
</label>

<label for="conf_6" class="conf-option">
  <input type="radio" id="conf_6" name="protoConfidenceRadio" value="6">
  <span>6<br><small>Highly<br>confident</small></span>
</label>

<label for="conf_7" class="conf-option">
  <input type="radio" id="conf_7" name="protoConfidenceRadio" value="7">
  <span>7<br><small>Very<br>confident</small></span>
</label>
  </div>

</div>

      <!-- Optional follow-up if low confidence -->
      <div id="hideProtoReason" class="proto-block" style="margin-top: 1rem;">
        <div class="font-weight-bold text-left">
          What made the classification difficult?
          <p class="text-left small text-muted hide-if-empty" style="margin: 0.25rem 0 0 0">
            Optional short answer (shown only when confidence is low).
          </p>
        </div>

        <div style="margin-top: 0.6rem;">
          <textarea id="protoReasonText" name="protoReasonText" class="w-100" rows="5" placeholder="Please provide a short answer..."></textarea>
        </div>
      </div>
    </form>

  </div>
</main>

<footer class="content-vertical-center content-horizontal-right">
  <button id="continue" type="submit" form="protoAssignForm">
    Continue &rarr;
  </button>
</footer>
  `,



// ################### End of Study ###################
TransitionToFinal: `
<header>
 <h2>Thank you for completing the Questionnaires!</h2>
 </header>

<main class="content-horizontal-center content-vertical-center">
<div class="w-xl text-justify">
        <section>
                <p>You have successfully completed the questionnaires. As a final step, we kindly ask you to answer a few additional questions about yourself.</p>
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
`,
// socio demographic questions
// general:
socioDemo: `
<header>
  <h2>
Please answer the following questions about yourself:
 </h2>
</header>

<main class="content-horizontal-center content-vertical-center">
<div class="w-xl text-justify" style="display: block">
  

  <form id="demography">
    <table>
      <!-- Age -->
      <tr style="height: 80px">
        <td class="font-weight-bold text-left">
      How old are you (in years)?
           </td>
        <td>
        <input name="sociodemo_age" type="number" required class="w-100" min="18" max="120" placeholder="Enter age">
        </td>
      </tr>
      
      <!-- Gender NOT gender identity, following Tate et al. (2013) -->
      <!-- -->
      <tr style="height: 80px">
        <td class="font-weight-bold text-left">
      What is your gender?
              </td>
        <td>
      <select name="sociodemo_gender" required class="w-100">
        <option value="" selected>
          - Please select -
        </option>
        <option value="female">Female</option>
        <option value="male">Male</option>
        <option value="intersex">Non-binary</option>
        <option value="none">I prefer not to say.</option>
      </select>
        </td>
      </tr>


            <!-- sexual orientation 
      <tr style="height: 80px">
        <td class="font-weight-bold text-left">
      What is your sexual orientation?
              </td>
        <td>
      <select name="sociodemo_sexualOrientation" required class="w-100">
        <option value="" selected>
          - Please select -
        </option>
        <option value="heterosexuell">Heterosexuell</option>
        <option value="homosexuell">Homosexuell</option>
        <option value="bisexuell">Bisexuell</option>
                <option value="other">Other</option>
        <option value="none">I prefer not to say.</option>
      </select>
        </td>
      </tr>
      -->

<tr style="height: 80px">
  <td class="font-weight-bold text-left">
    Before reading this, had you previously encountered the concept or technology of a <span id="techname">XXX</span>?
           <br>
    <span style="color: lightgray; font-size: smaller;">For example in your studies, work, or research.</span>
  </td>
  <td>
    <select name="sociodemo_priorExperience" required class="w-100">
      <option value="" selected>
        - Please select -
      </option>
      <option value="very_similar">Yes, I’ve seen something very similar</option>
      <option value="somewhat_similar">Yes, I’ve seen something somewhat similar</option>
      <option value="new">No, this is new to me</option>
      <option value="not_sure">Not sure / can’t recall</option>
    </select>
  </td>
</tr>




            <!-- Country / Residency -->
      <tr style="height: 80px">
        <td class="font-weight-bold text-left">
      Where is your current residency?
       <br>
    <span style="color: lightgray; font-size: smaller;">Please indicate the name of the country you are currently living.</span>
        </td>
        <td>
            <div>
                <!-- All countries -->
              <select class="form-select" autocomplete="country" id="country" name="sociodemo_residency" style="flex: 1;" required>
                <option value="">- Please select -</option>
    <option value="AF">Afghanistan</option>
    <option value="AX">Åland Islands</option>
    <option value="AL">Albania</option>
    <option value="DZ">Algeria</option>
    <option value="AS">American Samoa</option>
    <option value="AD">Andorra</option>
    <option value="AO">Angola</option>
    <option value="AI">Anguilla</option>
    <option value="AQ">Antarctica</option>
    <option value="AG">Antigua & Barbuda</option>
    <option value="AR">Argentina</option>
    <option value="AM">Armenia</option>
    <option value="AW">Aruba</option>
    <option value="AU">Australia</option>
    <option value="AT">Austria</option>
    <option value="AZ">Azerbaijan</option>
    <option value="BS">Bahamas</option>
    <option value="BH">Bahrain</option>
    <option value="BD">Bangladesh</option>
    <option value="BB">Barbados</option>
    <option value="BY">Belarus</option>
    <option value="BE">Belgium</option>
    <option value="BZ">Belize</option>
    <option value="BJ">Benin</option>
    <option value="BM">Bermuda</option>
    <option value="BT">Bhutan</option>
    <option value="BO">Bolivia</option>
    <option value="BA">Bosnia & Herzegovina</option>
    <option value="BW">Botswana</option>
    <option value="BV">Bouvet Island</option>
    <option value="BR">Brazil</option>
    <option value="IO">British Indian Ocean Territory</option>
    <option value="BN">Brunei</option>
    <option value="BG">Bulgaria</option>
    <option value="BF">Burkina Faso</option>
    <option value="BI">Burundi</option>
    <option value="CV">Cape Verde</option>
    <option value="KH">Cambodia</option>
    <option value="CM">Cameroon</option>
    <option value="CA">Canada</option>
    <option value="BQ">Caribbean Netherlands</option>
    <option value="KY">Cayman Islands</option>
    <option value="CF">Central African Republic</option>
    <option value="TD">Chad</option>
    <option value="CL">Chile</option>
    <option value="CN">China</option>
    <option value="CX">Christmas Island</option>
    <option value="CC">Cocos (Keeling) Islands</option>
    <option value="CO">Colombia</option>
    <option value="KM">Comoros</option>
    <option value="CG">Congo - Brazzaville</option>
    <option value="CD">Congo - Kinshasa</option>
    <option value="CK">Cook Islands</option>
    <option value="CR">Costa Rica</option>
    <option value="HR">Croatia</option>
    <option value="CU">Cuba</option>
    <option value="CW">Curaçao</option>
    <option value="CY">Cyprus</option>
    <option value="CZ">Czechia</option>
    <option value="CI">Côte d’Ivoire</option>
    <option value="DK">Denmark</option>
    <option value="DJ">Djibouti</option>
    <option value="DM">Dominica</option>
    <option value="DO">Dominican Republic</option>
    <option value="EC">Ecuador</option>
    <option value="EG">Egypt</option>
    <option value="SV">El Salvador</option>
    <option value="GQ">Equatorial Guinea</option>
    <option value="ER">Eritrea</option>
    <option value="EE">Estonia</option>
    <option value="SZ">Eswatini</option>
    <option value="ET">Ethiopia</option>
    <option value="FK">Falkland Islands (Islas Malvinas)</option>
    <option value="FO">Faroe Islands</option>
    <option value="FJ">Fiji</option>
    <option value="FI">Finland</option>
    <option value="FR">France</option>
    <option value="GF">French Guiana</option>
    <option value="PF">French Polynesia</option>
    <option value="TF">French Southern Territories</option>
    <option value="GA">Gabon</option>
    <option value="GM">Gambia</option>
    <option value="GE">Georgia</option>
    <option value="DE">Germany</option>
    <option value="GH">Ghana</option>
    <option value="GI">Gibraltar</option>
    <option value="GR">Greece</option>
    <option value="GL">Greenland</option>
    <option value="GD">Grenada</option>
    <option value="GP">Guadeloupe</option>
    <option value="GU">Guam</option>
    <option value="GT">Guatemala</option>
    <option value="GG">Guernsey</option>
    <option value="GN">Guinea</option>
    <option value="GW">Guinea-Bissau</option>
    <option value="GY">Guyana</option>
    <option value="HT">Haiti</option>
    <option value="HM">Heard & McDonald Islands</option>
    <option value="HN">Honduras</option>
    <option value="HK">Hong Kong</option>
    <option value="HU">Hungary</option>
    <option value="IS">Iceland</option>
    <option value="IN">India</option>
    <option value="ID">Indonesia</option>
    <option value="IR">Iran</option>
    <option value="IQ">Iraq</option>
    <option value="IE">Ireland</option>
    <option value="IM">Isle of Man</option>
    <option value="IL">Israel</option>
    <option value="IT">Italy</option>
    <option value="JM">Jamaica</option>
    <option value="JP">Japan</option>
    <option value="JE">Jersey</option>
    <option value="JO">Jordan</option>
    <option value="KZ">Kazakhstan</option>
    <option value="KE">Kenya</option>
    <option value="KI">Kiribati</option>
    <option value="KP">North Korea</option>
    <option value="KR">South Korea</option>
    <option value="XK">Kosovo</option>
    <option value="KW">Kuwait</option>
    <option value="KG">Kyrgyzstan</option>
    <option value="LA">Laos</option>
    <option value="LV">Latvia</option>
    <option value="LB">Lebanon</option>
    <option value="LS">Lesotho</option>
    <option value="LR">Liberia</option>
    <option value="LY">Libya</option>
    <option value="LI">Liechtenstein</option>
    <option value="LT">Lithuania</option>
    <option value="LU">Luxembourg</option>
    <option value="MO">Macao</option>
    <option value="MK">North Macedonia</option>
    <option value="MG">Madagascar</option>
    <option value="MW">Malawi</option>
    <option value="MY">Malaysia</option>
    <option value="MV">Maldives</option>
    <option value="ML">Mali</option>
    <option value="MT">Malta</option>
    <option value="MH">Marshall Islands</option>
    <option value="MQ">Martinique</option>
    <option value="MR">Mauritania</option>
    <option value="MU">Mauritius</option>
    <option value="YT">Mayotte</option>
    <option value="MX">Mexico</option>
    <option value="FM">Micronesia</option>
    <option value="MD">Moldova</option>
    <option value="MC">Monaco</option>
    <option value="MN">Mongolia</option>
    <option value="ME">Montenegro</option>
    <option value="MS">Montserrat</option>
    <option value="MA">Morocco</option>
    <option value="MZ">Mozambique</option>
    <option value="MM">Myanmar (Burma)</option>
    <option value="NA">Namibia</option>
    <option value="NR">Nauru</option>
    <option value="NP">Nepal</option>
    <option value="NL">Netherlands</option>
    <option value="AN">Curaçao</option>
    <option value="NC">New Caledonia</option>
    <option value="NZ">New Zealand</option>
    <option value="NI">Nicaragua</option>
    <option value="NE">Niger</option>
    <option value="NG">Nigeria</option>
    <option value="NU">Niue</option>
    <option value="NF">Norfolk Island</option>
    <option value="MP">Northern Mariana Islands</option>
    <option value="NO">Norway</option>
    <option value="OM">Oman</option>
    <option value="PK">Pakistan</option>
    <option value="PW">Palau</option>
    <option value="PS">Palestine</option>
    <option value="PA">Panama</option>
    <option value="PG">Papua New Guinea</option>
    <option value="PY">Paraguay</option>
    <option value="PE">Peru</option>
    <option value="PH">Philippines</option>
    <option value="PN">Pitcairn Islands</option>
    <option value="PL">Poland</option>
    <option value="PT">Portugal</option>
    <option value="PR">Puerto Rico</option>
    <option value="QA">Qatar</option>
    <option value="RE">Réunion</option>
    <option value="RO">Romania</option>
    <option value="RU">Russia</option>
    <option value="RW">Rwanda</option>
    <option value="BL">St. Barthélemy</option>
    <option value="SH">St. Helena</option>
    <option value="KN">St. Kitts & Nevis</option>
    <option value="LC">St. Lucia</option>
    <option value="MF">St. Martin</option>
    <option value="PM">St. Pierre & Miquelon</option>
    <option value="VC">St. Vincent & Grenadines</option>
    <option value="WS">Samoa</option>
    <option value="SM">San Marino</option>
    <option value="ST">São Tomé & Príncipe</option>
    <option value="SA">Saudi Arabia</option>
    <option value="SN">Senegal</option>
    <option value="RS">Serbia</option>
    <option value="CS">Serbia</option>
    <option value="SC">Seychelles</option>
    <option value="SL">Sierra Leone</option>
    <option value="SG">Singapore</option>
    <option value="SX">Sint Maarten</option>
    <option value="SK">Slovakia</option>
    <option value="SI">Slovenia</option>
    <option value="SB">Solomon Islands</option>
    <option value="SO">Somalia</option>
    <option value="ZA">South Africa</option>
    <option value="GS">South Georgia & South Sandwich Islands</option>
    <option value="SS">South Sudan</option>
    <option value="ES">Spain</option>
    <option value="LK">Sri Lanka</option>
    <option value="SD">Sudan</option>
    <option value="SR">Suriname</option>
    <option value="SJ">Svalbard & Jan Mayen</option>
    <option value="SE">Sweden</option>
    <option value="CH">Switzerland</option>
    <option value="SY">Syria</option>
    <option value="TW">Taiwan</option>
    <option value="TJ">Tajikistan</option>
    <option value="TZ">Tanzania</option>
    <option value="TH">Thailand</option>
    <option value="TL">Timor-Leste</option>
    <option value="TG">Togo</option>
    <option value="TK">Tokelau</option>
    <option value="TO">Tonga</option>
    <option value="TT">Trinidad & Tobago</option>
    <option value="TN">Tunisia</option>
    <option value="TR">Türkiye</option>
    <option value="TM">Turkmenistan</option>
    <option value="TC">Turks & Caicos Islands</option>
    <option value="TV">Tuvalu</option>
    <option value="UM">U.S. Outlying Islands</option>
    <option value="UG">Uganda</option>
    <option value="UA">Ukraine</option>
    <option value="AE">United Arab Emirates</option>
    <option value="GB">United Kingdom</option>
    <option value="US">United States</option>
    <option value="UY">Uruguay</option>
    <option value="UZ">Uzbekistan</option>
    <option value="VU">Vanuatu</option>
    <option value="VA">Vatican City</option>
    <option value="VE">Venezuela</option>
    <option value="VN">Vietnam</option>
    <option value="VG">British Virgin Islands</option>
    <option value="VI">U.S. Virgin Islands</option>
    <option value="WF">Wallis & Futuna</option>
    <option value="EH">Western Sahara</option>
    <option value="YE">Yemen</option>
    <option value="ZM">Zambia</option>
    <option value="ZW">Zimbabwe</option>
              </select>

                          <!-- Input field for autocomplete -->
              <input type="text" id="autocomplete-country" class="form-control" placeholder="... search your residency" style="flex: 1;" />

            </div>
        </td>
      </tr>
      <!-- Column balance -->
      <colgroup>
        <col style="width: 55%">
        <col style="width: 45%">
      </colgroup>
    </table>
    </form>
</div>
</main>


<footer class="content-vertical-center content-horizontal-right">
<div class="w-l text-justify">
</div>
<button id="continue" type="submit" form="demography">
Continue &rarr;
</button>

</footer>
`,
// Conscientious Completion
ConscientiousCompletion: `
<header>
  <h2>
  Please answer the following question:
  </h2>
</header>

<main class="content-horizontal-center content-vertical-center">
  <div class="w-xl">
    <form id="page-form" style="display: block;" autocomplete="off">
      <!-- BEGIN multiple choice -->
      <div class="page-item page-item-radio" id="page-item-ques_taskcompletion">

 <p class="text-left font-weight-bold" style="margin: 1rem 0 0.25rem">
          Did you complete the tasks in this study conscientiously and to the best of your ability?
 </p>
 <p class="text-left small text-muted hide-if-empty" style="margin: 0.25rem 0">
           Please note that your answer to this question will have no impact on your payment via Prolific. It is only important for the scientific validity of this study.

 </p>
        <table class="table-plain page-item-table">
          <colgroup>
            <col style="width: 7.5%">
            <col style="width: 92.5%">
          </colgroup>
          <tbody>
            <!-- Option 1 -->
            <tr>
              <td>
                <input type="radio" name="feedback_conscientiousCompletion" value="1" id="task_completion_yes" required>
              </td>
              <td>
                <label for="task_completion_yes" class="text-left" style="font-size:26px">
                  Yes, I completed the tasks conscientiously.
                </label>
              </td>
            </tr>
            <!-- Option 2 -->
            <tr>
              <td>
                <input type="radio" name="feedback_conscientiousCompletion" value="0" id="task_completion_no" required>
              </td>
              <td>
                <label for="task_completion_no" class="text-left" style="font-size:26px">
                  No, I did not complete the tasks conscientiously.
                </label>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- END multiple choice -->
    </form>
  </div>
</main>

<footer class="content-vertical-center content-horizontal-right">
  <button id="continue" type="submit" form="page-form">
    Continue &rarr;
  </button>
</footer>

`,


      // feedback question
  feedbackQues: `
  <header>
    <h2>
    Please answer the following last question if you wish:
    </h2>
  </header>
  
  <main class="content-horizontal-center content-vertical-center" >
  <div class="w-xl">
    <form id="page-form" style="display: block;" autocomplete="off">
<!-- multiline text text --> 
<div class="page-item page-item-textarea" id="page-item-feedback_critic">
  <p class="text-left font-weight-bold" style="margin: 1rem 0 0.25rem">
  Do you have any feedback or criticism about the online study? 
  </p>
  <p class="text-left small text-muted hide-if-empty" style="margin: 0.25rem 0">
  Any criticism or suggestions for improvement will be of great help in improving future studies. 
  </p>
  <textarea name="feedback_critic" class="w-100" rows="8"></textarea>
</div>
<!-- END multiline text --> 
     
    </form>
  </div> 
</main>
  
  <footer class="content-vertical-center content-horizontal-right">
  <button id="continue" type="submit" form="page-form">
  Continue &rarr;
</button>
</footer>
  `,








     // ################### Association Task Snowball ###################
     TransitionToAIT: `
  <header>
      <h2>Thank you for completing the Reaction Time Task!</h2>
</header>

<main class="content-horizontal-center content-vertical-center">
  <div class="w-xl text-justify">
          <section>
              <p>You have completed the reaction time task. Next, you will move on to the <strong>Word Association Task</strong>. This task involves responding to a specific word with the first thoughts or associations that come to your mind. Please read the instructions for this task carefully before starting.</p>
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
  `,
   AT_Snowball_Inst: `
<header>
  <h2>Instruktionen: „Wortassoziationsaufgabe“</h2>
</header>

<main class="content-horizontal-center content-vertical-center">
  <div class="w-xl text-justify">
    <strong>So funktioniert es…</strong>
    <section>
      Oben auf dem Bildschirm wird ein Szenario beschrieben. Geben Sie das erste Wort oder den ersten Gedanken ein,
      der Ihnen in den Sinn kommt, wenn Sie sich dieses Szenario vorstellen.
    </section>
    <br>
    <section>
      Verwenden Sie die 
      <button style="padding:2px; margin-left:0px; margin-right: 0px; font-size: 30px;" disabled="disabled">Enter</button>
      Taste oder klicken Sie auf den Button 
      <button style="padding:2px; margin-left:0px; margin-right: 0px; font-size: 30px;" disabled="disabled">Nächste Antwort</button>,
      um insgesamt fünf Assoziationen einzugeben.
    </section>
    <br>
    <br>
    <strong>Hinweise:</strong>
    <section>
      <ul>
        <li>Vermeiden Sie Wiederholungen und ganze Sätze.</li>
        <li>Bilden Sie bitte jeweils nur Assoziationen zu dem oben genannten Szenario.</li>
        <li>Antworten Sie so spontan wie möglich.</li>
      </ul>
    </section>
  </div>
</main>

<form id="page-form">
</form>

<footer class="content-vertical-center content-horizontal-right">
  <button id="continue" type="submit" form="page-form">
    Weiter &rarr;
  </button>
</footer>
      `,
      AT_Snowball_Task: `
       <main class="content-horizontal-center content-vertical-center">
      <div style="width: 90%; text-align: center;">
<span id="replaceTextTop">Geben Sie Worte oder Gedanken ein, die Ihnen in den Sinn kommen, wenn Sie sich Folgendes vorstellen:</span>
          <br>
          <br>
    <div style="align-items: display: flex;">
         <span id="cueWord" style="font-size: 36px;">replace me</span>

    </div>
    <br>
        <form id="affectiveImageryForm">
          <div class="affectiveImagery">
              <div class="form-group">
                  <input id="R1" name="R1" class="form-control" placeholder="Geben Sie Ihre erste Assoziation ein." type="text"
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
    
              <small class="text-muted" id="progressLabel">Fortschritt</small>
            
              <div class="progress" style="background: white;">
                <div class="progress-bar-AffectiveImg" style="background: #229954;"> 
              </div>
            </div>
    
    
            <div style="align-items: display: flex;">
            <!-- Prevent implicit submission of the form -->
            <button type="submit" disabled style="display: none" aria-hidden="true"></button>
          
<button type="button" class="btn btn-default" tabindex="-1" id="submitAssoButton">
  <span class="glyphicon glyphicon-plus"></span>&nbsp;Nächste Antwort
</button>
<button type="submit" class="btn btn-default" tabindex="-1" id="finalResponse">
  <span class="glyphicon glyphicon-ok" form="affectiveImageryForm"></span>&nbsp;Eingabe beenden
</button>
<button type="submit" class="btn btn-default" tabindex="-1" id="skipResponse">
  <span class="glyphicon glyphicon-minus" form="affectiveImageryForm"></span>&nbsp;Keine weiteren Eingaben
</button>
<button type="submit" class="btn btn-default" tabindex="-1" id="unknownResponse">
  <span class="glyphicon glyphicon-remove" form="affectiveImageryForm"></span>&nbsp;Unbekanntes Wort
</button>

              </div>
          </div>
      </form>
      </div>
      
    </main>
        `,  
  AffectiveImageryInst: `
  <header>
  <h2>Instructions "Word Association Game" </h2>
</header>

<main class="content-horizontal-center content-vertical-center">
  <div class="w-xl text-justify">
      <strong>How it works...</strong>
      <section>
          On the top of the screen a word will be shown. Enter the first word that comes to your mind when reading that
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
  `,
   AffectiveImageryInst_full: `
   <header>
   <h2>Instructions "Word Association Game" </h2>
 </header>
 
 <main class="content-horizontal-center content-vertical-center">
   <div class="w-xl text-justify">
       <strong>How it works...</strong>
       <section>
           On the top of the screen a word will be shown. Enter the first word that comes to your mind when reading that
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
       <strong>  Some hints</strong>
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
   `,
   AffectiveImagery: `
   <main class="content-horizontal-center content-vertical-center">
   <div>
       Geben Sie Worte oder Gedanken ein, die Ihnen in den Sinn kommen, wenn Sie sich folgendes Szenario vorstellen:
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
                       class="glyphicon glyphicon-ok" form="affectiveImageryForm"></span>&nbsp;End the input</button>
               <button type="submit" class="btn btn-default" tabindex="-1" id="skipResponse"><span
                       class="glyphicon glyphicon-minus" form="affectiveImageryForm"></span>&nbsp;No more entries</button>
               <button type="submit" class="btn btn-default" tabindex="-1" id="unknownResponse"><span
                       class="glyphicon glyphicon-remove" form="affectiveImageryForm"></span>&nbsp;Unknown word</button>
           </div>
       </div>
   </form>
   </div>
   
 </main>
   `,
}
