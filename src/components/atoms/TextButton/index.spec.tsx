import TextButton from "./index";
import { render } from "@test";

describe("TextButton", () => {
  it("랜더링", () => {
    const component = render(<TextButton title={"버튼"} onClick={() => alert("click")} />);
    expect(component).toBeTruthy();
  });
});
