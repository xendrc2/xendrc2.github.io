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

//attivazione dropdown navbar
  $(".dropdown-trigger").dropdown({ hover: false, constrainWidth: false, coverTrigger: false });

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

//Calcolo imposta appena si carica la pagina
    let prezzo = parseFloat(document.getElementById('prezzo-casa').value);
    let imposta = 0.02;
    let iva = 0;
    let ammontareImposta = imposta*prezzo; 
    document.getElementById('imposta').value = ammontareImposta;

//Mostra o nasconde sezioni del sito a seconda della selezione di scenari dell'utente
    const selectCheckboxAffAcq = document.getElementById('checkbox-affitto-acquisto');
    selectCheckboxAffAcq.addEventListener('change', (event) => {
        let checkboxValue = document.getElementById('checkbox-affitto-acquisto').checked;
        if (checkboxValue == true) {
            $("#container-affitto-acquisto").show();
            $("#divider-affitto-acquisto").show();
        } else if (checkboxValue == false) {
            $("#container-affitto-acquisto").hide();
            $("#divider-affitto-acquisto").hide();
        };
    });

    const selectCheckboxAcqAcq = document.getElementById('checkbox-acquisto-acquisto');
    selectCheckboxAcqAcq.addEventListener('change', (event) => {
        let checkboxValue = document.getElementById('checkbox-acquisto-acquisto').checked;
        if (checkboxValue == true) {
            $("#container-acquisto-acquisto").show();
        } else if (checkboxValue == false) {
            $("#container-acquisto-acquisto").hide();
            $("#divider-affitto-acquisto").hide();
        };
    });

//Calcolo imposta primo mutuo ogni volta che viene modificato il prezzo della casa o lo switch prima/seconda casa
    const selectElement = document.getElementById('prezzo-casa');
    selectElement.addEventListener('change', (event) => {
        prezzo = parseFloat(document.getElementById('prezzo-casa').value);
        let switchValue = document.getElementById('prima-casa').checked;
        if (switchValue == true) {
            imposta = 0.02;
            document.getElementById('imposta').value = imposta * prezzo;
        } else if (switchValue == false) {
            imposta = 0.09;
            document.getElementById('imposta').value = imposta * prezzo;
        };
    });

    const selectSwitch = document.getElementById('prima-casa');
    selectSwitch.addEventListener('change', (event) => {
        let switchValue = document.getElementById('prima-casa').checked;
        if (switchValue == true) {
            let switchValue3 = document.getElementById('da-privato').checked;
            if (switchValue3 == true) {
                imposta = 0.02;
                document.getElementById('imposta').value = imposta * prezzo;
                document.getElementById('altre-imposte').value = 100;
                document.getElementById('iva').value = 0;
            } else if (switchValue3 == false) {
                iva = 0.04;
                document.getElementById('iva').value = iva * prezzo;
                document.getElementById('imposta').value = 200;
                document.getElementById('altre-imposte').value = 400;
            };
            
        } else if (switchValue == false) {
            let switchValue2 = document.getElementById('da-privato').checked;
            if (switchValue2 == true) {
                imposta = 0.09;
                document.getElementById('imposta').value = imposta * prezzo;
                document.getElementById('altre-imposte').value = 100;
            } else if (switchValue2 == false) {
                iva = 0.1;
                document.getElementById('iva').value = iva * prezzo;
                document.getElementById('imposta').value = 200;
                document.getElementById('altre-imposte').value = 720;
            };
        };
            
        });

    const selectSwitchPrivato = document.getElementById('da-privato');
    selectSwitchPrivato.addEventListener('change', (event) => {
        let switchValue = document.getElementById('da-privato').checked;
        if (switchValue == true) {
            iva = 0;
            document.getElementById('iva').value = 0;
            document.getElementById('altre-imposte').value = 100;
            document.getElementById('imposta').value = imposta * prezzo;
        } else if (switchValue == false) {
            let switchValue4 = document.getElementById('prima-casa').checked;
            if (switchValue4 == true) {
                iva = 0.04;
                document.getElementById('iva').value = iva * prezzo;
                document.getElementById('imposta').value = 200;
                document.getElementById('altre-imposte').value = 400;
            } else if (switchValue4 == false) {
                iva = 0.1;
                document.getElementById('iva').value = iva * prezzo;
                document.getElementById('imposta').value = 200;
                document.getElementById('altre-imposte').value = 720;
            };
            
        };
    });

