var app = new Vue({
    el: '#app',
    data: {
        message: 'Hi, Vue!',
        newItem: '',
        errorMessage: '',
        items: [
            {
                name: 'milk',
                done: false,
                id: 1,
            },
            {
                name: 'bread',
                done: false,
                id: 2,
            },
            {
                name: 'Crumbs',
                done: false,
                id: 3,
            },
            {
                name: 'Eggs',
                done: false,
                id: 4,
            }
        ],
    },
    computed: {

        countToBuy(){

            return this.items.reduce((sum, item)=>!item.done? sum + 1 : sum, 0);
        },
        countBought(){
            return this.items.reduce((sum, item)=>item.done? sum + 1 : sum, 0);
        }
    },

    methods: {
        create(e){
            e.preventDefault();

            if(this.items.some(item=>item.name.toLowerCase() == this.newItem.toLowerCase())) {
                console.log('Exist');
                this.newItem = "";
                this.errorMessage = "There is one in the list alredy!";
                return;
            }

            this.items.push({
                id: this.items[this.items.length - 1].id+1,
                name: this.newItem,
                done: false,
            });

            this.newItem = "";
            this.errorMessage = "";
            
        }
    }
});

