import Input from "./index";
import { render } from "@test";

describe("Submit", () => {
  it("랜더링", () => {
    const component = render(<Input />);
    expect(component).toBeTruthy();
  });
});