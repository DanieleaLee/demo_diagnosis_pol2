export const getMddData = ()=> {
  let base = +new Date('2022-01-01');
  const oneDay = 24 * 3600 * 1000;
  let data = [[base, 100000]];
  const today = +new Date();
  const count = Math.floor((today - base) / oneDay);

  for (let i = 1; i < count; i++) {
    let now = new Date((base += oneDay));
    let price = (Math.random() - 0.5) * 10000 + data[i - 1][1];
    if (data[i - 1][1] * 0.7 > price) {
      price = data[i - 1][1] * 0.7;
    }

    data.push([+now, Math.round(price)]);
  }

  let max = data[0][1];

  return data.map((el) => {
    let res = [el[0], (el[1] / max - 1) * 100];
    if (el[1] > max) {
      max = el[1];
      res = [el[0], 0];
    }

    return res;
  });
};
