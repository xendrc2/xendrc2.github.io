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

  //Mostra/nasconde il rendimento degli investimenti
  $("#container-rendimenti").hide();
  
  const selectInvestireRisparmi = document.getElementById('investire-risparmi');
  selectInvestireRisparmi.addEventListener('change', (event) => {
      let checkboxValue = document.getElementById('investire-risparmi').checked;
      if (checkboxValue == true) {
          $("#container-rendimenti").show();
      } else if (checkboxValue == false) {
          $("#container-rendimenti").hide();
      };
  });

//Check # of simulations
var contatore = 0;

  //FUNZIONE DI CALCOLO - abbinata al bottone
  function calcolo()
  {
    let element = document.getElementById('floating-calcolo');
      element.classList.remove("pulse");

      $('.table-investimenti').hide();

    //Generale
        let anniSimulazione = parseFloat(document.getElementById('durata-simulazione').value);

        let investimenti = document.getElementById('investire-risparmi').checked;

        let rendimentoInvestimenti = 0;
        if (investimenti == true) {
            rendimentoInvestimenti = parseFloat(document.getElementById('rendimento-investimenti').value) / 100;
            $('.table-investimenti').show();
        } else {
            rendimentoInvestimenti = 0;
        };

        const reducer = (accumulator, currentValue) => accumulator + currentValue;

        const tassaPlusvalenze = 0.26;

    //Costi Acquisto
        let durataAuto = parseFloat(document.getElementById('anni-auto').value);

        let anticipoAcquisto = parseFloat(document.getElementById('anticipo-acquisto').value);

        let rataAcquisto = parseFloat(document.getElementById('rata-acquisto').value);
        let rataAcquistoAnnuale = rataAcquisto * 12;
        let durataFinanziamento = parseFloat(document.getElementById('durata-finanziamento').value);
        let anniFinanziamento = durataFinanziamento/12;

        let maxiRata = parseFloat(document.getElementById('maxirata').value);     

        let rataRCA = parseFloat(document.getElementById('rca').value);

        let costiGestioneAcquisto = parseFloat(document.getElementById('costi-gestione-acquisto').value);

        let valoreRivendita = parseFloat(document.getElementById('rivendita').value);

        let anticipiAcquistoStorici = [];
        let rataAcquistoStorica = [];
        let maxiRataStorica = [];
        let RCAStorica = [];
        let costiGestioneAcquistoStorici = [];
        let costiAcquistoStorici = [];
        let valoreRivenditaStorica = [];

        for (i = 0; i < anniSimulazione; i++) {

            if (i % durataAuto == 0) {
                anticipiAcquistoStorici.push(anticipoAcquisto);
            } else {
                anticipiAcquistoStorici.push(0);
            };

            if (i % durataAuto < anniFinanziamento) {
                rataAcquistoStorica.push(rataAcquistoAnnuale);
            } else {
                rataAcquistoStorica.push(0);
            };

            if ((i - anniFinanziamento + 1) % durataAuto == 0) {
                maxiRataStorica.push(maxiRata);
            } else {
                maxiRataStorica.push(0);
            };

            RCAStorica.push(rataRCA);

            costiGestioneAcquistoStorici.push(costiGestioneAcquisto);

            if ((i - durataAuto + 1) % durataAuto == 0) {
                valoreRivenditaStorica.push(valoreRivendita);
            } else {
                valoreRivenditaStorica.push(0);
            };

            costiAcquistoStorici.push(anticipiAcquistoStorici[i] + rataAcquistoStorica[i] + maxiRataStorica[i] + RCAStorica[i] + costiGestioneAcquistoStorici[i] - valoreRivenditaStorica[i]);
        };

        let anticipiAcquistoStoriciTotali = anticipiAcquistoStorici.reduce(reducer);
        let rataAcquistoStoricaTotale = rataAcquistoStorica.reduce(reducer);
        let maxiRataStoricaTotale = maxiRataStorica.reduce(reducer);
        let costiGestioneAcquistoStoriciTotali = costiGestioneAcquistoStorici.reduce(reducer);
        let RCAStoricaTotale = RCAStorica.reduce(reducer);
        let valoreRivenditaStoricaTotale = valoreRivenditaStorica.reduce(reducer);


        

        document.getElementById('table-anticipi-acquisto').innerHTML = formatter.format(anticipiAcquistoStoriciTotali);

        document.getElementById('table-rate-acquisto').innerHTML = formatter.format(rataAcquistoStoricaTotale);

        document.getElementById('table-maxirate').innerHTML = formatter.format(maxiRataStoricaTotale);

        document.getElementById('table-rca').innerHTML = formatter.format(RCAStoricaTotale);

        document.getElementById('table-costi-acquisto').innerHTML = formatter.format(costiGestioneAcquistoStoriciTotali);

        document.getElementById('table-rivendita').innerHTML = formatter.format(-valoreRivenditaStoricaTotale);


        

      
    //Costi NLT
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

    for (i = 0; i < anniSimulazione; i++) {
        surplusAcquisto.push(Math.max(- costiAcquistoStorici[i] + costiNLTStorici[i],0));
        surplusNLT.push(Math.max(costiAcquistoStorici[i] - costiNLTStorici[i],0));

        patrimonioAcquisto.push(surplusAcquisto[i] * Math.pow(1+rendimentoInvestimenti,anniSimulazione - i - 1));
        patrimonioNLT.push(surplusNLT[i] * Math.pow(1+rendimentoInvestimenti,anniSimulazione - i - 1));
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
        if(contatore > 0) {
            $('#myChart').remove(); // this is my <canvas> element
            $('#graph-container').append('<canvas id="myChart" width="0" height="0" class="hidden-chart"><canvas>');
        };

        let data = [];
        data.push(costiAcquistoStoriciTotali);
        data.push(costiNLTStoriciTotali);
        console.log(data);
        let labels = ['Acquisto','NLT'];
        var ctx = document.getElementById('myChart');
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Costi Totali',
                    data: data,
                    backgroundColor: [
                        'rgba(0, 99, 132, 0.5)',
                        'rgba(54, 162, 235, 0.5)',
                        'rgba(10, 120, 61, 0.5)',
                        'rgba(110, 11, 11, 0.5)'
                    ],
                    borderColor: [
                        'rgba(0, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(10, 120, 61, 0.5)',
                        'rgba(110, 11, 11, 0.5)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            callback: function(value, index, values) {
                                return formatter.format(value);
                            }
                        }
                    }]
                },
                title:{
                    display: true,
                    text: 'Costi Totali'
                },
                legend: {
                    display: false
                },
                tooltips: {
                    callbacks: {
                        label: function(tooltipItems, data) { 
                            return formatter.format(tooltipItems.yLabel);
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
  
      document.getElementById("results-container").classList.remove("user-hidden");
  }