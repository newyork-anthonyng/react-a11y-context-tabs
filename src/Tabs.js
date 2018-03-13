import React from "react";
import PropTypes from "prop-types";
import callAll from "./callAll";

const LEFT_ARROW_KEY_CODE = 37;
const RIGHT_ARROW_KEY_CODE = 39;
const UP_ARROW_KEY_CODE = 38;
const DOWN_ARROW_KEY_CODE = 40;

class Tabs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedId: null
    };
    this.tabs = [];
    this.focusTabs = {};
  }

  getChildContext() {
    const {
      forceRenderTabPanel,
      selectedTabClassName,
      selectedTabPanelClassName
    } = this.props;

    return {
      selectedId: this.state.selectedId,
      onActivate: index => {
        this.setState({ selectedId: index });
      },
      onTabMount: (index, focus) => {
        if (!this.firstIndex) {
          this.firstIndex = index;

          this.setState({
            selectedId: this.firstIndex
          });
        }

        if (this.tabs.indexOf(index) === -1) {
          this.tabs = this.tabs.concat([index]);
        }
        this.focusTabs[index] = focus;
      },
      forceRenderTabPanel,
      selectedTabClassName,
      selectedTabPanelClassName
    };
  }

  handleKeyDown = ({ keyCode }) => {
    let nextTabIndex = null;

    if (this.isPreviousTabKey(keyCode)) {
      nextTabIndex = this.getPreviousTabIndex();
    } else if (this.isNextTabKey(keyCode)) {
      nextTabIndex = this.getNextTabIndex();
    }

    if (nextTabIndex !== null) {
      const newSelectedId = this.tabs[nextTabIndex];

      this.setState({ selectedId: newSelectedId }, () => {
        if (typeof this.focusTabs[newSelectedId] === "function") {
          this.focusTabs[newSelectedId]();
        }
      });
    }
  };

  isPreviousTabKey = keyCode => {
    return keyCode === UP_ARROW_KEY_CODE || keyCode === LEFT_ARROW_KEY_CODE;
  };

  isNextTabKey = keyCode => {
    return keyCode === RIGHT_ARROW_KEY_CODE || keyCode === DOWN_ARROW_KEY_CODE;
  };

  getPreviousTabIndex = () => {
    let tabIndex = this.tabs.indexOf(this.state.selectedId) - 1;
    if (tabIndex < 0) tabIndex = this.tabs.length - 1;
    return tabIndex;
  };

  getNextTabIndex = () => {
    let tabIndex = this.tabs.indexOf(this.state.selectedId) + 1;
    if (tabIndex >= this.tabs.length) tabIndex = 0;

    return tabIndex;
  };

  render() {
    const {
      innerRef,
      children,
      forceRenderTabPanel,
      selectedTabClassName,
      selectedTabPanelClassName,
      onKeyDown,
      ...rest
    } = this.props;

    return (
      <div
        ref={innerRef}
        {...rest}
        onKeyDown={callAll(onKeyDown, this.handleKeyDown)}
      >
        {children}
      </div>
    );
  }
}

Tabs.propTypes = {
  forceRenderTabPanel: PropTypes.bool,
  selectedTabClassName: PropTypes.string,
  selectedTabPanelClassName: PropTypes.string,
  innerRef: PropTypes.func,
  children: PropTypes.node,
  onKeyDown: PropTypes.func
};

Tabs.defaultProps = {
  forceRenderTabPanel: false,
  selectedTabClassName: "react-tabs__tab--selected",
  selectedTabPanelClassName: "react-tabs__tab-panel--selected"
};

Tabs.childContextTypes = {
  onActivate: PropTypes.func,
  selectedId: PropTypes.string,
  onTabMount: PropTypes.func,
  onTabUnmount: PropTypes.func,
  forceRenderTabPanel: PropTypes.bool,
  selectedTabClassName: PropTypes.string,
  selectedTabPanelClassName: PropTypes.string
};

export default Tabs;