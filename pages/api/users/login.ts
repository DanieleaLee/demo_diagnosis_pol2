import {serialize} from "cookie";
import {signIn} from "@modules/Amplify";
import {LoginData} from "@components/template/Login/LoginTemplate";
import {parseError} from "src/lib/util";
import {User} from "@interfaces/model";

export default async (req, res) => {
  const {email: reqEmail, password, ...payload}:LoginData = req.body;

  if(!password){
    res.json({
      success:false,
      message: "password please",
    });
    return;
  }

  try {
    const user = await signIn({email:reqEmail, password});
    const {
      idToken:{
        jwtToken
      }
    } = user;

    const [id, email, first_name] = [
      user['username'],
      user['email'],
      user['custom:first_name'],
    ];

    res.setHeader('Set-Cookie', serialize('user_token', jwtToken, {
      path:     "/",
      maxAge:   3600,
      httpOnly: true,
      // secure:   true
    }));

    res.setHeader("Access-control-Allow-Credentials", true);

    res.status(200)
      .json({
        success: true,
        user: { email, first_name },
      });
  }
  catch(e){
    /**
     * 로그인에 실패한 경우.
     * */
    res.json({
      error: parseError(e)
    });

  }

};
