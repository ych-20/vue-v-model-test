import Compiler from "./compiler.js";
import Watcher from "./watcher.js"
import Dep from "./dep.js";
// const observe = require("./observer.js");
import {observe} from "./observer.js";
export default class Vue {
    constructor(options) {
        const {el,data,mounted} = options
        this.$options = options
        this.$data = data
        this.$el = el
        observe(data)
        const compile = new Compiler(this,el)
        const watcher = new Watcher(this,'',compile.render)
        this.$watcher = watcher
        Dep.target = watcher
        compile.render()
        Dep.target = null
    }
}
