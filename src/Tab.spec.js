import React from "react";
import { mount } from "enzyme";
import toJSON from "enzyme-to-json";
import Tab from "./Tab";

const defaultProps = {
  id: "foo"
};

const defaultContext = {
  onActivate: () => {},
  onTabMount: () => {},
  selectedId: "bar",
  selectedTabClassName: "tab--selected"
};

it("should call onTabMount when mounting", () => {
  const cb = jest.fn();
  const wrapper = mount(
    <Tab {...defaultProps}>
      <h1>Hello World</h1>
    </Tab>,
    {
      context: { ...defaultContext, onTabMount: cb }
    }
  );

  expect(cb).toHaveBeenCalledTimes(1);
});

it("should call onTabMount with handleFocus function", () => {
  const cb = jest.fn();
  const wrapper = mount(
    <Tab {...defaultProps}>
      <h1>Hello World</h1>
    </Tab>,
    {
      context: { ...defaultContext, onTabMount: cb }
    }
  );
  const tabNode = wrapper.instance().node;
  tabNode.focus = jest.fn();

  cb.mock.calls[0][1]();

  expect(tabNode.focus).toHaveBeenCalledTimes(1);
});

it("should render correctly when selected", () => {
  const wrapper = mount(
    <Tab {...defaultProps}>
      <h1>Hello World</h1>
    </Tab>,
    {
      context: { ...defaultContext, selectedId: "foo" }
    }
  );

  expect(toJSON(wrapper)).toMatchSnapshot();
});

it("should render correctly when not selected", () => {
  const wrapper = mount(
    <Tab {...defaultProps}>
      <h1>Hello World</h1>
    </Tab>,
    {
      context: defaultContext
    }
  );

  expect(toJSON(wrapper)).toMatchSnapshot();
});

it("should call onActivate context function when clicking on Tab", () => {
  const cb = jest.fn();
  const wrapper = mount(
    <Tab {...defaultProps}>
      <h1>Hello World</h1>
    </Tab>,
    {
      context: { ...defaultContext, onActivate: cb }
    }
  );

  const divEl = wrapper.find("div");
  divEl.simulate("click");

  expect(cb).toHaveBeenCalledTimes(1);
});

it("should call custom onClick callback when clicking on Tab", () => {
  const cb = jest.fn();
  const wrapper = mount(
    <Tab {...defaultProps} onClick={cb}>
      <h1>Hello World</h1>
    </Tab>,
    {
      context: defaultContext
    }
  );

  const divEl = wrapper.find("div");
  divEl.simulate("click");

  expect(cb).toHaveBeenCalledTimes(1);
});

it("should run innerRef prop", () => {
  const cb = jest.fn();
  const wrapper = mount(
    <Tab {...defaultProps} onClick={cb} innerRef={cb}>
      <h1>Hello World</h1>
    </Tab>,
    {
      context: defaultContext
    }
  );

  expect(cb).toHaveBeenCalledTimes(1);
  expect(cb.mock.calls[0]).toMatchSnapshot();
});
