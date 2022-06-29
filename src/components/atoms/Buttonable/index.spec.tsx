import Buttonable from "./index";
import { render } from "@test";
import React from "react";

describe("Buttonable", () => {
  it("랜더링", () => {
    const mockFn = jest.fn();
    const component = render(<Buttonable onClick={mockFn} />);
    expect(component).toBeTruthy();
    expect(component.container.querySelector("button")).toBeTruthy();
  });
});
