$(document).ready(function(){
    $('select').formSelect();
  });

  var formatter = new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  
  var formatterDigits = new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
  
  //attivazione navbar mobile
  document.addEventListener('DOMContentLoaded', function() {
      var elems = document.querySelectorAll('.sidenav');
      var instances = M.Sidenav.init(elems);
    });
  
  //attivazione animazioni
  (function() {
      var elements;
      var windowHeight;
    
      function init() {
        elements = document.querySelectorAll('.hidden');
        windowHeight = window.innerHeight;
      }
    
      function checkPosition() {
        for (var i = 0; i < elements.length; i++) {
          var element = elements[i];
          var positionFromTop = elements[i].getBoundingClientRect().top;
    
          if (positionFromTop - windowHeight <= 0) {
            element.classList.add('fade-in-element');
            element.classList.remove('hidden');
          }
        }
      }
    
      window.addEventListener('scroll', checkPosition);
      window.addEventListener('resize', init);
    
      init();
      checkPosition();
    })();
  
  //Attivazione tooltips
      document.addEventListener('DOMContentLoaded', function() {
          var elems = document.querySelectorAll('.tooltipped');
          var instances = M.Tooltip.init(elems, {enterDelay:50});
        });
  
  //Attivazione Floating Button
    document.addEventListener('DOMContentLoaded', function() {
      var elems = document.querySelectorAll('.fixed-action-btn');
      var instances = M.FloatingActionButton.init(elems);
    });       
  
    //attivazione dropdown navbar
  $(".dropdown-trigger").dropdown({ hover: false, constrainWidth: false, coverTrigger: false });

  //Mostra/nasconde il contributo del datore di lavoro
  $("#contributo-percentuale-ral").hide();
  $("#contributo-flat").hide();
  
  const selectContributoDtD = document.getElementById('contributo-datore-lavoro');
  selectContributoDtD.addEventListener('change', (event) => {
      let checkboxPercentageValue = document.getElementById('si-percentage').checked;
      let checkboxFlatValue = document.getElementById('si-flat').checked;
      if (checkboxPercentageValue) {
          $("#contributo-percentuale-ral").show();
          $("#contributo-flat").hide();
      } else if (checkboxFlatValue) {
          $("#contributo-percentuale-ral").hide();
          $("#contributo-flat").show();
      } else {
        $("#contributo-percentuale-ral").hide();
        $("#contributo-flat").hide();
      };
  });

//Check # of simulations
var contatore = 0;

//Funzione per calcolare il totale e il max di un array 
const reducer = (accumulator, currentValue) => accumulator + currentValue;
const maxArray = function(a, b) {
    return Math.max(a, b);
};

//Calcolo e aggiornamento automatico IRPEF e contributo percentuale RAL


const selectRAL = document.getElementById('ral');
selectRAL.addEventListener('change', (event) => {
    let RAL = parseFloat(document.getElementById('ral').value);
    let scaglioni = [15000,13000,27000,20000,Math.pow(10, 1000)];
    let IRPEF = [0.23, 0.27, 0.38, 0.41, 0.43];
    let decreasingRAL = RAL;
    let scaglioniRAL = [];
    let appliedIRPEF = [];
    for (i = 0; i < 5; i++) {
        scaglioniRAL.push(Math.min(decreasingRAL, scaglioni[i]));
        decreasingRAL = decreasingRAL - scaglioniRAL[i];

        if (scaglioniRAL[i] != 0) {
            appliedIRPEF.push(IRPEF[i]);
        } else {
            appliedIRPEF.push(0);
        }
    }

    document.getElementById('irpef').value = Math.max.apply(Math, appliedIRPEF) * 100;

    let contributoPercentualeRAL = parseFloat(document.getElementById('percentualeRAL').value) / 100;
    document.getElementById('contributo-percentuale-calcolato').value = contributoPercentualeRAL * RAL;

});

