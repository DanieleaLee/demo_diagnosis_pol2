import LoginTemplate from "./index";
import { render } from "@test";
import { waitFor } from "@testing-library/react";

describe("LoginTemplate", () => {
  it("랜더링", async () => {
    const component = render(<LoginTemplate />);
    await waitFor(() => {
      expect(component).toBeTruthy();
    });
  });
});
