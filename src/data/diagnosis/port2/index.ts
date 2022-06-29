import factor_bar from "./Demoport2_stock_factor_bar.json";
import factor_radar from "./Demoport2_stock_factor_radar.json";
import factor_top_exposure from "./Demoport2_stock_factor_top_exposure.json";
import inflation_score from "./Demoport2_stock_inflation_score.json";
import inflation_treemap from "./Demoport2_stock_inflation_treemap.json";
import info_riskreturn from "./Demoport2_stock_info_riskreturn.json";
import info_table from "./Demoport2_stock_info_table.json";
import sector_bar from "./Demoport2_stock_sector_bar.json";
import sector_top_exposure from "./Demoport2_stock_sector_top_exposure.json";
import sector_treemap from "./Demoport2_stock_sector_treemap.json";
import summary_factor from "./Demoport2_stock_summary_factor.json";
import summary_riskreturn from "./Demoport2_stock_summary_riskreturn.json";
import summary_sector from "./Demoport2_stock_summary_sector.json";
import summary_sw from "./Demoport2_stock_summary_sw.json";
import summary_wordcloud from "./Demoport2_stock_summary_wordcloud.json";

export const portfolio2 = {
  summary: {
    factor: summary_factor,
    riskreturn: summary_riskreturn,
    sector: summary_sector,
    topScores: summary_sw,
    wordcloud: summary_wordcloud,
  },
  info: {
    riskreturn: info_riskreturn,
    table: info_table,
  },
  sector: {
    top_exposure: sector_top_exposure,
    treemap: sector_treemap,
    bar: sector_bar,
  },
  factor: {
    bar: factor_bar,
    radar: factor_radar,
    top_exposure: factor_top_exposure,
  },
  inflation: {
    score: inflation_score,
    treemap: inflation_treemap,
  },
};
