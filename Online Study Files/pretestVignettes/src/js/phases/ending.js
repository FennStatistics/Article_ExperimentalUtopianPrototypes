/* 
################### End of Study ###################
*/

const transitionToFinalText = `
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
`;

const socioDemoText = `
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
`;

const conscientiousCompletionText = `
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

`;

const feedbackQuesText = `
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
  `;

const endingScreenText = `
  <header>
  <h2> Thank you very much for your participation ! </h2>
  </header>

  <main class="content-horizontal-center content-vertical-center">
  <div class="w-xl text-justify">
  <br>
  <div>
  <i>The experiment will end in a few seconds and you will be automatically redirected back to Prolific.</i> 
  <br>
  <br>
  <br>
  If you have any questions, please contact the study director Julius Fenn (julius.fenn@psychologie.uni-freiburg.de).
  </div>
  </main>
  `;

// Transition from AIT to survey scales
const TransitionToFinal_htmlForm = new lab.html.Form({
  title: "TransitionToFinal",
  content: transitionToFinalText,
  messageHandlers: {
    commit: () => {
      // progress bar
      numElementsCounter++;
      document.querySelector(".progress-bar").style.width =
        (numElementsCounter / numElements) * 100 + "%";

      if (typeof jatos.jQuery === "function") {
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

// socio demographic questions
const SocioDemo_htmlScreen = new lab.html.Form({
  title: "socio demographic questions",
  content: socioDemoText,
  messageHandlers: {
    run: () => {
      $("#techname").html(nameFutureSociety);

      $(document).ready(function () {
        // Extract country names from the dropdown
        let countries = [];
        $("#country option").each(function () {
          let countryName = $(this).text();
          if (countryName.trim() !== "country") {
            countries.push(countryName);
          }
        });

        // Initialize autocomplete
        $("#autocomplete-country").autocomplete({
          source: countries,
          select: function (event, ui) {
            // When an option is selected, set it in the dropdown
            let selectedCountry = ui.item.value;
            $("#country option")
              .filter(function () {
                return $(this).text() === selectedCountry;
              })
              .prop("selected", true);
          },
        });
      });
    },
    commit: () => {
      // progress bar
      numElementsCounter++;
      document.querySelector(".progress-bar").style.width =
        (numElementsCounter / numElements) * 100 + "%";
    },
  },
});

// feedback screen conscientious completion
const ConscientiousCompletion_htmlScreen = new lab.html.Form({
  title: "ConscientiousCompletion",
  content: conscientiousCompletionText,
  messageHandlers: {
    commit: () => {
      // progress bar
      numElementsCounter++;
      document.querySelector(".progress-bar").style.width =
        (numElementsCounter / numElements) * 100 + "%";
    },
  },
});

// feedback screen general
const FeedbackScreen_htmlScreen = new lab.html.Form({
  title: "FeedbackScreen",
  content: feedbackQuesText,
  messageHandlers: {
    commit: () => {
      // progress bar
      numElementsCounter++;
      document.querySelector(".progress-bar").style.width =
        (numElementsCounter / numElements) * 100 + "%";

      if (typeof jatos.jQuery === "function") {
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

// ending screen
const EndingScreen_htmlScreen = new lab.html.Screen({
  title: "EndingScreen",
  tardy: true,
  content: endingScreenText,
  timeout: 9000, // 9 seconds
  messageHandlers: {
    run: function anonymous() {
      // progress bar
      numElementsCounter++;
      document.querySelector(".progress-bar").style.width =
        (numElementsCounter / numElements) * 100 + "%";

      // alert(numElementsCounter);
    },
    epilogue: function anonymous() {
      if (typeof jatos.jQuery === "function") {
        // If JATOS is available, send data there
        var resultJson = study.options.datastore.exportJson();
        console.log("my result data sent to JATOS final time");
        jatos
          .submitResultData(resultJson)
          .then(() => console.log("success"))
          .catch(() => console.log("error"));

        // then redirect
        if (
          study.options.datastore.extract("sender").includes("FeedbackScreen")
        ) {
          jatos.endStudyAndRedirect(
            "https://app.prolific.com/submissions/complete?cc=CP2ZDXDH", // !!!
            true,
            "everything worked fine"
          );
        } else {
          alert(
            "It seems that you did not go through the entire study because you did not see the previous feedback screen."
          );
          jatos.abortStudy("study aborted - copied submission link");
        }
      }
    },
  },
});