const selectPercentualeRAL = document.getElementById('percentualeRAL');
selectPercentualeRAL.addEventListener('change', (event) => {
    let RAL = parseFloat(document.getElementById('ral').value);
    let contributoPercentualeRAL = parseFloat(document.getElementById('percentualeRAL').value) / 100;
    document.getElementById('contributo-percentuale-calcolato').value = contributoPercentualeRAL * RAL;
});


  //FUNZIONE DI CALCOLO - abbinata al bottone
  function calcolo()
  {
    let element = document.getElementById('floating-calcolo');
      element.classList.remove("pulse");

    //Generale
        let anniSimulazione = parseFloat(document.getElementById('durata-simulazione').value);

        let investimentoAnnuale = parseFloat(document.getElementById('investimento-annuale').value);

        const limiteDeducibilità = 5164.57;
        const impostaDiBollo = 0.002;
        const tassaPlusvalenzePAC = 0.26;
        const tassaPlusvalenzeFP = 0.2;
        const ritenutaFP = 0.15 - Math.min(0.003 * anniSimulazione, 0.06);

    //PAC
    
        let rendimentoPAC = parseFloat(document.getElementById('rendimento-pac').value) / 100;

        let costiGestionePAC = parseFloat(document.getElementById('costi-gestione-pac').value) / 100;

        let investimentiStoriciPAC = [];
        let investimentiCumulativiPAC = [];

        let tasseStoricheCumulativePAC = [];

        let patrimonioStoricoLordoCumulativoPAC = [];
        let plusvalenzeStoricheCumulativePAC = [];
        let patrimonioStoricoNettoCumulativoCostiImpostaTassePAC = [];

        for (i = 0; i < anniSimulazione; i++) {

            investimentiStoriciPAC.push(investimentoAnnuale);

            investimentiCumulativiPAC.push(investimentiStoriciPAC.reduce(reducer));

            let compoundingFactor = 1 + rendimentoPAC;

            patrimonioStoricoLordoCumulativoPAC.push((investimentiStoriciPAC[i] + (i == 0 ? 0 : patrimonioStoricoLordoCumulativoPAC[i - 1] * compoundingFactor)) * (1 - costiGestionePAC) * (1 - impostaDiBollo));
            
            plusvalenzeStoricheCumulativePAC.push(Math.max(patrimonioStoricoLordoCumulativoPAC[i] - investimentiCumulativiPAC[i],0));
            
            tasseStoricheCumulativePAC.push(plusvalenzeStoricheCumulativePAC[i] * tassaPlusvalenzePAC);
            patrimonioStoricoNettoCumulativoCostiImpostaTassePAC.push(plusvalenzeStoricheCumulativePAC[i] * (1 - tassaPlusvalenzePAC) + investimentiCumulativiPAC[i]);
        };

        let patrimonioTotaleLordoPAC = patrimonioStoricoLordoCumulativoPAC.reduce(maxArray);
        let tasseTotaliPAC = tasseStoricheCumulativePAC.reduce(maxArray);
        let investimentiTotaliPAC = investimentiStoriciPAC.reduce(reducer);

        let patrimonioTotaleNettoCostiImpostaTassePAC = patrimonioStoricoNettoCumulativoCostiImpostaTassePAC.reduce(maxArray);


        document.getElementById('table-investimenti-pac').innerHTML = formatter.format(investimentiTotaliPAC);

        document.getElementById('table-patrimonio-pac').innerHTML = formatter.format(patrimonioTotaleLordoPAC);

        document.getElementById('table-tasse-pac').innerHTML = formatter.format(tasseTotaliPAC);

        document.getElementById('table-pac-totale').innerHTML = formatter.format(patrimonioTotaleNettoCostiImpostaTassePAC);

      
    //Fondo Pensione
    
        let rendimentoFP = parseFloat(document.getElementById('rendimento-fp').value) / 100;
        let costiGestioneFP = parseFloat(document.getElementById('costi-gestione-fp').value) / 100;
        let aliquotaIRPEF = parseFloat(document.getElementById('irpef').value) / 100;
        let contributoDTD = 0;

        let checkboxPercentageValue = document.getElementById('si-percentage').checked;
        let checkboxFlatValue = document.getElementById('si-flat').checked;

        if (checkboxPercentageValue) {
            contributoDTD = parseFloat(document.getElementById('contributo-percentuale-calcolato').value)
        } else if (checkboxFlatValue) {
            contributoDTD = parseFloat(document.getElementById('contributo-flat').value)
        }

        let investimentoAnnualeFP = Math.min(investimentoAnnuale + contributoDTD, limiteDeducibilità);
        let contributoConguaglioFP = Math.min(limiteDeducibilità - contributoDTD, investimentoAnnuale);
        let conguaglioFiscaleAnnuale = 0;
            let RAL = parseFloat(document.getElementById('ral').value);
            let scaglioni = [15000,13000,27000,20000,Math.pow(10, 1000)];
            let IRPEF = [0.23, 0.27, 0.38, 0.41, 0.43];
            let decreasingRAL = RAL;
            let scaglioniRAL = [];
            let appliedIRPEF = [];
            while (decreasingRAL > 0) {
                for (i = 0; i < scaglioni.length; i++) {
                    scaglioniRAL.push(Math.min(decreasingRAL, scaglioni[i]));
                    decreasingRAL = decreasingRAL - scaglioniRAL[i];

                    if (scaglioniRAL[i] != 0) {
                        appliedIRPEF.push(IRPEF[i]);
                    } else {
                        appliedIRPEF.push(0);
                    }
                }
            }
            function removeElementsWithValue(arr, val) {
                var i = arr.length;
                while (i--) {
                    if (arr[i] === val) {
                        arr.splice(i, 1);
                    }
                }
                return arr;
            };
            removeElementsWithValue(scaglioniRAL,0);

            let scaglioniRALlength = scaglioniRAL.length;
            if (scaglioniRAL[scaglioniRALlength - 1] >= contributoConguaglioFP) {
                conguaglioFiscaleAnnuale = contributoConguaglioFP * aliquotaIRPEF;
            } else if (scaglioniRAL[scaglioniRALlength - 2] >= contributoConguaglioFP && (scaglioniRALlength - 2) >= 0) {
                let conguaglioFiscalePrimoScaglione = scaglioniRAL[scaglioniRALlength - 1] * appliedIRPEF[scaglioniRALlength - 1];
                let conguaglioFiscaleSecondoScaglione = (contributoConguaglioFP - scaglioniRAL[scaglioniRALlength - 1]) * appliedIRPEF[scaglioniRALlength - 2]

                conguaglioFiscaleAnnuale = conguaglioFiscalePrimoScaglione + conguaglioFiscaleSecondoScaglione;
            } else {
                conguaglioFiscaleAnnuale = Math.min(contributoConguaglioFP,scaglioniRAL[0]) * appliedIRPEF[0];
            }


        let investimentiStoriciFP = [];
        let investimentiCumulativiFP = [];
        let tasseStoricheCumulativeFP = [];
        let ritenutaStoricaCumulativaFP = [];
        let patrimonioNettoNettoFP = [];
        let patrimonioStoricoLordoCumulativoFP = [];
        let plusvalenzeStoricheCumulativeFP = [];
        let patrimonioStoricoNettoCumulativoCostiImpostaTasseFP = [];

        let investimentiStoriciPACFP = [];

        let investimentiStoriciPACFPConguaglio = [];

        let investimentiStoriciFPConguaglioFP = [];

        let investimentiStoriciPACePACFP = [];
        let investimentiCumulativiPACePACFP = [];
        let tasseStoricheCumulativePACePACFP = [];
        let patrimonioStoricoLordoCumulativoPACePACFP = [];
        let plusvalenzeStoricheCumulativePACePACFP = [];
        let patrimonioStoricoNettoCumulativoCostiImpostaTassePACePACFP = [];

        let investimentiStoriciFPeConguaglioFP = [];

        let patrimonioTotaleStoricoNettoScenarioFP = [];

        let contributoNonDeducibile = Math.max(investimentoAnnuale + contributoDTD - limiteDeducibilità,0);
        let gapDeducibilità = Math.max(limiteDeducibilità - investimentoAnnualeFP,0);

        let conguaglioInPAC = Math.max(conguaglioFiscaleAnnuale - gapDeducibilità,0);
        let conguaglioInFP = Math.max(conguaglioFiscaleAnnuale - conguaglioInPAC,0);

        for (i = 0; i < anniSimulazione; i++) {

            //investimenti deducibili in FP
            investimentiStoriciFP.push(investimentoAnnualeFP);

            //investimenti non deducibili -> in un PAC
            
            investimentiStoriciPACFP.push(contributoNonDeducibile);

            //Conguaglio fiscale
                //PAC
                investimentiStoriciPACFPConguaglio.push(i == 0 ? 0 : conguaglioInPAC);

                //FP
                investimentiStoriciFPConguaglioFP.push(i == 0 ? 0 : conguaglioInFP);

            //PAC Totale
            let investimentoAnnualeTotalePAC = investimentiStoriciPACFPConguaglio[i] + investimentiStoriciPACFP[i];
            investimentiStoriciPACePACFP.push(investimentoAnnualeTotalePAC);

            investimentiCumulativiPACePACFP.push(investimentiStoriciPACePACFP.reduce(reducer));

            let compoundingFactorPACePACFP = 1 + rendimentoPAC;

            patrimonioStoricoLordoCumulativoPACePACFP.push((investimentiStoriciPACePACFP[i] + (i == 0 ? 0 : patrimonioStoricoLordoCumulativoPACePACFP[i - 1] * compoundingFactorPACePACFP)) * (1 - costiGestioneFP) * (1 - impostaDiBollo));
            
            plusvalenzeStoricheCumulativePACePACFP.push(Math.max(patrimonioStoricoLordoCumulativoPACePACFP[i] - investimentiCumulativiPACePACFP[i],0));
            
            tasseStoricheCumulativePACePACFP.push(plusvalenzeStoricheCumulativePACePACFP[i] * tassaPlusvalenzePAC);
            patrimonioStoricoNettoCumulativoCostiImpostaTassePACePACFP.push(patrimonioStoricoLordoCumulativoPACePACFP[i] - tasseStoricheCumulativePACePACFP[i]);

            //FP Totale
            investimentiStoriciFPeConguaglioFP.push(investimentiStoriciFPConguaglioFP[i] + investimentiStoriciFP[i]);

            investimentiCumulativiFP.push(investimentiStoriciFPeConguaglioFP.reduce(reducer));

            let compoundingFactorFP = 1 + rendimentoFP;

            patrimonioStoricoLordoCumulativoFP.push((investimentiStoriciFPeConguaglioFP[i] + (i == 0 ? 0 : patrimonioStoricoLordoCumulativoFP[i - 1] * compoundingFactorFP)) * (1 - costiGestioneFP) * (1 - impostaDiBollo));
            
            plusvalenzeStoricheCumulativeFP.push(Math.max(patrimonioStoricoLordoCumulativoFP[i] - investimentiCumulativiFP[i],0));
            
            tasseStoricheCumulativeFP.push(plusvalenzeStoricheCumulativeFP[i] * tassaPlusvalenzeFP);

            patrimonioStoricoNettoCumulativoCostiImpostaTasseFP.push(patrimonioStoricoLordoCumulativoFP[i] - tasseStoricheCumulativeFP[i]);

            ritenutaStoricaCumulativaFP.push(patrimonioStoricoNettoCumulativoCostiImpostaTasseFP[i] * (ritenutaFP));

            patrimonioNettoNettoFP.push(patrimonioStoricoNettoCumulativoCostiImpostaTasseFP[i] - ritenutaStoricaCumulativaFP[i])

            //Scenario FP Totale
            patrimonioTotaleStoricoNettoScenarioFP.push(patrimonioNettoNettoFP[i] + patrimonioStoricoNettoCumulativoCostiImpostaTassePACePACFP[i]);

        };

        let investimentiTotaliFP = investimentiStoriciFPeConguaglioFP.reduce(reducer);
        let ritenutaTotaleFP = ritenutaStoricaCumulativaFP.reduce(maxArray);
        let patrimonioTotaleLordoFP = patrimonioStoricoLordoCumulativoFP.reduce(maxArray);
        let tasseTotaliFP = tasseStoricheCumulativeFP.reduce(maxArray) + tasseStoricheCumulativePACePACFP.reduce(maxArray);
        let patrimonioTotaleNettoFP = patrimonioNettoNettoFP.reduce(maxArray);

        let investimentiTotaliPACePACFP = investimentiStoriciPACePACFP.reduce(reducer);
        let patrimonioTotaleLordoPACePACFP = patrimonioStoricoLordoCumulativoPACePACFP.reduce(maxArray);
        let patrimonioTotaleNettoPACePACFP = patrimonioStoricoNettoCumulativoCostiImpostaTassePACePACFP.reduce(maxArray);

        let patrimonioTotaleNettoScenarioFP = patrimonioTotaleNettoFP + patrimonioTotaleNettoPACePACFP;

        document.getElementById('table-investimenti-fp').innerHTML = formatter.format(investimentiTotaliFP);

        document.getElementById('table-investimenti-fp-pac').innerHTML = formatter.format(investimentiTotaliPACePACFP);

        document.getElementById('table-patrimonio-fp').innerHTML = formatter.format(patrimonioTotaleLordoFP);

        document.getElementById('table-patrimonio-pac-fp').innerHTML = formatter.format(patrimonioTotaleLordoPACePACFP);

        document.getElementById('table-ritenuta-fp').innerHTML = formatter.format(ritenutaTotaleFP);

        document.getElementById('table-tasse-fp').innerHTML = formatter.format(tasseTotaliFP);

        document.getElementById('table-fp-totale').innerHTML = formatter.format(patrimonioTotaleNettoScenarioFP);

    //Creazione Grafico
    Chart.defaults.global.defaultFontFamily = 'Titillium Web', "sans-serif";

        if(contatore > 0) {
            $('#myChart-patrimonio').remove(); // this is my <canvas> element
            $('#graph-container-patrimonio').append('<canvas id="myChart-patrimonio" width="0" height="0" class="hidden-chart"><canvas>');
        };

        let labels = [];
        let backgroundColorPAC = [];
        let backgroundColorFP = [];

        for (i = 0; i < anniSimulazione; i++) {
            labels.push(i+1);
            backgroundColorPAC.push('rgba(0, 99, 132, 0.8)');
            backgroundColorFP.push('rgba(54, 162, 235, 0.5)',);
        };
        /*var ctx = document.getElementById('myChart');
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'PAC',
                    data: patrimonioStoricoNettoCumulativoCostiImpostaTassePACePACFP,
                    backgroundColor: backgroundColorPAC,
                    borderWidth: 1
                },
                {
                    label: 'Fondo Pensione',
                    data: patrimonioNettoNettoFP,
                    backgroundColor: backgroundColorFP,
                    borderWidth: 1
                }],
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            callback: function(value, index, values) {
                                return formatter.format(value);
                            }
                        },
                    }],
                    xAxes: [{
                        ticks: {
                            beginAtZero: true,
                        },
                        scaleLabel:{
                            display: true,
                            labelString: 'Anni'
                        }
                    }]

                },
                title:{
                    display: true,
                    text: 'Patrimonio Netto'
                },
                legend: {
                    display: true,
                    position: 'top',
                    align: 'center',
                },
                tooltips: {
                    callbacks: {
                        title: function(tooltipItems, data) {
                            //Return value for title
                            return tooltipItems.xLabel;
                        },
                        label: function(tooltipItems, data) { 
                            return formatter.format(tooltipItems.yLabel);
                        }
                    }   
                },
                responsive: true,
                maintainAspectRatio: false
            }
        });*/

        var ctxPatrimonio = document.getElementById('myChart-patrimonio');
        var myChart = new Chart(ctxPatrimonio, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Patrimonio Netto PAC',
                    data: patrimonioStoricoNettoCumulativoCostiImpostaTassePAC,
                    backgroundColor: backgroundColorPAC,
                    borderWidth: 1,
                },
                {
                    label: 'Patrimonio Netto FP',
                    data: patrimonioTotaleStoricoNettoScenarioFP,
                    backgroundColor: backgroundColorFP,
                    borderWidth: 1,
                }
            ],
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            callback: function(value, index, values) {
                                return formatter.format(value);
                            }
                        },
                        stacked: false
                    }],
                    xAxes: [{
                                ticks: {
                                    beginAtZero: true,
                                },
                                scaleLabel:{
                                    display: true,
                                    labelString: 'Anni'
                                },
                                stacked: false,
                            }]
                        },
                title:{
                    display: true,
                    text: 'Patrimonio Netto'
                },
                legend: {
                    display: true,
                    position: 'top',
                    align: 'center'
                },
                tooltips: {
                    mode: 'x',
                    callbacks: {
                        label: function(tooltipItems, data) { 
                            var label = data.datasets[tooltipItems.datasetIndex].label;
                            return label + ' ' + formatter.format(tooltipItems.yLabel);
                        }
                    }   
                },
                responsive: true,
                maintainAspectRatio: false
            }
        });
        
        contatore = contatore + 1;
        console.log(contatore);

        $('#results').remove();
        $('.results-card').show();
        if (patrimonioTotaleNettoCostiImpostaTassePAC > patrimonioTotaleNettoScenarioFP) {
            let textSpan = "<span id='results'>La scelta migliore è il <b>Piano di Accumulo!</b> 🎉 Accumulerai <b>" + formatter.format(patrimonioTotaleNettoCostiImpostaTassePAC - patrimonioTotaleNettoScenarioFP) + "</b> in più rispetto al Fondo Pensione in " + anniSimulazione + " anni. <br><br> Scorri per maggiori dettagli.";
            $('.results-card').append(textSpan);
        } else if (patrimonioTotaleNettoCostiImpostaTassePAC < patrimonioTotaleNettoScenarioFP) {
            let textSpan = "<span id='results'>La scelta più conveniente è il <b>Fondo Pensione!</b> 🎉 Accumulerai <b>" + formatter.format(- patrimonioTotaleNettoCostiImpostaTassePAC + patrimonioTotaleNettoScenarioFP) + "</b> in più rispetto al Piano di Accumulo in " + anniSimulazione + " anni. <br> Scorri per maggiori dettagli.";
            $('.results-card').append(textSpan);
        } else {
            let textSpan = "<span id='results'>Le due scelte sono esattamente <b>identiche</b> nell'arco di " + anniSimulazione + " anni! Scegli quindi quella che preferisci. <br> Scorri per maggiori dettagli.";
            $('.results-card').append(textSpan);
        }
        
  
      document.getElementById("results-container").classList.remove("user-hidden");
  }