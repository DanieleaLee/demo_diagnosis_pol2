export const getData = () => {
  let base = +new Date("2010-01-01");
  let oneDay = 24 * 3600 * 1000;
  let data = [[base, Math.random() * 500]];
  const today = +new Date();
  const count = Math.floor((today - base) / oneDay);

  for (let i = 1; i < count; i++) {
    let now = new Date((base += oneDay));
    // data.push([+now, Math.round((Math.random() - 0.5) * 20 + data[i - 1][1])]);
    data.push([+now, Math.round((Math.random() - 0.5) * 10 + data[i - 1][1])]);
  }
  return data;
};

{
  port1: [
    ['날짜', '값'],
    ['날짜', '값'],
    ['날짜', '값'],
    ['날짜', '값'],
    ['날짜', '값'],
    ['날짜', '값'],
  ]
}