//Calcolo imposta secondo mutuo ogni volta che viene modificato il prezzo della casa o lo switch prima/seconda casa
    let impostaNuovaCasa = 0.02;
    let ivaNuovaCasa = 0;
    let prezzoNuovaCasa = parseFloat(document.getElementById('prezzo-nuova-casa').value);

    const selectElementSecondoMutuo = document.getElementById('prezzo-nuova-casa');
    selectElementSecondoMutuo.addEventListener('change', (event) => {
        let switchValue10 = document.getElementById('prima-casa-secondo-mutuo').checked;
        if (switchValue10 == true) {
            impostaNuovaCasa = 0.02;
            prezzoNuovaCasa = parseFloat(document.getElementById('prezzo-nuova-casa').value);
            document.getElementById('imposta-secondo-mutuo').value = impostaNuovaCasa * prezzoNuovaCasa;
            console.log("true");
        } else if (switchValue10 == false) {
            impostaNuovaCasa = 0.09;
            prezzoNuovaCasa = parseFloat(document.getElementById('prezzo-nuova-casa').value);
            document.getElementById('imposta-secondo-mutuo').value = impostaNuovaCasa * prezzoNuovaCasa;
            console.log("false");
        };
    });

    const selectSwitchSecondoMutuo = document.getElementById('prima-casa-secondo-mutuo');
    selectSwitchSecondoMutuo.addEventListener('change', (event) => {
        let switchValue = document.getElementById('prima-casa-secondo-mutuo').checked;
        if (switchValue == true) {
            let switchValue5 = document.getElementById('da-privato-secondo-mutuo').checked;
            if (switchValue5 == true) {
                impostaNuovaCasa = 0.02;
                prezzoNuovaCasa = parseFloat(document.getElementById('prezzo-nuova-casa').value);
                document.getElementById('imposta-secondo-mutuo').value = impostaNuovaCasa * prezzoNuovaCasa;
                document.getElementById('altre-imposte-secondo-mutuo').value = 100;
                document.getElementById('iva-secondo-mutuo').value = 0;
            } else if (switchValue5 == false) {
                ivaNuovaCasa = 0.04;
                prezzoNuovaCasa = parseFloat(document.getElementById('prezzo-nuova-casa').value);
                document.getElementById('iva-secondo-mutuo').value = ivaNuovaCasa * prezzoNuovaCasa;
                document.getElementById('imposta-secondo-mutuo').value = 200;
                document.getElementById('altre-imposte-secondo-mutuo').value = 400;
            };
            
        } else if (switchValue == false) {
            let switchValue6 = document.getElementById('da-privato-secondo-mutuo').checked;
            if (switchValue6 == true) {
                impostaNuovaCasa = 0.09;
                prezzoNuovaCasa = parseFloat(document.getElementById('prezzo-nuova-casa').value);
                document.getElementById('imposta-secondo-mutuo').value = impostaNuovaCasa * prezzoNuovaCasa;
                document.getElementById('altre-imposte-secondo-mutuo').value = 100;
            } else if (switchValue6 == false) {
                ivaNuovaCasa = 0.1;
                prezzoNuovaCasa = parseFloat(document.getElementById('prezzo-nuova-casa').value);
                document.getElementById('iva-secondo-mutuo').value = ivaNuovaCasa * prezzoNuovaCasa;
                document.getElementById('imposta-secondo-mutuo').value = 200;
                document.getElementById('altre-imposte-secondo-mutuo').value = 720;
            };
        };
            
        });

    const selectSwitchPrivatoSecondoMutuo = document.getElementById('da-privato-secondo-mutuo');
    selectSwitchPrivatoSecondoMutuo.addEventListener('change', (event) => {
        let switchValue8 = document.getElementById('da-privato-secondo-mutuo').checked;
        if (switchValue8 == true) {
            let switchValue11 = document.getElementById('prima-casa-secondo-mutuo').checked;
            if (switchValue11 == true) {
                ivaNuovaCasa = 0;
                document.getElementById('iva-secondo-mutuo').value = 0;
                document.getElementById('altre-imposte-secondo-mutuo').value = 100;
                impostaNuovaCasa = 0.02;
                document.getElementById('imposta-secondo-mutuo').value = impostaNuovaCasa * prezzoNuovaCasa;
            } else if (switchValue11 == false) {
                ivaNuovaCasa = 0;
                document.getElementById('iva-secondo-mutuo').value = 0;
                document.getElementById('altre-imposte-secondo-mutuo').value = 100;
                impostaNuovaCasa = 0.09;
                document.getElementById('imposta-secondo-mutuo').value = impostaNuovaCasa * prezzoNuovaCasa;
            };
            
        } else if (switchValue8 == false) {
            let switchValue9 = document.getElementById('prima-casa-secondo-mutuo').checked;
            if (switchValue9 == true) {
                ivaNuovaCasa = 0.04;
                document.getElementById('iva-secondo-mutuo').value = ivaNuovaCasa * prezzoNuovaCasa;
                document.getElementById('imposta-secondo-mutuo').value = 200;
                document.getElementById('altre-imposte-secondo-mutuo').value = 400;
            } else if (switchValue9 == false) {
                ivaNuovaCasa = 0.1;
                document.getElementById('iva-secondo-mutuo').value = ivaNuovaCasa * prezzoNuovaCasa;
                document.getElementById('imposta-secondo-mutuo').value = 200;
                document.getElementById('altre-imposte-secondo-mutuo').value = 720;
            };
            
        };
    });

//Check # of simulations
var contatore = 0;

