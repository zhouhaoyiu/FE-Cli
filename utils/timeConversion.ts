function ms2s(ms: string = "1000ms") {
  const reg = /\d+/g;
  const s = Number(ms.match(reg)![0]) / 1000;
  return s;
}

function s2ms(s: string = "1s") {
  //得到s之前的所有数字，并乘以1000返回
  const reg = /\d+/g;
  const ms = Number(s.match(reg)![0]) * 1000;
  return ms;
}

export { ms2s, s2ms };
