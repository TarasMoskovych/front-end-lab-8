let monsters = [
    beast = new Monster({name: 'King Krush', attack: 8, hitpoints: 80}),
    wolfMan = new Monster({name: 'Wolf Man', attack: 12, hitpoints: 100}),
    hulk = new Monster({name: 'Hulk', attack: 18, hitpoints: 130}),
    creeper = new Monster({name: 'Creeper', attack: 14, hitpoints: 110}),
    kingKong = new Monster({name: 'King Kong', attack: 20, hitpoints: 140})
];

let champions = [
    hunter = new Champion({name: 'Rexxar', attack: 10, hitpoints: 60}),
    thor = new Champion({name: 'Thor', attack: 22, hitpoints: 90}),
    ironMan = new Champion({name: 'Iron Man', attack: 16, hitpoints: 80}),
    batman = new Champion({name: 'Batman', attack: 14, hitpoints: 70}),
    captainAmerica = new Champion({name: 'Captain America', attack: 20, hitpoints: 85})
];

fight(champions[chooseRandomCharacter(champions)], monsters[chooseRandomCharacter(monsters)]);

function fight(fighter1, fighter2) {
    if(fighter1 === fighter2){
        console.log("Cannot fight with itself!");
        return;
    }
    let isChampion = false;
    let isMonster = false;
    let monster, champion;
    let power;
    let powerArr = ['heal', 'defence', 'enrage', 'fury'];
    let round = 1;

    function instanceOf(fighter, myClass) {
        return fighter instanceof myClass;
    }

    function returnRandom() {
        return Math.random() > 0.5;
    }

    function printAttributes() {
        console.log(fighter1.getAttributes());
        console.log(fighter2.getAttributes());
        console.log(`--------------------------`);
    }

    if(instanceOf(fighter1, Champion)){
        isChampion = true;
        champion = fighter1;
    }

    if(instanceOf(fighter2, Champion)){
        isChampion = true;
        champion = fighter2;
    }

    if(instanceOf(fighter1, Monster)){
        isMonster = true;
        monster = fighter1;
    }

    if(instanceOf(fighter2, Monster)){
        isMonster = true;
        monster = fighter2;
    }

    console.log(`> Start Fighting: \n${fighter1.constructor.name}: ${fighter1.getName()} ` +
                `vs ${fighter2.constructor.name}: ${fighter2.getName()}`);
    printAttributes();

    if(fighter1.getAttack() > fighter2.getAttack()) {
        fighting(fighter1, fighter2);
    } else {
        fighting(fighter2, fighter1);
    }

    function fighting(attacker, defender) {
        for(let i = 0; i < powerArr.length; i++){
            if(returnRandom()){
                power = powerArr[i];
                break;
            }
        }
        if(attacker.isAlive() && defender.isAlive()){
            console.log(`Round ${round}:`);
            if(power === 'heal' && isChampion){
                champion.heal();
                console.log(`${champion.getName()} applied heal!`);
            }
            if(power === 'defence' && isChampion){
                champion.defence();
                console.log(`${champion.getName()} applied defence!`);
            }
            if(power === 'enrage' && isMonster) {
                monster.enrage();
                console.log(`${monster.getName()} applied enrage!`);
            }
            if(power === 'fury' && isMonster){
                monster.fury();
                console.log(`${monster.getName()} applied fury!`);
            }
            attacker.fight(defender);
            console.log(`${attacker.getName()} attacked ${defender.getName()}.`);
            printAttributes();
            round++;
            fighting(defender, attacker);
        } else if(!attacker.isAlive()){
            console.log(`${defender.getName()} won, \n${attacker.getName()} lost.`);
        } else {
            console.log(`${attacker.getName()} won, \n${defender.getName()} lost.`);
        }
    }
}

function chooseRandomCharacter(arr) {
    return Math.floor(Math.random() * arr.length);
}