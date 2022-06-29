import InputGroup from "./index";
import { render } from "@test";

describe("InputGroup", () => {
  it("랜더링", () => {
    const component = render(<InputGroup title={"hello"} />);
    expect(component).toBeTruthy();
  });
});
