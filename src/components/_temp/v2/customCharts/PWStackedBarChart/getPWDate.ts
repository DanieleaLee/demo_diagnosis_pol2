import { addDate, randomNumforOne } from './helper';

export const labels = ['a', 'b', 'c', 'd', 'e'];

export const pwChartData = () => {
  const temp = [];
  for (let i = 0; i < 200; i++) {
    temp.push(randomNumforOne(5));
  }
  return temp;
};
export const getDateArr = () => {
  const temp = [];
  for (let i = 0; i < 200; i++) {
    temp.push(addDate(new Date(), i));
  }
  return temp;
};
