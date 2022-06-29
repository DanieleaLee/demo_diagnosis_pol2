import Header from "./index";
import { render } from "@test";

describe("Header", () => {
  it("랜더링", () => {
    const component = render(<Header />);
    expect(component).toBeTruthy();
  });
});
