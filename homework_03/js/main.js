function Company(name, owner, maxCount) {
    let _name = name;
    let _owner = owner;
    let _maxCount = maxCount;

    let _employees = 0;
    let _maxCompanySize = 5;

    function checkFreePlace() {
        return _employees.length <= _maxCompanySize;
    }
    
    this.addNewEmployee = function (employee) {
        if(checkFreePlace()){
            _employees.push(employee);
        } else {
            let min = _employees[0].getSalary();
            let index = 0;
            for (let i = 0; i < _employees.length; i++){
                if (min < _employees[i].getSalary()){
                    index = i;
                    min = _employees[i].getSalary();
                }
            }
            this.removeEmployee(index);
            _employees.push(employee);
        }
        
    };

    this.removeEmployee = function (id) {
        _employees.splice(_employees.indexOf(id), 1);
    }
}

function Employee(name, age, salary, primarySkill) {
    let _name = name;
    let _primarySkill = primarySkill;
    let _age = age;
    let _salary = salary;

    function checkSalary(amount) {
        return amount > _salary;
    }

    this.getSalary = function () {
        console.log(_salary);
        return _salary;
    };

    this.setSalary = function (amount) {
        if(checkSalary(amount)){
            _salary = amount;
        }
    };
}

// let artem = new Employee("Artem", 15, 1000, "UX");
let artem = new Employee({name: "Artem", age: 15, salary: 1000, primarySkill: "UX"});
let vova = new Employee({name: "Vova", age: 16, salary: 2000, primarySkill: "BE"});
let vasyl = new Employee({name: "Vasyl", age: 25, salary: 1000, primarySkill: "FE"});
let ivan = new Employee({name: "Ivan", age: 35, salary: 5000, primarySkill: "FE"});
let orest = new Employee({name: "Orest", age: 29, salary: 300, primarySkill: "AT"});
let anton = new Employee({name: "Anton", age: 19, salary: 500, primarySkill: "Manager"});

artem.getSalary();

// let epam = new Company({name: "Epam", owner: "Arkadii", maxCompanySize: 5});
// epam.addNewEmployee(artem);
// epam.addNewEmployee(vova);
// epam.addNewEmployee(vasyl);
// epam.addNewEmployee(ivan);
// epam.addNewEmployee(orest);
// epam.addNewEmployee(anton);