//Click bottone "opzioni avanzate"
    const buttonClick = document.getElementById('opzioni-avanzate');
    buttonClick.addEventListener('click', (event) => {
        let buttonIcon = document.getElementById('icona-opzioni-avanzate').innerHTML;
        if (buttonIcon == 'arrow_drop_down') {
            $("#icona-opzioni-avanzate").html('arrow_drop_up'); 
            $("#row-opzioni-avanzate").show();
        } else if (buttonIcon == 'arrow_drop_up') {
            $("#icona-opzioni-avanzate").html('arrow_drop_down');
            $("#row-opzioni-avanzate").hide();
        }
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
    let finanziamentoMutuo = parseFloat(document.getElementById('finanziamento-mutuo').value);
    
    //Costi Affitto
        let affittoMensile = parseFloat(document.getElementById('affitto-mensile').value);
        let affittoAnnuale = affittoMensile * 12;
        let affittoSimulazione = affittoAnnuale * anniSimulazione;
        let affittoTotale = formatter.format(affittoSimulazione + speseCondominialiTotali);
        document.getElementById('table-affitto-totale').innerHTML = affittoTotale;
        document.getElementById('table-rate-affitto').innerHTML = formatter.format(affittoSimulazione);
        $('.table-spese-condominiali').html(formatter.format(speseCondominialiTotali));
        let rataAffittoMensile = affittoMensile + speseCondominialiMensili;
    
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

            $('.table-commissione-agenzia-acquisto').html(formatter.format(commissioniAgenzia));
            $('.table-mobilio-acquisto').html(formatter.format(mobilio));
            $('.table-notaio-acquisto').html(formatter.format(notaio));
            $('.table-imposta-acquisto').html(formatter.format(impostaRegistro));
            $('.table-altre-imposte-acquisto').html(formatter.format(altreImposte));
            $('.table-istruttoria-acquisto').html(formatter.format(istruttoria));
            $('.table-perizia-acquisto').html(formatter.format(perizia));
            $('.table-iva-acquisto').html(formatter.format(ammontareIva));
            
            
        
        //Costi Rate
            let tassoMutuo = document.getElementById('tasso-mutuo').value;
            let tassoMensile = tassoMutuo/12;
            let interessiComposti = Math.pow(1 + tassoMensile,12*durataMutuo);
            let quotaRataMensile = interessiComposti*tassoMensile/(interessiComposti - 1);
            let rataMensile = quotaRataMensile * finanziamentoMutuo;
            let rateAnnuali = rataMensile*12;
            let interessiTotali = rateAnnuali*durataMutuo-finanziamentoMutuo;
            let interessiAnnuali = interessiTotali / durataMutuo;
            let interessiPagati = interessiAnnuali * Math.min(durataMutuo,anniSimulazione);
            let rateTotali = rateAnnuali*durataMutuo+speseCondominialiTotali;

            document.getElementById('table-interessi-acquisto').innerHTML = formatter.format(interessiPagati);
            document.getElementById('table-acquisto-totale').innerHTML = formatter.format(costiTotaliTransazioneAcquisto + interessiTotali + speseCondominialiTotali);
    
        //Costi Totali
            let costiTotaliAcquisto = formatter.format(speseCondominialiTotali+costiTotaliTransazioneAcquisto);
        
    //Costi Affitto + Acquisto
        //Costi Affitto - solo prima dell'acquisto
            let rataAffittoAnnuale = rataAffittoMensile * 12;
            let anniPreAcquisto = parseFloat(document.getElementById('anni-affitto-acquisto').value);
            let rataAffittoTemporaneoTotale = rataAffittoAnnuale * anniPreAcquisto;
            document.getElementById('table-rata-affitto-acquisto').innerHTML = formatter.format(rataAffittoTemporaneoTotale);
        
        //Costi Acquisto - tenendo conto degli anni pre acquisto
            //Costi Transazione
                let costiTotaliTransazioneAffittoAcquisto = costiTotaliTransazioneAcquisto;
        
            //Costi Rate
                let orizzonteMutuo = Math.max(durataMutuo,anniSimulazione) - anniPreAcquisto;

                let interessiPagatiAffittoAcquisto = interessiAnnuali * Math.min(durataMutuo,Math.max(anniSimulazione-anniPreAcquisto,0));

                document.getElementById('table-interessi-affitto-acquisto').innerHTML = formatter.format(interessiPagatiAffittoAcquisto);
    
            //Costi Totali
                

                document.getElementById('table-affitto-acquisto-totale').innerHTML = formatter.format(rataAffittoTemporaneoTotale+interessiPagatiAffittoAcquisto+speseCondominialiTotali+costiTotaliTransazioneAcquisto);
    //Costi Acquisto + Acquisto
                
        //Costi Primo Acquisto
            //Costi Transazione
                let costiTotaliTransazionePrimoAcquisto = costiTotaliTransazioneAcquisto;
        
            //Costi Rate
                let anniVenditaPrimaCasa = parseFloat(document.getElementById('anni-acquisto-acquisto').value);
                let interessiTotaliPrimaCasa = (rateAnnuali*durataMutuo - finanziamentoMutuo)*Math.min(anniVenditaPrimaCasa,anniSimulazione)/durataMutuo;

                document.getElementById('table-interessi-primo-acquisto').innerHTML = formatter.format(interessiTotaliPrimaCasa);

                let speseCondominialiPrimoAcquisto = speseCondominialiMensili*12*anniVenditaPrimaCasa;

                document.getElementById('table-spese-condominiali-primo-acquisto').innerHTML = formatter.format(speseCondominialiPrimoAcquisto);

                let rateTotaliPrimaCasa = rateAnnuali*anniVenditaPrimaCasa + speseCondominialiMensili*12*anniVenditaPrimaCasa;
    
            //Costi Totali
                let costiTotaliPrimoAcquisto = costiTotaliTransazionePrimoAcquisto+ speseCondominialiPrimoAcquisto+interessiTotaliPrimaCasa;

                document.getElementById('table-primo-acquisto-totale').innerHTML = formatter.format(costiTotaliPrimoAcquisto);
    
        //Costi Vendita Prima Casa
            
            let percentCommissioniAgenziaVendita = parseFloat(document.getElementById('commissioni-agenzia-vendita').value);
            
            let prezzoVenditaCasa = parseFloat(document.getElementById('prezzo-vendita-casa').value);

            let commissioniAgenziaVendita = percentCommissioniAgenziaVendita * prezzoVenditaCasa;

            let certificatoAPE = parseFloat(document.getElementById('ape-nuova-casa').value);

            let costiVenditaCasa = commissioniAgenziaVendita + certificatoAPE;

            document.getElementById('table-commissione-agenzia-vendita-acquisto').innerHTML = formatter.format(commissioniAgenziaVendita);

            document.getElementById('table-ape-vendita-acquisto').innerHTML = formatter.format(certificatoAPE);

            document.getElementById('table-vendita-acquisto-totale').innerHTML = formatter.format(costiVenditaCasa);
    
        //Costi Secondo Acquisto
            //Costi Transazione
                let prezzoSecondoAcquisto = parseFloat(document.getElementById('prezzo-nuova-casa').value);

                let ivaSecondoAcquisto = parseFloat(document.getElementById('iva-secondo-mutuo').value);

                let istruttoriaSecondoAcquisto = parseFloat(document.getElementById('istruttoria-secondo-mutuo').value);
                document.getElementById('table-istruttoria-secondo-acquisto').innerHTML = formatter.format(istruttoriaSecondoAcquisto);

                let periziaSecondoAcquisto = parseFloat(document.getElementById('perizia-secondo-mutuo').value);
                document.getElementById('table-perizia-secondo-acquisto').innerHTML = formatter.format(periziaSecondoAcquisto);

                let notaioSecondoAcquisto = parseFloat(document.getElementById('notaio-secondo-mutuo').value);
                document.getElementById('table-notaio-secondo-acquisto').innerHTML = formatter.format(notaioSecondoAcquisto);

                let impostaRegistroSecondoAcquisto = parseFloat(document.getElementById('imposta-secondo-mutuo').value);
                document.getElementById('table-imposta-secondo-acquisto').innerHTML = formatter.format(impostaRegistroSecondoAcquisto);

                let mobilioSecondoAcquisto = parseFloat(document.getElementById('mobilio-nuova-casa').value);
                document.getElementById('table-mobilio-secondo-acquisto').innerHTML = formatter.format(mobilioSecondoAcquisto);

                let altreImposteSecondoAcquisto = parseFloat(document.getElementById('altre-imposte-secondo-mutuo').value);
                document.getElementById('table-altre-imposte-secondo-acquisto').innerHTML = formatter.format(altreImposteSecondoAcquisto);

                let ammontareIvaSecondoAcquisto = ivaSecondoAcquisto * prezzoSecondoAcquisto;
                document.getElementById('table-iva-secondo-acquisto').innerHTML = formatter.format(ammontareIvaSecondoAcquisto);

                let percentCommissioniAgenziaSecondoAcquisto = parseFloat(document.getElementById('commissioni-agenzia-secondo-mutuo').value);
                let commissioniAgenziaSecondoAcquisto = percentCommissioniAgenziaSecondoAcquisto * prezzoSecondoAcquisto;
                document.getElementById('table-commissione-agenzia-secondo-acquisto').innerHTML = formatter.format(commissioniAgenziaSecondoAcquisto);

                let costiTotaliTransazioneSecondoAcquisto = istruttoriaSecondoAcquisto+periziaSecondoAcquisto+notaioSecondoAcquisto+commissioniAgenziaSecondoAcquisto+impostaRegistroSecondoAcquisto+mobilioSecondoAcquisto+altreImposteSecondoAcquisto+ammontareIvaSecondoAcquisto;

                let speseCondominialiMensiliSecondaCasa = parseFloat(document.getElementById('spese-condominiali-seconda-casa').value);

                let speseCondominialiSecondaCasaTotali = speseCondominialiMensiliSecondaCasa*12*Math.max(anniSimulazione - anniVenditaPrimaCasa,0);

                document.getElementById('table-spese-condominiali-secondo-acquisto').innerHTML = formatter.format(speseCondominialiSecondaCasaTotali);

                

            //Costi Rate
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

                let interessiTotaliSecondoMutuo = (montanteSecondoMutuo - finanziamentoSecondoMutuo)/durataSecondoMutuo * Math.min(durataSecondoMutuo,Math.max(anniSimulazione-anniVenditaPrimaCasa,0));

                document.getElementById('table-interessi-secondo-acquisto').innerHTML = formatter.format(interessiTotaliSecondoMutuo);

                let rateTotaliSecondoMutuo = (rateAnnuali*Math.min(anniSimulazione-anniVenditaPrimaCasa,durataSecondoMutuo)+speseCondominialiMensiliSecondaCasa*12*(anniSimulazione - anniVenditaPrimaCasa));
    
            //Costi Totali
                let costiTotaliSecondoAcquisto = costiTotaliTransazioneSecondoAcquisto + speseCondominialiSecondaCasaTotali + interessiTotaliSecondoMutuo;

                document.getElementById('table-secondo-acquisto-totale').innerHTML = formatter.format(costiTotaliSecondoAcquisto);
                                              
        //Costi Totali Acquisto + Acquisto
                let costiTotaliAcquistoAcquisto = costiTotaliPrimoAcquisto + costiVenditaCasa + costiTotaliSecondoAcquisto;

                document.getElementById('table-acquisto-acquisto-totale').innerHTML = formatter.format(costiTotaliAcquistoAcquisto);
    
    //Patrimonio Affitto
        let capitaleInizialeAffitto = costiTotaliTransazioneAcquisto + prezzo - finanziamentoMutuo;
        let parametroCrescitaPatrimonio = Math.pow(1+rendimentoInvestimenti,anniSimulazione);
        let patrimonioTotaleAffitto = formatter.format(capitaleInizialeAffitto * parametroCrescitaPatrimonio);

        document.getElementById('table-capitale-iniziale-affitto').innerHTML = formatter.format(capitaleInizialeAffitto);
        document.getElementById('table-contributo-annuale-affitto').innerHTML = formatter.format(0);
        document.getElementById('table-totale-capitale-affitto').innerHTML = formatter.format(capitaleInizialeAffitto);
        
        let rendimentoInvestimentipercento = rendimentoInvestimenti*100;
        $('.table-rendimenti').html(rendimentoInvestimentipercento.toFixed(2) +' %');

        
        
        document.getElementById('table-contributo-annuale-affitto-finale').innerHTML = formatter.format(0);
        document.getElementById('table-capitale-iniziale-affitto-finale').innerHTML = patrimonioTotaleAffitto;
        document.getElementById('table-totale-patrimonio-affitto-finale').innerHTML = patrimonioTotaleAffitto;
        

    //Patrimonio Acquisto
        //Patrimonio Investimenti
            let capitaleAnnualeMutuo = Math.max(affittoAnnuale - rateAnnuali,0);
            let capitaleAnnualePostMutuo = affittoAnnuale;
            let capitaleAnnualeTotale = 0;
            let patrimonioInvestimentiAcquisto = 0;
            if (durataMutuo == anniSimulazione) {    
                patrimonioInvestimentiAcquisto = capitaleAnnualeMutuo * (Math.pow(1+rendimentoInvestimenti,anniSimulazione) - 1) / rendimentoInvestimenti;
                capitaleAnnualeTotale = capitaleAnnualeMutuo * anniSimulazione;
            } else if (durataMutuo > anniSimulazione) {
                patrimonioInvestimentiAcquisto = capitaleAnnualeMutuo * (Math.pow(1+rendimentoInvestimenti,anniSimulazione) - 1) / rendimentoInvestimenti;
                capitaleAnnualeTotale = capitaleAnnualeMutuo * anniSimulazione;
            } else {
                patrimonioInvestimentiAcquisto = capitaleAnnualeMutuo * (Math.pow(1+rendimentoInvestimenti,durataMutuo) - 1) / rendimentoInvestimenti + capitaleAnnualePostMutuo * (Math.pow(1+rendimentoInvestimenti,anniSimulazione-durataMutuo) - 1) / rendimentoInvestimenti;
                capitaleAnnualeTotale = capitaleAnnualeMutuo * durataMutuo + capitaleAnnualePostMutuo * (anniSimulazione - durataMutuo);
            }; 
            
            document.getElementById('table-contributo-annuale-acquisto').innerHTML = formatter.format(capitaleAnnualeTotale);
            document.getElementById('table-capitale-iniziale-acquisto').innerHTML = formatter.format(0);

            document.getElementById('table-contributo-annuale-acquisto-finale').innerHTML = formatter.format(patrimonioInvestimentiAcquisto);
            document.getElementById('table-capitale-iniziale-acquisto-finale').innerHTML = formatter.format(0);
            
            

        
        //Patrimonio Immobiliare
            let anticipo = prezzo - finanziamentoMutuo;
            let totaleMutuo = rateAnnuali * durataMutuo;
            let totaleInteressi = totaleMutuo - prezzo;
            let incidenzaInteressiMutuo = totaleInteressi / totaleMutuo;
            let equityCasaAnnuale = (1-incidenzaInteressiMutuo)*rateAnnuali;
            let rendimentoImmobili = parseFloat(document.getElementById('rendimento-immobili').value);
            
            let rendimentoImmobiliPercento = rendimentoImmobili*100;
            $('.table-rendimenti-immobili').html(rendimentoImmobiliPercento.toFixed(2) +' %');

            document.getElementById('table-immobile-acquisto').innerHTML = formatter.format(prezzo);
            
            let capitaleRimborsato = equityCasaAnnuale * Math.min(durataMutuo, anniSimulazione);

            let totaleCapitaleAcquisto = capitaleAnnualeTotale + prezzo - finanziamentoMutuo + capitaleRimborsato;
            document.getElementById('table-totale-capitale-acquisto').innerHTML = formatter.format(totaleCapitaleAcquisto);

            document.getElementById('table-interessi-mutuo-acquisto').innerHTML = formatter.format(0);

            let montanteRimasto = finanziamentoMutuo - capitaleRimborsato;

            let patrimonioMutuoFinale = montanteRimasto + interessiPagati;

            document.getElementById('table-mutuo-acquisto').innerHTML = formatter.format(-finanziamentoMutuo);

            document.getElementById('table-mutuo-acquisto-finale').innerHTML = formatter.format(-montanteRimasto);

            document.getElementById('table-rimborso-mutuo-acquisto').innerHTML = formatter.format(capitaleRimborsato);

            document.getElementById('table-rimborso-mutuo-acquisto-finale').innerHTML = formatter.format(0);

            document.getElementById('table-interessi-mutuo-acquisto-finale').innerHTML = formatter.format(-interessiPagati);

            let tassoMutuoPercento = tassoMutuo * 100;
            $('.table-rendimenti-mutuo').html(tassoMutuoPercento.toFixed(2) + ' %');


            //PATRIMONIO
            let patrimonioCasaMutuo = prezzo * (Math.pow(1+rendimentoImmobili,anniSimulazione));
            document.getElementById('table-immobile-acquisto-finale').innerHTML = formatter.format(patrimonioCasaMutuo);
            
        //Patrimonio Totale Acquisto
            let patrimonioTotaleAcquisto = patrimonioCasaMutuo + patrimonioInvestimentiAcquisto - interessiPagati - montanteRimasto;
            document.getElementById('table-totale-patrimonio-acquisto-finale').innerHTML = formatter.format(patrimonioTotaleAcquisto);

            let rendimentoFinaleAcquisto = Math.pow(patrimonioTotaleAcquisto/totaleCapitaleAcquisto,1/anniSimulazione)-1;
            let rendimentoFinaleAcquistoPercento = rendimentoFinaleAcquisto * 100;
            document.getElementById('table-rendimento-finale-acquisto').innerHTML = rendimentoFinaleAcquistoPercento.toFixed(2) + ' %';
    
    //Patrimonio Affitto + Acquisto
        //Patrimonio Investimenti
            let parametroCrescitaPatrimonioAffittoAcquisto = Math.pow(1+rendimentoInvestimenti,Math.min(anniPreAcquisto,anniSimulazione));
            let patrimonioTransazioniAffittoAcquisto = (capitaleInizialeAffitto * parametroCrescitaPatrimonioAffittoAcquisto - capitaleInizialeAffitto)*Math.pow(1+rendimentoInvestimenti,Math.max(anniSimulazione-anniPreAcquisto,0));
            
            document.getElementById('table-capitale-iniziale-affitto-acquisto').innerHTML = formatter.format(capitaleInizialeAffitto);

            document.getElementById('table-capitale-iniziale-affitto-acquisto-finale').innerHTML = formatter.format(patrimonioTransazioniAffittoAcquisto);

            //i costi per l'acquisto vengono pagati solo dopo qualche anno ottenendo nel frattempo dei rendimenti di mercato
    
            let patrimonioInvestimentiAffittoAcquisto = 0;
            if (anniSimulazione == durataMutuo + anniPreAcquisto) {    
                patrimonioInvestimentiAffittoAcquisto = capitaleAnnualeMutuo * (Math.pow(1+rendimentoInvestimenti,durataMutuo) - 1) / rendimentoInvestimenti;
            } else if (anniSimulazione < durataMutuo + anniPreAcquisto) {
                patrimonioInvestimentiAffittoAcquisto = capitaleAnnualeMutuo * (Math.pow(1+rendimentoInvestimenti,anniSimulazione-anniPreAcquisto) - 1) / rendimentoInvestimenti;
            } else if (anniSimulazione > durataMutuo + anniPreAcquisto) {
                patrimonioInvestimentiAffittoAcquisto = capitaleAnnualeMutuo * (Math.pow(1+rendimentoInvestimenti,durataMutuo) - 1) / rendimentoInvestimenti + capitaleAnnualePostMutuo * (Math.pow(1+rendimentoInvestimenti,anniSimulazione-durataMutuo-anniPreAcquisto) - 1) / rendimentoInvestimenti;
            };
            
            let capitaleAnnuoAffittoAcquisto = capitaleAnnualeMutuo*Math.min(anniSimulazione-anniPreAcquisto,durataMutuo)+capitaleAnnualePostMutuo*Math.max(anniSimulazione-durataMutuo-anniPreAcquisto,0);

            document.getElementById('table-contributo-annuale-affitto-acquisto').innerHTML = formatter.format(capitaleAnnuoAffittoAcquisto);

            document.getElementById('table-contributo-annuale-affitto-acquisto-finale').innerHTML = formatter.format(patrimonioInvestimentiAffittoAcquisto);

        //Patrimonio Immobiliare
            let patrimonioAffittoAcquisto = 0;
            let finanziamentoMutuoAffittoAcquisto = 0;
            if(anniPreAcquisto < anniSimulazione) {
                finanziamentoMutuoAffittoAcquisto = finanziamentoMutuo;
                patrimonioAffittoAcquisto = prezzo * Math.pow(1+rendimentoImmobili,anniSimulazione-anniPreAcquisto);
                document.getElementById('table-immobile-affitto-acquisto').innerHTML = formatter.format(prezzo);
            } else {
                
                document.getElementById('table-immobile-affitto-acquisto').innerHTML = formatter.format(0);};
            
            
            document.getElementById('table-immobile-affitto-acquisto-finale').innerHTML = formatter.format(patrimonioAffittoAcquisto);

            let capitaleRimborsatoAffittoAcquisto = equityCasaAnnuale * Math.min(durataMutuo, Math.max(anniSimulazione-anniPreAcquisto,0));
            let montanteRimastoAffittoAcquisto = finanziamentoMutuo - capitaleRimborsatoAffittoAcquisto;
        
            document.getElementById('table-interessi-mutuo-affitto-acquisto').innerHTML = formatter.format(0);

            document.getElementById('table-interessi-mutuo-affitto-acquisto-finale').innerHTML = formatter.format(-interessiPagatiAffittoAcquisto);

            document.getElementById('table-mutuo-affitto-acquisto').innerHTML = formatter.format(-finanziamentoMutuoAffittoAcquisto);

            document.getElementById('table-mutuo-affitto-acquisto-finale').innerHTML = formatter.format(-montanteRimastoAffittoAcquisto);

            document.getElementById('table-rimborso-mutuo-affitto-acquisto').innerHTML = formatter.format(capitaleRimborsatoAffittoAcquisto);

            document.getElementById('table-rimborso-mutuo-affitto-acquisto-finale').innerHTML = formatter.format(0);
            

            

            
        //Update pagina 
            let patrimonioTotaleAffittoAcquisto = patrimonioTransazioniAffittoAcquisto + patrimonioInvestimentiAffittoAcquisto + patrimonioAffittoAcquisto - interessiPagatiAffittoAcquisto - montanteRimastoAffittoAcquisto;
            
            let totaleCapitaleAffittoAcquisto = prezzo+capitaleInizialeAffitto+capitaleAnnuoAffittoAcquisto - finanziamentoMutuoAffittoAcquisto + capitaleRimborsatoAffittoAcquisto;
            document.getElementById('table-totale-capitale-affitto-acquisto').innerHTML = formatter.format(totaleCapitaleAffittoAcquisto);

            document.getElementById('table-totale-patrimonio-affitto-acquisto-finale').innerHTML = formatter.format(patrimonioTotaleAffittoAcquisto);
            
            let rendimentoFinaleAffittoAcquisto = Math.pow(patrimonioTotaleAffittoAcquisto/totaleCapitaleAffittoAcquisto,1/anniSimulazione)-1;
            let rendimentoFinaleAffittoAcquistoPercento = rendimentoFinaleAffittoAcquisto * 100;
            document.getElementById('table-rendimento-finale-affitto-acquisto').innerHTML = rendimentoFinaleAffittoAcquistoPercento.toFixed(2) + ' %';
    
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
            
            document.getElementById('table-capitale-iniziale-acquisto-acquisto').innerHTML = formatter.format(0);

            document.getElementById('table-capitale-iniziale-acquisto-acquisto-finale').innerHTML = formatter.format(0);

            let patrimonioInvestimentiTotaleAcquistoAcquisto = patrimonioInvestimentiPrimoAcquisto + patrimonioInvestimentiSecondoAcquisto;

            let contributoAnnualePrimoAcquisto = capitaleAnnualeMutuo * Math.min(anniVenditaPrimaCasa, durataMutuo);
            let contributoAnnualeSecondoAcquisto = capitaleAnnualeSecondoMutuo * Math.min(anniSimulazione - anniVenditaPrimaCasa, durataMutuo);
            let contributoAnnualePostMutui = capitaleAnnualePostMutuo * Math.max(anniSimulazione-durataMutuo-anniVenditaPrimaCasa,0);
            let contributoAnnualeTotale = contributoAnnualePrimoAcquisto + contributoAnnualeSecondoAcquisto + contributoAnnualePostMutui;

            document.getElementById('table-contributo-annuale-acquisto-acquisto').innerHTML = formatter.format(contributoAnnualeTotale);

            document.getElementById('table-contributo-annuale-acquisto-acquisto-finale').innerHTML = formatter.format(patrimonioInvestimentiTotaleAcquistoAcquisto);

        //Patrimonio Immobiliare
            //Prima Casa
            let capitaleRimborsatoPrimaCasa = equityCasaAnnuale * anniVenditaPrimaCasa;
            let montanteRimastoPrimaCasa = finanziamentoMutuo - capitaleRimborsatoPrimaCasa;

            document.getElementById('table-interessi-primo-mutuo-acquisto-acquisto').innerHTML = formatter.format(0);

            document.getElementById('table-interessi-primo-mutuo-acquisto-acquisto-finale').innerHTML = formatter.format(-interessiTotaliPrimaCasa);

            

            let opportunitàCostiVenditaCasa = costiVenditaCasa * Math.pow(1+rendimentoInvestimenti,Math.max(anniSimulazione - anniVenditaPrimaCasa,0));
            

            



            //Seconda Casa
                let patrimonioImmobiliareSecondoAcquisto = prezzoSecondoAcquisto * ( (Math.pow(1+rendimentoImmobili,Math.max(anniSimulazione - anniVenditaPrimaCasa,0))));

                document.getElementById('table-secondo-immobile-acquisto-acquisto').innerHTML = formatter.format(prezzoSecondoAcquisto);

                document.getElementById('table-secondo-immobile-acquisto-acquisto-finale').innerHTML = formatter.format(patrimonioImmobiliareSecondoAcquisto);

                if (anniSimulazione < anniVenditaPrimaCasa) { 
                    document.getElementById('table-costi-secondo-immobile-acquisto-acquisto').innerHTML = formatter.format(0); } else {
                document.getElementById('table-costi-secondo-immobile-acquisto-acquisto').innerHTML = formatter.format(-costiTotaliTransazioneSecondoAcquisto);
                }

                let opportunitàCostiAcquistoSecondaCasa = costiTotaliTransazioneSecondoAcquisto * Math.pow(1+rendimentoInvestimenti,Math.max(anniSimulazione - anniVenditaPrimaCasa,0));
                document.getElementById('table-costi-secondo-immobile-acquisto-acquisto-finale').innerHTML = formatter.format(-opportunitàCostiAcquistoSecondaCasa);

                document.getElementById('table-interessi-secondo-mutuo-acquisto-acquisto').innerHTML = formatter.format(0);

                let tassoSecondoMutuoPercento = tassoSecondoMutuo * 100;
                document.getElementById('table-rendimenti-secondo-mutuo').innerHTML = tassoSecondoMutuoPercento.toFixed(2) + ' %';

                let equityCasaAnnualeSecondoMutuo = finanziamentoSecondoMutuo / durataSecondoMutuo;
                let capitaleRimborsatoSecondoMutuo = equityCasaAnnualeSecondoMutuo * Math.max(Math.min(anniSimulazione - anniVenditaPrimaCasa,durataSecondoMutuo),0);
                let montanteRimastoSecondoMutuo = finanziamentoSecondoMutuo - capitaleRimborsatoSecondoMutuo;
                document.getElementById('table-interessi-secondo-mutuo-acquisto-acquisto-finale').innerHTML = formatter.format(-interessiTotaliSecondoMutuo);
                
    
            //Capital Gain Vendita 
                let capitalGain = Math.max(prezzoVenditaCasa - prezzo,0);
                let tassaCapitalGain = 0.2;
                let capitalGainNetto = 0;
                if (anniVenditaPrimaCasa <= 5) {
                    capitalGainNetto = capitalGain;
                } else {
                    capitalGainNetto = capitalGain * (1-tassaCapitalGain);
                }
                
                let prezzoPrimaCasa = 0;
                let patrimonioImmobiliarePrimoAcquisto = 0;
                
                let patrimonioRimanenteVenditaPrimaCasa = prezzo + capitalGainNetto - montanteRimastoPrimaCasa;
                let capitalGainNettoInvestito = patrimonioRimanenteVenditaPrimaCasa * Math.pow(1+rendimentoInvestimenti,Math.max(anniSimulazione - anniVenditaPrimaCasa,0));

                let finanziamentoMutuoPrimaCasa = finanziamentoMutuo;
                if (anniSimulazione >= anniVenditaPrimaCasa) {
                
                
                document.getElementById('table-primo-immobile-acquisto-acquisto').innerHTML = formatter.format(prezzoPrimaCasa);

                document.getElementById('table-primo-immobile-acquisto-acquisto-finale').innerHTML = formatter.format(patrimonioImmobiliarePrimoAcquisto);
                
                finanziamentoMutuoPrimaCasa = finanziamentoMutuo;
                document.getElementById('table-rimborso-primo-mutuo-acquisto-acquisto').innerHTML = formatter.format(finanziamentoMutuoPrimaCasa);

                document.getElementById('table-rimborso-primo-mutuo-acquisto-acquisto-finale').innerHTML = formatter.format(0);

                document.getElementById('table-primo-mutuo-acquisto-acquisto').innerHTML = formatter.format(-finanziamentoMutuoPrimaCasa);

                document.getElementById('table-primo-mutuo-acquisto-acquisto-finale').innerHTML = formatter.format(0);

                document.getElementById('table-secondo-mutuo-acquisto-acquisto').innerHTML = formatter.format(-finanziamentoSecondoMutuo);

                document.getElementById('table-secondo-mutuo-acquisto-acquisto-finale').innerHTML = formatter.format(-montanteRimastoSecondoMutuo);

                document.getElementById('table-rimborso-secondo-mutuo-acquisto-acquisto').innerHTML = formatter.format(capitaleRimborsatoSecondoMutuo);

                document.getElementById('table-rimborso-secondo-mutuo-acquisto-acquisto-finale').innerHTML = formatter.format(0);

                } else {
                patrimonioImmobiliarePrimoAcquisto = prezzo*Math.pow(1+rendimentoImmobili,Math.min(anniSimulazione,durataMutuo));
                
                prezzoPrimaCasa = prezzo;
                document.getElementById('table-primo-immobile-acquisto-acquisto').innerHTML = formatter.format(prezzo);

                document.getElementById('table-primo-immobile-acquisto-acquisto-finale').innerHTML = formatter.format(patrimonioImmobiliarePrimoAcquisto);

                document.getElementById('table-rimborso-primo-mutuo-acquisto-acquisto').innerHTML = formatter.format(capitaleRimborsatoPrimaCasa);

                document.getElementById('table-rimborso-primo-mutuo-acquisto-acquisto-finale').innerHTML = formatter.format(0);

                document.getElementById('table-primo-mutuo-acquisto-acquisto').innerHTML = formatter.format(-finanziamentoMutuoPrimaCasa);

                document.getElementById('table-primo-mutuo-acquisto-acquisto-finale').innerHTML = formatter.format(-montanteRimastoPrimaCasa);
                
                finanziamentoSecondoMutuo = 0;
                document.getElementById('table-secondo-mutuo-acquisto-acquisto').innerHTML = formatter.format(-finanziamentoSecondoMutuo);
                
                montanteRimastoSecondoMutuo = 0;
                document.getElementById('table-secondo-mutuo-acquisto-acquisto-finale').innerHTML = formatter.format(-montanteRimastoSecondoMutuo);
                
                capitaleRimborsatoSecondoMutuo = 0;
                document.getElementById('table-rimborso-secondo-mutuo-acquisto-acquisto').innerHTML = formatter.format(capitaleRimborsatoSecondoMutuo);

                document.getElementById('table-rimborso-secondo-mutuo-acquisto-acquisto-finale').innerHTML = formatter.format(0);

                patrimonioRimanenteVenditaPrimaCasa = 0;

                capitalGainNettoInvestito = 0;

                costiVenditaCasa = 0;

                opportunitàCostiVenditaCasa = 0;

                opportunitàCostiAcquistoSecondaCasa = 0;
                
                }
                
                document.getElementById('table-plusvalenza-casa-acquisto-acquisto').innerHTML = formatter.format(patrimonioRimanenteVenditaPrimaCasa);
                document.getElementById('table-plusvalenza-casa-acquisto-acquisto-finale').innerHTML = formatter.format(capitalGainNettoInvestito);
                document.getElementById('table-costi-vendita-acquisto-acquisto').innerHTML = formatter.format(-costiVenditaCasa);
                document.getElementById('table-costi-vendita-acquisto-acquisto-finale').innerHTML = formatter.format(-opportunitàCostiVenditaCasa);

        //Patrimonio Totale Acquisto Acquisto
            let montanteRimastoPrimaCasaNetto = 0;
            let capitaleRimborsatoPrimaCasaFinale = 0;
            if (anniVenditaPrimaCasa <= anniSimulazione) {
                capitaleRimborsatoPrimaCasaFinale = finanziamentoMutuo;
            } else {
                capitaleRimborsatoPrimaCasaFinale = capitaleRimborsatoPrimaCasa;
                montanteRimastoPrimaCasaNetto = montanteRimastoPrimaCasa;
            };

            let patrimonioTotaleAcquistoAcquisto = patrimonioInvestimentiTotaleAcquistoAcquisto + patrimonioImmobiliarePrimoAcquisto - montanteRimastoPrimaCasaNetto + patrimonioImmobiliareSecondoAcquisto - montanteRimastoSecondoMutuo + capitalGainNettoInvestito - opportunitàCostiAcquistoSecondaCasa - opportunitàCostiVenditaCasa - interessiTotaliPrimaCasa - interessiTotaliSecondoMutuo;
            
            let patrimonioTotaleAcquistoAcquistoFormat = formatter.format(patrimonioTotaleAcquistoAcquisto);
            
            
            let totaleCapitaleAcquistoAcquisto = contributoAnnualeTotale + 0 + prezzoPrimaCasa - finanziamentoMutuoPrimaCasa + capitaleRimborsatoPrimaCasaFinale + prezzoNuovaCasa - finanziamentoSecondoMutuo + capitaleRimborsatoSecondoMutuo - costiTotaliTransazioneSecondoAcquisto - 0 - 0 + patrimonioRimanenteVenditaPrimaCasa - costiVenditaCasa;
            document.getElementById('table-totale-capitale-acquisto-acquisto').innerHTML = formatter.format(totaleCapitaleAcquistoAcquisto);
            
            let rendimentoFinaleAcquistoAcquisto = Math.pow(patrimonioTotaleAcquistoAcquisto/totaleCapitaleAcquistoAcquisto,1/anniSimulazione)-1;
            let rendimentoFinaleAcquistoAcquistoPercento = rendimentoFinaleAcquistoAcquisto * 100;
            document.getElementById('table-rendimento-finale-acquisto-acquisto').innerHTML = rendimentoFinaleAcquistoAcquistoPercento.toFixed(2) + ' %';

            document.getElementById('table-totale-patrimonio-acquisto-acquisto-finale').innerHTML = patrimonioTotaleAcquistoAcquistoFormat;



            


            

    let checkboxValueAffAcq = document.getElementById('checkbox-affitto-acquisto').checked; 
    let checkboxValueAcqAcq = document.getElementById('checkbox-acquisto-acquisto').checked;

    //Creazione Grafico
            if(contatore > 0) {
                $('#myChart').remove(); // this is my <canvas> element
                $('#graph-container').append('<canvas id="myChart" width="0" height="0" class="hidden-chart"><canvas>');
            };
                 
            let patrimonioTotaleAffittoChart = capitaleInizialeAffitto * parametroCrescitaPatrimonio;
            let data = [];
            data.push(patrimonioTotaleAffittoChart);
            data.push(patrimonioTotaleAcquisto);
            let labels = ['Affitto','Acquisto'];
            let cagrData = [];
            cagrData.push(rendimentoInvestimenti);
            cagrData.push(rendimentoFinaleAcquisto);

            if (checkboxValueAffAcq == true) {
                data.push(patrimonioTotaleAffittoAcquisto);
                cagrData.push(rendimentoFinaleAffittoAcquisto);
                labels.push('Affitto + Acquisto');
                
            };
            if (checkboxValueAcqAcq == true) {
                data.push(patrimonioTotaleAcquistoAcquisto);
                cagrData.push(rendimentoFinaleAcquistoAcquisto);
                labels.push('Acquisto + Acquisto');
            };
            var ctx = document.getElementById('myChart');
            var myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Patrimonio',
                        yAxisID: 'Patrimonio',
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
                        borderWidth: 1,
                        order: 1
                    }, {
                        label: 'CAGR',
                        yAxisID: 'CAGR',
                        type: 'line',
                        data: cagrData,
                        borderColor: [
                            'rgba(0, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(10, 120, 61, 0.5)',
                            'rgba(110, 11, 11, 0.5)'
                        ],
                        borderWidth: 1,
                        fill: 'false',
                        order: 2
                        
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            id: 'Patrimonio',
                            type: 'linear',
                            position: 'left',
                            ticks: {
                                beginAtZero: true,
                                callback: function(value, index, values) {
                                    return formatter.format(value);
                                }
                            }
                        }, {
                            id: 'CAGR',
                            type: 'linear',
                            position: 'right',
                            ticks: {
                                beginAtZero: true,
                                callback: function(value, index, values) {
                                let valuePercento =  value * 100;
                                return (valuePercento.toFixed(2) + ' %');
                                }
                            },
                            gridLines: {
                                display:false
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
                                if (tooltipItems.datasetIndex === 0) {
                                    return formatter.format(tooltipItems.yLabel);
                                } else {
                                    let item =  tooltipItems.yLabel * 100;
                                    return (item.toFixed(2) + ' %');
                                }
                                
                                
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
    $("#icona-opzioni-avanzate").html('arrow_drop_down');
    $("#row-opzioni-avanzate").hide();
    
    // Nasconde le sezioni non selezionate dall'utente a inizio pagina
    
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