// class Observer {
//     constructor(vm,data,value) {
//         this.vm = vm
//         this.value = value
//         this.observe(value)
//     }
import Dep from './dep.js'

export function observe(data) {
    if (typeof data === 'object') {
        for (const key in data) {
            observe(data[key])
            defineReactive(data, key,data[key])
        }
    }

}

function defineReactive(data, key,val) {
    console.log('defineProperty', data, ',', key)
    const dep = new Dep()
    Object.defineProperty(data, key, {
        enumerable: true,
        configurable: true,
        get() {
            // console.log('劫持getter', val, key)
            console.log('劫持getter')
            if (Dep.target) {
                console.log('添加watcher')
                dep.addSub(Dep.target)
            }
            return val
        },

        set(newVal) {
            if (val === newVal){
                return
            }
            console.log('dep',dep)
            val = newVal
            dep.notify()
        }
    })
}

