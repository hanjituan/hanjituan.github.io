var vm = new Vue({
    el: '.wraper',
    data: {
        msg: 'hello word',
        loginForm: {
            phone: '',
            password: '',
            input1: '',
            input2: '',
            input3: '',
            select: ''
        }
    },
    methods: {
        login() {
            window.location.href = 'index.html'
        }
    }
})