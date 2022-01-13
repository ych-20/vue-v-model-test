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
            defineReactive(data, key)
            observe(data[key])
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
            console.log('劫持getter', data, key)
            if (Dep.target) {
                dep.addSub(Dep.target)
            }
            return data[key]
        },
        set(newVal) {
            if (val === newVal){
                return
            }
            console.log('劫持setter', data, ',', key, ',', newVal)
            dep.notify()
            data[key] = newVal
        }
    })
}
// }

function Test(){
    console.log('asdffff1')
}
Test.prototype = {
    get() {
        console.log('ggggggggggg')
        return 'wwwwwww';
    }
}
