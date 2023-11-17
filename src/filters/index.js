import Vue from 'vue';

// 列表通过类型id获取label
Vue.filter('getLabelByKey', (data, key='', Enum=null) => {
    if (!key) {
        console.warn('请传入列表prop');
        return '';
    }
    if (!Enum) {
        console.warn('请传入字段Enum');
        return '';
    }
    let info = Enum[key].find(item=>item.value == data);
    return info && info.label || '';
})