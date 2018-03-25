// Task 1
function assign() {
    if(arguments[0] !== null && arguments[0] instanceof Object){
        let newObj = Object.create(arguments[0]);
        for(let i = 1; i < arguments.length; i++) {
            if(arguments[i] !== null) {
                for (let key in arguments[i]) {
                    if(Object.prototype.hasOwnProperty.call(arguments[i], key)) {
                        newObj[key] = arguments[i][key];
                    }
                }
            }
        }
        return newObj;
    } else {
        console.log('Incorrect arguments input!');
    }
}

let defaults = {width: 100, height: 100};
let options = {width: 150};
let configs = assign({}, defaults, options); // -> {width: 150, height: 100}
console.log(configs);


// Task 2
function Fighter({name, attack, hitpoints}) {
    this._name = name;
    this._attack = attack;
    this._hitpoints = hitpoints;
    this._totalHitpoints = hitpoints;
}

Fighter.prototype.getHitpoints = function () {
    return this._hitpoints;
};

Fighter.prototype.setHitpoints = function (hitpoints) {
    this._hitpoints = hitpoints;
};

Fighter.prototype.getTotalHitpoints = function () {
    return this._totalHitpoints;
};

Fighter.prototype.setTotalHitpoints = function (totalHitpoints) {
    this._totalHitpoints = totalHitpoints;
};

Fighter.prototype.getAttack = function (totalHitpoints) {
    return this._attack;
};

Fighter.prototype.setAttack = function (attack) {
    this._attack = attack;
};

Fighter.prototype.fight = function (figter) {
    let self = this;
    function _fight(flag) {
        let attack;
        if(flag){
            attack = self.getAttack() * 2;
        } else {
            attack = self.getAttack();
        }
        if(figter instanceof Champion){
            if(figter.getIsBlocked()){
                figter.setIsBlocked(false);
            } else {
                figter.setHitpoints(figter.getHitpoints() - attack);
                if(figter.getHitpoints() < 0){
                    figter.setHitpoints(0);
                }
            }
        } else {
            figter.setHitpoints(figter.getHitpoints() - attack);
            if(figter.getHitpoints() < 0){
                figter.setHitpoints(0);
            }
        }
    }

    if(figter === this){
        console.log(`Cannot accept itself!`);
    } else if(figter.getHitpoints() === 0) {
        console.log(`You cannot fight with dead figther!`);
    } else {
        if(this instanceof Champion){
            _fight(false);
            if(figter.getHitpoints() <= 0){
                this.setAttack(this.getAttack() + 1);
            }
        } else if(this instanceof Monster) {
            if(this.getEnrage()) {
                if (this._attackCounter < 2) {
                    _fight(true);
                    this._attackCounter++;
                } else {
                    this.setEnrage(false);
                    this._attackCounter = 0;
                    _fight(false);
                }
            } else {
                _fight(false);
            }
            if(figter.getHitpoints() <= 0){
                this.setHitpoints(Math.floor(this.getHitpoints() + figter.getTotalHitpoints() * 0.25));
                this.setTotalHitpoints(Math.floor(this.getTotalHitpoints() + figter.getTotalHitpoints() * 0.1));
            }
        } else {
            _fight(false);
        }
    }
};

Fighter.prototype.isAlive = function (figter) {
    return this.getHitpoints() > 0;
};

Fighter.prototype.getName = function () {
    return this._name;
};

Fighter.prototype.getAttributes = function () {
    return `${this.getName()} -> ` +
        `\n\tAttack: ${this.getAttack()}, ` +
        `\n\tHitpoints: ${this.getHitpoints()}, ` +
        `\n\tTotal hitpoints: ${this.getTotalHitpoints()}`;
};

function Champion () {
    Fighter.apply(this, arguments);
    this._blocked = false;
}

Champion.prototype = Object.create(Fighter.prototype);
Champion.prototype.constructor = Champion;

Champion.prototype.heal = function () {
    this.setHitpoints(this.getHitpoints() + 5);
    if(this.getHitpoints() > this.getTotalHitpoints()){
        this.setHitpoints(this.getTotalHitpoints());
    }
};

Champion.prototype.defence = function () {
    this.setIsBlocked(true);
    this.setTotalHitpoints(this.getTotalHitpoints() + 1);
};

Champion.prototype.setIsBlocked = function (flag) {
    this._blocked = flag;
};

Champion.prototype.getIsBlocked = function () {
    return this._blocked;
};

function Monster () {
    Fighter.apply(this, arguments);
    this._enrage = false;
    this._attackCounter = 0;
}

Monster.prototype = Object.create(Fighter.prototype);
Monster.prototype.constructor = Monster;

Monster.prototype.enrage = function () {
    this._enrage = true;
};

Monster.prototype.getEnrage = function () {
    return this._enrage;
};

