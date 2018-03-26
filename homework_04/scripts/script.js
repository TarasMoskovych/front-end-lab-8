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
let configs = assign({}, defaults, options);
//console.log(configs);


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

Fighter.prototype.getAttack = function () {
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
                _reduceHitpoints();
            }
        } else {
            _reduceHitpoints();
        }

        function _reduceHitpoints() {
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
                if (this.getAttackCounter() < 2) {
                    _fight(true);
                    this.setAttackCounter(this.getAttackCounter() + 1);
                } else {
                    this.setEnrage(false);
                    this.setAttackCounter(0);
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

Fighter.prototype.isAlive = function () {
    return this.getHitpoints() > 0;
};

Fighter.prototype.getName = function () {
    return this._name;
};

Fighter.prototype.getAttributes = function () {
    return `${this.getName()} ->` +
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

Monster.prototype.getAttackCounter = function () {
    return this._attackCounter;
};

Monster.prototype.setAttackCounter = function (value) {
    this._attackCounter = value;
};

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