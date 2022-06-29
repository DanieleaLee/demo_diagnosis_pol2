import Submit from "./index";
import { render } from "@test";

describe("Submit", () => {
  it("랜더링", () => {
    const component = render(<Submit />);
    expect(component).toBeTruthy();
  });
});
