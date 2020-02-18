( function () {
    'use strict';

    // Подсчитать сумму всех чисел в заданном пользователем диапазоне.
    countSum();

    // Запросить 2 числа и найти только наибольший общий делитель.
    topDel();

    // Запросить у пользователя число и вывести все делители этого числа.
    allDel();

    // Определить количество цифр в введенном числе.
    amountOfNum();

    // Запросить у пользователя 10 чисел и подсчитать, сколько он ввел положительных, отрицательных и нулей. При этом также посчитать, сколько четных и нечетных. Вывести статистику на экран. Учтите, что достаточно одной переменной (не 10) для ввода чисел пользователем.
    countOut();
   
    // Зациклить калькулятор. Запросить у пользователя 2 числа и знак, решить пример, вывести результат и спросить, хочет ли он решить еще один пример. И так до тех пор, пока пользователь не откажется.
    calculator();

    // Запросить у пользователя число и на сколько цифр его сдвинуть. Сдвинуть цифры числа и вывести результат (если число 123456 сдвинуть на 2 цифры, то получится 345612).
    rotateString();

    // Зациклить вывод дней недели таким образом: «День недели. Хотите увидеть следующий день?» и так до тех пор, пока пользователь нажимает OK.
    nextDay();

    // Вывести таблицу умножения для всех чисел от 2 до 9. Каждое число необходимо умножить на числа от 1 до 10.
    multyTable();


    // Игра «Угадай число». Предложить пользователю загадать число от 0 до 100 и отгадать его следующим способом: каждую итерацию цикла делите диапазон чисел пополам, записываете результат в N и спрашиваете у пользователя «Ваше число > N, < N или == N?». В зависимости от того, что указал пользователь, уменьшаете диапазон. Начальный диапазон от 0 до 100, поделили пополам и получили 50. Если пользователь указал, что его число > 50, то изменили диапазон на от 51 до 100. И так до тех пор, пока пользователь не выберет == N.
    playNumber();



    //funcs
    // forTask#10
    function playNumber(){
        alert("Task#10. Keep in mind number from 1 to 100, I'll guess it!");
        let from = 1;
        let to = 100;
        let num = 50;
        let c = 0;
        let flag = true;
        do{
            let s = prompt(`Is your number  X> ${num},X = ${num} or X < ${num}.\n Write ">" / "=" / "<"`);
            if(s == null) break;
            switch(s){
                case ">": 
                    c++;
                    from = num;
                    num = Math.round((from + to)/2);
                    break;
                case "<": 
                    c++;
                    to = num;
                    num = Math.round((from + to)/2);
                    break;
                case "=": 
                    c++;
                    flag = false;
                    alert('You win!')
                    break;
                default: alert('Wrong input!');
            }
            
        }while(flag);
        flag ? document.writeln(`Task#10. Goodbye!`) : document.writeln(`Task#10. There was number ${num}. It took ${c} guesses to get it!`);
    }

    //forTask#9
    function multyTable(){
        document.writeln('Task#9. Multiplication table:');
        let a = [];
        for(let i = 2; i < 10; i++){
            document.writeln('<br>');
            for(let j = 1; j < 10; j++) {
                document.write(`\t${i} * ${j} = ${i*j}<br>`);
                a[i-2] = a[i-2] + `${i} * ${j} = ${i*j}\n`
            }
        }
        alert('Task#9. You will see the multiplixation table soon!');
    }

    //forTask#8 
    function nextDay(){
        let theDay = Number(new Date().getDay()) + 1;
        let answer;
        do{
            theDay = theDay > 7 ? 1 : theDay;
            switch (theDay){
                case 1:
                    answer = 'Sunday';
                    break;

                case 2:
                    answer = 'Monday';
                    break;

                case 3:
                    answer = 'Tuesday';
                    break;

                case 4:
                    answer = 'Wednesday';
                    break;
                case 5:
                    answer = 'Thursday';
                    break;

                case 6:
                    answer = 'Friday';
                    break;
                case 7:
                    answer = 'Saturday';
                    break;
            }
            theDay++;
        }while(confirm(`The day is: ${answer}.\nDo u want to see the next one?`));
        document.writeln(`Task#8. The last day was: ${answer}.<br>`)
    }

    //forTask#7
    function rotateString(){
        let str = getStringToRotate('Give me a string to rotate and number(how far rotate) split them by "|||"\nExample: jklshdf78sdf6789 iaosdifuy90789 0293 ||| 43');
        if(str != null){
            let res = [];
            let n = str[1] % str[0].length;
            let string = str[0].join('');
            let cut = string.slice(-n);
            string = string.slice(0, -n);
            string = cut + string;
            alert(`Task#7. Result of the rotation string "${str[0].join('')}" on ${str[1]} symbols:\nResult string:"${string}"`);
            document.writeln(`Task#7. Result of the rotation string "${str[0].join('')}" on ${str[1]} symbols:<br>Result string:"${string}"`)

        } else {
            document.writeln('Task#7. You did nothing!<br>')
        }
    }
    function getStringToRotate(text, oldString = ''){
        let str = prompt(text, oldString);
        if (checkCancelation(str)){
            return null;
        }
        if(checkIsEmpty(str)) {
            return getStringToRotate('You need to enter something!\n' + text, str);
        }
        try{
            let s = str.split('|||');
            if(s.length != 2){
                throw '';
            }
            if(Number(s[1]) || s[1] == '0')
            {
                try{
                    s[0] = s[0].split('');
                    if(s[0].length >= 2) {
                        return s;
                    }
                    throw '';
                }
                catch {
                    return getStringToRotate('Enter string before "|||"\n' + text, str);
                }

            }
            return getStringToRotate('Use number after "|||"!\n' + text, str);
        }
        catch {
            return getStringToRotate('Use "|||" to split string and number to rotate!\n' + text, str);
        }
        
    }

    
    //forTask#6
    function calculator(){
        let result;
        let input;
        do{
            input = null;
            result = null
            input = getCalcInput('Enter a string you need to solve, use just numbers and symbols +,-,/,*\nExample: 2 + 2 * 2\nTry yourself:');
            if(input != null) {
                result = getIterateSum(splitByPlus(input));
                result = isNaN(result) ? "NaN.\nDon't divide by zero" : result;
            }
        }while(input != null && confirm(`The answer of ${input} = ${result}.\nDo u want to continue?`));


        function getIterateMul(array) {
            let result = 1;
            for (let a of array) {
                result *= +a;
            }
            return result;
        }

        function getIterateDiv(array) {
            let result = getIterateMul(splitByMul(array[0]))**2;
            for (let a of array) {
                result /= getIterateMul(splitByMul(a));
            }
            return result;
        }

        function getIterateSub(array) {
            let result = getIterateDiv(splitByDiv(array[0])) * 2;
            for (let a of array) {
                result -= getIterateDiv(splitByDiv(a));
            }
            return result;
        }

        function getIterateSum(array) {
            let result = 0;
            for (let a of array) {
                result += getIterateSub(splitByMinus(a));
            }
            return result;
        }
        

        function splitByPlus(string){
            try {
                string = string.split('+');
                return string;
            }
            catch {
                string = [string];
                return string;
            }
        }
        function splitByMinus(string){
            try {
                string = string.split('-');
                return string;
            }
            catch {
                string = [string];
                return string;
            }
        }
        function splitByMul(string){
            try {
                string = string.split('*');
                return string;
            }
            catch {
                string = [string];
                return string;
            }
        }
        function splitByDiv(string){
            try {
                string = string.split('/');
                return string;
            }
            catch {
                string = [string];
                return string;
            }
        }

        function getCalcInput(text , string = "") {
            let input = prompt(text, string);
            if (checkCancelation(input)){
                return null;
            }
            if(checkIsEmpty(input)) {
                return getCalcInput('You need to enter something!\n' + text, input);
            }
            if(!checkCalcInput(input)){
                return getCalcInput('Check your input!\n' + text, input);
            }
            return input;
        }

        function checkCalcInput(string) {
            string = string.split('');
            for (let s of string) {
                if(!(Number(s) || s == '-' || s == '+' || s == '*' || s == '/' || s == ' ' || s == '0')){
                    return false;
                }
            }
            return true;
        }
    }

    //forTask#5
    function countOut(){
        let numString = getNumString(`Task#5\n Give me a string of numbers divided with space " ". All that not numbers, i'l just ignore!\nYour string:`);
        let arr = numString.split(' ');
        let counted = ' ';
        let odd = 0;
        let even = 0;
        let zero = 0;
        let plus = 0;
        let minus = 0;
        for(let i=0; i < arr.length; i++)
        {
            if(Number(arr[i]) || arr[i] == '0'){
                if (Number(arr[i]) > 0){
                    plus++
                }else if(Number(arr[i]) == 0){
                    zero++;
                } else {
                    minus++;
                }
                if(checkForInteger(arr[i])) {
                    if(checkForOdd(arr[i]) && arr[i] != 0) {
                        odd++
                    } else if( arr[i] != 0) {
                        even++;
                    }
                }
                counted += " " + arr[i];
            }
        }
        alert(`Task#5. So, there are ${odd} odds, ${even} evens, ${zero} zeros, ${minus} negatives and ${plus} positives!`)
        document.writeln(`Task#5. So, in your string ${numString} were counted ${counted}<br>And there are \n${odd} odds, ${even} evens, ${zero} zeros, ${minus} negatives and ${plus} positives!<br>`)
        function checkForInteger(n){
            return n % 1 == 0 ? true : false;
        }

        function checkForOdd (n) {
            return n % 2 != 0 ? true : false;
        }
    }

    function getNumString(yourPromptText){
        let str = prompt(yourPromptText);
        if (checkCancelation(str)){
            let arr =" " + getNum();
            for (let i = 0; i < 9; i++){
                arr += ' ' + getNum();
            }
            return arr;
        }
        if(checkIsEmpty(str)) {
            return " " + getNumInput('You need to enter something!\n' + yourPromptText);
        }
        return str;
        
    }



    //forTask#4
    function amountOfNum(){
        let num = getNumInput('Task#4 \n Get amount of symbols in number _______. Enter number: ');
        let count = String(num).replace('.', '').replace('-', '');
        alert(`Task#4\n In the number ${num} are ${count.length} symbols.`);
        document.writeln(`Task#4\n In the number ${num} are ${count.length} symbols.<br>`);
    }


    // forTask#3

    function  allDel(){
        let n = getNumInput('Task#3 \n Find all divisors of number ___. \nEnter number:')
        let allDiv = findAllDivisorsInGeneral(n);
        alert(`Task #3: All divisors of number ${n}: ` + allDiv );
        document.writeln(`Task #3: All divisors of number ${n}: ${allDiv} <br>`);
        function findAllDivisorsInGeneral(n){
            let arr = [];
            for(let i = 1; i <= Math.abs(n); i++) {
                if(n % i == 0){
                    arr.push(i);
                }
            }
            return arr;
        }
    }



    //forTask#2

    function topDel() {
        let a = getNumInput('Task #2 \n Find the biggest main divisor. \nFrom ___ number. Enter number:');
        let b = getNumInput(`Task #2 \n Find the biggest main divisor. \nFrom numbers ${a} and ___ number. Enter number:`);
        let divisorsOfNumerator = findAllDivisors(a);
        let divisorsOfDenominator = findAllDivisors(b);
        let topDel = 1;
        for(let num of divisorsOfNumerator){
            for (let i = 0; i < divisorsOfDenominator.length; i++){
                if(num == divisorsOfDenominator[i]){
                    topDel = (topDel < num) ? num : topDel;
                    divisorsOfDenominator.splice(i, 1);
                    break;
                }
            }
        }

        alert(`Task #2: Find the biggest main divisor.\nFrom numbers ${a} and ${b}.\nIt's ${topDel}.`);
        document.writeln(`Task #2: Find the biggest main divisor of numbers ${a} and ${b}. It's ${topDel}.<br>`);
    }

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


    // forTask#1

    function countSum(){
        let sum = 0;
        let from = getNumInput('Task #1 \nSum from ___ number. Enter number:');
        let firstNum = from;
        let to = getNumInput(`Task #1 \nSum from ${from} number to ___ number. Enter number:`);
        if(from > to) {
            let t = from;
            from = to;
            to = t;
            firstNum = from;
        }
        while(from <= to) {
            sum += from;
            from++; 
        }
        alert(`Task #1: The summ numbers from ${firstNum} to ${to} = ${sum}.\n`);
        document.writeln(`Task #1: The sum of all numbers from ${firstNum} to ${to} = ${sum}.<br>`);
    }

    //helpers

    function getNum(){
        return (Math.floor(Math.random()*999) + 1);
    }

    function getNumInput(yourPromptText){
        let arg = prompt(yourPromptText);
        if (checkCancelation(arg)){
            return getNum();
        }
        if(checkIsEmpty(arg)) {
            return getNumInput('You need to enter something!\n' + yourPromptText);
        }
        if(checkNumInput(arg)){
            return Math.round(arg);
        } else {
            return getNumInput('You need to enter number!\n' + yourPromptText)
        }
        
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
    



} )();