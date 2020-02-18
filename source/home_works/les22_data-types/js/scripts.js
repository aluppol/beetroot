( function () {
    'use strict';
    
    // Запросить у пользователя его возраст и определить, кем он является: ребенком (0–2), подростком (12–18), взрослым (18_60) или пенсионером (60– ...).

    alert(`Task#1: ${evaluateAge(prompt("How old are you?"))}`);


    // Запросить у пользователя число от 0 до 9 и вывести ему спецсимвол, который расположен на этой клавише (1–!, 2–@, 3–# и т. д).

    alert(`\n\nTask#2: ${getSymbol(prompt("What number of the symbol you want me to return?"))}`);

    // Запросить у пользователя трехзначное число и проверить, есть ли в нем одинаковые цифры.

    alert(`\n\nTask#3: ${checkSameTask(prompt("Give me _ _ _ number to check?"))}`);

    // Запросить у пользователя год и проверить, високосный он или нет. Високосный год либо кратен 400, либо кратен 4 и при этом не кратен 100.

    alert(`\n\nTask#4: ${checkYearTask(prompt("Give me a Year?"))}`);

    // Запросить у пользователя пятиразрядное число и определить, является ли оно палиндромом.

    alert(`\n\nTask#5: ${checkPalindromTask(prompt("Palindrom check: \nEnter your string:"))}`);


    // Написать конвертор валют. Пользователь вводит количество USD, выбирает, в какую валюту хочет перевести EUR, UAN или AZN, и получает в ответ соответствующую сумму.

    alert(`\n\nTask#6: ${currencyExchangeTask()}`);


    // Запросить у пользователя сумму покупки и вывести сумму к оплате со скидкой: от 200 до 300 – скидка будет 3%, от 300 до 500 – 5%, от 500 и выше – 7%.

    alert(`\n\nTask#7: ${getDiscontPrice(prompt("Discont count.\nExample: '10 + 20 + 30 + 25'\nEnter a string with purchase costs:"))}`);

    // Запросить у пользователя длину окружности и периметр квадрата. Определить, может ли такая окружность поместиться в указанный квадрат.

    alert(`\n\nTask#8: ${checkCanBePlaced()}`);


    // Задать пользователю 3 вопроса, в каждом вопросе по 3 варианта ответа. За каждый правильный ответ начисляется 2 балла. После вопросов выведите пользователю количество набранных баллов.

    alert(`\n\nTask#9: ${checkYourMind()}`);


    // Запросить дату (день, месяц, год) и вывести следующую за ней дату. Учтите возможность перехода на следующий месяц, год, а также високосный год.

    alert(`\n\nTask#10: ${getNextDate(prompt("Give me a day (Example: '21.12.1867') and I will tell you what was the next one!"))}`);
    
} )();

function getNextDate (s) { 
    if ( Boolean(s)) {
       let day = s.split('.');
       if (day.length == 3 && Number(day[0]) && Number(day[1]) && Number(day[2])) {
        let nextDay = new Date (Number(day[2]), Number(day[1])-1, Number(day[0])+1);

        if(day[2] < 100){
            nextDay.setFullYear(nextDay.getFullYear()-1900);
        }
        return (`The next day after ${s} is ${nextDay.getDate()+'.'+Number(nextDay.getMonth()+1)+'.'+nextDay.getFullYear()}`);
       }
       return (getNextDate(prompt("Check your input!\nIt should be like in example!\nGive me a day (Example: '21.12.1867') and I will tell you what was the next one!")));
    } else if ( s == '') {
        return (getNextDate(prompt("Enter something!\nGive me a day (Example: '21.12.1867') and I will tell you what was the next one!")));
    } else {
        return ("Goodbye!");
    }
}


function checkYourMind () {
    let rank = 0;
    const Q1 = "One animal has fingerprints that are almost the same as a human's.\nWhich animal is it?\n1 - Koalas\n2 - Aye-ayes (a lemur type beast)\n3 - Gorillas";
    const rightAnswer1 = 1;
    const Q2 = "Do you know the name of the page that immediately follows the cover?\n1 - The nachsatz\n2 - The fly page\n3 - The doubler";
    const rightAnswer2 = 2;
    const Q3 = "Which of these 3 is responsible for the largest amount of Earth's oxygen?\n1 - Trees\n2 - Algae\n3 - Peat bogs";
    const rightAnswer3 = 3;
    let pointQ1 = evalQuestion(prompt(Q1), rightAnswer1, Q1);

    if (pointQ1 == undefined) {
        return ("Goodbye!");
    }

    rank += pointQ1;

    let pointQ2 = evalQuestion(prompt(Q2), rightAnswer2, Q2);

    if (pointQ2 == undefined) {
        return ("Goodbye!");
    }

    rank += pointQ2;

    let pointQ3 = evalQuestion(prompt(Q3), rightAnswer3, Q3);

    if (pointQ3 == undefined) {
        return ("Goodbye!");
    }

    rank += pointQ3;

    return (`You got ${pointQ1}, ${pointQ2}, ${pointQ3} points. Totally: ${rank}`);

    function evalQuestion (userAnswer, rightAnswer, question) {
        if ( Boolean(userAnswer)) {
            if(Number(userAnswer) && (Number(userAnswer) == 1 || Number(userAnswer)== 2 || Number(userAnswer) == 3)) {
                if (userAnswer == rightAnswer) {
                    return 2;
                }
                return 0;
            }
            return (evalQuestion(prompt(`${question}\n Try to enter the number of your answer!\n '1' / '2' / '3'`), rightAnswer, question));
        } else if ( userAnswer == '') {
            return (evalQuestion(prompt(`${question} \n You have to enter something!`), rightAnswer, question));
        } else {
            return undefined;
        }
    }
}


