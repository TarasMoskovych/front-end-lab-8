var eur = parseFloat(prompt("Input amount of EURO:"));
var usd = parseFloat(prompt("Input amount of USD:"));


if(isNaN(eur) || isNaN(usd) || eur <= 0 || usd <= 0){
    console.log("Incorrect data");  
} else{
    var eur_uah_rate = 33.4602; // 08.02.18
    var usd_uah_rate = 27.1196; // 08.02.18
        
    var eur_uah_result = checkFloat(eur * eur_uah_rate);
    var usd_uah_result = checkFloat(usd * usd_uah_rate);
    var eur_usd_result = checkFloat(eur_uah_rate / usd_uah_rate);
        
    var str_eur = (eur > 1) ? " euros are" : " euro is";
    var str_usd = (usd > 1) ? " dollars are" : " dollar is";
    
    console.log(eur +  str_eur + " equal " + eur_uah_result + " UAH, " + usd +  str_usd + " equal " + usd_uah_result + " UAH, one euro is equal " + eur_usd_result + " dollars.");
}


function checkFloat(n){
    if(n % 1 != 0) return n.toFixed(2);
    else return n;
}