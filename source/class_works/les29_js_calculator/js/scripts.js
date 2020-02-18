(function(){
    'use strict';

    let exprs = [];

    let prior = ['×', '÷'];

    let resultMaker = {
        '+' : function(x, y) { return +x + y },
        '-' : function(x, y) { return x - y },
        '×' : function(x, y) { return x * y },  
        '÷' : function(x, y) { return x / y },  
        '%' : function(x) { return x / 100 }  
    };

    let operators = Object.keys(resultMaker);

    $('.calc__btn').on('click', (e)=>{
        let btn = e.target,
            symbol = $(btn).attr('data-display'),
            operator = $(btn).data('operator');

        // console.log(symbol + ' : ' + operator);

        let curStr = $('.calc__display>span').text();

        if(symbol) {

            if(symbol != '.' && curStr == "0"){
                curStr = '';
            }

            curStr += symbol;
        }

        switch(operator){
            case 'undo':
                curStr = curStr.substr(0, curStr.length -1);
                curStr = curStr.length ? curStr : '0';

                if(!curStr.length){
                    exprs = [];
                    curStr = '0';
                }
                break;

            case 'clear':
                exprs = [];
                curStr = '0';
                break;

            case '=':
                curStr = meakeExprs(curStr);
                exprs = [];
            default:
                

        }

        $('.calc__display span').text(curStr);
    });

    function meakeExprs(str){

        let arr =  Array.from(str),
            index = -1;

        // console.log(arr);

        while(arr.length > 1){
            index++;
            let el = arr[index];
            if(operators.includes(el) || el == '='){
                if(index != 0){
                    let operand = arr.splice(0, index).join("");
                    exprs.push(operand);
                    let operator = arr.splice(0, 1).join("");
                    exprs.push(operator);
                    index = -1;
                } else {
                    let operator = arr.splice(0, 1).join("");
                    exprs.push(operator);
                    index = -1;
                }
            }
        }
        
        exprs.pop();
        // console.log(exprs);

        index = 0;

        do {

            if(exprs[index] == '%'){

                let newExpr = resultMaker[exprs[index]](exprs[index-1]);
                exprs.splice(index-1, 2, newExpr);
                index--;
            }
            index++;
        } while(index < exprs.length)


        index = 0;

        do {
            if(prior.indexOf(exprs[index]) > -1 ){
                
                let next = exprs[index + 1] ?  exprs[index + 1] : 1;
                let newExpr = resultMaker[exprs[index]](exprs[index-1], next);
                exprs.splice(index-1, 3, newExpr);
                index--;
            }
            index++;
        } while(index < exprs.length)


        index = 0;

        do {
            if(resultMaker[exprs[index]]){
                console.log(exprs);
                let next = exprs[index + 1] ?  exprs[index + 1] : 1;
                let newExpr = resultMaker[exprs[index]](exprs[index-1], next);
                exprs.splice(index-1, 3, newExpr);
                index--;
            }
            index++;
        } while(index < exprs.length)


        console.log(exprs);

        return exprs;

    }
})();


