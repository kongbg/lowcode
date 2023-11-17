// 一套默认主题以及一套暗黑主题
export const themes = {
  default: {
    baseColor: `#409EFF`, // 基色（无变化）
    pageBgColor: `${255}, ${255},${255}`, // 页面的背景色
    scrollBgColor: `${0}, ${0},${0}`, // 滚动条的背景色
    resultBgColor: `${255}, ${192},${203}`, // 结果背景色
    resultBorderColor: `${255}, ${255},${0}`, // 结果区背景色
    resultTextColor: `${0}, ${0},${0}, 0.9`, // 结果文字
    border: `1px solid red`
  },
  dark: {
    baseColor: `#67C23A`, // 基色（无变化）
    pageBgColor: `${0}, ${0},${0}`, // 页面的背景色
    scrollBgColor: `${255}, ${255},${255}`, // 滚动条的背景色
    resultBgColor: `${135}, ${206},${235}`, // 结果背景色
    resultBorderColor: `${0}, ${128},${0}`, // 结果区背景色
    resultTextColor: `${255}, ${255},${255}, 0.9`, // 结果文字
  },
};
