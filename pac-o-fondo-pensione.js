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

  //FUNZIONE DI CALCOLO - abbinata al bottone
  function calcolo()
  {
    let element = document.getElementById('floating-calcolo');
      element.classList.remove("pulse");

    //Generale
        let anniSimulazione = parseFloat(document.getElementById('durata-simulazione').value);

        let investimentoAnnuale = parseFloat(document.getElementById('investimento-annuale').value);

        const tassaPlusvalenzePAC = 0.26;
        const tassaPlusvalenzeFP = 0.2;


    //PAC
    
        let rendimentoPAC = parseFloat(document.getElementById('rendimento-pac').value);

        let costiGestionePAC = parseFloat(document.getElementById('costi-gestione-pac').value);

        let investimentiStorici = [];
        let costiGestioneStorici = [];
        let investimentiCumulativi = [];
        let costiGestioneCumulativi = [];
        let patrimonioStoricoLordo = [];
        let tasseStoriche = [];
        let tasseStoricheCumulative = [];
        let patrimonioStoricoNettoCosti = [];
        let patrimonioStoricoNettoCostiTasse = [];
        let patrimonioStoricoLordoCumulativo = [];
        let patrimonioStoricoNettoCumulativoCosti = [];
        let patrimonioStoricoNettoCumulativoCostiTasse = [];

        for (i = 0; i < anniSimulazione; i++) {

            investimentiStorici.push();
            costiGestioneStorici.push();

            investimentiCumulativi.push();
            costiGestioneCumulativi.push();

            patrimonioStoricoLordo.push();
            patrimonioStoricoNettoCosti.push();
            patrimonioStoricoNettoCostiTasse.push();

            patrimonioStoricoLordoCumulativo.push();
            patrimonioStoricoNettoCumulativoCosti.push();
            patrimonioStoricoNettoCumulativoCostiTasse.push();
        };

        let investimentiTotali = investimentiStorici.reduce(reducer);
        let costiTotali = costiGestioneStorici.reduce(reducer);
        let patrimonioTotaleLordo = Math.max(patrimonioStoricoLordoCumulativo);
        let tasseTotali = Math.max(tasseStoricheCumulative);
        let patrimonioTotaleNettoCosti = Math.max(patrimonioStoricoNettoCumulativoCosti);
        let patrimonioTotaleNettoCostiTasse = Math.max(patrimonioStoricoNettoCumulativoCostiTasse);


        

        document.getElementById('table-patrimonio-pac').innerHTML = formatter.format(patrimonioTotaleLordo);

        document.getElementById('table-costi-pac').innerHTML = formatter.format(costiTotali);

        document.getElementById('table-tasse-pac').innerHTML = formatter.format(tasseTotali);

        document.getElementById('table-pac-totale').innerHTML = formatter.format(patrimonioTotaleNettoCostiTasse);

      
    //Fondo Pensione
        let rataNLT = parseFloat(document.getElementById('rata-nlt').value);
        let rataNLTAnnuale = rataNLT * 12;

        let costiGestioneNLT = parseFloat(document.getElementById('costi-gestione-nlt').value);

        let durataNLT = parseFloat(document.getElementById('durata-nlt').value);

        let anticipoNLT = parseFloat(document.getElementById('anticipo-nlt').value);

        let rataNLTStorica = [];
        let costiGestioneNLTStorici = [];
        let anticipiNLTStorici = [];
        let costiNLTStorici = [];
        for (i = 0; i < anniSimulazione; i++) {
            rataNLTStorica.push(rataNLTAnnuale);
            costiGestioneNLTStorici.push(costiGestioneNLT);
            if (i % durataNLT == 0) {
                anticipiNLTStorici.push(anticipoNLT);
            } else {
                anticipiNLTStorici.push(0);
            };
            costiNLTStorici.push(rataNLTStorica[i] + costiGestioneNLTStorici[i] + anticipiNLTStorici[i]);
        };


    //Bilancio Patrimoniale

    const surplusAcquisto = [];
    const surplusNLT = [];
    const patrimonioAcquisto = [];
    const patrimonioNLT = [];
    const capitaleAcquistoCumulativo = [];
    const capitaleNLTCumulativo = [];
    const patrimonioAcquistoCumulativo = [];
    const patrimonioNLTCumulativo = [];
    const plusvalenzeLordeAcquistoStoriche = [];
    const plusvalenzeLordeAcquistoStoricheCumulative = [];
    const plusvalenzeNetteAcquistoStoriche = [];
    const plusvalenzeNetteAcquistoStoricheCumulative = [];
    const plusvalenzeLordeNLTStoriche = [];
    const plusvalenzeLordeNLTStoricheCumulative = [];
    const plusvalenzeNetteNLTStoriche = [];
    const plusvalenzeNetteNLTStoricheCumulative = [];
    const patrimonioAcquistoStoricoCumulativo = [];
    const patrimonioNLTStoricoCumulativo = [];

    for (i = 0; i < anniSimulazione; i++) {
        surplusAcquisto.push(Math.max(- costiAcquistoStorici[i] + costiNLTStorici[i],0));
        surplusNLT.push(Math.max(costiAcquistoStorici[i] - costiNLTStorici[i],0));

        patrimonioAcquisto.push(surplusAcquisto[i] * Math.pow(1+rendimentoInvestimenti,anniSimulazione - i - 1));
        patrimonioNLT.push(surplusNLT[i] * Math.pow(1+rendimentoInvestimenti,anniSimulazione - i - 1));



        if (i>0) {
            capitaleAcquistoCumulativo.push(surplusAcquisto[i]+ capitaleAcquistoCumulativo[i - 1]);
            capitaleNLTCumulativo.push(surplusNLT[i] + capitaleNLTCumulativo[i - 1]);

            patrimonioAcquistoCumulativo.push(patrimonioAcquisto[i]+ patrimonioAcquistoCumulativo[i - 1]);
            patrimonioNLTCumulativo.push(patrimonioNLT[i] + patrimonioNLTCumulativo[i - 1]);

            plusvalenzeLordeAcquistoStoriche.push((capitaleAcquistoCumulativo[i - 1] + plusvalenzeLordeAcquistoStoriche.reduce(reducer))* (rendimentoInvestimenti));
            plusvalenzeLordeAcquistoStoricheCumulative.push(plusvalenzeLordeAcquistoStoriche[i] + plusvalenzeLordeAcquistoStoricheCumulative[i - 1]);

            plusvalenzeNetteAcquistoStoriche.push(plusvalenzeLordeAcquistoStoriche[i] * (1 - tassaPlusvalenze));
            plusvalenzeNetteAcquistoStoricheCumulative.push(plusvalenzeNetteAcquistoStoriche[i] + plusvalenzeNetteAcquistoStoricheCumulative[i - 1]);

            plusvalenzeLordeNLTStoriche.push((capitaleNLTCumulativo[i - 1] + plusvalenzeLordeNLTStoriche.reduce(reducer))* (rendimentoInvestimenti));
            plusvalenzeLordeNLTStoricheCumulative.push(plusvalenzeLordeNLTStoriche[i] + plusvalenzeLordeNLTStoricheCumulative[i - 1]);

            plusvalenzeNetteNLTStoriche.push(plusvalenzeLordeNLTStoriche[i] * (1 - tassaPlusvalenze));
            plusvalenzeNetteNLTStoricheCumulative.push(plusvalenzeNetteNLTStoriche[i] + plusvalenzeNetteNLTStoricheCumulative[i - 1]);

        } else {
            patrimonioAcquistoCumulativo.push(patrimonioAcquisto[i]);
            patrimonioNLTCumulativo.push(patrimonioNLT[i]);

            plusvalenzeLordeAcquistoStoriche.push(0);
            plusvalenzeLordeAcquistoStoricheCumulative.push(plusvalenzeLordeAcquistoStoriche[i]);

            capitaleAcquistoCumulativo.push(surplusAcquisto[i]);
            capitaleNLTCumulativo.push(surplusNLT[i]);

            plusvalenzeNetteAcquistoStoriche.push(plusvalenzeLordeAcquistoStoriche[i] * (1 - tassaPlusvalenze));
            plusvalenzeNetteAcquistoStoricheCumulative.push(plusvalenzeNetteAcquistoStoriche[i]);

            plusvalenzeLordeNLTStoriche.push(0);
            plusvalenzeLordeNLTStoricheCumulative.push(plusvalenzeLordeNLTStoriche[i]);

            plusvalenzeNetteNLTStoriche.push(plusvalenzeLordeNLTStoriche[i] * (1 - tassaPlusvalenze));
            plusvalenzeNetteNLTStoricheCumulative.push(plusvalenzeNetteNLTStoriche[i]);
        };

        patrimonioAcquistoStoricoCumulativo.push(capitaleAcquistoCumulativo[i] + plusvalenzeLordeAcquistoStoricheCumulative[i]);
        patrimonioNLTStoricoCumulativo.push(capitaleNLTCumulativo[i] + plusvalenzeLordeNLTStoricheCumulative[i]);
    };


    const capitaleAcquisto = surplusAcquisto.reduce(reducer);
    const capitaleNLT = surplusNLT.reduce(reducer);
    const patrimonioAcquistoTotale = patrimonioAcquisto.reduce(reducer);
    const patrimonioNLTTotale = patrimonioNLT.reduce(reducer);
    const plusvalenzeLordeAcquisto = patrimonioAcquistoTotale - capitaleAcquisto;
    const plusvalenzeLordeNLT = patrimonioNLTTotale - capitaleNLT;
    const plusvalenzeNetteAcquisto = plusvalenzeLordeAcquisto * (1 - tassaPlusvalenze);
    const plusvalenzeNetteNLT = plusvalenzeLordeNLT * (1 - tassaPlusvalenze);

    document.getElementById('table-rendimenti-acquisto').innerHTML = formatter.format(-plusvalenzeNetteAcquisto);

    document.getElementById('table-rendimenti-nlt').innerHTML = formatter.format(-plusvalenzeNetteNLT);


    let rataNLTStoricaTotale = rataNLTStorica.reduce(reducer);
    let costiGestioneNLTStoriciTotali = costiGestioneNLTStorici.reduce(reducer);
    let anticipiNLTStoriciTotali = anticipiNLTStorici.reduce(reducer);
    let costiNLTStoriciTotali = costiNLTStorici.reduce(reducer) - plusvalenzeNetteNLT;
  
    document.getElementById('table-anticipi-nlt').innerHTML = formatter.format(anticipiNLTStoriciTotali);

    document.getElementById('table-rate-nlt').innerHTML = formatter.format(rataNLTStoricaTotale);

    document.getElementById('table-costi-nlt').innerHTML = formatter.format(costiGestioneNLTStoriciTotali);

    document.getElementById('table-nlt-totale').innerHTML = formatter.format(costiNLTStoriciTotali);
    
    let costiAcquistoStoriciTotali = costiAcquistoStorici.reduce(reducer) - plusvalenzeNetteAcquisto;
    document.getElementById('table-acquisto-totale').innerHTML = formatter.format(costiAcquistoStoriciTotali);

    //Creazione Grafico
        Chart.defaults.global.defaultFontFamily = 'Titillium Web', "sans-serif";

        if(contatore > 0) {
            $('#myChart').remove(); // this is my <canvas> element
            $('#graph-container').append('<canvas id="myChart" width="0" height="0" class="hidden-chart"><canvas>');

            $('#myChart-patrimonio').remove(); // this is my <canvas> element
            $('#graph-container-patrimonio').append('<canvas id="myChart-patrimonio" width="0" height="0" class="hidden-chart"><canvas>');

        };

        let dataAcquistoTotale = [];
        dataAcquistoTotale.push(costiAcquistoStoriciTotali);
        let dataNLTTotale =[];
        dataNLTTotale.push(costiNLTStoriciTotali);

        let dataAcquistoStorico = [];
        dataAcquistoStorico.push(costiAcquistoStorici);
        let dataNLTStorico =[];
        dataNLTStorico.push(costiNLTStorici);

        let labels = [];
        let backgroundColorCostiAcquisto = [];
        let backgroundColorCostiNLT = [];
        let backgroundColorAcquisto = [];
        let backgroundColorNLT = [];
        let backgroundColorRendimentiLordiAcquisto = [];
        let backgroundColorRendimentiNettiAcquisto = [];
        let backgroundColorRendimentiLordiNLT = [];
        let backgroundColorRendimentiNettiNLT = [];
        for (i = 0; i < anniSimulazione; i++) {
            labels.push(i+1);
            backgroundColorCostiAcquisto.push('rgba(0, 99, 132, 0.8)');
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
                    label: 'Acquisto',
                    data: costiAcquistoStorici,
                    backgroundColor: backgroundColorCostiAcquisto,
                    borderWidth: 1
                },
                {
                    label: 'NLT',
                    data: costiNLTStorici,
                    backgroundColor: backgroundColorCostiNLT,
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