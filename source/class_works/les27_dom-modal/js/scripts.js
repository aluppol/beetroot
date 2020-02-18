( function () {
    'use strict';

    class Modal {

        width = 300;
        content = 'Empty';

        constructor (options = {}) {
            this.content =  ('content' in options) ? options.content : this.content;
            this.width = ('width' in options) ? options.width : this.width;
            let now = new Date();
            this.id = 'modal-' + now.getMilliseconds();
            this.html = `
            <div class = "modal" id="${this.id}" style="width: ${this.width}px">
                <div class = "modal__content">
                    ${this.content}
                </div>
                <div class = "modal__footer">
                    <button data-modal="close">Close</button>
                </div>
            </div>
            `;

            document.body.insertAdjacentHTML ('beforeend',this.html);
            document.getElementById(this.id).lastElementChild.firstElementChild.addEventListener('click', (e)=>{
                this.close();
            });
        }

        close () {
            document.getElementById(this.id).classList.remove('opened');
        }
        open () {
            document.getElementById(this.id).classList.add('opened');
        }

       
    }


    let btns = document.querySelectorAll(`[data-modal]`);
    let myModal;

    btns.forEach((btn)=>{
        btn.addEventListener('click', (e)=>{
            let _this = e.target;
            if (_this.getAttribute('data-modal') == 'close'){

                if(myModal){
                    myModal.close();
                } 
            } else {
                if(!myModal){
                    myModal = new Modal({content: 'Hello Beetroot!', width: 200});
                } 
                myModal.open();
                
            }
        });
    });

} )();