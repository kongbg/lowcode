/**
 * @function - 自动注册全局组件，组件写好后自动注册
 * @param {string} fileName - 文件目录，会根据这个路径进行查找
 * @param {bool} isfindSon - 是否查找子集
 * @param {reg} searchRule - 查找规则
 */
const components = require.context('../components/common', true, /index\.vue$/)
const install = Vue => {
    // 如果组件被注册就返回,没有就注册
    if (install.installed) return
    install.installed = true

    let names = [];
    components.keys().forEach(filename => {
        let component = components(filename).default;
        let name = component.name;
        if (name) {
            if (names.includes(name)) {
                console.warn(
                    `发现同名组件，该组件将注册失败，组件路径：${component.__file}`
                )
            } else {
                names.push(name)
                Vue.component(name, component)
            }
        } else {
            console.warn(
                `组件：${component.__file} 未命名，导致注册失败！请定义name属性。`
            )
        }
    })
}
// 默认暴露
export default {
    install
}