function checkCanBePlaced () {
    let length = getCircleLength (prompt("Can your circle be placed incide of your square? \nEnter your circle length:"));

    if (length == undefined) {
        return ("Goodbye!");
    }

    let perimeter = getSquarePerimeter(prompt("Can your circle be placed incide of your square? \nEnter your square perimeter:"))

    if (perimeter == undefined){
        return ("Goodbye!");
    }

    return (length / Math.PI <= perimeter / 4 ?  `Your Circle "${length}"`+ " can " + `be placed in your square "${perimeter}"!` :  `Your Circle "${length}"`+ " can't " + `be placed in your square "${perimeter}"!`);

    function getCircleLength (length) {
        if ( Boolean(length)) {
            if(Number(length) && Number(length) > 0) {
                return length;
            }
            return (getCircleLength(prompt("Can your circle be placed incide of your square? \nI need a number > 0! \nEnter your circle length:")));;
        } else if ( length == '') {
            return (getCircleLength(prompt("Can your circle be placed incide of your square? \nYou forgot enter circle length! \nEnter your circle length:")));
        } else {
            return undefined;
        }
    }

    function getSquarePerimeter (p) {
        if ( Boolean(p)) {
            if(Number(p) && Number(p) > 0) {
                return p;
            }
            return (getSquarePerimeter(prompt("Can your circle be placed incide of your square? \nI need a number > 0! \nEnter your square perimeter:")));;
        } else if ( p == '') {
            return (getSquarePerimeter(prompt("Can your circle be placed incide of your square? \nYou forgot enter square perimeter! \nEnter your square perimeter:")));
        } else {
            return undefined;
        }
    }
}


function evaluateAge (age) {
    if ( Boolean(age)) {
        age = +age;
        switch (true) {
            case (0 <= age && age < 12): return(`You are ${age} and you are Baby!`);
            case (12 <= age && age < 18): return(`You are ${age} and you are Tenager!`);
            case (18 <= age && age < 60): return(`You are ${age} and you are Adult!`);
            case (60 <= age && age < 121): return(`You are ${age} and you are Grand!`);
            default: return("Next time write your age!");
        }
    } else if ( age == '') {
        return (evaluateAge(prompt("You forgot enter your age! Try again! \n \n How old are you?")));
    } else {
        return ("Goodbye!");
    }
    
}


function getSymbol (s) {

    if ( Boolean(s)) {
        switch (s) {
            case '0': return `There is ")" under the number ${s}.`;
            case '1': return `There is "!" under the number ${s}.`;
            case '2': return `There is "@" under the number ${s}.`;
            case '3': return `There is "#" under the number ${s}.`;
            case '4': return `There is "$" under the number ${s}.`;
            case '5': return `There is "%" under the number ${s}.`;
            case '6': return `There is "^" under the number ${s}.`;
            case '7': return `There is "&" under the number ${s}.`;
            case '8': return `There is "*" under the number ${s}.`;
            case '9': return `There is "(" under the number ${s}.`;
            default: return "I don't know this!";
        }
    } else if ( s == '') {
        return (getSymbol(prompt("You forgot enter a number! Try again! \n \n What number of the symbol you want me to return?")));
    } else {
        return ("Goodbye!");
    }
}


function checkSameTask (s) {
    if ( Boolean(s)) {
        if (Number(s) && s.length == 3 ) {
            return (`You entered: "${s}". ${checkSame(s = s.split('')) ? 'There are repeating numbers.' : 'There is no repeating numbers.'}`);
        } else {
            return (`Yor string was "${s}"; \n ${checkSame(s = s.split('')) ? "And it's not what I asked about, but though" + " there are " + "repeating symbols in your string!" : "And it's not what I asked about, but though" + " there is no " + "repeating symbols in your string!"}`);
        }
    } else if ( s == '') {
        return (checkSameTask(prompt("You entered nothing! Try again! \n \n Give me _ _ _ number to check?")));
    } else {
        return ("Goodbye!");
    }

    function checkSame (s) {
        if(s.length == 1){
            return false;
        } else {
            let i = s.shift();
            for (let a of s) 
            {
                if ( i == a ) {
                    return true;
                }
            }
            return checkSame (s);
        }
    }
}


