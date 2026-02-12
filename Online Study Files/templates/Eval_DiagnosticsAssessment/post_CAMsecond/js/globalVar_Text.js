const textObj = {
  mixedQuestions1: `
  <main class="content-horizontal-center content-vertical-center">
  <div class="w-l text-justify" style="display: block">
    <form id="demography">



      <div class="page-item page-item-likert">
            <p class="font-weight-bold" style="margin: 1rem 0 0.25rem; font-size: 20px;">
            Bitte geben Sie an, wie besorgt Sie über den Klimawandel sind und wie oft Sie darüber nachdenken.
            </p>
            <p class="text-left small text-muted hide-if-empty" style="margin: 0.25rem 0">
            Beantworten Sie bitte jede Aussage, auch wenn Sie sich nicht ganz sicher sind, was Sie antworten sollen.
            </p>
            <p class="font-weight-bold" style="margin: 1rem 0 0.25rem">
            Wie besorgt sind Sie über den Klimawandel?
            </p>

            <table class="page-item-table">
            <colgroup>
    <col style="width: 12%">
    <col style="width: 12%">
    <col style="width: 12%">
    <col style="width: 12%">
    <col style="width: 12%">
    <col style="width: 12%">
    <col style="width: 12%">
    </colgroup>
            <thead class="sticky-top">   
<th class="sticky-top text-center small">
1 (überhaupt nicht besorgt)
</th>
<th class="sticky-top text-center small">
2
</th>
<th class="sticky-top text-center small">
3
</th>
<th class="sticky-top text-center small">
4
</th>
<th class="sticky-top text-center small">
5
</th>
<th class="sticky-top text-center small">
6
</th>
<th class="sticky-top text-center small">
7 (sehr besorgt)
</th>
 </thead>

 <tbody>  
 <td class="text-center">
 <label style="height: 100%; padding: 10px 0">
   <input type="radio" name="concernClimate1" value="1" required>
 </label>
 </td>
 <td class="text-center">
 <label style="height: 100%; padding: 10px 0">
   <input type="radio" name="concernClimate1" value="2" required>
 </label>
 </td>
 <td class="text-center">
 <label style="height: 100%; padding: 10px 0">
   <input type="radio" name="concernClimate1" value="3" required>
 </label>
 </td>
 <td class="text-center">
 <label style="height: 100%; padding: 10px 0">
   <input type="radio" name="concernClimate1" value="4" required>
 </label>
 </td>
 <td class="text-center">
 <label style="height: 100%; padding: 10px 0">
   <input type="radio" name="concernClimate1" value="5" required>
 </label>
 </td>
 <td class="text-center">
 <label style="height: 100%; padding: 10px 0">
   <input type="radio" name="concernClimate1" value="6" required>
 </label>
 </td>
 <td class="text-center">
 <label style="height: 100%; padding: 10px 0">
   <input type="radio" name="concernClimate1" value="7" required>
 </label>
 </td>
 </tbody>
 </table>


</p>
<p class="font-weight-bold" style="margin: 1rem 0 0.25rem">
Wie oft machen Sie sich Sorgen über die potenziell negativen Folgen des Klimawandels?
</p>

<table class="page-item-table">
<colgroup>
<col style="width: 12%">
<col style="width: 12%">
<col style="width: 12%">
<col style="width: 12%">
<col style="width: 12%">
<col style="width: 12%">
<col style="width: 12%">
</colgroup>
<thead class="sticky-top">   
<th class="sticky-top text-center small">
1 (sehr selten)
</th>
<th class="sticky-top text-center small">
2
</th>
<th class="sticky-top text-center small">
3
</th>
<th class="sticky-top text-center small">
4
</th>
<th class="sticky-top text-center small">
5
</th>
<th class="sticky-top text-center small">
6
</th>
<th class="sticky-top text-center small">
7 (sehr oft)
</th>
</thead>

<tbody>  
<td class="text-center">
<label style="height: 100%; padding: 10px 0">
<input type="radio" name="concernClimate2" value="1" required>
</label>
</td>
<td class="text-center">
<label style="height: 100%; padding: 10px 0">
<input type="radio" name="concernClimate2" value="2" required>
</label>
</td>
<td class="text-center">
<label style="height: 100%; padding: 10px 0">
<input type="radio" name="concernClimate2" value="3" required>
</label>
</td>
<td class="text-center">
<label style="height: 100%; padding: 10px 0">
<input type="radio" name="concernClimate2" value="4" required>
</label>
</td>
<td class="text-center">
<label style="height: 100%; padding: 10px 0">
<input type="radio" name="concernClimate2" value="5" required>
</label>
</td>
<td class="text-center">
<label style="height: 100%; padding: 10px 0">
<input type="radio" name="concernClimate2" value="6" required>
</label>
</td>
<td class="text-center">
<label style="height: 100%; padding: 10px 0">
<input type="radio" name="concernClimate2" value="7" required>
</label>
</td>
</tbody>
</table>


    </form>
  </div>
</main>

  
  <footer class="content-vertical-center content-horizontal-right">
  <div class="w-l text-justify">
  </div>
  <button id="continue" type="submit" form="demography">
  Weiter &rarr;
</button>

</footer>
  `,
  mixedQuestions2: `
  <main class="content-horizontal-center content-vertical-center">
  <div class="w-l text-justify" style="display: block">
    <form id="demography">



      <div class="page-item page-item-likert">
<p class="font-weight-bold" style="margin: 1rem 0 0.25rem; font-size: 20px;">
Bitte geben Sie an, für wie wahrscheinlich Sie die Aussagen halten.
</p>
<p class="text-left small text-muted hide-if-empty" style="margin: 0.25rem 0">
Beantworten Sie bitte jede Aussage, auch wenn Sie sich nicht ganz sicher sind, was Sie antworten sollen.
</p>
<p class="font-weight-bold" style="margin: 1rem 0 0.25rem">
Für wie wahrscheinlich halten Sie es, dass Sie im Laufe ihres Lebens aufgrund des Klimawandels ernsthafte Bedrohungen für Ihre Gesundheit oder Ihr allgemeines Wohlbefinden erleben werden? 
</p>

<table class="page-item-table">
<colgroup>
<col style="width: 12%">
<col style="width: 12%">
<col style="width: 12%">
<col style="width: 12%">
<col style="width: 12%">
<col style="width: 12%">
<col style="width: 12%">
</colgroup>
<thead class="sticky-top">   
<th class="sticky-top text-center small">
1 (überhaupt nicht wahrscheinlich)
</th>
<th class="sticky-top text-center small">
2
</th>
<th class="sticky-top text-center small">
3
</th>
<th class="sticky-top text-center small">
4
</th>
<th class="sticky-top text-center small">
5
</th>
<th class="sticky-top text-center small">
6
</th>
<th class="sticky-top text-center small">
7 (sehr wahrscheinlich)
</th>
</thead>

<tbody>  
<td class="text-center">
<label style="height: 100%; padding: 10px 0">
<input type="radio" name="probabilityClimate1" value="1" required>
</label>
</td>
<td class="text-center">
<label style="height: 100%; padding: 10px 0">
<input type="radio" name="probabilityClimate1" value="2" required>
</label>
</td>
<td class="text-center">
<label style="height: 100%; padding: 10px 0">
<input type="radio" name="probabilityClimate1" value="3" required>
</label>
</td>
<td class="text-center">
<label style="height: 100%; padding: 10px 0">
<input type="radio" name="probabilityClimate1" value="4" required>
</label>
</td>
<td class="text-center">
<label style="height: 100%; padding: 10px 0">
<input type="radio" name="probabilityClimate1" value="5" required>
</label>
</td>
<td class="text-center">
<label style="height: 100%; padding: 10px 0">
<input type="radio" name="probabilityClimate1" value="6" required>
</label>
</td>
<td class="text-center">
<label style="height: 100%; padding: 10px 0">
<input type="radio" name="probabilityClimate1" value="7" required>
</label>
</td>
</tbody>
</table>




<p class="font-weight-bold" style="margin: 1rem 0 0.25rem">
Für wie wahrscheinlich halten Sie es, dass der Klimawandel sehr schädliche, langfristige Auswirkungen auf unsere Gesellschaft haben wird? 
</p>

<table class="page-item-table">
<colgroup>
<col style="width: 12%">
<col style="width: 12%">
<col style="width: 12%">
<col style="width: 12%">
<col style="width: 12%">
<col style="width: 12%">
<col style="width: 12%">
</colgroup>
<thead class="sticky-top">   
<th class="sticky-top text-center small">
1 (überhaupt nicht wahrscheinlich)
</th>
<th class="sticky-top text-center small">
2
</th>
<th class="sticky-top text-center small">
3
</th>
<th class="sticky-top text-center small">
4
</th>
<th class="sticky-top text-center small">
5
</th>
<th class="sticky-top text-center small">
6
</th>
<th class="sticky-top text-center small">
7 (sehr wahrscheinlich)
</th>
</thead>

<tbody>  
<td class="text-center">
<label style="height: 100%; padding: 10px 0">
<input type="radio" name="probabilityClimate2" value="1" required>
</label>
</td>
<td class="text-center">
<label style="height: 100%; padding: 10px 0">
<input type="radio" name="probabilityClimate2" value="2" required>
</label>
</td>
<td class="text-center">
<label style="height: 100%; padding: 10px 0">
<input type="radio" name="probabilityClimate2" value="3" required>
</label>
</td>
<td class="text-center">
<label style="height: 100%; padding: 10px 0">
<input type="radio" name="probabilityClimate2" value="4" required>
</label>
</td>
<td class="text-center">
<label style="height: 100%; padding: 10px 0">
<input type="radio" name="probabilityClimate2" value="5" required>
</label>
</td>
<td class="text-center">
<label style="height: 100%; padding: 10px 0">
<input type="radio" name="probabilityClimate2" value="6" required>
</label>
</td>
<td class="text-center">
<label style="height: 100%; padding: 10px 0">
<input type="radio" name="probabilityClimate2" value="7" required>
</label>
</td>
</tbody>
</table>

    </form>
  </div>
</main>

  
  <footer class="content-vertical-center content-horizontal-right">
  <div class="w-l text-justify">
  </div>
  <button id="continue" type="submit" form="demography">
  Weiter &rarr;
</button>

</footer>
  `,
  socioDemo: `
  <header>
    <h2>
    Bitte beantworten Sie die folgenden Fragen zu Ihrer Person:
    </h2>
  </header>
  
  <main class="content-horizontal-center content-vertical-center">
  <div class="w-l text-justify" style="display: block">
    
    <p class="text-left">Bevor die Studie endet, möchten wir Sie bitten, ein paar Angaben zu Ihrer Person zu machen.</p>
    
    <form id="demography">
      <table>
               <!-- Education    -->
        <tr style="height: 100px">
        <td >
        Bitte geben Sie Ihren höchsten Studienabschluss an:
          </td>
          <td>
            <select name="education" required style="width: 300px">
              <option value="" selected>
              -- Bitte wählen Sie --
              </option>
              <option value="no">kein Abschluss</option>
              <option value="highschool">Abitur</option>
              <option value="bachelor">Bachelor</option>
              <option value="master">Master</option>
              <option value="phd">Doktor</option>              
            </select>
          </td>
        </tr>
     

        <!-- Occupation
        <tr style="height: 100px">
          <td>
            What is your occupation, or if you still study, your field?
          </td>
          <td>
            <input name="occupation" class="w-100">
          </td>
        </tr>
        -->

        <!-- Column balance -->
        <colgroup>
          <col style="width: 45%">
          <col style="width: 55%">
        </colgroup>
      </table>


      <div class="page-item page-item-likert">
            <p class="font-weight-bold" style="margin: 1rem 0 0.25rem">
            In der Politik spricht man manchmal von "links" und "rechts". Ordnen Sie sich selbst auf dieser Skala ein, wobei 0 für links und 10 für rechts steht:
            </p>
            <span style="margin-left: 2%; display: inline-block; width: 80px; font-size: 14px;">
Links(0)
</span>
<span style="float: right; display: inline-block; width: 50px; font-size: 14px;">
Rechts(10)
</span><table class="page-item-table">
              <colgroup>

      <col style="width: 6%">
      <col style="width: 6%">
      <col style="width: 6%">
      <col style="width: 6%">
      <col style="width: 6%">
      <col style="width: 6%">
      <col style="width: 6%">
      <col style="width: 6%">
      <col style="width: 6%">
      <col style="width: 6%">
      <col style="width: 6%">
      </colgroup>
              <thead class="sticky-top">
    
        <th class="sticky-top text-center small">
  0
</th>
<th class="sticky-top text-center small">
  1
</th>
<th class="sticky-top text-center small">
  2
</th>
<th class="sticky-top text-center small">
  3
</th>
<th class="sticky-top text-center small">
  4
</th>
<th class="sticky-top text-center small">
  5
</th>
<th class="sticky-top text-center small">
  6
</th>
<th class="sticky-top text-center small">
  7
</th>
<th class="sticky-top text-center small">
  8
</th>
<th class="sticky-top text-center small">
  9
</th>
<th class="sticky-top text-center small">
  10
</th>
      </tr></thead>
              <tbody>
                <tr>

      <td class="text-center">
  <label style="height: 100%; padding: 10px 0">
    <input type="radio" name="lrscale" value="1" required>
  </label>
</td>
<td class="text-center">
  <label style="height: 100%; padding: 10px 0">
    <input type="radio" name="lrscale" value="2" required>
  </label>
</td>
<td class="text-center">
  <label style="height: 100%; padding: 10px 0">
    <input type="radio" name="lrscale" value="3" required>
  </label>
</td>
<td class="text-center">
  <label style="height: 100%; padding: 10px 0">
    <input type="radio" name="lrscale" value="4" required>
  </label>
</td>
<td class="text-center">
  <label style="height: 100%; padding: 10px 0">
    <input type="radio" name="lrscale" value="5" required>
  </label>
</td>
<td class="text-center">
  <label style="height: 100%; padding: 10px 0">
    <input type="radio" name="lrscale" value="6" required>
  </label>
</td>
<td class="text-center">
  <label style="height: 100%; padding: 10px 0">
    <input type="radio" name="lrscale" value="7" required>
  </label>
</td>
<td class="text-center">
  <label style="height: 100%; padding: 10px 0">
    <input type="radio" name="lrscale" value="8" required>
  </label>
</td>
<td class="text-center">
  <label style="height: 100%; padding: 10px 0">
    <input type="radio" name="lrscale" value="9" required>
  </label>
</td>
<td class="text-center">
  <label style="height: 100%; padding: 10px 0">
    <input type="radio" name="lrscale" value="10" required>
  </label>
</td>
<td class="text-center">
  <label style="height: 100%; padding: 10px 0">
    <input type="radio" name="lrscale" value="11" required>
  </label>
</td>
    </tr>
<tr>
    
              </tbody>
            </table>
          </div>

<br>
          <div class="page-item page-item-likert">
          <p class="font-weight-bold" style="margin: 1rem 0 0.25rem">
          Unabhängig davon, ob Sie einer bestimmten Religion angehören, wie religiös würden Sie sich selbst einschätzen?
          </p>
          <span style="margin-left: 2%; display: inline-block; width: 80px; font-size: 14px;">
Überhaupt nicht religiös(0)
</span>
<span style="float: right; display: inline-block; width: 50px; font-size: 14px;">
Sehr religiös(10)
</span><table class="page-item-table">
            <colgroup>

    <col style="width: 6%">
    <col style="width: 6%">
    <col style="width: 6%">
    <col style="width: 6%">
    <col style="width: 6%">
    <col style="width: 6%">
    <col style="width: 6%">
    <col style="width: 6%">
    <col style="width: 6%">
    <col style="width: 6%">
    <col style="width: 6%">
    </colgroup>
            <thead class="sticky-top">
  
      <th class="sticky-top text-center small">
0
</th>
<th class="sticky-top text-center small">
1
</th>
<th class="sticky-top text-center small">
2
</th>
<th class="sticky-top text-center small">
3
</th>
<th class="sticky-top text-center small">
4
</th>
<th class="sticky-top text-center small">
5
</th>
<th class="sticky-top text-center small">
6
</th>
<th class="sticky-top text-center small">
7
</th>
<th class="sticky-top text-center small">
8
</th>
<th class="sticky-top text-center small">
9
</th>
<th class="sticky-top text-center small">
10
</th>
    </tr></thead>
            <tbody>
              <tr>

    <td class="text-center">
<label style="height: 100%; padding: 10px 0">
  <input type="radio" name="rlgdgr" value="1" required>
</label>
</td>
<td class="text-center">
<label style="height: 100%; padding: 10px 0">
  <input type="radio" name="rlgdgr" value="2" required>
</label>
</td>
<td class="text-center">
<label style="height: 100%; padding: 10px 0">
  <input type="radio" name="rlgdgr" value="3" required>
</label>
</td>
<td class="text-center">
<label style="height: 100%; padding: 10px 0">
  <input type="radio" name="rlgdgr" value="4" required>
</label>
</td>
<td class="text-center">
<label style="height: 100%; padding: 10px 0">
  <input type="radio" name="rlgdgr" value="5" required>
</label>
</td>
<td class="text-center">
<label style="height: 100%; padding: 10px 0">
  <input type="radio" name="rlgdgr" value="6" required>
</label>
</td>
<td class="text-center">
<label style="height: 100%; padding: 10px 0">
  <input type="radio" name="rlgdgr" value="7" required>
</label>
</td>
<td class="text-center">
<label style="height: 100%; padding: 10px 0">
  <input type="radio" name="rlgdgr" value="8" required>
</label>
</td>
<td class="text-center">
<label style="height: 100%; padding: 10px 0">
  <input type="radio" name="rlgdgr" value="9" required>
</label>
</td>
<td class="text-center">
<label style="height: 100%; padding: 10px 0">
  <input type="radio" name="rlgdgr" value="10" required>
</label>
</td>
<td class="text-center">
<label style="height: 100%; padding: 10px 0">
  <input type="radio" name="rlgdgr" value="11" required>
</label>
</td>
  </tr>
<tr>
  
            </tbody>
          </table>
        </div>
    </form>
  </div>
</main>

  
  <footer class="content-vertical-center content-horizontal-right">
  <div class="w-l text-justify">
  </div>
  <button id="continue" type="submit" form="demography">
  Weiter &rarr;
</button>

</footer>
  `,
  feedbackQues: `
  <header>
    <h2>
    Wenn Sie möchten, beantworten Sie bitte diese letzte Frage:
    </h2>
  </header>
  
  <main class="content-horizontal-center content-vertical-center" >
  <div class="w-xl">
    <form id="page-form" style="display: block;" autocomplete="off">
<!-- multiline text text --> 
<div class="page-item page-item-textarea" id="page-item-feedback_critic">
  <p class="text-left font-weight-bold" style="margin: 1rem 0 0.25rem">
  Haben Sie Feedback oder Kritik an der Online-Studie?
  </p>
  <p class="text-left small text-muted hide-if-empty" style="margin: 0.25rem 0">
  Jegliche Kritik oder Verbesserungsvorschläge helfen uns sehr, zukünftige Studien zu verbessern.
  </p>
  <textarea name="feedback_critic" class="w-100" rows="4"></textarea>
</div>
<!-- END multiline text --> 
     
    </form>
  </div> 
</main>
  
  <footer class="content-vertical-center content-horizontal-right">
  <button id="continue" type="submit" form="page-form">
  Weiter &rarr;
</button>
</footer>
  `,
  CETinfo: `
  <header>
    <h2>
Informationen zur nachfolgenden Aufgabe
    </h2>
  </header>
  
    <form id="page-form" style="display: block;" autocomplete="off">
    </form>


    <main class="content-horizontal-center content-vertical-center">
    <div class="w-l text-justify">
    <i>Anmerkung: eventuell müssen Sie nach unten scrollen, um den kompletten Text zu lesen.</i>
        <br>
        <br>
        <section>
        In der folgenden Aufgabe werden Sie gebeten 25 Entscheidungen zu treffen (1 pro Durchgang) die eine Bonuszahlung beeinflussen kann. In jedem der 25 Durchgänge, werden Sie gebeten sich zwischen 2 generellen Optionen zu entscheiden. 
        </section>
        <br>
        <section>
        <b>Option A</b> wird immer eine Möglichkeit beinhalten einen finanziellen Bonus für Sie zu erhalten, aber es hat eine reale Konsequenz für die Umwelt. Option A zu wählen, gibt Ihnen eine finanzielle Belohnung (mit variierenden Beträgen zwischen 20 Cent und 1 Euro), aber es wird üblicherweise zu Emissionen von C02 (Kohlenstoffdioxid) Emissionen führen (C02, zwischen 0kg und 9kg). C02 Emissionen werden als ein hauptverursachender Faktor des Klimawandels angesehen und Wissenschaftler rund um die Welt sind sich einig, dass der Klimawandel nur abgeschwächt werden kann, wenn CO2 Emissionen drastisch reduziert werden. Damit Sie die Folgen besser verstehen, wird bei jeder Entscheidung die Menge an Kohlendioxid, die durch Ihre Entscheidung entsteht, in die Emissionen eines durchschnittlichen deutschen Fahrzeugs "übersetzt".
        </section>
        <br>
        <section>
        Wählen Sie hingegen <b>Option B</b>, erhalten Sie keine Bonuszahlung, verursachen aber auch keine Kohlendioxidemissionen.
        </section>
        <br>
        <section>
        In jedem der 25 Durchgänge, haben Sie <b>15 Sekunden Zeit, um Ihre Entscheidung zu treffen</b>. Falls Sie in den 15 Sekunden keine Entscheidung treffen, wird der Bildschirm <b>automatisch zum nächsten Durchgang weiterlaufen</b>, und Sie erhalten für den Versuch, bei dem Sie keine Entscheidung getroffen haben, keine Bonuszahlung. 
        </section>
        <br>
        <section>
        Im Allgemeinen sieht jeder Versuch wie folgt aus:
        </section>
        <ul>
        <li>
        <b>Option A: Sie erhalten eine Bonuszahlung von 40 Cent und verursachen CO2 Emissionen von 2kg (was einer Autofahrt von 11,65km entspricht).</b> 
        </li>
        <li>
        <b>Option B: Sie erhalten keine Prämie, und es wird kein CO2 ausgestoßen.</b>
         </li>
    </ul>
    <br>
    <section>
    Wichtig ist, dass alle Emissionen <b>real sind und sich tatsächlich auf den Planeten auswirken</b> werden. Dies wird durch das folgende Instrument ermöglicht: Die Forscher sind im Besitz von CO2-Zertifikaten, die den Ausstoß von Kohlendioxid erlauben. Wählt man die Option, auf den Bonus zu verzichten (Option B in jedem Versuch), wird das Zertifikat im Gegenwert der mit Option A verbundenen Emissionen dem Markt entzogen und vernichtet. Ermöglicht wird dies durch professionelle Dienstleister, von denen die Forscher diese Zertifikate kaufen. <b>Ihre Entscheidung wird also eine tatsächliche und reale Auswirkung auf die Umwelt haben.</b> Es handelt sich <u><b>NICHT</b></u> um eine hypothetische Entscheidung.
    </section>
    <br>
    <section>
    Ihre tatsächliche Bonuszahlung sowie die tatsächlichen Emissionen basieren auf einer Ihrer Entscheidungen, die nach dem Zufallsprinzip aus Ihren 25 Versuchen ausgewählt wird. Ihr tatsächlicher Bonus wird daher zwischen 0 Cent und 1 Euro variieren.
    </section>
    <br>
    <section>
    Bevor Sie Ihre erste Entscheidung treffen, haben Sie die Möglichkeit, einen <b>Übungsversuch zu absolvieren und eine Verständnisfrage zu beantworten</b>, damit Sie sich mit dem Entscheidungsbildschirm vertraut machen können. Anders als bei den 25 Versuchen gibt es beim Übungsversuch keinen Bonus und keine Emissionsfolgen, und die Zeit ist nicht begrenzt.
    </section>
    </div>
  </main>
  


  <footer class="content-vertical-center content-horizontal-right">
  <div class="w-l text-justify">
  Drücken Sie nicht auf "Weiter", bevor Sie den Text sorgfältig gelesen haben. Der "Weiter"-Knopf ist für 15 Sekunden gesperrt.
  </div>
  &nbsp; <button id="continue" type="submit" form="page-form">
  Weiter &rarr;
  </button>
  </footer>
  `,
  CETpractice: `
  <header>
  <h3>Übungsversuch - Bitte wählen Sie zwischen Option A und Option B:</h3>
</header>
<br>
  <!-- CET -->
  <div class="page-item page-item-likert" style="margin-left:40%; margin-right: 40%">
  <form id="ratingBasalAttributes">
      <div style="display: flex; justify-content: space-around">
      <!-- Option A -->
      <label>
      <table align="center" border="1" cellpadding="1" cellspacing="1" style="width:400px; margin-right:50px;">
   <tbody>
    <tr>
     <td colspan="2" style="text-align: center;"><strong>Option A</strong></td>
    </tr>
    <tr>
     <td>&nbsp;CO2 Emissionen<br/>`
     + '&nbsp;<strong> 2 kg CO2 <br/>(~11.65km mit dem Auto)</strong></td>' + `
     <td>&nbsp;Bonuszahlung<br/>
     `
     + '   &nbsp;<strong>40 Cent<br/><br/></strong></td>' + `
    </tr>
    <tr>
     </tbody>
  </table>
  <input type="radio" name="choosenOption_test" value="optionA" id="optionA" style="transform: scale(2); margin-top: 10px;">
  </label>
  
  <br>
  
  <!-- Option B -->
  <label>
  <table align="center" border="1" cellpadding="1" cellspacing="1" style="width:400px;">
  <tbody>
  <tr>
  <td colspan="2" style="text-align: center;"><strong>Option B</strong></td>
  </tr>
  <tr>
  <td>&nbsp;CO2 Emissionen<br/>`
  + '&nbsp;<strong> 0 kg CO2 <br/>(~0km mit dem Auto)</strong></td>' + `
  <td>&nbsp;Bonuszahlung<br/>
  `
  + '   &nbsp;<strong>0 Cent<br/><br/></strong></td>' + `
  </tr>
  <tr>
  </tbody>
  </table>
  <input type="radio" name="choosenOption_test" value="optionB" id="optionB" style="transform: scale(2); margin-top: 10px;">
  </label>
  </div>
      </div>
    </form>
  <br>
      <button id="continue" type="submit" form="ratingBasalAttributes">
      Bitte klicken Sie auf eine der Optionen, um fortzufahren
    </button>
  `,
  CETcontrolQUestion: `
  <header>
  <h3>Rückfrage:</h3>
</header>
<br>
  <!-- CET -->
  <main class="content-horizontal-center content-vertical-center">
  <div class="w-l text-justify">

      <form id="page-form" style="display: block;" autocomplete="off">
          <!-- BEGIN multiple choice -->
          <div class="page-item page-item-radio" id="page-item-ques_dummycam">
              <p class="text-left font-weight-bold" style="margin: 1rem 0 0.25rem">
              Kontrollfrage:  Hat die Entscheidung, von der Ihr Bonus abhängt, eine echte Auswirkung auf die Umwelt?
              </p>
              <p class="small text-muted hide-if-empty" style="margin: 0.25rem 0">
             Bitte wählen Sie eine der folgenden Optionen.
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
                              <input type="radio" name="CET_control" value="1" id="CET_control"
                                  required>
                          </td>
                          <td>
                              <label for="CET_control" class="text-left">
                             Ja
                              </label>
                          </td>
                      </tr>
                      <!--ans2-->
                      <tr>
                          <td>
                              <input type="radio" name="CET_control" value="0" id="CET_control2"
                                  required>
                          </td>
                          <td>
                              <label for="CET_control2" class="text-left">
                             Nein
                              </label>
                          </td>
                      </tr>

                  </tbody>
              </table>
          </div>
          <!-- END multiple choice -->
      </form>
      <br>
<br>
      Bitte setzen Sie die Umfrage fort, sobald Sie für die erste Entscheidung bereit sind. Denken Sie daran, dass Sie bei jedem Durchgang 15 Sekunden Zeit haben, um Ihre Entscheidung zu treffen.
  </div>
</main>

  <footer class="content-vertical-center content-horizontal-right">
    <button id="continue" type="submit" form="page-form">
        Weiter &rarr;
    </button>
  </footer>
  `,


  
}

