import {VerifyData} from "@components/template/VerifyTemplate";
import {Auth} from "aws-amplify";

export default async (req, res) => {
  const {email, vCode}: VerifyData = req.body;

  try{
    const resp = await Auth.confirmSignUp(email, vCode);
    // console.log('resp', resp, typeof(resp));
    res.json({success:true});

  }catch(e){
    res.json({error: true, e})

  }

}