function checkYearTask (year) {
    if ( Boolean(year)) {
        if (Number(year)) {
            return `The ${year} ${(checkYear (year) ? " is Leap Year." : " is not Leap Year.")}`;
        } else {
            return (checkYearTask(prompt("It'n not a year! Try again! \n \n Give me a Year?")));
        }
    } else if ( year == '') {
        return (checkYearTask(prompt("You forgot enter a Year! Try again! \n \n Give me a Year?")));
    } else {
        return ("Goodbye!");
    }

    function checkYear (year) {
        if(year % 400 == 0 || year % 4 == 0 && year % 100 != 0) {
            return true;
        }
        return false;
    }
}


function checkPalindromTask (s) {
    if ( Boolean(s)) {
        return checkPalindrom(s.split('')) ? `Your string "${s}" is palindrom.`: `Your string "${s}" is not palindrom.`;
    } else if ( s == '') {
        return (getSymbol(prompt("Don't play with me! \n Enter your string:")));
    } else {
        return ("Goodbye!");
    }

    function checkPalindrom (array) {
        switch (array.length) {
            case 1: return true;
            case 2: return array[0] == array[1] ? true : false;
            default: return (array.shift() == array.pop()) ? checkPalindrom(array): false;
        }
    }
}


function currencyExchangeTask () {

    let amount = getAmount(prompt("Currency Exchange: \nEnter amount of USD you want to exchange:"));
    let currency = undefined;
    if (amount != undefined) {
    currency = getCurrency(prompt('Select currency by entering "EUR", "UAN", or "AZN"\nEnter currency:'));
    }

    if (amount!= undefined && currency != undefined) {
        let currencyRate = null;
        switch (currency) {
            case "EUR": currencyRate = 0.8; break;
            case "AZN": currencyRate = 1.7; break;
            case "UAN": currencyRate = 25; break;
        }
        return (`For your ${amount}USD you will have ${Math.round(100*amount*currencyRate)/100}${currency}.`);
    }
    return ("Goodbye!");



    function getAmount(amount) {

        if ( Boolean(amount)) {
            if (Number(amount)) {
                return amount;
            } else {
                return (getAmount(prompt("I need a number! \nHow much USD?")));
            }
            
        } else if ( amount == '') {
            return (getAmount(prompt("Do u want exchange your money still? \nHow much USD?")));
        } 
        return undefined;
    }


    function getCurrency(currency) {

        if ( Boolean(currency)) {
            if (currency == "EUR" || currency == "AZN" || currency == "UAN" || currency == "eur" || currency == "azn" || currency == "uan") {

                switch (currency) {
                    case "EUR": return currency;
                    case "eur": return "EUR";
                    case "AZN": return currency;
                    case "azn": return "AZN";
                    case "UAN": return currency;
                    case "uan": return "UAN";
                }
            } else {
                return (getCurrency(prompt('I need a currency from list: "EUR", "UAN", or "AZN"! \nEnter currency:')));
            }
            
        } else if ( currency == '') {
            return (getCurrency(prompt('Do u want exchange your money still? \nEnter currency from list: "EUR", "UAN", or "AZN"!')));
        } 
        return undefined;
    }
}


function getDiscontPrice(string){
    if ( Boolean(string)) {
        let sum = getSum(string.split('+'));
        let discount = getDiscount(sum);
        return `For your purchases: "${string}" you have discount ${discount}%. \nSo you should pay ${Math.round(sum*(100 - discount))/100}$, instead of ${Math.round(sum*100)/100}$.`;
    } else if ( string == '') {
        return (getDiscontPrice(prompt("Discont count.\nExample: '10 + 20 + 30 + 25'\nEnter a string with purchase costs:\nI'm still waiting for a string!")));
    } else {
        return ("Goodbye!");
    }


    function getDiscount(sum) {
        switch (true) {
            case (sum < 200): return 0;
            case (200 <= sum && sum < 300): return 3;
            case (300 <= sum && sum < 500): return 5;
            case (500 <= sum): return 7;
        }
    }

    function getSum(costs) {
        let sum = 0;
        for (let cost of costs) {
            if (!Number(cost)) {
                return getDiscontPrice(prompt("Discont count.\nExample: '10 + 20 + 30 + 25'\nEnter a string with purchase costs:\nThere should be only numbers in prices!"));
            }
            sum += Number(cost);
        }
        return sum;
    }
}

