export default class Compiler {
    constructor(vm,el) {
        const fragment = document.createDocumentFragment()
        this.vm = vm
        console.log('chNode,chNode',el)
        el.childNodes.forEach(chNode =>{
            fragment.appendChild(chNode.cloneNode(true))
        })
        // const _elClone = el.cloneNode()
        this.render = ()=>{
            const fragmentClone = fragment.cloneNode(true)
            this.compileNode(fragmentClone)
            el.innerHTML = ''
            console.log(fragmentClone)
            el.appendChild(fragmentClone)
        }
    }
    compileNode(node){
        node.childNodes.forEach(chNode =>{
            console.log(chNode,chNode.childNodes)
            if (chNode.childNodes.length){
                this.compileNode(chNode)
            } else if (chNode.nodeType === Node.TEXT_NODE){
                // textContent 有多个 {{  }}  只会处理第一个  只简单实现一个 原理即可
                // '{{chNode.textContent}}  {{asdf21344}}'.replace(/\{\{(.+?)\}\}/g, (...args) => {
                console.log('chNode',chNode)
                chNode.textContent = chNode.textContent.replace(/\{\{(.+?)\}\}/g, (...args) => {
                    const dateKey = args[1].trim()
                    console.log('args',args)
                    return this.vm.$data[dateKey]
                });
            }
        })
    }
}
