[![Travis build status][travis-badge]][travis-build]
[![Codecov branch][codecov-badge]][codecov]
[![npm][npm-badge]][npm-version]
[![downloads][downloads-badge]][npmcharts]
[![MIT License][license-badge]][license]

[![gzip size][gzip-badge]][unpkg]
[![size][size-badge]][unpkg]

[![Maintainability][code-climate-badge]][code-climate]
[![PRs Welcome][pull-request-badge]](http://makeapullrequest.com)

# react-a11y-context-tabs-a11y
React tab component which is accessible and can be nested within other HTML elements.

# Getting started
```shell
npm install --save react-a11y-context-tabs
```

# Why?
Other React tab component packages such as [`react-tabs`](https://github.com/reactjs/react-tabs) are great, but do not work when nesting your `<Tab />` components in another HTML element. 

```jsx
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

export default () => (
  <Tabs>
    <TabList>
      <Tab>Tab 1</Tab>
      <Tab>Tab 2</Tab>
      <div>
        {/* Tab 3 and 4 do not work as expected */}
        <Tab>Tab 3</Tab>
        <Tab>Tab 4</Tab>
      </div>
    </TabList>

    <TabPanel>
      <h2>Any content 1</h2>
    </TabPanel>
    <TabPanel>
      <h2>Any content 2</h2>
    </TabPanel>
    <TabPanel>
      <h2>Any content 3</h2>
    </TabPanel>
    <TabPanel>
      <h2>Any content 4</h2>
    </TabPanel>
  </Tabs>
);
```

`react-context-a11y-tabs` are accessible and allows nesting your tabs in other HTML elements.

```jsx
import { Tab, Tabs, TabPanel } from 'react-tabs';

export default () => (
  <Tabs>
    <Tab id="one">Tab 1</Tab>
    <Tab id="two">Tab 2</Tab>
    <div>
      {/* Tab 3 and 4 work as expected 😀 */}
      <Tab id="three">Tab 3</Tab>
      <Tab id="four">Tab 4</Tab>
    </div>

    <TabPanel id="one">
      <h2>Any content 1</h2>
    </TabPanel>
    <TabPanel id="two">
      <h2>Any content 2</h2>
    </TabPanel>
    <TabPanel id="three">
      <h2>Any content 3</h2>
    </TabPanel>
    <TabPanel id="four">
      <h2>Any content 4</h2>
    </TabPanel>
  </Tabs>
);
```

# API

## Tab
| Props | Description | Default |
| ----- | ----------- | ------- |
| id | (**String**) A unique ID which should also be added to its corresponding `TabPanel` | Required |
| innerRef | (**Function**) A function to get the `ref` of the wrapper `<div />` element | None |
| className | (**String**) HTML class attribute | "react-tabs__tab" |

## TabPanel
| Props | Description | Default |
| ----- | ----------- | ------- |
| id | (**String**) A unique ID which should also be added to its corresponding `Tab` | Required |
| className | (**String**) HTML class attribute | "react-tabs__tabPanel" |

## Tabs
| Props | Description | Default |
| ----- | ----------- | ------- |
| selectedTabClassName | (**String**) The `className` given to the active `<Tab />` | "react-tabs__tab--selected" |
| selectedTabPanelClassName | (**String**) The `className` given to the active `<TabPanel />` | "react-tabs__tab-panel--selected" |
| forceRenderTabPanel | (**Boolean**) By default, the contents of `<TabPanel />`s that are not active are not rendered in the DOM. Set this to `true` to force it to render | false |
| onSelect | (**Function**) A function that is called whenever a new `<Tab />` is selected. The function is called with the ID of the new `<Tab />` as its argument | () => {} |
| selectedId | (**String**) Make `<Tabs />` into a [controlled component](https://reactjs.org/docs/forms.html#controlled-components). Set the ID of the `<Tab />` you want to be active.
| innerRef | (**Function**) A function to get the `ref` of the wrapper `<div />` element | None |

# Demo
See this [CodeSandbox demo]().

[codecov]: https://codecov.io/gh/newyork-anthonyng/react-a11y-context-tabs-a11y
[codecov-badge]: https://img.shields.io/codecov/c/github/newyork-anthonyng/react-a11y-context-tabs-a11y/master.svg
[code-climate]: https://codeclimate.com/github/newyork-anthonyng/react-a11y-context-tabs-a11y/maintainability
[code-climate-badge]: https://api.codeclimate.com/v1/badges/faefec967ef40a030c3e/maintainability
[downloads-badge]: https://img.shields.io/npm/dm/react-a11y-context-tabs-a11y.svg?style=flat-square
[license]: https://github.com/newyork-anthonyng/react-a11y-context-tabs-a11y/blob/master/LICENSE
[license-badge]: https://img.shields.io/npm/l/react-a11y-context-tabs-a11y.svg?style=flat-square
[npmcharts]: https://npmcharts.com/compare/react-a11y-context-tabs-a11y
[npm-version]:https://www.npmjs.com/package/react-a11y-context-tabs-a11y
[npm-badge]: https://img.shields.io/npm/v/react-a11y-context-tabs-a11y.svg?style=flat-square
[pull-request-badge]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square
[travis-badge]: https://travis-ci.org/newyork-anthonyng/react-a11y-context-tabs-a11y.svg?branch=master
[travis-build]: https://travis-ci.org/newyork-anthonyng/react-a11y-context-tabs-a11y
[gzip-badge]: http://img.badgesize.io/https://unpkg.com/react-a11y-context-tabs-a11y?compression=gzip&label=gzip%20size&style=flat-square
[size-badge]: http://img.badgesize.io/https://unpkg.com/react-a11y-context-tabs-a11y?label=size&style=flat-square
[unpkg]: https://unpkg.com/react-a11y-context-tabs-a11y
