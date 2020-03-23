

Vue.component('vue-comment-list', {
    props: ['comments'],
    data: function () {
      return {
        comments: this.comments.map(comment => {
            comment.incEnable = true;
            comment.decEnable = true;
        }),
      }
    },
    methods: {
        changeCount: function (i){
            this.comments = this.comments.map(comment=>{
                
                comment.count += i;
                if(i>0){
                    comment.incEnable = comment.decEnable ? false : true;
                    comment.decEnable = true;

                } else{
                    comment.decEnable = comment.incEnable ? false : true;
                    comment.incEnable = true;
                }

                return comment;
            });
        },
    },
    template: `
        <ul class="list-unstyled">
            <li class="my-3" v-for="comment of comments">
                <vue-comment v-bind:comment="comment" @change-count="changeCount"></vue-comment>
                <vue-comment-list class="ml-5" v-if="comment.children.length" v-bind:comments="comment.children"></vue-comment-list>
            </li>
        </ul>
    `
});

Vue.component('vue-comment', {
    props: ['comment'],
    data: function () {
      return {
        comment: {}
      }
    },
    template: `
        <div class="card border-secondary border-bottom pb-3">
            <div class="card-body">
                <time class="text-muted mr-2"><i class="far fa-clock"></i>{{comment.time}}</time>
                <p class="mt-2">{{comment.text}}</p>
                <span class="mr-3">
                    <button :disabled="!comment.decEnable" href="" @click.prevent="$emit('change-count', -1)" class="btn btn-link text-secondary"><i class="far fa-thumbs-down"></i></button>
                    <span class="text-secondary">{{comment.count}}</span>
                    <button :disabled="!comment.incEnable" href=""  @click.prevent="$emit('change-count', 1)" class="btn btn-link text-secondary"><i class="far fa-thumbs-up"></i></button>
                </span>
                <a href="#" class="btn btn-secondary">Reply</a>
            </div>
        </div>
    `
});





var comp = new Vue({
    el: '#components',
    data:{
        comments: [
            {
                id: 1,
                time: "March 22, 2020",
                text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alias quae recusandae iusto dolore, porro at error nulla et ea aut iure sequi perspiciatis in! Consectetur ipsa, eius maxime perspiciatis voluptates autem facilis. Cupiditate debitis temporibus nam doloremque ab quam tenetur illo eveniet magnam dolore, facere assumenda quae delectus repudiandae officiis.",
                count: 5,
                children: [
                    {
                        id: 11,
                        time: "March 27, 2020",
                        text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alias quae recusandae iusto dolore, porro at error nulla et ea aut iure sequi perspiciatis in! Consectetur ipsa, eius maxime perspiciatis voluptates autem facilis. Cupiditate debitis temporibus nam doloremque ab quam tenetur illo eveniet magnam dolore, facere assumenda quae delectus repudiandae officiis.",
                        count: 11,
                        children: []
                    },
                    {
                        id: 12,
                        time: "March 27, 2020",
                        text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alias quae recusandae iusto dolore, porro at error nulla et ea aut iure sequi perspiciatis in! Consectetur ipsa, eius maxime perspiciatis voluptates autem facilis. Cupiditate debitis temporibus nam doloremque ab quam tenetur illo eveniet magnam dolore, facere assumenda quae delectus repudiandae officiis.",
                        count: 11,
                        children: [
                            {
                                id: 121,
                                time: "March 27, 2020",
                                text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alias quae recusandae iusto dolore, porro at error nulla et ea aut iure sequi perspiciatis in! Consectetur ipsa, eius maxime perspiciatis voluptates autem facilis. Cupiditate debitis temporibus nam doloremque ab quam tenetur illo eveniet magnam dolore, facere assumenda quae delectus repudiandae officiis.",
                                count: 11,
                                children: []
                            },
                            {
                                id: 122,
                                time: "March 27, 2020",
                                text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alias quae recusandae iusto dolore, porro at error nulla et ea aut iure sequi perspiciatis in! Consectetur ipsa, eius maxime perspiciatis voluptates autem facilis. Cupiditate debitis temporibus nam doloremque ab quam tenetur illo eveniet magnam dolore, facere assumenda quae delectus repudiandae officiis.",
                                count: 11,
                                children: []
                            }
                        ]
                    },
                ]
            },
            {
                id: 2,
                time: "March 29, 2020",
                text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alias quae recusandae iusto dolore, porro at error nulla et ea aut iure sequi perspiciatis in! Consectetur ipsa, eius maxime perspiciatis voluptates autem facilis. Cupiditate debitis temporibus nam doloremque ab quam tenetur illo eveniet magnam dolore, facere assumenda quae delectus repudiandae officiis.",
                count: 0,
                children: []
            },
        ]
    }

});