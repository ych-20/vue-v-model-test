export default class Dep {
    constructor(vm) {
        this.vm = vm
        this.subs = []
    }
    addSub(watcher){
        this.subs.push(watcher)
    }
    notify(){
        this.subs.forEach(watcher =>{
            watcher.notify()
        })
    }
}
