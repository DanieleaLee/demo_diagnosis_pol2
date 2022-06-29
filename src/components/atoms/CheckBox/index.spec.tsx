import CheckBox, {useCheckBox} from "./index";
import { fireEvent, render } from "@test";
import * as yup from "yup";
import useYupValidation from "src/lib/hooks/useYupValidation";

describe("CheckBox", () => {
  it("랜더링", () => {
    const mockFn = jest.fn();

    const FC = () =>
      <CheckBox {...useCheckBox(false)}/>;

    const component = render( <FC/>);
    expect(component).toBeTruthy();

    /**
     * TODO :: CheckBox 에 attribute 를 주었을때 props 에 정의되지 않은 attribute 는 어떻게 처리해야 할까..?
     *
     * Hints
     *
     * interface 에 Component 의 Props 에 'index signature' 를 추가한다.
     *  [index: string]: any;
     *
     * */
    // const btn = component.queryByTestId("checkbox");
    // console.log(btn);
    // fireEvent.click(btn);
    // expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it("랜더링(rhf controller)", () => {
    const mockSchema = yup.object({
      isTrue: yup.boolean().test(
        'isTrue',
        'must be checked',
        v=> v
      )
    });

    const FC = () =>{
      const {control} = useYupValidation(
        yup.object({
          isTrue: yup.boolean().test( 'isTrue', 'must be checked', v=> v )
        })
      );
      return <CheckBox control={control} name={'isTrue'}/>;
    };

    const component = render(<FC/>);
    expect(component).toBeTruthy();

  });


});