Monster.prototype.setEnrage = function (flag) {
    this._enrage = flag;
};

Monster.prototype.fury = function () {
    if(this.getHitpoints() - 5 >= 0 && this.getTotalHitpoints() - 5 >= 0){
        this.setTotalHitpoints(this.getTotalHitpoints() - 5);
        this.setHitpoints(this.getHitpoints() - 5);
        this.setAttack(this.getAttack() + 2);
    }
};

let hunter = new Champion({name: 'Rexxar', attack: 10, hitpoints: 60});
let beast = new Monster({name: 'King Krush', attack: 8, hitpoints: 80});

console.log(`1.hunter.fight(beast)\nhunter attack: ${hunter.getAttack()}\nbeast hitpoints: ${beast.getHitpoints()}`);
hunter.fight(beast);
console.log(`beast hitpoints after fight: ${beast.getHitpoints()}`); // -> 70
console.log(`--------------------------`);

console.log(`2.hunter.fight(beast) \nhunter attack: ${hunter.getAttack()}\nbeast hitpoints: ${beast.getHitpoints()}`);
hunter.fight(beast);
console.log(`beast hitpoints after fight: ${beast.getHitpoints()}`); // -> 60
console.log(`--------------------------`);

console.log(`3.beast.fight(hunter)\nbeast attack: ${beast.getAttack()}\nhunter hitpoints: ${hunter.getHitpoints()}`);
beast.enrage(); //enrage === true
beast.fight(hunter); //first attack: double damage
console.log(`enrage = true, hunter hitpoints after fight: ${hunter.getHitpoints()}`); // -> 44
console.log(`--------------------------`);

console.log(`4.beast.fight(hunter)\nbeast attack: ${beast.getAttack()}\nhunter hitpoints: ${hunter.getHitpoints()}`);
beast.fight(hunter); //second attack: double damage
console.log(`enrage = true, hunter hitpoints after fight: ${hunter.getHitpoints()}`);  // -> 28
console.log(`--------------------------`);

console.log(`5.beast.fight(hunter)\nbeast attack: ${beast.getAttack()}\nhunter hitpoints: ${hunter.getHitpoints()}`);
beast.fight(hunter); //enrage === false
console.log(`hunter hitpoints after fight: ${hunter.getHitpoints()}`); // -> 20
console.log(`--------------------------`);

console.log(`6.beast.fight(hunter)\nbeast attack: ${beast.getAttack()}\nhunter hitpoints: ${hunter.getHitpoints()}`);
hunter.defence(); //will block next attack
beast.fight(hunter); //hunter blocked beast attack
console.log(`hunter blocked beast attack, hunter hitpoints after fight: ${hunter.getHitpoints()}`); // -> 20
console.log(`--------------------------`);

console.log(`7.hunter.heal()`);
hunter.heal();
console.log(`hunter hitpoints: ${hunter.getHitpoints()}`); // -> 25
console.log(`--------------------------`);

console.log(`8.beast.fury() beast hitpoints: ${beast.getHitpoints()}, beast attack: ${beast.getAttack()}`);
beast.fury();
console.log(`after fury: beast hitpoints: ${beast.getHitpoints()}, beast attack: ${beast.getAttack()}`);
console.log(`--------------------------`);

let hunter2 = new Champion({name: 'Hunter', attack: 20, hitpoints: 60});
let beast2 = new Monster({name: 'Monster', attack: 8, hitpoints: 10});

console.log(`9.hunter2.fight(beast2): hunter attack: ${hunter2.getAttack()}, beast hitpoints: ${beast2.getHitpoints()}`);
hunter2.fight(beast2);
console.log(`hunter attack: ${hunter2.getAttack()}`);
console.log(`beast is alive? ${beast2.isAlive()}`);
console.log(`beast hitpoints: ${beast2.getHitpoints()}`);
console.log(`--------------------------`);

console.log(`10.fight with dead fighter:`);
hunter2.fight(beast2);
console.log(`--------------------------`);

let hunter3 = new Champion({name: 'Hunter', attack: 8, hitpoints: 60});
let beast3 = new Monster({name: 'Monster', attack: 80, hitpoints: 80});

console.log(`11.beast3.fight(hunter3): beast attack: ${beast3.getAttack()}, hunter hitpoints: ${hunter3.getHitpoints()}`);
beast3.fight(hunter3);
console.log(`hunter is alive? ${hunter3.isAlive()}`);
console.log(`hunter attack: ${hunter3.getAttack()}`);
console.log(`hunter total hitpoints: ${hunter3.getTotalHitpoints()}`);
console.log(`hunter hitpoints: ${hunter3.getHitpoints()}`);
console.log(`beast attack: ${beast3.getAttack()}`);
console.log(`beast hitpoints: ${beast3.getHitpoints()}`);
console.log(`beast total hitpoints: ${beast3.getTotalHitpoints()}`);