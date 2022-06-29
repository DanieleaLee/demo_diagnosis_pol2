import Toggle, {useToggle} from "./index";
import {render} from "@test";
import {renderHook} from "@testing-library/react-hooks";


describe("Toggle", ()=>{

  it('렌더링', ()=>{
    const props = renderHook(()=>useToggle(false)).result.current;
    const component = render(<Toggle {...props} disabled={false}/>);
    expect(component).toBeTruthy();
  })
});