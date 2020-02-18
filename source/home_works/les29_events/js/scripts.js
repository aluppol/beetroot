( function () {
    'use strict';

    // Создать HTML-страницу для отображения/редактирования текста. При открытии страницы текст отображается с помощью тега div. При нажатии Ctrl + E, вместо div появляется textarea с тем же текстом, который теперь можно редактировать. При нажатии Ctrl + , вместо textarea появляется div с уже измененным текстом. Не забудьте выключить поведение по умолчанию для этих сочетаний клавиш.

    keyPadFn();


    // Создать HTML-страницу с большой таблицей. При клике по заголовку колонки, необходимо отсортировать данные по этой колонке. Учтите, что числовые значения должны сортироваться как числа, а не как строки.

    sortTable();


    // Создать HTML-страницу с блоком текста в рамочке. Реализовать возможность изменять размер блока, если зажать мышку в правом нижнем углу и тянуть ее дальше.

    // done in class


    // function

    

    function sortTable(){

        let bigTableArray = [
            {name:"John", position:"Director", salary: 10000},
            {name:"Tom", position:"Admin", salary: 1500},
            {name:"Diana", position:"Designer", salary: 2000},
            {name:"Kim", position:"Project Manager", salary: 3000},
            {name:"Sonya", position:"Team Lead", salary: 7000},
            {name:"Julia", position:"Developer", salary: 4000},
            {name:"Vera", position:"Developer", salary: 2000},
            {name:"Sun", position:"Developer", salary: 1500},
            {name:"Liza", position:"Developer", salary: 1800},
            {name:"Kate", position:"Developer", salary: 6000},
            {name:"Adam", position:"Designer", salary: 2200},
            {name:"Kris", position:"HR", salary: 3000},
            {name:"Ann", position:"Cleaner", salary: 1000},
            {name:"Drey", position:"Killer", salary: 0.25},

        ]

        printTable(bigTableArray);
        
        function printTable(bigTableArray){

            let array = bigTableArray.slice();
            let table = document.body.insertAdjacentElement('beforeend', document.createElement('table'));
            let thead = table.insertAdjacentElement('beforeend', document.createElement('thead'));
            let tbody = table.insertAdjacentElement('beforeend', document.createElement('tbody'));

            printThead();          
            printTbody();
            eventHandler();

            function printThead(){
                let row = thead.insertAdjacentElement('beforeend', document.createElement('tr'));

                row.innerHTML = `<th>№</th>`;

                for(let key in array[0]){
                    row.innerHTML += `<th>${key}</th>`;
                }
            }
            
            function printTbody(){
                tbody.innerHTML = '';
                array.forEach((employee, i) => {
                    let row = tbody.insertAdjacentElement('beforeend', document.createElement('tr'));
    
                    row.innerHTML = `<td>${i+1}</td>`;
    
                    for(let key in employee){
                        row.innerHTML += `<td>${employee[key]}</td>`;
                    }
                });
            }

            function eventHandler(){
                thead.addEventListener('click', (event)=>{
                    let key = event.target.textContent;
                    if(array[0][key]){
                        if(Number(array[0][key])){
                            array.sort((a,b) => b[key] - a[key]);
                        } else {
                            array.sort((a,b) => {
                                if(a[key].toUpperCase() <= b[key].toUpperCase()) return -1;
                                return 1;   
                            });
                        }
                        printTbody();
                    }
                });
            }
        }
    }


    function keyPadFn(){
        document.body.innerHTML += '<div id = "keyPad"> <div>Custom text (При нажатии Ctrl + E, вместо div появляется textarea с тем же текстом, который теперь можно редактировать. При нажатии Ctrl + , вместо textarea появляется div с уже измененным текстом.)</div></div>'; 

        document.addEventListener('keydown', (event) => {
            // event.preventDefault();
            if(event.code == 'KeyE' && (event.ctrlKey || event.metaKey)){
                event.preventDefault();
                let text = keyPad.children[0].textContent;
                keyPad.innerHTML = `<textarea style="width:100%">${text}</textarea>`;
            } else if(event.code == 'Equal' && (event.ctrlKey || event.metaKey)){
                event.preventDefault();
                let text = keyPad.children[0].value;
                keyPad.innerHTML = `<div>${text}</div>`;
            }
        });
    }
} )();