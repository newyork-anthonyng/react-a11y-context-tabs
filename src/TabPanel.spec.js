import React from "react";
import { mount } from "enzyme";
import TabPanel from "./TabPanel";
import toJSON from "enzyme-to-json";

const defaultProps = {
  id: "foo",
  className: "tabPanel"
};
const defaultContext = {
  selectedId: "bar",
  forceRenderTabPanel: false,
  selectedTabPanelClassName: "tabPanel--selected"
};

it("should render children when selected", () => {
  const wrapper = mount(
    <TabPanel {...defaultProps}>
      <h1>Hello</h1>
    </TabPanel>,
    {
      context: {
        ...defaultContext,
        selectedId: defaultProps.id
      }
    }
  );

  expect(toJSON(wrapper)).toMatchSnapshot();
});

it("should render children when forceRenderTabPanel is true", () => {
  const wrapper = mount(
    <TabPanel {...defaultProps}>
      <h1>Hello</h1>
    </TabPanel>,
    {
      context: {
        ...defaultContext,
        forceRenderTabPanel: true
      }
    }
  );

  expect(toJSON(wrapper)).toMatchSnapshot();
});

it("should not render children when not selected and forceRenderTabPanel is false", () => {
  const wrapper = mount(
    <TabPanel {...defaultProps}>
      <h1>Hello</h1>
    </TabPanel>,
    {
      context: defaultContext
    }
  );

  expect(toJSON(wrapper)).toMatchSnapshot();
});
