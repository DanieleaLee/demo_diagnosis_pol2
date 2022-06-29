import cookie from "cookie";

export default async (req, res) => {

  const bearer_token = cookie.parse(req.headers.cookie)?.user_token || "";

  const {data, errors} = await fetch('https://x5bofqdafra6jknokswrxmvx24.appsync-api.us-east-1.amazonaws.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': bearer_token,
    },
    body: JSON.stringify({query: `{
      getUserInfo {
        email
        first_name
        last_name
      }
    }`})
  }).then(r => r.json());

  if (!errors){
    const {getUserInfo: user} = data;

    res.status(200)
      .json({
        ...user
      });
  }
  else
  {
    console.error(errors);
  }

};

