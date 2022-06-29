import AppDB from "@pages/api/models"
import fs from "fs";


// const lines = f.("\n")


(async()=>{


  AppDB.UserInfo.create({
    email: "it@is.me",
    password: "asdf",
    nickname: "itisme",
    plan: 1,
    sns: 0,
  });

  AppDB.MacroInfo.create({
    symb: "GDPC1",
    desc: "Real gross domestic product is the inflation adjusted value of the goods and services produced by labor and property located in the United States.For more information see the Guide to the National Income and Product Accounts of the United States (NIPA). For more information, please visit the Bureau of Economic Analysis.",
    name: "Real Cross Domestic Product",
    units: "dollar",
    freq: "Quarterly",
    src: "FRED Economic Research",
    release: "Jan 10 2022",
    copyright: "",
    country: "United States",
  });

  let file = fs.readFileSync('batches/gdpc1.csv');
  const tms = file.toString().split("\r\n").slice(1,-1).map(l=>{
    const [basc_dt, value] = l.split(',');
    return { basc_dt, idxid:1, value }
  });
  AppDB.MacroTms.bulkCreate(tms);

  await AppDB.AaTarget.bulkCreate([
    {
      name: "Maximize Sharpe Ratio",
      desc: "Sharpe ratio is used to help investors understant the return of an investment compared to its risk. The ratio is the average return earned in excess of the risk-free rate per unit of vaolatility or total risk."
    },
    {
      name: "Minimize Variance",
      desc: "The term variance refers to a statistical measurement of the spread between numbers in a data set. More specifically, variance measures how far each number in the set is from the mean and thus from every other number in the set."
    },
    {
      name: "Minimize Volatility subject to Targeted Annual Return",
      desc: "Volatility is a statistical measure of the dispersion of returns for a given security or market index. In most cases the higher the volatility the riskier the security."
    }
  ]);


  await AppDB.AaTrgopt.bulkCreate([
    {
      tid: 1,
      name: "max_sharp_opt1",
      desc: "max sharpe option1",
      type: 0,
    },
    {
      tid: 1,
      name: "max_sharp_opt2",
      desc: "max sharpe option2",
      type: 0,
    },
    {
      tid: 2,
      name: "min vol opt1",
      desc: "min vol option1",
      type: 1,
    }
  ]);

  await AppDB.IdxInfo.bulkCreate([
    {
      symb: "SNP 500",
      desc: "Standard and Poor 500",
      class: "Equity",
      // levl: "",
      size: "Total Market",
      econ_dev: "Developed Market",
      reg: "North America",
    },
    {
      symb: "KOSPI",
      desc: "Korea major market",
      class: "Equity",
      // levl: "",
      size: "Larget Cap",
      econ_dev: "Developed Market",
      reg: "Asia-Pacific",
    },
    {
      symb: "NASDAQ",
      desc: "nasdaq",
      class: "Equity",
      // levl: "",
      size: "Large Cap",
      econ_dev: "Developed Market",
      reg: "North America",
    },
  ]);

  await AppDB.SecInfo.bulkCreate([
    {
      gvkey: '001690',
      iid: '01',
      company: 'APPLE COMPUTER INC'
    },
    {
      gvkey: '064768',
      iid: '01',
      company: 'AMAZON COM INC'
    }
  ]);

  let f = fs.readFileSync('batches/data-1641975482421.csv');
  const sectms = f.toString().split("\r\n").slice(1,-1).map(l=>{
    const [basc_dt, gvkey, _, value] = l.split(',');
    return { basc_dt:basc_dt.replace(/"/g,""), sid:(gvkey.replace(/"/g,"")=="001690")?1:2, value: parseFloat(value.replace(/"/g,""))}

  });
  await AppDB.SecTms.bulkCreate(sectms);

  await AppDB.UserUniv.create({
    uid: 1,
    comment: "my first universe"
  });

  await AppDB.UserUvlist.bulkCreate([
    {
      uvid: 1,
      idxid: 1,
    },
  ]);

  await AppDB.UserDataset.create({
    uid: 1,
    comment: "my first dataset"
  });

  await AppDB.UserDslist.bulkCreate([
    {
      dsid: 1,
      mid: 1,
    },
  ]);


})();




console.log('load done')