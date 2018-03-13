import React from "react";
import { mount } from "enzyme";
import toJSON from "enzyme-to-json";
import Tabs, {
  LEFT_ARROW_KEY_CODE,
  RIGHT_ARROW_KEY_CODE,
  UP_ARROW_KEY_CODE,
  DOWN_ARROW_KEY_CODE
} from "./Tabs";

const defaultProps = {
  forceRenderTabPanel: false,
  selectedTabClassName: "tab--selected",
  selectedTabPanelClassName: "tabPanel--selected",
  innerRef: () => {}
};

describe("Context", () => {
  it("should expose correct context", () => {
    const wrapper = mount(
      <Tabs {...defaultProps}>
        <h1>Hello World</h1>
      </Tabs>
    );

    expect(wrapper.instance().getChildContext()).toMatchSnapshot();
  });

  it("should should update selectedId with onActivate function", () => {
    const wrapper = mount(
      <Tabs {...defaultProps}>
        <h1>Hello World</h1>
      </Tabs>
    );

    const { onActivate } = wrapper.instance().getChildContext();
    onActivate("foo");

    expect(wrapper.state()).toMatchSnapshot();
  });

  it("should update this.firstIndex only once", () => {
    const wrapper = mount(
      <Tabs {...defaultProps}>
        <h1>Hello World</h1>
      </Tabs>
    );

    const { onTabMount } = wrapper.instance().getChildContext();
    onTabMount("foo");
    onTabMount("bar");

    expect(wrapper.instance().firstIndex).toEqual("foo");
  });

  it("should append tab index only if not present", () => {
    const wrapper = mount(
      <Tabs {...defaultProps}>
        <h1>Hello World</h1>
      </Tabs>
    );

    const { onTabMount } = wrapper.instance().getChildContext();
    onTabMount("foo");
    onTabMount("bar");
    onTabMount("foo");

    expect(wrapper.instance().tabs).toMatchSnapshot();
  });
});

describe("Key down events", () => {
  function mockWrapperWithSelectedId(selectedId) {
    const wrapper = mount(
      <Tabs {...defaultProps}>
        <h1>Hello World</h1>
      </Tabs>
    );

    const { onTabMount } = wrapper.instance().getChildContext();
    onTabMount("foo");
    onTabMount("bar");
    onTabMount("baz");
    wrapper.setState({ selectedId });

    return wrapper;
  }
  it("should update correctly when pressing LEFT key on first tab", () => {
    const wrapper = mockWrapperWithSelectedId("foo");

    const divEl = wrapper.find("div");
    divEl.simulate("keydown", { keyCode: LEFT_ARROW_KEY_CODE });

    expect(wrapper.state()).toMatchSnapshot();
  });

  it("should update correctly when pressing LEFT key when not on first tab", () => {
    const wrapper = mockWrapperWithSelectedId("bar");

    const divEl = wrapper.find("div");
    divEl.simulate("keydown", { keyCode: LEFT_ARROW_KEY_CODE });

    expect(wrapper.state()).toMatchSnapshot();
  });

  it("should update correctly when pressing UP key on first tab", () => {
    const wrapper = mockWrapperWithSelectedId("foo");

    const divEl = wrapper.find("div");
    divEl.simulate("keydown", { keyCode: UP_ARROW_KEY_CODE });

    expect(wrapper.state()).toMatchSnapshot();
  });

  it("should update correctly when pressing UP key when not on first tab", () => {
    const wrapper = mockWrapperWithSelectedId("bar");

    const divEl = wrapper.find("div");
    divEl.simulate("keydown", { keyCode: UP_ARROW_KEY_CODE });

    expect(wrapper.state()).toMatchSnapshot();
  });

  it("should update correctly when pressing RIGHT key on last tab", () => {
    const wrapper = mockWrapperWithSelectedId("baz");

    const divEl = wrapper.find("div");
    divEl.simulate("keydown", { keyCode: RIGHT_ARROW_KEY_CODE });

    expect(wrapper.state()).toMatchSnapshot();
  });

  it("should update correctly when pressing RIGHT key when not on last tab", () => {
    const wrapper = mockWrapperWithSelectedId("bar");

    const divEl = wrapper.find("div");
    divEl.simulate("keydown", { keyCode: RIGHT_ARROW_KEY_CODE });

    expect(wrapper.state()).toMatchSnapshot();
  });

  it("should update correctly when pressing DOWN key on last tab", () => {
    const wrapper = mockWrapperWithSelectedId("baz");

    const divEl = wrapper.find("div");
    divEl.simulate("keydown", { keyCode: DOWN_ARROW_KEY_CODE });

    expect(wrapper.state()).toMatchSnapshot();
  });

  it("should update correctly when pressing DOWN key when not on last tab", () => {
    const wrapper = mockWrapperWithSelectedId("bar");

    const divEl = wrapper.find("div");
    divEl.simulate("keydown", { keyCode: DOWN_ARROW_KEY_CODE });

    expect(wrapper.state()).toMatchSnapshot();
  });

  it("should update correctly when not pressing on arrow key", () => {
    const wrapper = mockWrapperWithSelectedId("bar");

    const divEl = wrapper.find("div");
    divEl.simulate("keydown", { keyCode: 1234 });

    expect(wrapper.state()).toMatchSnapshot();
  });

  it("should focus on tab", () => {
    const wrapper = mount(
      <Tabs {...defaultProps}>
        <h1>Hello World</h1>
      </Tabs>
    );

    const cb = jest.fn();
    const { onTabMount } = wrapper.instance().getChildContext();
    onTabMount("foo");
    onTabMount("bar");
    onTabMount("baz", cb);
    wrapper.setState({ selectedId: "bar" });

    const divEl = wrapper.find("div");
    divEl.simulate("keydown", { keyCode: DOWN_ARROW_KEY_CODE });
    expect(cb).toHaveBeenCalledTimes(1);
  });

  it("should call custom onKeyDown callback", () => {
    const cb = jest.fn();
    const wrapper = mount(
      <Tabs {...defaultProps} onKeyDown={cb}>
        <h1>Hello World</h1>
      </Tabs>
    );

    const divEl = wrapper.find("div");
    divEl.simulate("keydown", { keyCode: DOWN_ARROW_KEY_CODE });

    expect(cb).toHaveBeenCalledTimes(1);
  });
});
