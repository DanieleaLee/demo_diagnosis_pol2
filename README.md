
# AI Studio Front-end


## Getting Started

### Run Development Server
```bash
npm install & npm run dev
# or
npm install & yarn dev
```

### Open up Storybook

컴포넌트 usage 를 `storybook`을 활용해 정의한다.

```bash
npm run storybook
```

## Run Browser Automation Test

브라우저 자동화 테스트에는 `cypress`를 사용한다.
개발서버를 올린 후 `cypress`를 가동한다

```bash
npm run dev
npm run cypress:open
```

## Run Headless Render Test

`jest` 를 사용하여 각 컴포넌트 기본 렌더링 및 기능 테스트를 한다.

```bash
npm run cypress:open
```


## Project Source

### cypress/integration

`cypress` 테스트 모듈.
컴포넌트 파일에서 `react JSX` 요소에 `data-test` attribute 로 마킹을 한 후, cypress 에서 해당 태그를 확인하거나 action 을 취한다.

#### Example
```typescript jsx
//Button.tsx

const Button = ()=>{
  return (
    <>
      <button/>
      {is_development && <div data-test="must-exist-button"/>}
    </>
    
  );
}
```

```typescript
describe("Cypress Test", () => {
  beforeEach(() => {
    cy.visit("/page/to/test");
  });


  it("Has Target Button", () => {
    const loginButton = cy.getBySel('must-exist-button');
    expect(loginButton).not.equal(null);
  });

});

```

### pages/**

`next/router` 가 라우팅 하는 페이지로 페이지 렌더링의 top-level 컴포넌트를 정의한다.
컴포넌트 정의는 `Container -> Template` 으로 정의한다.
`container` 는 header/footer 및 페이지 너비를 정의하고 나머지 body 에서부터 `template` 에서 정의된다.(하단 참조)


! 현재 mock-up API 도 pages 에 포함됨.

### public

정적 소스 파일들은 여기에 추가한다.



### src/api

`back-end`API 호출함수를 정의한다.
`src/api/client` 의 `request` 함수를 이용하면 된다.

```ts
import {request} from "./client";

export async function reqUsersLogin(data: { email: string; password: string }): Promise<User> {
  return await request({ url: "/api/users/login", method: "POST", data: data });
}
```


### src/components/atoms/**

렌더링 되는 가장 최소단위의 `JSX` 컴포넌트를 정의한다.

컴포넌트를 추가할때는 컴포넌트 경로에 3파일을 구현해야 한다.
 - index.tsx  (컴포넌트 구현)
 - index.spec.tsx (Jest 테스트 코드)
 - index.stories.tsx (스토리북 컴포넌트)
 

### src/components/molecules/**

렌더링 되는 `atom` 컴포넌트의 결합으로 분자단위의 `JSX` 컴포넌트를 정의한다.

컴포넌트를 추가할때는 컴포넌트 경로에 3파일을 구현해야 한다.
 - index.tsx  (컴포넌트 구현)
 - index.spec.tsx (Jest 테스트 코드)
 - index.stories.tsx (스토리북 컴포넌트)
 

### src/components/atoms/**

렌더링 되는 유기체 JSX 컴포넌트를 정의한다.

컴포넌트를 추가할때는 컴포넌트 경로에 3파일을 구현해야 한다.
 - index.tsx  (컴포넌트 구현)
 - index.spec.tsx (Jest 테스트 코드)
 - index.stories.tsx (스토리북 컴포넌트)
 
 
### src/components/atoms/**

렌더링 되는 페이지 body를 정의한다.

컴포넌트를 추가할때는 컴포넌트 경로에 3파일을 구현해야 한다.
 - index.tsx  (컴포넌트 구현)
 - index.spec.tsx (Jest 테스트 코드)
 - index.stories.tsx (스토리북 컴포넌트) 


### config/constants

프로젝트에서 기본 설정

#### yup

유저가 입력하는 폼 input 값들은 검증하는 `yup` 모듈을 구현한다. 


### interface

클라이언트 상태관리에 사용되는 모델 및 소스맵/`d.ts` 를 정의한다.

###  recoil

클라이언트의 상태관리에 쓰이는 `recoil` 상태 및 연동되는 `hook` 함수를 정의한다.


### styles

`emotion` 에 사용되는 스타일.

 - color.ts  (테마에 사용되는 색상들)
 - globalStyles.tsx (디폴트 css)
 - media.tsx  (반응형 클라이언트 미디어 정의)
 - typography (글꼴. 서체 정의)
 
 
 ### test
 
 `jest` 셋팅을 정의한다.






## Dependencies

| Module          | Version |
|-----------------|---------|
| next            | 12.0.3  |
| node-sass       | ^5.0.0  |
| react           | 17.0.2  |
| react-dom       | 17.0.2  |
| recoil          | ^0.5.2  |
| recoil-persist  | ^4.0.0  |
| sequelize       | ^6.13.0 |
| webpack         | ^4.46.0 |
| @emotion/styled | ^11.3.0 |
|                 |         |
|                 |         |
|                 |         |


-----

## Adding Component to Source.




