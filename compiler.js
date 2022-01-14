export default class Compiler {
    constructor(vm,el) {
        const fragment = document.createDocumentFragment()
        this.vm = vm
        el.childNodes.forEach(chNode =>{
            fragment.appendChild(chNode.cloneNode(true))
        })
        // 为input 标签 添加事件
        this.compileVModelEvent(el)
        this.render = ()=>{
            const fragmentClone = fragment.cloneNode(true)
            this.compileNode(fragmentClone)
            // el.innerHTML = ''
            // el.appendChild(fragmentClone)
            this.replaceNode(fragmentClone,el)
        }
    }
    compileNode(node){
        node.childNodes.forEach((chNode,idx) =>{
            if (chNode.childNodes.length){
                this.compileNode(chNode)
            } else if (chNode.nodeType === Node.TEXT_NODE){
                // textContent 有多个 {{  }}  只会处理第一个  只简单实现一个 原理即可
                // '{{chNode.textContent}}  {{asdf21344}}'.replace(/\{\{(.+?)\}\}/g, (...args) => {
                chNode.textContent = chNode.textContent.replace(/\{\{(.+?)\}\}/g, (...args) => {
                    const dateKey = args[1].trim()
                    return this.vm.$data[dateKey]
                });
            }else if (chNode.nodeType === Node.ELEMENT_NODE && chNode.nodeName.toLowerCase() === 'input'){
                // 对input 的 v-model 进行处理
                const vModelKey = chNode.attributes.getNamedItem('v-model')?.value?.trim?.()
                if (vModelKey){
                    chNode.value = this.vm.$data[vModelKey]
                    chNode.attributes.removeNamedItem('v-model')
                }
            }
        })
    }

    replaceNode(newFragment,oldEl){
        oldEl.childNodes.forEach((oldChNode,idx) =>{
            const newNode = newFragment.childNodes[idx]
            if (oldChNode.childNodes?.length){
                this.replaceNode(newNode,oldChNode)
            }else if (oldChNode.nodeType === Node.TEXT_NODE){
                // textContent 有多个 {{  }}  只会处理第一个  只简单实现一个 原理即可
                newNode.textContent !== oldChNode.textContent && (oldChNode.textContent = newNode.textContent)
            }else if (oldChNode.nodeType === Node.ELEMENT_NODE && oldChNode.nodeName.toLowerCase() === 'input'){
                // 对input 的 v-model 进行处理
                newNode.value !== oldChNode.value && (oldChNode.value = newNode.value)
            }
        })
    }

    compileVModelEvent(elNode){
        elNode.childNodes.forEach((chNode,idx) =>{
            if (chNode.childNodes.length){
                this.compileVModelEvent(chNode)
            } else if (chNode.nodeType === Node.ELEMENT_NODE && chNode.nodeName.toLowerCase() === 'input'){
                // 对input 的 v-model 进行处理
                const vModelKey = chNode.attributes.getNamedItem('v-model')?.value?.trim?.()
                if (vModelKey){
                    chNode.addEventListener('input',(e)=>{
                        const {value} = e.target
                        this.vm.$data[vModelKey] = value
                    })
                }
            }
        })
    }
}
