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

//Funzione per calcolare il totale di un array
const reducer = (accumulator, currentValue) => accumulator + currentValue;

//Calcolo e aggiornamento automatico IRPEF


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

        let contributoDeducibile = Math.min(investimentoAnnuale, limiteDeducibilità);
    //PAC
    
        let rendimentoPAC = parseFloat(document.getElementById('rendimento-pac').value) / 100;

        let costiGestionePAC = parseFloat(document.getElementById('costi-gestione-pac').value) / 100;

        let investimentiStoriciPAC = [];
        let investimentiCumulativiPAC = [];

        let costiGestioneCumulativiPAC = [];

        let tasseStoricheCumulativePAC = [];

        let patrimonioStoricoLordoCumulativoPAC = [];
        let patrimonioStoricoNettoCumulativoCostiPAC = [];
        let patrimonioStoricoNettoCumulativoCostiImpostaPAC = [];
        let plusvalenzeStoricheCumulativePAC = [];
        let patrimonioStoricoNettoCumulativoCostiImpostaTassePAC = [];

        for (i = 0; i < anniSimulazione; i++) {

            investimentiStoriciPAC.push(investimentoAnnuale);

            investimentiCumulativiPAC.push(investimentiStoriciPAC[i] + Math.max(investimentiCumulativiPAC[i - 1], 0));

            let compoundingFactor = 1 + rendimentoPAC;

            patrimonioStoricoLordoCumulativoPAC.push(investimentiStoriciPAC[i] + Math.max(investimentiCumulativiPAC[i - 1], 0) * compoundingFactor);

            costiGestioneCumulativiPAC.push(costiGestionePAC * patrimonioStoricoLordoCumulativoPAC[i]);

            patrimonioStoricoNettoCumulativoCostiPAC.push(patrimonioStoricoLordoCumulativoPAC[i] - costiGestioneCumulativiPAC[i]);
            patrimonioStoricoNettoCumulativoCostiImpostaPAC.push(patrimonioStoricoNettoCumulativoCostiPAC[i] * (1 - impostaDiBollo));
            
            plusvalenzeStoricheCumulativePAC.push(patrimonioStoricoNettoCumulativoCostiImpostaPAC[i] - investimentiCumulativiPAC[i]);
            
            tasseStoricheCumulativePAC.push(plusvalenzeStoricheCumulativePAC[i] * tassaPlusvalenzePAC);
            patrimonioStoricoNettoCumulativoCostiImpostaTassePAC.push(plusvalenzeStoricheCumulativePAC[i] * (1 - tassaPlusvalenzePAC) + investimentiCumulativiPAC[i]);
        };

        let costiTotaliPAC = Math.max(costiGestioneCumulativiPAC);
        let patrimonioTotaleLordoPAC = Math.max(patrimonioStoricoLordoCumulativoPAC);
        let tasseTotaliPAC = Math.max(tasseStoricheCumulativePAC);

        let patrimonioTotaleNettoCostiImpostaTassePAC = Math.max(patrimonioStoricoNettoCumulativoCostiImpostaTassePAC);


        

        document.getElementById('table-patrimonio-pac').innerHTML = formatter.format(patrimonioTotaleLordoPAC);

        document.getElementById('table-costi-pac').innerHTML = formatter.format(costiTotaliPAC);

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

        let investimentoPrimoAnnoFP = Math.min(investimentoAnnuale + contributoDTD, limiteDeducibilità);
        let investimentoPrimoAnnoPAC = Math.max(investimentoAnnuale + contributoDTD - limiteDeducibilità, 0);
        let conguaglioFiscaleAnnuale = aliquotaIRPEF * contributoDeducibile;

        let investimentoAnnualeInclConguaglioFP = () => {
            let gap = Math.max(investimentoAnnuale + contributoDTD - limiteDeducibilità,0);

        };

        let investimentiStoriciFP = [];
        let costiGestioneStoriciFP = [];
        let investimentiCumulativiFP = [];
        let costiGestioneCumulativiFP = [];
        let patrimonioStoricoLordoFP = [];
        let tasseStoricheFP = [];
        let tasseStoricheCumulativeFP = [];
        let aliquotaStoricaFP = [];
        let patrimonioStoricoNettoCostiFP = [];
        let patrimonioStoricoNettoCostiTasseFP = [];
        let patrimonioStoricoLordoCumulativoFP = [];
        let patrimonioStoricoNettoCumulativoCostiFP = [];
        let plusvalenzeStoricheCumulativeFP = [];
        let patrimonioStoricoNettoCumulativoCostiImpostaFP = [];
        let patrimonioStoricoNettoCumulativoCostiImpostaTasseFP = [];

        for (i = 0; i < anniSimulazione; i++) {

            //investimenti deducibili in FP
            investimentiStoriciFP.push(contributoDeducibile);

            investimentiCumulativiFP.push(investimentiStoriciFP[i] + Math.max(investimentiCumulativiFP[i - 1], 0));

            let compoundingFactor = 1 + rendimentoFP;

            patrimonioStoricoLordoCumulativoFP.push(investimentiStoriciFP[i] + Math.max(investimentiCumulativiFP[i - 1], 0) * compoundingFactor);

            costiGestioneCumulativiFP.push(costiGestioneFP * patrimonioStoricoLordoCumulativoFP[i]);

            patrimonioStoricoNettoCumulativoCostiFP.push(patrimonioStoricoLordoCumulativoFP[i] - costiGestioneCumulativiFP[i]);
            patrimonioStoricoNettoCumulativoCostiImpostaFP.push(patrimonioStoricoNettoCumulativoCostiFP[i] * (1 - impostaDiBollo));
            
            plusvalenzeStoricheCumulativeFP.push(patrimonioStoricoNettoCumulativoCostiImpostaFP[i] - investimentiCumulativiFP[i]);
            
            tasseStoricheCumulativeFP.push(plusvalenzeStoricheCumulativeFP[i] * tassaPlusvalenzeFP);
            patrimonioStoricoNettoCumulativoCostiImpostaTasseFP.push(plusvalenzeStoricheCumulativeFP[i] * (1 - tassaPlusvalenzeFP) + investimentiCumulativiFP[i]);

            //investimenti non deducibili + conguaglio fiscale in un PAC



            //Totale

        };

        let investimentiTotaliFP = investimentiStoriciFP.reduce(reducer);
        let costiTotaliFP = costiGestioneStoriciFP.reduce(reducer);
        let patrimonioTotaleLordoFP = Math.max(patrimonioStoricoLordoCumulativoFP);
        let tasseTotaliFP = Math.max(tasseStoricheCumulativeFP);
        let patrimonioTotaleNettoCostiFP = Math.max(patrimonioStoricoNettoCumulativoCostiFP);
        let patrimonioTotaleNettoCostiTasseFP = Math.max(patrimonioStoricoNettoCumulativoCostiTasseFP);


        

        document.getElementById('table-patrimonio-pac').innerHTML = formatter.format(patrimonioTotaleLordoFP);

        document.getElementById('table-costi-pac').innerHTML = formatter.format(costiTotaliFP);

        document.getElementById('table-tasse-pac').innerHTML = formatter.format(tasseTotaliFP);

        document.getElementById('table-pac-totale').innerHTML = formatter.format(patrimonioTotaleNettoCostiTasseFP);

    //Creazione Grafico
        Chart.defaults.global.defaultFontFamily = 'Titillium Web', "sans-serif";

        if(contatore > 0) {
            $('#myChart').remove(); // this is my <canvas> element
            $('#graph-container').append('<canvas id="myChart" width="0" height="0" class="hidden-chart"><canvas>');

        };

        let patrimonioCumulativoPAC = [];
        dataAcquistoTotale.push(patrimonioTotaleNettoCostiImpostaTassePAC);
        let patrimonioCumulativoFP =[];
        dataNLTTotale.push(patrimonioTotaleNettoCostiTasseFP);

        let labels = [];
        let backgroundColorPAC = [];
        let backgroundColorFP = [];
        let backgroundColorAcquisto = [];
        let backgroundColorNLT = [];
        let backgroundColorRendimentiLordiAcquisto = [];
        let backgroundColorRendimentiNettiAcquisto = [];
        let backgroundColorRendimentiLordiNLT = [];
        let backgroundColorRendimentiNettiNLT = [];
        for (i = 0; i < anniSimulazione; i++) {
            labels.push(i+1);
            backgroundColorPAC.push('rgba(0, 99, 132, 0.8)');
            backgroundColorCostiNLT.push('rgba(232, 126, 4, 0.8)');
            backgroundColorAcquisto.push('rgba(0, 99, 132, 0.2)');
            backgroundColorNLT.push('rgba(232, 126, 4, 0.2)');
            backgroundColorRendimentiLordiAcquisto.push('rgba(0, 99, 132, 0.5)');
            backgroundColorRendimentiNettiAcquisto.push('rgba(0, 99, 132, 0.8)');
            backgroundColorRendimentiLordiNLT.push('rgba(232, 126, 4, 0.5)');
            backgroundColorRendimentiNettiNLT.push('rgba(232, 126, 4, 0.8)');
        };
        var ctx = document.getElementById('myChart');
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'PAC',
                    data: patrimonioCumulativoPAC,
                    backgroundColor: backgroundColorPAC,
                    borderWidth: 1
                },
                {
                    label: 'Fondo Pensione',
                    data: patrimonioCumulativoFP,
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
                    text: 'Costi Annuali'
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
        });

        var ctxPatrimonio = document.getElementById('myChart-patrimonio');
        var myChart = new Chart(ctxPatrimonio, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Patrimonio Acquisto',
                    data: patrimonioAcquistoStoricoCumulativo,
                    backgroundColor: backgroundColorAcquisto,
                    borderWidth: 1,
                    //xAxisID: "bar-x-axis1",
                    stack: 'Acquisto'
                },
                {
                    label: 'Rendimenti Lordi Acquisto',
                    data: plusvalenzeLordeAcquistoStoricheCumulative,
                    backgroundColor: backgroundColorRendimentiLordiAcquisto,
                    borderWidth: 1,
                    //xAxisID: "bar-x-axis1",
                    stack: 'Acquisto'
                },
                {
                    label: 'Rendimenti Netti Acquisto',
                    data: plusvalenzeNetteAcquistoStoricheCumulative,
                    backgroundColor: backgroundColorRendimentiNettiAcquisto,
                    borderWidth: 1,
                    //xAxisID: "bar-x-axis1",
                    stack: 'Acquisto'
                },
                {
                    label: 'Patrimonio NLT',
                    data: patrimonioNLTStoricoCumulativo,
                    backgroundColor: backgroundColorNLT,
                    borderWidth: 1,
                    //xAxisID: "bar-x-axis2"
                },
                {
                    label: 'Rendimenti Lordi NLT',
                    data: plusvalenzeLordeNLTStoricheCumulative,
                    backgroundColor: backgroundColorRendimentiLordiNLT,
                    borderWidth: 1,
                    //xAxisID: "bar-x-axis2"
                },
                {
                    label: 'Rendimenti Netti NLT',
                    data: plusvalenzeNetteNLTStoricheCumulative,
                    backgroundColor: backgroundColorRendimentiNettiNLT,
                    borderWidth: 1,
                    //xAxisID: "bar-x-axis2"
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
                                stacked: true,
                            }]
                        },
                title:{
                    display: true,
                    text: 'Patrimonio totale'
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

        //document.getElementById("myChart").width = "600";
        //document.getElementById("myChart").height = "600";
        contatore = contatore + 1;
        console.log(contatore);

        if (investimenti) {
            $('#graph-container-patrimonio').show();
        } else {
            $('#graph-container-patrimonio').hide();
        }

        $('#results').remove();
        $('.results-card').show();
        if (costiAcquistoStoriciTotali > costiNLTStoriciTotali) {
            let textSpan = "<span id='results'>La scelta più conveniente è il <b>Noleggio a Lungo Termine!</b> 🎉 Risparmierai <b>" + formatter.format(costiAcquistoStoriciTotali - costiNLTStoriciTotali) + "</b> rispetto all'Acquisto in " + anniSimulazione + " anni. <br><br> Scorri per maggiori dettagli.";
            $('.results-card').append(textSpan);
        } else if (costiAcquistoStoriciTotali < costiNLTStoriciTotali) {
            let textSpan = "<span id='results'>La scelta più conveniente è l'<b>Acquisto!</b> 🎉 Risparmierai <b>" + formatter.format(- costiAcquistoStoriciTotali + costiNLTStoriciTotali) + "</b> rispetto al Noleggio a Lungo Termine in " + anniSimulazione + " anni. <br> Scorri per maggiori dettagli.";
            $('.results-card').append(textSpan);
        } else {
            let textSpan = "<span id='results'>Le due scelte sono esattamente <b>identiche</b> nell'arco di " + anniSimulazione + " anni! Scegli quindi quella che preferisci. <br> Scorri per maggiori dettagli.";
            $('.results-card').append(textSpan);
        }
        
  
      document.getElementById("results-container").classList.remove("user-hidden");
  }