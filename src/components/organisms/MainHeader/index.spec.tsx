import MainHeader from "@components/organisms/MainHeader/index";
import { render } from "@test";

describe("MainHeader", () => {
  it("랜더링", () => {
    const component = render(<MainHeader />);
    expect(component).toBeTruthy();
  });
});
