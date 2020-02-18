( function () {
    'use strict';

    // first task

    automobileTask();


    // second task

    fractionTask();


    // third task

    timeTask()



    // 1. Создать объект, описывающий автомобиль (производитель, модель, год выпуска, средняя скорость), и следующие функции для работы с этим объектом:

    // Функция для вывода на экран информации об автомобиле;

    // Функция для подсчета необходимого времени для преодоления переданного расстояния со средней скоростью. Учтите, что через каждые 4 часа дороги водителю необходимо делать перерыв на 1 час.



    function automobileTask() {
        let myAuto = {
            make: 'Kia',
            model: 'Ceed',
            year: 2008,
            speed: 130,
            displayInfo() {
                alert(`This is my car info:
                1. Make - ${this.make};
                2. Model - ${this.model};
                3. Development year - ${this.year};
                4. Average speed - ${this.speed} km per hour;`);
                return myAuto;
            },
            getTripTime (distance) {
                
                let time = distance / this.speed;
                time += time%4 > 0 || time == 0 ? Math.floor(time / 4) : (time / 4 - 1);
                return time;
            }
        }

        myAuto.displayInfo();
        let time = timeConverter(takeNumInputForFunc(myAuto.getTripTime.bind(myAuto), 'How far will you go (in km)?'));
        if(!time.includes('NaN')) {
            alert(`Your trip will take ${time}!`);
        } else {
            alert("Goodbye!");
        } 
    }


    function timeConverter(duration){
        let answer = "";
        let hr = Math.floor(duration);
        let min = Math.ceil((duration - hr)*60);
        if(min == 0){
            return `${hr} hours`;
        }
        if (min == 60) {
            return `${++hr} hours`;
        }
        return `${hr} hours ${min} minutes`;
    }


    //only for func with 1 input that get's from prompt
    
    function takeNumInputForFunc(yourFunctionName, yourPromptText){
        let arg = prompt(yourPromptText);
        if (checkCancelation(arg)){
            return 'Goodbye!'
        }
        if(checkIsEmpty(arg)) {
            return takeNumInputForFunc(yourFunctionName, 'You need to enter something!\n' + yourPromptText);
        }
        if(checkNumInput(arg)) {
            return yourFunctionName(arg);
        }
        return takeNumInputForFunc(yourFunctionName, 'You have to enter number!\n' + yourPromptText);
    }




    //only for func with 1 input that get's from prompt
    
    function takeStringInputForFunc(yourFunctionName, yourPromptText){
        let arg = prompt(yourPromptText);
        if (checkCancelation(arg)){
            return 'Goodbye!'
        }
        if(checkIsEmpty(arg)) {
            return takeStringInputForFunc(yourFunctionName, 'You need to enter something!\n' + yourPromptText);
        }
        return yourFunctionName(arg);
    }


    function checkNumInput(input) {
        return (Number(input) || input == 0) ? true : false;
    }

    function checkIsEmpty (input) {
        return input == '' ? true : false;
    }

    function checkCancelation(input) {
        return input == null ? true : false;
    }
    






    // 2. Создать объект, хранящий в себе отдельно числитель и знаменатель дроби, и следующие функции для работы с этим объектом: 
   
    // Функция сложения 2-х объектов-дробей;

    // Функция вычитания 2-х объектов-дробей;

    // Функция деления 2-х объектов-дробей;

    // Функция умножения 2-х объектов-дробей;

    // Функция сокращения объекта-дроби.

    function fractionTask(){

        let a = new Fraction (getNum(), getNum());
        let b = new Fraction (getNum(), getNum());
        document.writeln(`A: ${a.numerator}/${a.denominator}, B: ${b.numerator}/${b.denominator}<br>`);
        document.writeln(`Addition: ${Object.assign(new Fraction, a).add(b).numerator}/${Object.assign(new Fraction, a).add(b).denominator}<br>`);
        document.writeln(`Substraction: ${Object.assign(new Fraction, a).sub(b).numerator}/${Object.assign(new Fraction, a).sub(b).denominator}<br>`);
        document.writeln(`Multiplication: ${Object.assign(new Fraction, a).mult(b).numerator}/${Object.assign(new Fraction, a).mult(b).denominator}<br>`);
        document.writeln(`Division: ${Object.assign(new Fraction, a).div(b).numerator}/${Object.assign(new Fraction, a).div(b).denominator}<br>`);
        document.writeln(`Simplify A: ${Object.assign(new Fraction, a).simplify(b).numerator}/${Object.assign(new Fraction, a).simplify(b).denominator}<br>`);

    }

    function getNum(){
        return (Math.floor(Math.random()*99) + 1);
    }

    function Fraction (numerator = 0, denominator = 1) {

        this.numerator = numerator;
        this.denominator = denominator;

        this.add = function(b) {
            if(b instanceof Fraction){
                this.numerator = this.numerator * b.denominator + b.numerator * this.denominator;
                this.denominator = this.denominator * b.denominator;
                return this.simplify();
            }
            throw "Input must be an instance of object Fraction!";
        }

        this.sub = function (b) {
            if(b instanceof Fraction){
                this.numerator = this.numerator * b.denominator - b.numerator * this.denominator;
                this.denominator = this.denominator * b.denominator;
                return this.simplify();
            }
            throw "Input must be an instance of object Fraction!";
        }

        this.mult = function (b) {
            if(b instanceof Fraction){
                this.numerator = this.numerator * b.numerator;
                this.denominator = this.denominator * b.denominator;
                return this.simplify();
            }
            throw "Input must be an instance of object Fraction!";
        }

        this.div = function (b) {
            if(b instanceof Fraction){
                this.numerator = this.numerator * b.denominator;
                this.denominator = this.denominator * b.numerator;
                return this.simplify();
            }
            throw "Input must be an instance of object Fraction!";
        }

        this.simplify = function (){
            // console.log(`From: ${this.numerator}/${this.denominator}`);
            let divisorsOfNumerator = findAllDivisors(this.numerator);
            // console.log(`Numerator: ${this.numerator},it's divisors: ${divisorsOfNumerator}.`);
            let divisorsOfDenominator = findAllDivisors(this.denominator);
            // console.log(`Denominator: ${this.denominator},it's divisors: ${divisorsOfDenominator}.`);
            let simplificators = [];
            for(let num of divisorsOfNumerator){
                for (let i = 0; i < divisorsOfDenominator.length; i++){
                    if(num == divisorsOfDenominator[i]){
                        simplificators.push(num);
                        divisorsOfDenominator.splice(i, 1);
                        break;
                    }
                }
            }
            // console.log(`simplificators: ${simplificators}.`);
            while(simplificators.length > 0) {
                let divisor = simplificators.shift();
                this.numerator = this.numerator / divisor;
                this.denominator = this.denominator / divisor;
            }
            // console.log(`To: ${this.numerator}/${this.denominator}`);
            return this;
        
            function findAllDivisors(n, arr = []){
                if(n == 0 || Math.abs(n) == 1){
                    return arr;
                }
                for (let i = 2; i <= Math.abs(n); i++){
                    if(n % i == 0){
                        arr.push(i);
                        n = n / i;
                        return findAllDivisors(n, arr);
                    }
                }

            }
        }
    }

    


    
    



    

    // 3. Создать объект, описывающий время (часы, минуты, секунды), и следующие функции для работы с этим объектом: 

    // Функция вывода времени на экран;

    // Функция изменения времени на переданное количество секунд;

    // Функция изменения времени на переданное количество минут;

    // Функция изменения времени на переданное количество часов. 

    // Учтите, что в последних 3-х функциях, при изменении одной части времени, может измениться и другая. Например, если ко времени «20:30:45» добавить 30 секунд, то должно получиться «20:31:15», а не «20:30:75».



    function timeTask(){

        let t = new Time();
        t.display().changeSeconds().display().changeMinutes().display().changeHours().display();

        function Time(){
            this.h = +(new Date().toString().split(' ')[4].split(':')[0]);
            this.m = +(new Date().toString().split(' ')[4].split(':')[1]);
            this.s = +(new Date().toString().split(' ')[4].split(':')[2]);

            this.display = function () {
                // alert(`Time of your object ${this.constructor.name} : ${this.h} hours ${this.m} minutes ${this.s} seconds.`);
                document.writeln(`Object "${this.constructor.name}": ${this.h} hours ${this.m} minutes ${this.s} seconds.<br>`);
                return this;
            };

            this.changeHours = function(delta = +takeNumInput('How many hours do you want to add to your Time object?')){
                this.h = (this.h + delta) % 24;
                return this;
            };

            this.changeMinutes = function(delta = +takeNumInput('How many minutes do you want to add to your Time object?')){
                this.m += delta;
                this.changeHours(Math.floor(this.m / 60));
                this.m %= 60;
                return this;
            };

            this.changeSeconds = function(delta = +takeNumInput('How many seconds do you want to add to your Time object?')){
                this.s += delta;
                this.changeMinutes(Math.floor(this.s / 60));
                this.s %= 60;
                return this;
            };
        }

        function takeNumInput(yourPromptText){
            let arg = prompt(yourPromptText);
            if (checkCancelation(arg)){
                return 0;
            }
            if(checkIsEmpty(arg)) {
                return takeNumInput('You need to enter something!\n' + yourPromptText);
            }
            if(checkNumInput(arg)) {
                return Math.round(arg);
            }
            return takeNumInput('You have to enter number!\n' + yourPromptText);
        }
    }

} )();