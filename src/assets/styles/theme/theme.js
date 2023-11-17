import { themes } from "./model";

// 修改页面中的样式变量值
const changeStyle = (obj) => {
  // 如果输入不是对象或者为null，则抛出错误
  if (typeof obj !== 'object' || obj === null) {
    throw new Error('Invalid input: obj must be an object');
  }
  // 遍历输入对象，设置页面样式变量的值
  for (let key in obj) {
    document.documentElement.style.setProperty(`--${key}`, obj[key]);
  }
};

// 改变主题的方法
export const setTheme = (themeName) => {
  // 如果themeName为空或者不是字符串，则抛出错误
  if (!themeName || typeof themeName !== 'string') {
    throw new Error('Invalid themeName');
  }
  // 将主题名称保存到本地存储，以便下次使用
  localStorage.setItem("theme", themeName);
  // 获取对应主题的配置，如果不存在则使用默认主题的配置
  const themeConfig = themes[themeName] || themes["default"];
  // 调用changeStyle方法，改变页面样式
  changeStyle(themeConfig);
};