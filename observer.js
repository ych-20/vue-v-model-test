class Observer {
    constructor(vm,data,value) {
        this.vm = vm
        this.value = value
        this.observe(value)
    }
    observe(data){
        if (typeof data === 'object'){
            for (const key in data) {
                this.defineReactive(data,key)
                this.observe(data[key])
            }
        }

    }

    defineReactive(data,key) {
        console.log('defineProperty',data,',',key)
        Object.defineProperty(data,key,{
            enumerable:true,
            configurable:true,
            get(){
                console.log('劫持getter',data,key)
                return data[key]
            },
            set(newVal){
                console.log('劫持setter',data,',',key,',',newVal)
                data[key] = newVal
            }
        })
    }
}
