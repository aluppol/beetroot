(function(){
    'use strict';
    // main


    // task 1 - name
    alert(hi(prompt("Welcome! \n What is your name?", '')));

    //task 2 - birth
    year();

    //task 3 - square
    alert(`Perimeter of your square = ${prompt ('What is the length of square side?')*4}`);

    // task 4 - S of circle
    const PI = Math.PI;
    alert(`S of the circle = ${ Math.round(100*PI * prompt('What is the r of the circle?')**2) / 100 }`);
    
    // task 5 - trip
    trip ();

    //task 6 - converter
    converter ();

    // task 7 - flash / 820mb
    flash();

    //task 8 - choco
    alert(`${choco(prompt("How much money do you have?"), prompt("How much one chocolate cost?"))}`);

    //task 9 - flip
    alert(flip( prompt("Give me a string to flip!")));

    //task 10 - bank
    alert(`Your margin = ${Math.round(prompt('Lend money to bank for 2 month (5% yearly rank)')/100*5/6*100)/100}`);

})();

function hi(name) {
    return(`Hello, ${name}!`);
}

function year() {
    let dateString = new Date();
    const DATE = [dateString.getDate(), dateString.getMonth() + 1, dateString.getFullYear()];
    let i=0;
    let birthday = null;
    while(i==0) {
        birthday = prompt(`When is your birthday? \n DD.MM.YYYY`);
        if (birthday == null) {
            return;
        }
        try {
            birthday = birthday.split('.');
            if (birthday.length == 1) {
                throw('Please, use dot (.) as a separator!');
            } else if (birthday.length != 3){
                throw('Pleasse, enter your full birth date!')
            }
            try {
                birthday = [+birthday[0], +birthday[1], +birthday[2]];
                
                for (let d of birthday) {
                    if(isNaN(d)) {
                        throw('Please, use just numbers to define your birthday!\n Try again!');
                    }
                }
                
                if (birthday[0] < 1 || birthday[0] > 31 || birthday[1] < 1 || birthday[1] > 12 ||birthday[2] < 0 || birthday[2] >= DATE[2]) {
                    throw('Please, correct the birthday!\n Try again!');
                }
                i=0;
            } catch (e) {
                alert(e);
            }
        } catch (e) {
            alert(`${e}\n Try again!`);
        }
        
    }
    let sex = confirm ('Are you girl?');
    if (birthday[1] == DATE [1] && birthday[0] == DATE[0]) {
        alert(`Happy Birthday! \n ${sex ? "You have the perfect age!" : `It's good to have ${-birthday[2]+DATE[2]} years behind!`}`);
    } else if (sex) {
        alert('You are too young to think about it ))');
    } else if(birthday[1] < DATE[1] || (birthday[1] == DATE[1] && birthday[0] < DATE[0])) {
        alert(`You are ${-birthday[2]+DATE[2]} years old!`);
    } else {
        alert(`You are ${-birthday[2]+DATE[2]-1} years old!`);
    }
    
}


function trip () {
    let trip = {
        distance: prompt("How far in km whish you go?"),
        time: prompt("How many time in hours whish you spend on the road?"),
        speed: null
    };
    trip.speed = trip.distance / trip.time;
    alert(`You need to drive with the speed = ${trip.speed} km per hour.`);
}


function converter () {
    const EURTOUSDOL = 0.8;
    let currencyExchange;
    try {
        throw('');
        let permanentCurrency = new XMLHttpRequest();
    } catch(e) {
        currencyExchange = EURTOUSDOL;
    }
    let amount = prompt("Enter amoun of US dollars you need to exchange:");
    alert(`You will get: ${currencyExchange*amount} EUR \n The current rate is: ${currencyExchange}`);
    
}


function flash () {
    let v = prompt('How many Gb do you have on your flash?');
    alert(`You can place ${Math.floor((v*1024)/820)} fies with amount 820mb and there are ${(v*1024)%820} mb left free`);
}


function choco(money, price) {
    return (`You can buy ${Math.floor(money/price)} chocolates and you will have ${Math.round((money%price)*100)/100} UAN more`);
}


function flip (s) {
    try {
        if (s.length == 3 && Number(s)) {
            let a = (s % 10) * 100;
            a +=(s - a / 100) %100 + Math.floor(s / 100);
            return a;
        } else {
            s = s.split('');
            s = s.reverse();
            s = s.join('');
            return s;
        }
    } catch (e) {
        return 'Ok, next time!';
    }
        
   
}
