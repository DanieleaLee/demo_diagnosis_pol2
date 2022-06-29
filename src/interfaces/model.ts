import {NextApiRequest} from "next";

interface BaseModel {
  id: number;
  created_at?: string;
  updated_at?: string;
}

export type NextApiRequestWithSession = NextApiRequest & {
  user?: User;
  session: {
    user?: User;
    id?: string;
    destroy?: () => void;
    commit?: () => void;
  };
};

export interface User extends BaseModel {
  email: string;
  company?: string;
  first_name: string;
  last_name: string;
  bearer_token?: string;
  // img?: string;
  // phno?: string;
  // sns: number;
}

export interface AAPortfolio extends Omit<BaseModel, "id"> {
  id: string;
  name: string;
  note?: string;
  owner?: string;
  process_step: string;
}

export interface AAIndex {
  code: string;
  name: string;
  description: string;
  asset_class: string;
  leverage: string;
  size: string;
  economic_development: string;
  region: string;
  geography: string;
  tag: string[];
}

export enum AAPortfolioStep {
  investment_universe=1,
  model_select=2,
  port_process=3,
  analysis=4,
  reporting=5,

}