const textObj = {
   // introduction phase
   greetings: `
   <header>
   <div class="row">
   <div class="column2">
   <h2>Vielen Dank für Ihre Teilnahme an der Evaluation der Veranstaltung „Diagnostics & Assessment II – Fields of Application“!</h2>
 </div>
   <div class="column">
   <img src="pre_CAM/static/UniFreiburg_logo.png" alt="UniFreiburg_logo" style="width:70%; max-height: 150px; max-width: 150px;">
   </div>
 </div> 
 </header>
 
 
 
 <main class="content-horizontal-center content-vertical-center">
   <div class="w-xl text-justify">
       <i> Wichtiger Hinweis im Voraus: Sie können den Text und die Bilder der Studie jederzeit vergrößern oder verkleinern, damit Sie diese besser lesen können: </i>
       <ul>
           <li>
           Windows: Halten Sie die <kbd>Strg</kbd> Taste gedrückt und bewegen Sie Ihr Mausrad oder drücken Sie die <kbd>+</kbd> oder <kbd>-</kbd> Taste auf Ihrer Tastatur
           </li>
           <li>
               Mac: Halten Sie die <kbd>command</kbd> Taste gedrückt und bewegen Sie Ihr Mausrad oder drücken Sie die <kbd>+</kbd> oder <kbd>-</kbd> Taste auf Ihrer Tastatur
               </li>
       </ul>
       <br>
       <br>
       <section>
        <b>Ziel der Evaluation:</b>
        <br>
          Wir möchten Ihre Eindrücke zur hybriden Lehrveranstaltung erfassen. Dafür bieten wir Ihnen die Möglichkeit, eine Mind-Map zu erstellen.
          Die Evaluation dient dazu, Ihre Einstellungen zur Veranstaltung „Diagnostics & Assessment II – Fields of Application“ mithilfe der innovativen Methode Cognitive-Affective Mapping (CAM) zu erfassen. Auf den nächsten Seiten finden Sie detaillierte Informationen zum Ablauf der Studie.
          Die Ergebnisse dieser Evaluation helfen uns, die Stärken und Verbesserungspotenziale der Lehrveranstaltung zu identifizieren und darauf aufbauend innovative Lehrformate zu entwickeln.
       </section>
       <br>
       <section>
       Auf den nächsten Seiten finden Sie weitere Informationen zum genauen Ablauf der Studie. Zunächst möchten wir Sie bitten, auf der folgenden Seite der informierten Einwilligung zuzustimmen.       
       </section>
   </div>
 </main>
 
 <form id="page-form">
 </form>
 
 <footer class="content-vertical-center content-horizontal-right">
   Um mit der Studie fortzufahren, drücken Sie bitte auf &nbsp;
   <button id="continue" type="submit" form="page-form">
       Weiter &rarr;
   </button>
 </footer>
   `,
   informCon: `
   <header>
   <h2>Informierte Einwilligung</h2>
 </header>
 
 <main class="content-horizontal-center content-vertical-center">
   <div class="w-xl text-left">
       <section>
Im Folgenden erhalten Sie Informationen zu Ihrer Teilnahme an der Evaluation. Bitte lesen Sie diese sorgfältig durch:
       </section>
       <br>
       <section>
Ihre Teilnahme an der  Evaluation ist freiwillig. Sie können Ihre Einwilligung zur Teilnahme jederzeit und ohne Angabe von Gründen widerrufen. Sie können Ihre Zustimmung zur Speicherung der Daten bis zum Ende der Datenerhebung widerrufen, ohne dass Ihnen dadurch Nachteile entstehen.
       </section>
       <br>
       <section>
Da keine personenbezogenen Daten erhoben werden, ist es nach Abschluss der Datenerhebung grundsätzlich nicht mehr möglich, die Daten des Datensatzes mit Ihrer Person in Verbindung zu bringen - der Datensatz ist anonym. Es ist uns nicht möglich, Ihre Daten selektiv zu löschen.
       </section>
       <br>
       <section>
Die Ergebnisse und Daten dieser Evaluation können im Rahmen zukünftiger Publikationen verwendet werden. Dies geschieht in anonymisierter Form, d.h. ohne dass die Daten einer bestimmten Person zugeordnet werden können. Sollten Sie jetzt oder nach der Abfrage Fragen haben, wenden Sie sich bitte an 
Irina Monno (<a href="mailto:irina.monno@psychologie.uni-freiburg.de">irina.monno@psychologie.uni-freiburg.de</a>).
       </section>
       <br>
       <br>
       <br>
       <form id="page-form" style="display: block;" autocomplete="off">
           <!-- BEGIN multiple choice -->
           <div class="page-item page-item-radio" id="page-item-ques_dummycam">
               <p class="text-left font-weight-bold" style="margin: 1rem 0 0.25rem">
               Bitte wählen Sie eine der folgenden Optionen:
               </p>
               <p class="small text-muted hide-if-empty" style="margin: 0.25rem 0">
               Die Ablehnung der aufgeklärten Einwilligung führt zur Beendigung der Studie.
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
                               <input type="radio" name="dummy_informedconsent" value="1" id="dummy_informedconsent"
                                   required>
                           </td>
                           <td>
                               <label for="dummy_informedconsent" class="text-left">
                               Hiermit bestätige ich, dass ich die oben beschriebenen Teilnehmerinformationen verstanden habe und den oben genannten Teilnahmebedingungen <strong>zustimme</strong>.
                               </label>
                           </td>
                       </tr>
                       <!--ans2-->
                       <tr>
                           <td>
                               <input type="radio" name="dummy_informedconsent" value="0" id="dummy_informedconsent2"
                                   required>
                           </td>
                           <td>
                               <label for="dummy_informedconsent2" class="text-left">
                               Hiermit bestätige ich, dass ich die oben beschriebenen Teilnehmerinformationen verstanden habe und den oben genannten Teilnahmebedingungen <strong>nicht zustimme</strong>.
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
 
 <form id="page-form">
 </form>
 
 <footer class="content-vertical-center content-horizontal-right">
   <button id="continue" type="submit" form="page-form">
       Weiter &rarr;
   </button>
 </footer>
   `,
   informConNo: `
   <header></header>
   <main class="content-horizontal-center content-vertical-center">
   <div class="w-l text-justify">
   <section>
       Sie haben der aufgeklärten Einwilligung nicht zugestimmt. Leider bedeutet das, dass die Studie für Sie beendet ist. Sie können
       jetzt den Bildschirm schließen. Drücken Sie die <kbd>Esc</kbd>-Taste, um den Vollbildmodus zu beenden.
   </section>
   </div>
   </main>   
   `,
   exclusionCriteria: `
   <header>
   <h2>Vielen Dank für die Zustimmung zu den Teilnahmebedingungen.</h2>
</header>

<main class="content-horizontal-center content-vertical-center">
   <div class="w-xl text-justify">
       <section>
           Bevor wir beginnen, möchten wir Ihre Aufmerksamkeit auf die folgenden Regeln während der Online-Studie lenken:
       </section>
       <br>
       <ul>
           <li>Bitte beantworten Sie die Studie konzentriert.</li>
           <li>Verlassen Sie den Browserbildschirm der Studie nicht, es sei denn, Sie werden ausdrücklich dazu aufgefordert.</li>
           <li>Bitte lesen Sie alle Anweisungen sorgfältig durch und halten Sie diese ein.</li>
       </ul>
<br>
<br>
Uns ist die Qualität unserer Umfragedaten wichtig. Um ein möglichst genaues Bild Ihrer Meinung zu erhalten, ist es wichtig, dass Sie alle Fragen in dieser Umfrage sorgfältig beantworten.
<br>
<form id="page-form">
<!-- siehe: https://www.qualtrics.com/blog/attention-checks-and-data-quality/ -->
<!-- Mehrfachauswahl + Textfeld -->
<div class="page-item page-item-radio" id="page-item-ques_dummycam">
<p class="text-left font-weight-bold" style="margin: 1rem 0 0.25rem">
Verpflichten Sie sich, in dieser Umfrage wohlüberlegte Antworten zu geben?
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
  <label for="commCheck" class="text-left">
  Ich kann weder das eine noch das andere versprechen
  </label>
</td>
</tr>
<!--ans2-->
<tr>
<td>
  <input type="radio" name="commCheck" value="1" id="commCheck2" required="">
</td>
<td>
  <label for="commCheck2" class="text-left">
  Ja, werde ich
     </label>
</td>
</tr>
<tr>
<td>
  <input type="radio" name="commCheck" value="2" id="commCheck3" required="">
</td>
<td>
  <label for="commCheck3" class="text-left">
  Nein, werde ich nicht
     </label>
</td>
</tr>
</tbody>
</table>
</div>
<!-- ENDE Mehrfachauswahl + Textfeld -->


   </div>
</main>

</form>

<footer class="content-vertical-center content-horizontal-right">
   <button id="continue" type="submit" form="page-form">
       Weiter &rarr;
   </button>
</footer>
   `,



   // !!! adjust if using START
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
      // !!! adjust if using END
   setupStudy: `
   <header>
   <h2>Übersicht der Studie:</h2>
 </header>
 
 <main class="content-horizontal-center content-vertical-center">
   <div class="w-xl text-justify">
     <section>
       Die Studie ist in 3 Teile gegliedert:
     </section>
     <br>
     <table>
       <tr>
       <td>1) Lesen Sie die Anleitung zum Zeichnen einer Cognitive-Affective Map.</td>
       </tr>
       <tr>
       <td>2) Lesen Sie einen Text, um darauf aufbauend Ihre Einstellung gegenüber Veranstaltung „Diagnostics & Assessment II – Fields of Application“ auszuführen.</td>
       </tr>
       <tr>
         <td>3) Zeichnen Sie Ihre Cognitive-Affective Map.</td>
       </tr>
     </table>
     <br>
     <section>
       Die einzelnen Abschnitte werden nachfolgend erklärt und begründet. Wir danken Ihnen nochmals für Ihre Teilnahme an der Studie.
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
   explanationCAM: `
   <header>
     <h2>
     Bitte lesen Sie den folgenden Text aufmerksam. Wir werden Sie im Anschluss bitten eine Cognitive-Affective Map zu zeichnen. 
     </h2>
   </header>
   
   <main class="content-horizontal-center content-vertical-center">
   <div class="w-l text-justify">
    <i>Anmerkung: eventuell müssen Sie nach unten scrollen, um den kompletten Text zu lesen.</i>
   <br>
   <br>
   <section>
 Wir möchten explizit Ihre Einstellungen zu der Hybrid-Veranstaltung <b>„Diagnostics & Assessment II – Fields of Application“</b> erfragen. 
 Dazu haben wir Ihnen die einzelnen Lektionen als Überbegriffe vorgegeben. Von den vorgegebenen Begriffen lassen sich nur die Valenzen (emotionale Bewertung) ändern und nicht der Texte, Sie können jedoch weitere Begriffe ergänzen. Die vorgegebenen Konzepte lassen sich auch nicht löschen.

      </section>
 <br>
      <img alt="ERROR - picture is not shown. Please write an e-mail to the study director that an error has occurred." class="centerIMG"
 src="pre_CAM/static/CAMscenariotext/defaultCAM.JPG">

 <br>
 <br>
 <b>Wichtig:</b> Durch <i>Ändern der emotionalen Bewertung des zentralen Konzepts</i> "Diagnostics & Assessment II" können Sie angeben, ob Sie die Hybrid-Veranstaltung insgesamt als negativ, neutral, ambivalent oder positiv wahrgenommen haben.
 Sie können <i>das Kommentarfeld verwenden</i>, um weitere Erläuterungen zu Ihren gezeichneten Konzepten zu schreiben.
   </div>
 </main>
 
   <form id="page-form"> 
   </form>
   
   <footer class="content-vertical-center content-horizontal-right">
   <div class="w-l text-justify">
   Drücken Sie nicht auf "Weiter", bevor Sie den Text sorgfältig gelesen haben. Der "Weiter"-Knopf ist für 10 Sekunden gesperrt.
   </div>
   &nbsp; <button id="continue" type="submit" form="page-form">
   Weiter &rarr;
 </button>
 </footer>
   `,
}


