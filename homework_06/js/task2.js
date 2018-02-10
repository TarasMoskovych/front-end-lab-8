var eur = Number(prompt("Input amount of EURO:"));
var usd = Number(prompt("Input amount of USD:"));

if(isNaN(eur) || isNaN(usd) || eur <= 0 || usd <= 0){
    console.log("Incorrect data");  
} else{
    var eur_uah_rate = 33.2324; // 10.02.18
    var usd_uah_rate = 27.1240; // 10.02.18
        
    var eur_uah_result = parseFloat((eur * eur_uah_rate).toFixed(2));
    var usd_uah_result = parseFloat((usd * usd_uah_rate).toFixed(2));
    var eur_usd_result = parseFloat((eur_uah_rate / usd_uah_rate).toFixed(2));
        
    var str_eur = (eur > 1) ? " euros are" : " euro is";
    var str_usd = (usd > 1) ? " dollars are" : " dollar is";
    
    console.log(eur +  str_eur + " equal " + eur_uah_result + " UAH, " + usd +  str_usd + " equal " + usd_uah_result + " UAH, one euro is equal " + eur_usd_result + " dollars.");
}