( function () {
    'use strict';

    timer();
    stylesFunc();

    //functions

    //first part of lesson
    function timer(){

        let up = new Time(Math.round(Date.now() / 1000));

        let down = new Time(Math.round(Date.now() / 1000));

        setInterval(() => {
            document.querySelector('#timerUp').innerHTML = up.increase().display();
        }, 1000);

        setTimeout( function run () {
            if(down.display() != '00:00:00') {
                document.querySelector('#timerDown').innerHTML = down.decrease().display();
                setTimeout(run, 1000);
            }
        } , 1000);

        function Time (customS, customM = Math.floor(customS / 60), customH = Math.floor(customM / 60)) {

            this.h = customH >= 0 ? customH % 24 : 0;
            this.m = customM >= 0 && customH >=0 ? customM % 60 : 0;
            this.s = customS >= 0 && customM >=0 && customH >= 0 ? customS % 60 : 0;
    
            this.display = function() {
                return ('0'+ this.h).substr(-2) + ':' + ('0' + this.m).substr(-2) + ":" + ('0' + this.s).substr(-2);
            }
    
            this.increase = function() {
                if(this.s == 59){
                    this.s = 0;
                    if(this.m == 59) {
                        this.m = 0;
                        if(this.h == 23) {
                            this.h = 0;
                        } else {
                            this.h++;
                        }
                    } else {
                        this.m++;
                    }
                } else {
                    this.s++;
                }
                return this;
            }
    
            this.decrease = function(){
                if(this.s == 0){
                    if(this.m == 0){
                        if(this.h == 0){
                            return this;
                        } else {
                            this.h--;
                            this.m = 59;
                            this.s = 59;
                        }
                    } else {
                        this.s = 59;
                        this.m--;
                    }
                } else {
                    this.s--;
                }
                return this;
            }
        }
    }

    //second part of lesson
    function stylesFunc(){
        let styles = [  {name: 'color', value: 'orange'},
                        {name: 'font-weight', value: '700'}, 
                        {name: 'font-size', value: '25px'}, 
                        {name: 'letter-spacing', value: '5px'}, 
                        {name: 'text-transform', value: 'capitalize'},
                        {name: 'background-color', value: 'yellow'}];
        let colors = [  {name: 'color', value: 'orange'},
                        {name: 'color', value: 'green'},
                        {name: 'color', value: 'blue'},
                        {name: 'color', value: 'aqua'},
                        {name: 'color', value: 'yellow'},
                        {name: 'color', value: 'black'},
                        {name: 'color', value: 'brown'},
                        {name: 'color', value: 'indigo'},
                        {name: 'color', value: 'teal'},
                        {name: 'color', value: 'thistle'}];
        let strings = ['Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis,',
                        'ut tempora eum fugiat, pariatur dolores repellendus laboriosam cupiditate velit quis aperiam,',
                        'quisquam enim perferendis impedit dolorem veniam vero!',
                        'Eveniet veniam quam illum odio nostrum nobis autem, natus facere laudantium adipisci sint. Alias, pariatur molestiae!',
                        'Perferendis quidem voluptas corporis aliquid officia!',
                        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis,',
                        'ut tempora eum fugiat, pariatur dolores repellendus laboriosam cupiditate velit quis aperiam,',
                        'quisquam enim perferendis impedit dolorem veniam vero!',
                        'Eveniet veniam quam illum odio nostrum nobis autem, natus facere laudantium adipisci sint. Alias, pariatur molestiae!',
                        'Perferendis quidem voluptas corporis aliquid officia!'];

        showStrings(strings);
        showColoredStrings(strings);
        tenSquad();

        //funcs
        function showStrings(strings){
            strings.forEach( string => {
                let index = Math.round(Math.random() * (colors.length-1));
                document.querySelector('#styles').insertAdjacentHTML('beforeend',`<p style="${colors[index].name}: ${colors[index].value}">${string}</p>`);
                colors.splice(index, 1);

            });
        }
        function showColoredStrings(strings){
            strings.forEach( string => {
                document.querySelector('#styles').insertAdjacentHTML('beforeend',`<p style=" color: rgb(${getNum()}, ${getNum()}, ${getNum()});">${string}</p>`);
            });
        }

        function tenSquad(){
            for(let i =0; i < 10; i++) {
                document.querySelector('#styles').insertAdjacentHTML('beforeend',` <div style=" width: 100px; height: 100px; display: inline-block; background-color: rgb(${getNum()}, ${getNum()}, ${getNum()});"></div>`);
            }
        }

        function getNum(){
            return Math.round(Math.random() * 255);
        }
    }
} )();