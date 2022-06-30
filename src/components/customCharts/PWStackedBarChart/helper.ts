export const addDate = (date: Date, days: number) => {
  const _date = new Date(date.valueOf());
  _date.setDate(_date.getDate() + days);

  return _date.toISOString().split('T')[0];
};

export const randomNumforOne = (cnt) => {
  const raw_ = Array(cnt).fill(1);
  const db_ = raw_.reduce((acc, cur) => {
    const init_ = Math.random() * 0.2;
    const last_sum = acc.reduce((partialSum, a) => partialSum + a, 0);
    const remain_Max = ![...acc].slice(-1) ? 1 - init_ : 1 - last_sum;
    const remain_ran = Math.random() * (remain_Max * Math.random() * remain_Max);
    const cur_ = acc.length == raw_.length - 1 ? 1 - last_sum : remain_ran;
    return [...acc, cur_];
  }, []);
  return db_;
};
