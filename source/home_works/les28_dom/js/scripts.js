( function () {
    'use strict';
    // 1. Создать страницу, которая выводит нумерованный список песен:

    songsListFn();

    // 2.Modal - done in class

    // 3. Создать HTML-страницу со светофором и кнопкой, которая переключает светофор на следующий цвет.

    trafficLightsFn();

    // functions

    function trafficLightsFn(){
        document.body.innerHTML += `
        <svg enable-background="new 0 0 512 512" height="512" viewBox="0 0 512 512" width="512">

        <g fill="#7ca0b0">
        
        <path d="m142.108 170.207c2.929 2.929 6.768 4.394 10.606 4.394 3.839 0 7.678-1.465 10.607-4.394 5.858-5.857 5.858-15.355 0-21.213l-10.607-10.606v-68.221c8.284 0 15-6.716 15-15s-6.716-15-15-15h-64.267c-23.136 0-31.158 11.028-33.882 17.603-2.723 6.574-4.849 20.046 11.512 36.406z"/>
        
        <path d="m152.715 287.004v-68.221c8.284 0 15-6.716 15-15s-6.716-15-15-15h-64.268c-23.136 0-31.158 11.028-33.882 17.602-2.723 6.574-4.849 20.046 11.512 36.406l76.031 76.031c2.929 2.929 6.768 4.394 10.606 4.394 3.839 0 7.678-1.465 10.607-4.394 5.858-5.857 5.858-15.355 0-21.213z"/>
        
        <path d="m152.715 435.621v-68.221c8.284 0 15-6.716 15-15s-6.716-15-15-15h-64.268c-23.136 0-31.158 11.028-33.882 17.603-2.723 6.574-4.849 20.046 11.512 36.406l76.031 76.031c2.929 2.929 6.768 4.394 10.606 4.394 3.839 0 7.678-1.465 10.607-4.394 5.858-5.857 5.858-15.355 0-21.213z"/>
        
        </g>
        
        <path d="m348.679 148.994c-5.858 5.857-5.858 15.355 0 21.213 2.929 2.929 6.768 4.394 10.606 4.394s7.678-1.465 10.606-4.394l76.031-76.031c16.36-16.359 14.234-29.831 11.512-36.405-2.724-6.574-10.746-17.604-33.884-17.604h-64.266c-8.284 0-15 6.716-15 15s6.716 15 15 15v68.221z" fill="#265c76"/>
        
        <path d="m423.551 188.783h-64.266c-8.284 0-15 6.716-15 15s6.716 15 15 15v68.221l-10.606 10.607c-5.858 5.857-5.858 15.355 0 21.213 2.929 2.929 6.768 4.394 10.606 4.394s7.678-1.465 10.606-4.394l76.031-76.031c16.36-16.359 14.234-29.831 11.512-36.405-2.723-6.575-10.745-17.605-33.883-17.605z" fill="#265c76"/>
        
        <path d="m423.551 337.4h-64.266c-8.284 0-15 6.716-15 15s6.716 15 15 15v68.221l-10.606 10.606c-5.858 5.857-5.858 15.355 0 21.213 2.929 2.929 6.768 4.394 10.606 4.394s7.678-1.465 10.606-4.394l76.031-76.031c16.36-16.359 14.234-29.831 11.512-36.405-2.723-6.574-10.745-17.604-33.883-17.604z" fill="#265c76"/>
        
        <path d="m319.117 0h-126.236c-30.419 0-55.166 24.748-55.166 55.167v401.667c0 30.419 24.747 55.166 55.166 55.166h126.236c30.42 0 55.168-24.747 55.168-55.166v-401.667c0-30.419-24.748-55.167-55.168-55.167z" fill="#1d4659"/>
        
        <path d="m319.117 0h-63.124v512h63.124c30.42 0 55.168-24.747 55.168-55.166v-401.667c0-30.419-24.748-55.167-55.168-55.167z" fill="#0e232c"/>
        
        <path class="light light--red" d="m255.996 64.267c-28.941 0-52.486 23.547-52.486 52.49 0 28.941 23.545 52.486 52.486 52.486 28.943 0 52.49-23.545 52.49-52.486 0-28.944-23.546-52.49-52.49-52.49z"/>
        
        <path class="light light--green" d="m255.996 342.757c-28.941 0-52.486 23.546-52.486 52.488s23.545 52.488 52.486 52.488c28.943 0 52.49-23.546 52.49-52.488s-23.546-52.488-52.49-52.488z"/>
        
        <path class="light light--yellow" d="m255.996 203.512c-28.941 0-52.486 23.546-52.486 52.488 0 28.943 23.545 52.49 52.486 52.49 28.943 0 52.49-23.547 52.49-52.49 0-28.942-23.546-52.488-52.49-52.488z"/>
        
        <path class="light light--red" d="m308.486 116.757c0-28.943-23.547-52.49-52.49-52.49-.001 0-.002 0-.003 0v104.977h.003c28.944-.001 52.49-23.546 52.49-52.487z"/>
        
        <path class="light light--green" d="m255.996 447.733c28.943 0 52.49-23.546 52.49-52.488s-23.547-52.488-52.49-52.488c-.001 0-.002 0-.003 0v104.977c.001-.001.002-.001.003-.001z"/>
        
        <path class="light light--yellow" d="m308.486 256c0-28.942-23.547-52.488-52.49-52.488-.001 0-.002 0-.003 0v104.978h.003c28.944 0 52.49-23.547 52.49-52.49z"/>
        </svg>
        `
        let btn = document.body.appendChild(document.createElement("button"));
        btn.insertAdjacentText('beforeend', `Change traffic lights`);
        let lightColor = 'yellow';
        nextLight();
        btn.addEventListener('click',() => nextLight());

        function nextLight(){
            document.querySelectorAll(`.light--${lightColor}`).forEach(element => element.style.fill = "black");
            switch (lightColor){
                case 'green':
                    lightColor = 'red';
                    document.querySelectorAll(`.light--${lightColor}`).forEach(element => element.style.fill = lightColor);
                    break;

                case 'yellow':
                    lightColor = 'green';
                    document.querySelectorAll(`.light--${lightColor}`).forEach(element => element.style.fill = lightColor);
                    break;

                case 'red':
                    lightColor = 'yellow';
                    document.querySelectorAll(`.light--${lightColor}`).forEach(element => element.style.fill = lightColor);
                    break;
            }
        }

    }


    function songsListFn(){
        let playList = [

            {
            
             author: "LED ZEPPELIN",
            
             song:"STAIRWAY TO HEAVEN"
            
            },
            
            {
            
             author: "QUEEN",
            
             song:"BOHEMIAN RHAPSODY"
            
            },
            
            {
            
             author: "LYNYRD SKYNYRD",
            
             song:"FREE BIRD"
            
            },
            
            {
            
             author: "DEEP PURPLE",
            
             song:"SMOKE ON THE WATER"
            
            },
            
            {
            
             author: "JIMI HENDRIX",
            
             song:"ALL ALONG THE WATCHTOWER"
            
            },
            
            {
            
             author: "AC/DC",
            
             song:"BACK IN BLACK"
            
            },
            
            {
            
             author: "QUEEN",
            
             song:"WE WILL ROCK YOU"
            
            },
            
            {
            
             author: "METALLICA",
            
             song:"ENTER SANDMAN"
            
            }
        ];


        printList(playList);

        function printList(songs){

                if(!songs) return;

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

                for(let key in songs[0]){
                    capture.insertAdjacentHTML('beforeend', `<th>${key}</th>`)
                }
                for(let i = 1; i <= songs.length; i++){
                    let row = tbody.appendChild(document.createElement('tr'));

                    row.insertAdjacentHTML('beforeend', `<td> ${i} </td>`);

                    for(let key in songs[i-1]){
                        row.insertAdjacentHTML('beforeend', `<td>${songs[i-1][key]}</td>`);
                        row.style.border = '1px solid black';
                    }
                }
        }
    }
} )();