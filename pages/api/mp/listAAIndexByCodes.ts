import cookie from "cookie";
import {AAIndex} from "@interfaces/model";

export default async (req, res) => {

  let codes = req.query['codes[]'];

  codes = codes.map(c=>`"${c}"`).join(', ');


  const bearer_token = cookie.parse(req.headers.cookie)?.user_token || "";

  const query = `{
      listAAIndexByCodes (codes:[${codes}]) {
        items {
          code,
          name,
          description,
          asset_class,
          leverage,
          size,economic_development,
          region,
          geography,
          tag
        }
      }
  }`;
  console.log(query);
  const {data, errors} = await fetch('https://x5bofqdafra6jknokswrxmvx24.appsync-api.us-east-1.amazonaws.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': bearer_token,
    },
    body: JSON.stringify({query})
  }).then(r => r.json());

  console.log('listAAIndexByCode', data);
  if (!errors){
    const {listAAIndexByCodes} = data;

    res.status(200)
      .json({
        ...listAAIndexByCodes
      });
  }
  else
  {
    console.error(errors);
  }
};
