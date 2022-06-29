import {SignupData} from "@components/template/RegisterTemplate";
import {signUp, CognitoUserResponse} from "@modules/Amplify";

export default async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    company,
    password,
    ...payload
  }: SignupData = req.body;



  try{
    const resp : CognitoUserResponse = await signUp({
      email,
      password,
      firstName,
      lastName,
      company
    });
    const {username} = resp;
    res.json({success:true, username});
  } catch (e){
    res.json({error:true, err:e});
  }
}