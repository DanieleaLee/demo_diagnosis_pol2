import { User } from "@interfaces/model";
import { Atoms } from "@recoil/constants";
import { atom } from "recoil";


export const userState = atom<User>({
  key: Atoms.User,
  default: undefined,
});
