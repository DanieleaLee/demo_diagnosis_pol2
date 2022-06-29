import cookie from "cookie";
import {AAPortfolio} from "@interfaces/model";

export default async (req, res) => {

  const {id, ...payload}:Partial<AAPortfolio> = req.body;
  const bearer_token = cookie.parse(req.headers.cookie)?.user_token || "";

  const {data, errors} = await fetch('https://x5bofqdafra6jknokswrxmvx24.appsync-api.us-east-1.amazonaws.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': bearer_token,
    },
    body: JSON.stringify({query: `mutation {
      updateAAModelPortfolio(input:{
        id: "${id}",
        ${payload.name && `name: "${payload.name}"`},
        update_last_update: false
      }
      ){
        id
      }
    }`})
  }).then(r => r.json());

  if (!errors){
    const {listAAModelPortfolios: AAPortfolios} = data;

    res.status(200)
      .json({
        ...AAPortfolios
      });
  }
  else
  {
    console.error(errors);
  }
};