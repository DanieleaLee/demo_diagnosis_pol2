import { userState } from "@recoil/atoms/user";
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import { useCallback } from "react";
import { User } from "@interfaces/model";


export const useUser = () => {
  const setUserInner = useSetRecoilState<User>(userState);
  const reset = useResetRecoilState(userState);
  const setUser = useCallback((user: User) => {
    setUserInner(user);
  }, []);

  const logout = () => {
    reset();
  };

  return { setUser, logout };
};

export function useUserValue(){
  return useRecoilValue(userState);
}