/**
 * @author zhouhaoyiu
 * @param ms 毫秒数
 * @returns 秒数
 */

function ms2s(ms: string = "1000ms"): number {
  const reg = /\d+/g;
  const s = Number(ms.match(reg)![0]) / 1000;
  return s;
}

/**
 * @author zhouhaoyiu
 * @param s 秒数 默认1s 输入形式为"数字s"
 * @returns 毫秒数
 */
function s2ms(s: string = "1s"): number {
  //得到s之前的所有数字，并乘以1000返回
  const reg = /\d+/g;
  const ms = Number(s.match(reg)![0]) * 1000;
  return ms;
}

export { ms2s, s2ms };
