const {observe} = require("./observer");

class Vue {
    constructor(options) {
        const {el,data,mounted} = options
        this.$options = options
        this.$data = data
        this.$el = el
        observe(data)
    }
}
