( function () {
    'use strict';

    // 1) Реализовать класс, описывающий окружность. В классе должны быть следующие компоненты:

        // поле, хранящее радиус окружности;
        // get-свойство, возвращающее радиус окружности;
        // set-свойство, устанавливающее радиус окружности;
        // get-свойство, возвращающее диаметр окружности;
        // метод, вычисляющий площадь окружности;
        // метод, вычисляющий длину окружности.

    // Продемонстрировать работу свойств и методов. 

    circle();


    // 2) Реализовать класс, описывающий простой маркер. В классе должны быть следующие компоненты:

        // поле, которое хранит цвет маркера;
        // поле, которое хранит количество чернил в маркере (в процентах);
        // метод для печати (метод принимает строку и выводит текст соответствующим цветом; текст выводится до тех пор, пока в маркере есть чернила; один не пробельный символ – это 0,5% чернил в маркере).
        // Реализовать класс, описывающий заправляющийся маркер, унаследовав его от простого маркера и добавив метод для заправки маркера.

    // Продемонстрировать работу написанных методов. 

    markerFn();


    // 3) Реализовать класс Employee, описывающий работника, и создать массив работников банка.

    // Реализовать класс EmpTable для генерации HTML-кода таблицы со списком работников банка. Массив работников необходимо передавать через конструктор, а получать HTML-код с помощью метода getHtml().

    // Создать объект класса EmpTable и вывести на экран результат работы метода getHtml().


    employeeFn();



    // functions

    function employeeFn(){
        class Employee {
            constructor(name = '', position = '', salary = 0){
                this.name = name;
                this.position = position;
                this.salary = salary;
            }
        }

        class EmpTable{
            constructor(employeesArray = []){
                this.employeesList = employeesArray;
            }
            getHtml(){
                if(!this.employeesList) return;
                let table = document.body.appendChild(document.createElement("table"));

                table.style.width  = '80%';
                table.style.margin = "10px auto";
                table.style.border = '1px solid black';
                table.style.borderCollapse = 'collapse';
                table.style.textAlign = 'center';

                let thead = table.appendChild(document.createElement("thead"));
                let tbody = table.appendChild(document.createElement("tbody"));
                let capture = thead.appendChild(document.createElement('tr'));
                capture.insertAdjacentHTML('beforeend', `<th> № </th>`);

                for(let key in this.employeesList[0]){
                    capture.insertAdjacentHTML('beforeend', `<th>${key}</th>`)
                }
                for(let i = 1; i <= this.employeesList.length; i++){
                    let row = tbody.appendChild(document.createElement('tr'));

                    row.insertAdjacentHTML('beforeend', `<td> ${i} </td>`);

                    for(let key in this.employeesList[i-1]){
                        row.insertAdjacentHTML('beforeend', `<td>${this.employeesList[i-1][key]}</td>`);
                        row.style.border = '1px solid black';
                    }
                }

                
            }
        }

        let employees = [
            new Employee('John', 'Director', 1000), 
            new Employee('Sara', 'Hostes', 600), 
            new Employee('Liza', 'Economist', 700), 
            new Employee('Tom', 'Finansist', 1100),
            new Employee('Jack', 'Cashier', 700),
            new Employee('Sue', 'Cashier', 700)
        ]
        let employeeTable = new EmpTable(employees);

        console.log('start');
        employeeTable.getHtml();
        console.log('end');
    }


    function markerFn(){
        class Marker{
            constructor(color = 'black'){
                this.id = Symbol();
                this.color = color;
                this.ink = 100;
            }

            print(string){
                document.body.insertAdjacentHTML("beforeend", `<p style="color:${this.color}"></p>`);
                for(let i = 0; i < string.length; i++){
                    if(this.ink == 0){
                        break;
                    }
                    document.body.lastElementChild.insertAdjacentText("beforeend", string[i]);
                    if (string[i] == ' ') {
                        continue;
                    }
                    this.ink -= 5;
                }
            }
        }

        class RenewedMarker extends Marker{
            renew(){
                this.ink = 100;
            }
        }


        let usualBlackMarker = new Marker ();
        let usualRedMarker = new Marker ('red');
        let renewedBlueMarker = new RenewedMarker('blue');

        usualBlackMarker.print("I'm black : Friends! Next week we are getting the delivery of completely redesigned nib BRUSH and it is a very important event. Those who follow our news constantly know that we haven't released a new line for a long time. To achieve an ideal result (we are perfectionists), we have made a great work: sent you our markers for testing, collected opinions and wishes. And nearly a year we were working with a Japanese company: selected material, tested, identified shortcomings, replaced, again tested, replaced and didn't stop until we got a nib of our dream. We set 7 parameters which must be in a new marker:");
        usualRedMarker.print("I'm red: Friends! Next week we are getting the delivery of completely redesigned nib BRUSH and it is a very important event. Those who follow our news constantly know that we haven't released a new line for a long time. To achieve an ideal result (we are perfectionists), we have made a great work: sent you our markers for testing, collected opinions and wishes. And nearly a year we were working with a Japanese company: selected material, tested, identified shortcomings, replaced, again tested, replaced and didn't stop until we got a nib of our dream. We set 7 parameters which must be in a new marker:");
        renewedBlueMarker.print("I'm blue: Friends! Next week we are getting the delivery of completely redesigned nib BRUSH and it is a very important event. Those who follow our news constantly know that we haven't released a new line for a long time. To achieve an ideal result (we are perfectionists), we have made a great work: sent you our markers for testing, collected opinions and wishes. And nearly a year we were working with a Japanese company: selected material, tested, identified shortcomings, replaced, again tested, replaced and didn't stop until we got a nib of our dream. We set 7 parameters which must be in a new marker:");
        renewedBlueMarker.renew();
        renewedBlueMarker.print("I'm here again.");
        // alert(usualBlackMarker.renew());
    }


    function circle(){
        class Circle{
            constructor(radius){
                this.radius = radius;
            }

            get radius(){
                return this._radius;
            }

            set radius(value){
                this._radius = value;
            }

            area(){
                return Math.PI * this.radius**2;
            }

            length(){
                return Math.PI * this.radius * 2;
            }
        }

        let myCircle = new Circle(10); 
        myCircle.radius = 3;
        alert(Math.round(myCircle.area()));
        alert(Math.round(myCircle.length()));
    }
} )();