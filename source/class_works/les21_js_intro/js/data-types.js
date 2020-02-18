(function() {
    'use strict';

    // document.writeln(test());

    let questions = [
        {
            text: 'What year is now?',
            variants: ['a. 2000', 'b. 2015', 'c. 2020'],
            answer: 'c',
            points: 2 
        },
        {
            text: 'What is the current city of the coder?',
            variants: ['a. Donetsk', 'b. Kiev', 'c. Mariupol'],
            answer: 'a',
            points: 5 
        },
        {
            text: 'What academy are we learning in?',
            variants: ['a. Step', 'b. KPI', 'c. Beetroot'],
            answer: 'c',
            points: 7 
        }
    ]
    let sum = 0;

    for (let q of questions) {
        // console.log(q);
        try {
            if (q.answer == prompt(q.text+'\n'+q.variants.join("\n")).toLowerCase()){
                sum +=q.points;
            }
        }catch (e){}
    }

    alert (`Congrats!\nYour rank is ${sum} points.`)

    function test(currency) {

        if ( Boolean(currency)) {
        } else if ( currency == '') {
            return (test(prompt('Do u want exchange your money still? \nEnter currency from list: "EUR", "UAN", or "AZN"!')));
        } 
        return "Goodbuy!";
    }
})();