import {request} from "src/api/client";
import {AAIndex, AAPortfolio} from "@interfaces/model";


export async function reqListAAModelPortfolio(): Promise<any> {
  try {
    const {items} = await request({
      url: "/api/mp/listAAModelPortfolio",
      method: "GET",
      // headers: { "X-TOKEN": token },
    });
    return items;
  } catch (e) {
    return undefined;
  }
}



export async function reqListAAIndexByCodes(params:{codes:string[]}) : Promise<AAIndex> {
  try {
    const {items} = await request({
      url: "/api/mp/listAAIndexByCodes",
      method: "GET",
      params,
    });
    return items;
  } catch (e) {
    return undefined;
  }
}

export async function reqUpdateAAModelPortfolio(data:Partial<AAPortfolio>): Promise<any> {
  try {
    return await request({
      url: "/api/mp/updateAAModelPortfolio",
      method: "POST",
      data
    });
  } catch (e) {
    return undefined;
  }

}

export async function reqCreateAAModelPortfolio(data:Omit<AAPortfolio, "id"|"process_step">): Promise<any> {
  try {
    return await request({
      url: "/api/mp/createAAModelPortfolio",
      method: "POST",
      data
    });
  } catch (e) {
    return undefined;
  }

}

export async function reqDeleteAAModelPortfolios(data:{pids:Array< Pick<AAPortfolio,"id"> >}): Promise<any> {
  try {
    return await request({
      url: "/api/mp/deleteAAModelPortfolio",
      method: "POST",
      data
    });
  } catch (e) {
    return undefined;
  }

}
