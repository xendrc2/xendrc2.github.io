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

  
  //FUNZIONE DI CALCOLO - abbinata al bottone
  function calcolo()
  {
      let element = document.getElementById('floating-calcolo');
      element.classList.remove("pulse");
      
      let durataMutuo = document.getElementById('durata-mutuo').value;
      let speseCondominialiMensili = parseFloat(document.getElementById('spese-condominiali').value);
      let anniSimulazione = parseFloat(document.getElementById('anni-simulazione').value);
      let speseCondominialiTotali = speseCondominialiMensili*12*anniSimulazione;
      let rendimentoInvestimenti = parseFloat(document.getElementById('rendimento-investimenti').value);
      let finanziamentoMutuo = document.getElementById('finanziamento-mutuo').value;
      
      //Costi Affitto
          let affittoMensile = parseFloat(document.getElementById('affitto-mensile').value);
          let affittoAnnuale = affittoMensile * 12;
          let affittoTotale = formatter.format(affittoAnnuale * anniSimulazione + speseCondominialiTotali);
          document.getElementById('costi-affitto').innerHTML = affittoTotale;
          let rataAffittoMensile = affittoMensile + speseCondominialiMensili;
          document.getElementById('rata-affitto').innerHTML = formatterDigits.format(rataAffittoMensile);
      
      //Costi Acquisto
          //Costi Transazione
              let istruttoria = parseFloat(document.getElementById('istruttoria').value);
              let perizia = parseFloat(document.getElementById('perizia').value);
              let notaio = parseFloat(document.getElementById('notaio').value);
              let percentCommissioniAgenzia = parseFloat(document.getElementById('commissioni-agenzia').value);
              let commissioniAgenzia = percentCommissioniAgenzia * prezzo;
              let impostaRegistro = parseFloat(document.getElementById('imposta').value);
              let mobilio = parseFloat(document.getElementById('mobilio').value);
              let altreImposte = parseFloat(document.getElementById('altre-imposte').value);
              let ammontareIva = iva * prezzo;
              let costiTotaliTransazioneAcquisto = istruttoria+perizia+notaio+commissioniAgenzia+impostaRegistro+mobilio+altreImposte+ammontareIva;
          
          //Costi Rate
              let tassoMutuo = document.getElementById('tasso-mutuo').value;
              let tassoMensile = tassoMutuo/12;
              let interessiComposti = Math.pow(1 + tassoMensile,12*durataMutuo);
              let quotaRataMensile = interessiComposti*tassoMensile/(interessiComposti - 1);
              let rataMensile = quotaRataMensile * finanziamentoMutuo;
              let rateAnnuali = rataMensile*12;
              let interessiTotali = rateAnnuali*durataMutuo-finanziamentoMutuo;
              let rateTotali = rateAnnuali*durataMutuo+speseCondominialiTotali;
      
          //Costi Totali
              let costiTotaliAcquisto = formatter.format(speseCondominialiTotali+costiTotaliTransazioneAcquisto);
          
      //Costi Affitto + Acquisto
          //Costi Affitto - solo prima dell'acquisto
              let rataAffittoAnnuale = rataAffittoMensile * 12;
              let anniPreAcquisto = parseFloat(document.getElementById('anni-affitto-acquisto').value);
              let rataAffittoTemporaneoTotale = rataAffittoAnnuale * anniPreAcquisto;
          
          //Costi Acquisto - tenendo conto degli anni pre acquisto
              //Costi Transazione
                  let costiTotaliTransazioneAffittoAcquisto = costiTotaliTransazioneAcquisto;
          
              //Costi Rate
                  let orizzonteMutuo = Math.max(durataMutuo,anniSimulazione) - anniPreAcquisto;
                  let interessiTotaliAffittoAcquisto = rateAnnuali*orizzonteMutuo-finanziamentoMutuo;
                  let rateTotaliAffittoAcquisto = rateAnnuali*orizzonteMutuo+speseCondominialiMensili*12*orizzonteMutuo;
      
              //Costi Totali
                  let costiTotaliAffittoAcquisto = formatter.format(speseCondominialiMensili*12*orizzonteMutuo+costiTotaliTransazioneAffittoAcquisto);
      //Costi Acquisto + Acquisto
                  
          //Costi Primo Acquisto
              //Costi Transazione
                  let costiTotaliTransazionePrimoAcquisto = costiTotaliTransazioneAcquisto;
          
              //Costi Rate
                  let anniVenditaPrimaCasa = parseFloat(document.getElementById('anni-acquisto-acquisto').value);
                  let interessiTotaliPrimaCasa = (rateAnnuali*durataMutuo - finanziamentoMutuo)*anniVenditaPrimaCasa/durataMutuo;
                  let rateTotaliPrimaCasa = rateAnnuali*anniVenditaPrimaCasa + speseCondominialiMensili*12*anniVenditaPrimaCasa;
      
              //Costi Totali
                  let costiTotaliPrimoAcquisto = costiTotaliTransazionePrimoAcquisto+ speseCondominialiMensili*12*anniVenditaPrimaCasa;
      
          //Costi Vendita Prima Casa
              let prezzoSecondoAcquisto = parseFloat(document.getElementById('prezzo-nuova-casa').value);
              let percentCommissioniAgenziaSecondoAcquisto = parseFloat(document.getElementById('commissioni-agenzia-secondo-mutuo').value);
              let commissioniAgenziaSecondoAcquisto = percentCommissioniAgenziaSecondoAcquisto * prezzoSecondoAcquisto;
              let prezzoVenditaCasa = parseFloat(document.getElementById('prezzo-vendita-casa').value);
              let certificatoAPE = parseFloat(document.getElementById('ape-nuova-casa').value);
              let costiVenditaCasa = prezzoVenditaCasa*percentCommissioniAgenziaSecondoAcquisto + certificatoAPE;
      
          //Costi Secondo Acquisto
              //Costi Transazione
                  let ivaSecondoAcquisto = 0;
                  let istruttoriaSecondoAcquisto = parseFloat(document.getElementById('istruttoria-secondo-mutuo').value);
                  let periziaSecondoAcquisto = parseFloat(document.getElementById('perizia-secondo-mutuo').value);
                  let notaioSecondoAcquisto = parseFloat(document.getElementById('notaio-secondo-mutuo').value);
                  let impostaRegistroSecondoAcquisto = parseFloat(document.getElementById('imposta-secondo-mutuo').value);
                  let mobilioSecondoAcquisto = parseFloat(document.getElementById('mobilio-nuova-casa').value);
                  let altreImposteSecondoAcquisto = parseFloat(document.getElementById('altre-imposte-secondo-mutuo').value);
                  let ammontareIvaSecondoAcquisto = ivaSecondoAcquisto * prezzoSecondoAcquisto;
                  let costiTotaliTransazioneSecondoAcquisto = istruttoria+perizia+notaio+commissioniAgenzia+impostaRegistro+mobilioSecondoAcquisto+altreImposte+ammontareIva;
          
              //Costi Rate
                  let speseCondominialiMensiliSecondaCasa = parseFloat(document.getElementById('spese-condominiali-seconda-casa').value);
                  let finanziamentoSecondoMutuo = parseFloat(document.getElementById('finanziamento-nuova-casa').value);
                  let durataSecondoMutuo = parseFloat(document.getElementById('anni-nuovo-mutuo').value);
                  let tassoSecondoMutuo = document.getElementById('tasso-nuovo-mutuo').value;
                  let tassoMensileSecondoMutuo = tassoSecondoMutuo/12;
                  let interessiCompostiSecondoMutuo = Math.pow(1 + tassoMensileSecondoMutuo,12*durataSecondoMutuo);
                  let quotaRataMensileSecondoMutuo = interessiCompostiSecondoMutuo*tassoMensileSecondoMutuo/(interessiCompostiSecondoMutuo - 1);
                  let rataMensileSecondoMutuo = quotaRataMensileSecondoMutuo * finanziamentoSecondoMutuo;
                  let rateAnnualiSecondoMutuo = rataMensileSecondoMutuo*12;
                  let periodoSimulazioneSecondoMutuo = Math.min(anniSimulazione-anniVenditaPrimaCasa,durataSecondoMutuo);
                  let montanteSecondoMutuo = rateAnnualiSecondoMutuo*durataSecondoMutuo;
                  let interessiTotaliSecondoMutuo = (montanteSecondoMutuo - finanziamentoSecondoMutuo)*(durataSecondoMutuo-anniVenditaPrimaCasa)/durataSecondoMutuo;
                  let rateTotaliSecondoMutuo = (rateAnnuali*Math.min(anniSimulazione-anniVenditaPrimaCasa,durataSecondoMutuo)+speseCondominialiMensiliSecondaCasa*12*(anniSimulazione - anniVenditaPrimaCasa));
      
              //Costi Totali
                  let costiTotaliSecondoAcquisto = costiTotaliTransazioneSecondoAcquisto+speseCondominialiMensiliSecondaCasa*12*(anniSimulazione - anniVenditaPrimaCasa);
                                                
          //Costi Totali Acquisto + Acquisto
                  let costiTotaliAcquistoAcquisto = costiTotaliPrimoAcquisto + costiVenditaCasa + costiTotaliSecondoAcquisto;
      
          //Update Pagina
              document.getElementById('rata-mutuo').innerHTML = formatterDigits.format(rataMensile);
              document.getElementById('rata-affitto-mutuo').innerHTML = formatterDigits.format(rataMensile);
              document.getElementById('costi-acquisto').innerHTML = formatter.format(costiTotaliTransazioneAcquisto+speseCondominialiTotali);
              document.getElementById('interessi-mutuo').innerHTML = formatter.format(interessiTotali);
              document.getElementById('interessi-affitto-mutuo').innerHTML = formatter.format(interessiTotali);
              document.getElementById('capitale-mutuo').innerHTML = formatter.format(finanziamentoMutuo);
              document.getElementById('capitale-affitto-mutuo').innerHTML = formatter.format(finanziamentoMutuo);
              document.getElementById('costi-affitto-acquisto').innerHTML = costiTotaliAffittoAcquisto;
              document.getElementById('rata-primo-mutuo').innerHTML = formatterDigits.format(rataMensile);
              document.getElementById('rata-secondo-mutuo').innerHTML = formatterDigits.format(rataMensileSecondoMutuo);
              document.getElementById('capitale-primo-mutuo').innerHTML = formatter.format(finanziamentoMutuo);
              document.getElementById('capitale-secondo-mutuo').innerHTML = formatter.format(finanziamentoSecondoMutuo);
              document.getElementById('interessi-primo-mutuo').innerHTML = formatter.format(interessiTotaliPrimaCasa);
              document.getElementById('interessi-secondo-mutuo').innerHTML = formatter.format(interessiTotaliSecondoMutuo);
              document.getElementById('costi-primo-acquisto').innerHTML = formatter.format(costiTotaliPrimoAcquisto);
              document.getElementById('costi-secondo-acquisto').innerHTML = formatter.format(costiTotaliSecondoAcquisto);
              document.getElementById('costi-vendita').innerHTML = formatter.format(costiVenditaCasa);
              document.getElementById('patrimonio-acquisto-acquisto').innerHTML = formatter.format(0);
      
      //Patrimonio Affitto
          let capitaleInizialeAffitto = costiTotaliTransazioneAcquisto + prezzo - finanziamentoMutuo;
          let parametroCrescitaPatrimonio = Math.pow(1+rendimentoInvestimenti,anniSimulazione);
          let patrimonioTotaleAffitto = formatter.format(capitaleInizialeAffitto * parametroCrescitaPatrimonio);
          document.getElementById('patrimonio-affitto').innerHTML = patrimonioTotaleAffitto;
  
      //Patrimonio Acquisto
          //Patrimonio Investimenti - se rata mutuo < rata affitto
              let capitaleAnnualeMutuo = Math.max(affittoAnnuale - rateAnnuali,0);
              let capitaleAnnualePostMutuo = affittoAnnuale;
              let patrimonioInvestimentiAcquisto = 0;
              if (durataMutuo == anniSimulazione) {    
                  patrimonioInvestimentiAcquisto = capitaleAnnualeMutuo * (Math.pow(1+rendimentoInvestimenti,anniSimulazione) - 1) / rendimentoInvestimenti;
              } else if (durataMutuo > anniSimulazione) {
                  patrimonioInvestimentiAcquisto = capitaleAnnualeMutuo * (Math.pow(1+rendimentoInvestimenti,anniSimulazione) - 1) / rendimentoInvestimenti;
              } else {
                  patrimonioInvestimentiAcquisto = capitaleAnnualeMutuo * (Math.pow(1+rendimentoInvestimenti,durataMutuo) - 1) / rendimentoInvestimenti + capitaleAnnualePostMutuo * (Math.pow(1+rendimentoInvestimenti,anniSimulazione-durataMutuo) - 1) / rendimentoInvestimenti;
              }; // BUGGATO - invece che else serve else if confrontando meglio duratamutuo e annisimulazione -> se duratamutuo > annisimulazione tocca troncare la durata degli investimenti
          
          //Patrimonio Immobiliare
              //ROBA INUTILE - da cancellare?
              let anticipo = prezzo - finanziamentoMutuo;
              let totaleMutuo = rateAnnuali * durataMutuo;
              let totaleInteressi = totaleMutuo - prezzo;
              let incidenzaInteressiMutuo = totaleInteressi / totaleMutuo;
              let equityCasaAnnuale = (1-incidenzaInteressiMutuo)*rateAnnuali;
              let rendimentoImmobili = parseFloat(document.getElementById('rendimento-immobili').value);
              
              //PATRIMONIO
              let patrimonioCasaMutuo = prezzo * (Math.pow(1+rendimentoImmobili,anniSimulazione));
              
          //Patrimonio Totale Acquisto
              let patrimonioTotaleAcquisto = patrimonioCasaMutuo + patrimonioInvestimentiAcquisto;
          
          //Update pagina
              let patrimonioTotaleAcquistoFormat = formatter.format(patrimonioTotaleAcquisto);
              document.getElementById('patrimonio-acquisto').innerHTML = patrimonioTotaleAcquistoFormat;
      
      //Patrimonio Affitto + Acquisto
          //Patrimonio Investimenti
              let parametroCrescitaPatrimonioAffittoAcquisto = Math.pow(1+rendimentoInvestimenti,anniPreAcquisto);
              let patrimonioTransazioniAffittoAcquisto = capitaleInizialeAffitto * parametroCrescitaPatrimonioAffittoAcquisto - capitaleInizialeAffitto; 
              //i costi per l'acquisto vengono pagati solo dopo qualche anno ottenendo nel frattempo dei rendimenti di mercato
      
              let patrimonioInvestimentiAffittoAcquisto = 0;
              if (anniSimulazione == durataMutuo + anniPreAcquisto) {    
                  patrimonioInvestimentiAffittoAcquisto = capitaleAnnualeMutuo * (Math.pow(1+rendimentoInvestimenti,durataMutuo) - 1) / rendimentoInvestimenti;
              } else if (anniSimulazione < durataMutuo + anniPreAcquisto) {
                  patrimonioInvestimentiAffittoAcquisto = capitaleAnnualeMutuo * (Math.pow(1+rendimentoInvestimenti,anniSimulazione-anniPreAcquisto) - 1) / rendimentoInvestimenti;
              } else if (anniSimulazione > durataMutuo + anniPreAcquisto) {
                  patrimonioInvestimentiAffittoAcquisto = capitaleAnnualeMutuo * (Math.pow(1+rendimentoInvestimenti,durataMutuo) - 1) / rendimentoInvestimenti + capitaleAnnualePostMutuo * (Math.pow(1+rendimentoInvestimenti,anniSimulazione-durataMutuo-anniPreAcquisto) - 1) / rendimentoInvestimenti;
              };
      
          //Patrimonio Immobiliare
              let patrimonioAffittoAcquisto = 0;
              if(anniPreAcquisto < anniSimulazione) {
                  patrimonioAffittoAcquisto = prezzo * Math.pow(1+rendimentoImmobili,anniSimulazione-anniPreAcquisto);
              } else {0};
      
          //Update pagina 
              let patrimonioTotaleAffittoAcquisto = patrimonioTransazioniAffittoAcquisto + patrimonioInvestimentiAffittoAcquisto + patrimonioAffittoAcquisto;
              let patrimonioTotaleAffittoAcquistoFormat = formatter.format(patrimonioTotaleAffittoAcquisto);
              document.getElementById('patrimonio-affitto-acquisto').innerHTML = patrimonioTotaleAffittoAcquistoFormat;
      
      //Patrimonio Acquisto + Acquisto
          //Patrimonio Investimenti
              //let capitaleAnnualeMutuo = Math.max(affittoAnnuale - rateAnnuali,0);
              //let capitaleAnnualePostMutuo = affittoAnnuale;
              let patrimonioInvestimentiPrimoAcquisto = 0;
              if (anniVenditaPrimaCasa <= anniSimulazione) {    
                  patrimonioInvestimentiPrimoAcquisto = capitaleAnnualeMutuo * (Math.pow(1+rendimentoInvestimenti,anniVenditaPrimaCasa) - 1) / rendimentoInvestimenti;
              } else {
                  patrimonioInvestimentiPrimoAcquisto = capitaleAnnualeMutuo * (Math.pow(1+rendimentoInvestimenti,anniSimulazione) - 1) / rendimentoInvestimenti;
              };
              
              let patrimonioInvestimentiSecondoAcquisto = 0;
              let capitaleAnnualeSecondoMutuo = Math.max(affittoAnnuale + speseCondominialiMensili*12 - rateAnnualiSecondoMutuo - speseCondominialiMensiliSecondaCasa*12,0);
              if (anniVenditaPrimaCasa + durataSecondoMutuo == anniSimulazione) {    
                  patrimonioInvestimentiSecondoAcquisto = capitaleAnnualeSecondoMutuo * (Math.pow(1+rendimentoInvestimenti,durataSecondoMutuo) - 1) / rendimentoInvestimenti;
              } else if (anniVenditaPrimaCasa + durataSecondoMutuo > anniSimulazione) {
                  patrimonioInvestimentiSecondoAcquisto = capitaleAnnualeSecondoMutuo * (Math.pow(1+rendimentoInvestimenti,anniSimulazione - anniVenditaPrimaCasa) - 1) / rendimentoInvestimenti;
              } else {
                  patrimonioInvestimentiSecondoAcquisto = capitaleAnnualeSecondoMutuo * (Math.pow(1+rendimentoInvestimenti,anniSimulazione - anniVenditaPrimaCasa) - 1) / rendimentoInvestimenti + capitaleAnnualePostMutuo * (Math.pow(1+rendimentoInvestimenti,anniSimulazione-durataMutuo-anniVenditaPrimaCasa) - 1) / rendimentoInvestimenti
              };
      
          //Patrimonio Immobiliare
              //Equity Casa
                  let patrimonioImmobiliareAcquistoAcquisto = prezzoSecondoAcquisto * ( (Math.pow(1+rendimentoImmobili,anniSimulazione - anniVenditaPrimaCasa)));
      
              //Capital Gain Vendita 
                  let capitalGain = Math.max(prezzoVenditaCasa - prezzo,0);
                  let tassaCapitalGain = 0.26;
                  let capitalGainNetto = capitalGain * (1-tassaCapitalGain);
      
          //Update pagina 
              let patrimonioTotaleAcquistoAcquisto = patrimonioInvestimentiPrimoAcquisto + patrimonioInvestimentiSecondoAcquisto + patrimonioImmobiliareAcquistoAcquisto + capitalGainNetto;
              let patrimonioTotaleAcquistoAcquistoFormat = formatter.format(patrimonioTotaleAcquistoAcquisto);
              document.getElementById('patrimonio-acquisto-acquisto').innerHTML = patrimonioTotaleAcquistoAcquistoFormat;
              
  
      let checkboxValueAffAcq = document.getElementById('checkbox-affitto-acquisto').checked; 
      let checkboxValueAcqAcq = document.getElementById('checkbox-acquisto-acquisto').checked;
  
      //Creazione Grafico
              let patrimonioTotaleAffittoChart = capitaleInizialeAffitto * parametroCrescitaPatrimonio;
              let data = [];
              data.push(patrimonioTotaleAffittoChart);
              data.push(patrimonioTotaleAcquisto);
              let labels = ['Affitto','Acquisto'];
              if (checkboxValueAffAcq == true) {
                  data.push(patrimonioTotaleAffittoAcquisto);
                  labels.push('Affitto + Acquisto');
              };
              if (checkboxValueAcqAcq == true) {
                  data.push(patrimonioTotaleAcquistoAcquisto);
                  labels.push('Acquisto + Acquisto');
              };
              var ctx = document.getElementById('myChart');
              var myChart = new Chart(ctx, {
                  type: 'bar',
                  data: {
                      labels: labels,
                      datasets: [{
                          label: 'Patrimonio',
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
                          text: 'Patrimonio finale'
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
                      }
                  }
              });
              document.getElementById("myChart").width = "600";
              document.getElementById("myChart").height = "600";
  
      document.getElementById("results-container").classList.remove("user-hidden");
      $("#icona-opzioni-avanzate").html('arrow_drop_down');
      $("#row-opzioni-avanzate").hide();
      
      // Nasconde le sezioni non selezionati dall'utente a inizio pagina
      
      if (checkboxValueAffAcq == true) {
          $("#container-patrimonio-affitto-acquisto").show();
      } else if (checkboxValueAffAcq == false) {
          $("#container-patrimonio-affitto-acquisto").hide();
      };
  
      if (checkboxValueAcqAcq == true) {
          $("#container-patrimonio-acquisto-acquisto").show();
      } else if (checkboxValueAffAcq == false) {
          $("#container-patrimonio-acquisto-acquisto").hide();
      };
  }