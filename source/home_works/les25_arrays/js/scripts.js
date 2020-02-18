( function () {
    'use strict';
    // Домашнее задание:

    // 1. Создать массив «Список покупок». Каждый элемент массива является объектом, который содержит название продукта, необходимое количество и куплен или нет. Написать несколько функций для работы с таким массивом.
        // Вывод всего списка на экран таким образом, чтобы сначала шли некупленные продукты, а потом – купленные.
        // Добавление покупки в список. Учтите, что при добавлении покупки с уже существующим в списке продуктом, необходимо увеличивать количество в существующей покупке, а не добавлять новую.
        // Покупка продукта. Функция принимает название продукта и отмечает его как купленный.

        shoppingList();


    // 2. Создать массив, описывающий чек в магазине. Каждый элемент массива состоит из названия товара, количества и цены за единицу товара. Написать следующие функции:
        // Распечатка чека на экран;
        // Подсчет общей суммы покупки;
        // Получение самой дорогой покупки в чеке;
        // Подсчет средней стоимости одного товара в чеке.
        
        shoppingBill();

    // 3. Создать массив CSS-стилей (цвет, размер шрифта, выравнивание, подчеркивание и т. д.). Каждый элемент массива – это объект, состоящий из двух свойств: название стиля и значение стиля. Написать функцию, которая принимает массив стилей и текст, и выводит этот текст с помощью document.write() в тегах <p></p>, добавив в открывающий тег атрибут style со всеми стилями, перечисленными в массиве.

        //Done in class work.


    // 4. Создать массив аудиторий академии. Объект-аудитория состоит из названия, количества посадочных мест (от 10 до 20) и названия факультета, для которого она предназначена. Написать несколько функций для работы с ним^
        // Вывод на экран всех аудиторий;
        // Вывод на экран аудиторий для указанного факультета;
        // Вывод на экран только тех аудиторий, которые подходят для переданной группы. Объект-группа состоит из названия, количества студентов и названия факультета;
        // Функция сортировки аудиторий по количеству мест;
        // Функция сортировки аудиторий по названию (по алфавиту).

        universityRooms();


// All functions are declared outside the objects because I need to be able to apply them to array of this objects. 

        // funcs

        function universityRooms(){
            let rooms = [
                new Room('001', 'med'),
                new Room('002', 'art'),
                new Room('003', 'tech'),
                new Room('010', 'med'),
                new Room('020', 'art'),
                new Room('030', 'tech'),
                new Room('100', 'med'),
                new Room('200', 'art'),
                new Room('300', 'tech'),
                new Room('000', 'med', 20),
                new Room('000', 'art', 20),
                new Room('000', 'tech', 20)
            ]

            
            let groups = [
                new Group('MED - 11', 'med'),
                new Group('MED - 12', 'med'),
                new Group('MED - 21', 'med'),
                new Group('ART - 11', 'art'),
                new Group('ART - 12', 'art'),
                new Group('ART - 13', 'art'),
                new Group('TECH - 31', 'tech'),
                new Group('MED - 31', 'med'),
                new Group('TECH - 21', 'tech'),
                new Group('TECH - 11', 'tech'),
                new Group('MED - 41', 'med')
            ]

            printAll();

            // printFrom('art');

            // printFor(groups[Math.round(Math.random() * (groups.length - 1))]);

            // sortBySits();
            // printAll();

            // sortByName();
            // printAll();

            function sortByName(){
                rooms.sort((a,b) => a.name.localeCompare(b.name));
            }

            function sortBySits(){
                rooms.sort((a, b) => b.sits - a.sits);
            }

            function printFor(group) {
                document.querySelector('#university-title').insertAdjacentHTML('afterend',`<h2>For the Group ${group.name} from faculty "${group.faculty}" with amoun of students ${group.students} you can use next rooms:</h2>`);
                clearBody();
                rooms.filter(room => room.faculty == group.faculty && room.sits >= group.students).forEach((item) => {
                    document.querySelector('#university').insertAdjacentHTML('beforeend',`<li><div class="university__item"><div class="university__item--name">${item.name}</div> <div class="university__item--amount">${item.sits}</div> <div class="university__item--faculty">${item.faculty}</div></div></li>`);
                }); 
            }

            function printFrom(faculty){
                clearBody();
                rooms.filter(room => room.faculty == faculty).forEach((item) => {
                    document.querySelector('#university').insertAdjacentHTML('beforeend',`<li><div class="university__item"><div class="university__item--name">${item.name}</div> <div class="university__item--amount">${item.sits}</div> <div class="university__item--faculty">${item.faculty}</div></div></li>`);
                }); 
            }

            function printAll(){
                clearBody();
                rooms.forEach((item) => {
                    document.querySelector('#university').insertAdjacentHTML('beforeend',`<li><div class="university__item"><div class="university__item--name">${item.name}</div> <div class="university__item--amount">${item.sits}</div> <div class="university__item--faculty">${item.faculty}</div></div></li>`);
                }); 
            }

            function clearBody(){
                document.querySelector('#university').innerHTML = '';
            }


            function Group(name, faculty, students = getSitsAmount()){
                this.name = name;
                this.students = students;
                this.faculty = faculty;
            }

            function Room (name, faculty, sits = getSitsAmount()){
                this.name = name;
                this.sits = sits;
                this.faculty = faculty;
            }

            function getSitsAmount(){
                return Math.round(Math.random() * 10 + 10);
            }
        }


        function shoppingBill(){
            let bill = [ 
                new BillItem('carrot', 12.70, 2),
                new BillItem('milk', 39.90, 2),
                new BillItem('eggs', 4.5, 10),
                new BillItem('fish', 430.71, 0.2)
            ]

            displayShoppingBill(bill);
            printMostExpensive(bill);
            printMiddleCost(bill);


            function printMiddleCost(billList){
                let mid = (getFullPrice(billList) / billList.length).toFixed(2);

                document.querySelector('#bill-box').insertAdjacentHTML('beforeend',`<div class="line-dashed">Middle cost:</div><div style="text-align: right">${mid}</div>`);
            }

            function printMostExpensive(billList){

                let topCost = billList.reduce((cost, item) => {
                    return item.price * item.amount > cost.price * cost.amount ? item : cost;
                });

                document.querySelector('#bill-box').insertAdjacentHTML('beforeend',`<div class="line-dashed">Most Expensive:</div><div class="bill__item"><div class="bill__item--name">${topCost.name}</div> <div class="bill__item--amount">${topCost.amount}</div> <div class="bill__item--price">${(topCost.price * topCost.amount).toFixed(2)}</div></div>`);
            }

            function addFullPrice(billList){
                let fullPrice = getFullPrice(billList);
                document.querySelector('#bill-box').insertAdjacentHTML('beforeend',`<div class="line"></div><div class="bill__item bill__item--result"><span class="bill__result">Sum:</span><span class="bill__result">${fullPrice.toFixed(2)}</span></div>`);
            }

            function getFullPrice(billList){
                return billList.reduce(((sum, item) => sum + item.price * item.amount), 0);
            }

            function displayShoppingBill(list){
                document.querySelector('#bill').innerHTML = '';
                list.forEach((item) => {
                    document.querySelector('#bill').insertAdjacentHTML('beforeend',`<li><div class="bill__item"><div class="bill__item--name">${item.name}</div> <div class="bill__item--amount">${item.amount}</div> <div class="bill__item--price">${item.price.toFixed(2)}</div></div></li>`);
                }); 
                addFullPrice(list);
            }

            function BillItem (name, price, amount = 1 ){
                this.name = name;
                this.amount = amount;
                this.price = price;
            }
        }


        function shoppingList(){
            let productList = [ 
                new Product('carrot', 2),
                new Product('milk', 1),
                new Product('eggs', 10),
                new Product('fish', 1)
            ]

            addProduct(new Product('chicken', 1), productList);
            addProduct(new Product('milk', 1), productList);
            buyProduct('eggs', productList);
            buyProduct('fish', productList);
            addProduct(new Product('fish', 2), productList);
            buyProduct('milk', productList);
            displayProductList(productList);

            function buyProduct(productName, list){
                list.find(item => item.name.toLowerCase() == productName.toLowerCase() ).bought = true;
            }

            function addProduct(newProduct, list){
                if(newProduct instanceof Product) {
                    let i  = list.findIndex(item => item.name.toLowerCase() == newProduct.name.toLowerCase());
                    if (i == -1){
                        list.push(newProduct);
                    } else {
                        if(!list[i].bought){
                            list[i].amount += newProduct.amount;
                        } else {
                            list[i].bought = false;
                            list[i].amount = newProduct.amount;
                        }
                    } 
                }
            }

            function displayProductList(list){
                list.sort((item) => item.bought ? 1 : -1);
                document.querySelector('#list').innerHTML = '';
                list.forEach((item) => {
                    document.querySelector('#list').insertAdjacentHTML('beforeend',`<li style = "text-decoration:${item.bought ? 'line-through' : 'none'}"><div class="list__item"><span>${item.name}</span> <span>${item.amount}</span></div></li>`);
                }); 
            }

            function Product (name, amount = 1, bought = false ){
                this.name = name;
                this.amount = amount;
                this.bought = bought;
            }
        }
} )();