class Watcher {
    /**
     *
     * @param vm
     * @param exp 类似于key
     * @param cb  回调
     */
    constructor(vm,exp,cb) {
        this.vm = vm
        this.exp = exp
        this.cb = cb
        this.value = this.cb()
    }
    notify(){
        this.runner()
    }
    runner(){
     this.cb()
    }
}
