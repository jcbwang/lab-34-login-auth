import React from "react";
import Form from "../src/components/form/form.js";
import renderer from "react-test-renderer";

describe("<Form/>", () => {
  test("basic rendering", () => {
    const mountedForm = shallow(<Form />);
    expect(mountedForm.find("input")).toBeTruthy();
  });
  test("testing get state changes", () => {
    const mountedForm = mount(<Form />);
    const selectGet = mountedForm.find("input.get");
    selectGet.simulate("change");
    expect(mountedForm.state("selectedMethod")).toEqual("get");
  });
});
