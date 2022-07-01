const period_data = [
  {
    id: 1,
    name: "Inflation period",
    periods: [
      {
        id: 1,
        start_date: "1980-12-30",
        end_date: "1990-12-31",
        cagr: "6.3%",
        volatility: "3.4%",
        mdd: "5.20%",
        hip: "3.2%",
        sharpe: "1.85",
        var: "5.20%",
        beta: "0.44",
        chart: -90
      },
      {
        id: 2,
        start_date: "1980-12-30",
        end_date: "2000-12-31",
        cagr: "6.3%",
        volatility: "3.4%",
        mdd: "5.20%",
        hip: "3.2%",
        sharpe: "1.85",
        var: "5.20%",
        beta: "0.44",
        chart: -70
      },
      {
        id: 3,
        start_date: "1990-12-30",
        end_date: "2005-12-31",
        cagr: "6.3%",
        volatility: "3.4%",
        mdd: "5.20%",
        hip: "3.2%",
        sharpe: "1.85",
        var: "5.20%",
        beta: "0.44",
        chart: 11
      },
      {
        id: 4,
        start_date: "1995-12-30",
        end_date: "2015-12-31",
        cagr: "6.3%",
        volatility: "3.4%",
        mdd: "5.20%",
        hip: "3.2%",
        sharpe: "1.85",
        var: "5.20%",
        beta: "0.44",
        chart: -30
      },
      {
        id: 5,
        start_date: "1990-12-30",
        end_date: "2000-12-31",
        cagr: "6.3%",
        volatility: "3.4%",
        mdd: "5.20%",
        hip: "3.2%",
        sharpe: "1.85",
        var: "5.20%",
        beta: "0.44",
        chart: -90
      }
    ]
  },
  {
    id: 2,
    name: "Whole period",
    periods: [
      {
        id: 1,
        start_date: "",
        end_date: "",
        cagr: "6.3%",
        volatility: "3.4%",
        mdd: "5.20%",
        hip: "3.2%",
        sharpe: "1.85",
        var: "5.20%",
        beta: "0.44",
        chart: -90
      }
    ]
  }
];

const benchmark_data = [
  {
    id: 1,
    name: "S&P 500"
  },
  {
    id: 2,
    name: "Nasdaq 100"
  },
  {
    id: 3,
    name: "DJI"
  },
  {
    id: 4,
    name: "Russell 2000"
  }
];

const rebalancing_data = [
  {
    id: 1,
    name: "Yearly First biz day"
  },
  {
    id: 2,
    name: "Yearly Last biz day"
  },
  {
    id: 3,
    name: "Quarterly First biz day"
  },
  {
    id: 4,
    name: "Quarterly Last biz day"
  },
  {
    id: 5,
    name: "Monthly First biz day"
  },
  {
    id: 6,
    name: "Monthly Last biz day"
  },
  {
    id: 7,
    name: "Buy & Hold"
  }
];

export const overlay_result_filterbox = [
  {
    id: 1,
    type: "original",
    name: "Original Portfolio",
    backTesting_period: {
      start_date: "1980-12-30",
      end_date: "2020-12-31"
    },
    transaction_cost: 50,
    rebalancing_frequency: rebalancing_data,
    period_type: period_data
  },
  {
    id: 2,
    type: "overlaid1",
    name: "Overlaid Portfolio1 (Asset Class Fixed)",
    backTesting_period: {
      start_date: "1980-12-30",
      end_date: "2020-12-31"
    },
    transaction_cost: 30,
    rebalancing_frequency: rebalancing_data,
    period_type: period_data
  },
  {
    id: 3,
    type: "overlaid2",
    name: "Overlaid Portfolio2 (Sector Fixed)",
    backTesting_period: {
      start_date: "1980-12-30",
      end_date: "2020-12-31"
    },
    transaction_cost: 30,
    rebalancing_frequency: rebalancing_data,
    period_type: period_data
  },
  {
    id: 4,
    type: "overlaid3",
    name: "Overlaid Portfolio3 (Factor Fixed)",
    backTesting_period: {
      start_date: "1980-12-30",
      end_date: "2020-12-31"
    },
    transaction_cost: 30,
    rebalancing_frequency: rebalancing_data,
    period_type: period_data
  },
  {
    id: 5,
    type: "overlaid4",
    name: "Overlaid Portfolio4",
    backTesting_period: {
      start_date: "1980-12-30",
      end_date: "2020-12-31"
    },
    transaction_cost: 30,
    rebalancing_frequency: rebalancing_data,
    period_type: period_data
  },
  {
    id: 6,
    type: "benchmark",
    name: benchmark_data,
    backTesting_period: {
      start_date: "1980-12-30",
      end_date: "2020-12-31"
    },
    transaction_cost: 50,
    rebalancing_frequency: [],
    period_type: period_data
  }
];
