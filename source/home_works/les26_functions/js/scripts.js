( function () {
    'use strict';

    // Написать функцию, которая принимает 2 числа и возвращает -1, если первое меньше, чем второе; 1 – если первое больше, чем второе; и 0 – если числа равны.

    comparingFn();

    // Написать функцию, которая вычисляет факториал переданного ей числа.

    factorialFn();

    // Написать функцию, которая принимает три отдельные цифры и превращает их в одно число. Например: цифры 1, 4, 9 превратятся в число 149.

    joinFn();

    // Написать функцию, которая принимает длину и ширину прямоугольника и вычисляет его площадь. Если в функцию передали 1 параметр, то она вычисляет площадь квадрата.

    alert ( countArea(2) );

    // Написать функцию, которая проверяет, является ли переданное ей число совершенным. Совершенное число – это число, равное сумме всех своих собственных делителей.

    alert( isPerfect(6) );

    // Написать функцию, которая принимает минимальное и максимальное значения для диапазона, и выводит только те числа из диапазона, которые являются совершенными. Используйте написанную ранее функцию, чтобы узнавать, совершенное число или нет. 

    alert( getPerfectNums(5, 29) );

    // Написать функцию, которая принимает время (часы, минуты, секунды) и выводит его на экран в формате «чч:мм:сс».Если при вызове функции минуты и/или секунды не были переданы, то выводить их как 00.

    getTimeFromNumbersFn();


    // Написать функцию, которая принимает часы, минуты и секунды и возвращает это время в секундах.

    translateToSec();


    // Написать функцию, которая принимает количество секунд, переводит их в часы, минуты и секунды и возвращает в виде строки «чч:мм:сс».

    translateToTime();


    // Написать функцию, которая считает разницу между датами. Функция принимает 6 параметров, которые описывают 2 даты, и возвращает результат в виде строки «чч:мм:сс». При выполнении задания используйте функции из предыдущих 2-х заданий: сначала обе даты переведите в секунды, узнайте разницу в секундах, а потом разницу переведите обратно в «чч:мм:сс»

    diffDates();

    //functions

    function diffDates(){
        
        let dates = getDates(),
            dateFrom = new Date(dates[0][2], dates[0][1], dates[0][0]),
            dateTo = new Date(dates[1][2], dates[1][1], dates[1][0]),
            diff = Math.abs(dateFrom - dateTo) / 1000;

        diff = convertToTime(diff);
        diff = prettifyTime(diff);

        alert(diff);
    }

    function getDates(input = null){
        try {
            input = prompt('Enter 2 dates in format: dd.mm.yy - dd.mm.yy');

            if (input == null) return null;
            input = input.split('-');
            if (input.length != 2 || input == '') throw('');
            input = input.map( function (item) {
                item = item.split('.');
                if(item.length != 3) throw('');
                item = item.map(function(n) {
                    n = Number(n);
                    if(n == NaN) throw '';
                    return n;
                } );
                return item;
            } );
        } catch {
            alert('Correct your input!');
            return getDates(input);
        }
        return input;
    }


    function translateToTime(){
        let sec = getSeconds();
        if(sec){
            let time = convertToTime(sec);

            time = prettifyTime(time);

            alert(time);
        }
        
    }

    function convertToTime(s){
        let sec = s % 60;
        let min = ((s - sec) / 60) % 60;
        let h = ((s - sec - min * 60) / 60)/60;

        return [h, min, sec];
    }

    function getSeconds(input = null){
        try {
            input = prompt('Enter seconds');

            if (input == null) return null;

            if( !Number(input) && input != 0 || input == '') throw('');

        } catch {
            alert('Correct Your Input!');
            return getSeconds(input);
        }
        return input;
    }


    function translateToSec(){
        let timeArray = getTime();

        if(timeArray){
            alert(convertToSec(timeArray[0], timeArray[1], timeArray[2])+'sec');
        }
    }

    function convertToSec(h, m = 0, s = 0){
        return h * 60 * 60 + m * 60 +(+s);
    }


    function getTimeFromNumbersFn(){

        let time = getTime();

        if(time){

            time = reduceTime(time)
            time = prettifyTime(time);

            alert(time);
        }
        
    }


    //[hh, mm, ss] => 'hh:mm:ss'
    function prettifyTime(timeArray){
        timeArray[2] = ('0' + timeArray[2]).substr(-2);
        timeArray[1] = ('0' + timeArray[1]).substr(-2);
        timeArray [0] = (timeArray[0] < 9 ? ('0' + timeArray[0]).substr(-2) : timeArray[0]);
        return `"${timeArray[0]}:${timeArray[1]}:${timeArray[2]}"`;
        
    }

    //reduce time to 1 day [hh, mm, ss] => [hh(<24),mm(<60),s(<60)]
    function reduceTime(timeArray){
        let date = new Date(0);

        date.setUTCHours(timeArray[0], timeArray[1] || 0, timeArray[2] || 0);
        timeArray = [date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds()];

        return timeArray;
    }


    function getPerfectNums(a, b = a){
        let perfectNums = [];

        if(a > b){
            let c = a;
            a = b;
            b = c;
        }

        while(a <= b){
            if(isPerfect(a)) perfectNums.push(a); 
            a++;
        }

        return perfectNums;
    }

    function getTime(input = null) {
        try {
            input = prompt('Enter time in format hh mm ss');

            if (input == null) return null;

            input = input.split(' ');

            if (input.length > 3 || input == '') throw('');

            input.forEach( (l) => {

                if( !Number(l) && l != 0 ) throw('');

            } );
        } catch {
            alert('Correct Your Input!');
            return getTime(input);
        }
        return input;
    }


    function isPerfect(a){
        let divisors = getAllDivisors(a);

        if( divisors.reduce((sum, d) => sum + d, 0) == a) return true;

        return false;

        function getAllDivisors(num){
            let div = [1];
            let counter = Math.floor(num / 2);
            while(counter > 1) {
                if( num % counter == 0 ) div.push(counter);
                counter--;
            }
            return div;

        }
    }


    function countArea(a, b = a){
        return a * b;
    }


    function joinFn(input = null){
        try{
            input = prompt('Inpu 3 numbers splited by " ". Ex: 1 2 3');

            if (input == null) return '';

            input = input.split(' ');

            if (input.length != 3) throw('');
            input.forEach( (l) => {

                if( !Number(l) ) throw('');

                } );
        }
        catch{
            alert('Correct Your Input!');
            joinFn(input);
            return;
        }
        return alert(input.join(''));;
    }


    function factorialFn(){
        alert( factorial(5) );

        function factorial(x){
            return x <= 1 ? 1 : x * factorial(x - 1);
        }
    }


    function comparingFn(){
        alert( compare(20, 10) );

        function compare(a, b){
            if(a == b) return 0;
            return a > b ? 1 : -1;
        }
    }

} )();