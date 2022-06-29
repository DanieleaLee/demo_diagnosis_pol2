import {VerifyData} from "@components/template/VerifyTemplate";
import {request} from "./client";

export async function reqVerify (data: VerifyData): Promise<any> {
  return  await request({url:"/api/verify", method:"POST", data});
}