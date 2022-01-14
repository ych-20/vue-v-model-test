import Vue from "./vue.js";
const btn = document.querySelector('#btn')
const vue = new Vue({
    el: document.querySelector("#app"),
    data:{
        name:'namenamenamenamename',
        age:'1234',
        input:'input'
    }
})
setTimeout(()=>{
    vue.$data.name = 999
},3000)
