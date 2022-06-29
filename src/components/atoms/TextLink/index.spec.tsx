import TextLink from "./index";
import { render } from "@test";

describe("TextLink", () => {
  it("랜더링", () => {
    const component = render(<TextLink href={"/"} title={"Test"} />);
    expect(component).toBeTruthy();
  });
});
