(function(){
    'use strict';
    class Beeper {
        constructor(interval = 1){
            this.interval = interval * 60000; // in ms
            this.runer = null;
            this.id = 'beep' + new Date().getMilliseconds();
            let audio = document.createElement('audio');
            audio.id = this.id;
            audio.controls = false;
            audio.src = 'media/beep.mp3';
            audio.type = 'audio/mpeg';

            document.body.appendChild(audio);

            this.audio = audio;

        }

        beep (){
            this.audio.play();
        }

        run(){
            this.runner = setInterval(() => {
                this.beep();
            }, this.interval);
        }

        stop(){
            clearInterval(this.runner);
        }
    }
    let btnStart = document.getElementById('start_20sec'),
        btnStop = document.getElementById('stop_20sec'),
        minutes = document.getElementById('minutes');
    let bee = null;
    btnStart.addEventListener('click', (e) => {
        if(bee) {
            bee.interval = minutes.value * 60000;
        } else {
            bee = new Beeper(minutes.value);
        }
        bee.beep();
        bee.run();
        btnStart.disabled = true;
        btnStop.disabled = false;
    });

    btnStop.addEventListener('click', (e) => {
                btnStop.disabled = true;
                btnStart.disabled = false;
                bee.stop();
                bee = null;
        });
})();

