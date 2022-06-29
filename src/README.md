
## Global Recoil State

본 프로젝트는 `recoil` use 함수들을 다음과 같이 wrapup 된 함수들을 사용하여 개발을 합니다.

`recoil`에 익숙하지 않다면 [공식문서](https://recoiljs.org/docs/introduction/getting-started)를 참고해주세요.



### Setting Getter and Setter for global recoil state


 1 . `recoil` 의 `atom` 은 `src/recoil/atoms` 에서 정의합니다. 단, 모든 `atom`의 key 들은 재활용을 할 수 있도록  `src/recoil/contants`에 
    선 정의한 후 `import` 하여 사용합니다.
    
   - state 가 `model` 에 해당하는 경우, `src/interfaces/model`에 정의된 데이터 타입을 재사용하여 state 를 정의합니다.
   

```typescript jsx
// recoil/constants.ts

export enum Atoms {
  User = "User",
};

```

```typescript jsx
// recoil/atoms/user.ts

import { User } from "@interfaces/model";
import { Atoms } from "@recoil/constants";
import { atom } from "recoil";

export const userState = atom<User>({
  key: Atoms.User,
  default: undefined,
});
```



 2 . 각 `atom`의 hook 함수들을 `recoil use`를 사용하여 wrap up 해줍니다.

```typescript jsx
// recoil/hooks/useUser.ts

import { userState } from "@recoil/atoms/user";
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import { useCallback } from "react";
import { User } from "@interfaces/model";


export const useUser = () => {
  const setUserInner = useSetRecoilState<User>(userState);
  const reset = useResetRecoilState(userState);
  const setUser = useCallback((user: User) => {
    console.log(`setUserInner(${user})`);

    setUserInner(user);
  }, []);

  const logout = () => {
    reset();
  };

  return { setUser, logout };
};

export function useUserValue() {
  return useRecoilValue(userState);
}
```

  3 . Component 에서 recoil state 를 사용할 때는 2. 에서 정의한 hook 들을 사용해줍니다.
  
  
```typescript jsx
import {useUserValue} from "@recoil/hooks/useUser";

const WelcomeMessage = ()=>{
  const user = useUserValue();
  
  return (
    <p> Welcome ${user.name} !</p>
  );
}
```


```typescript jsx
import {useUser} from "@recoil/hooks/useUser";
import {useCallback} from "react";

const LoginButton = ()=>{
  const {setUser} = useUser();
  
  const onSubmit = useCallback(async (e)=>{
    const user = await sendLoginRequest(email, password);
    await setUser(user);
  });
  
  return(<button onClick={onSubmit}/>)
}

```
