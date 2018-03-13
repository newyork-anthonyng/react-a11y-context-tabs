import React from "react";
import PropTypes from "prop-types";
import callAll from "./callAll";

class Tab extends React.Component {
  componentDidMount() {
    this.context.onTabMount(this.props.id, this.handleFocus);
  }

  handleFocus = () => {
    this.node.focus();
  };

  isSelected = () => {
    return this.props.id === this.context.selectedId;
  };

  handleClick = () => {
    this.context.onActivate(this.props.id);
  };

  handleRef = node => {
    this.node = node;

    const { innerRef } = this.props;
    if (typeof innerRef === "function") innerRef(node);
  };

  render() {
    const { innerRef, className, children, id, onClick, ...rest } = this.props;
    const { selectedTabClassName } = this.context;
    const isSelected = this.isSelected();

    let updatedClassName = `${className}`;
    if (isSelected) updatedClassName += ` ${selectedTabClassName}`;

    return (
      <div
        className={updatedClassName}
        aria-selected={isSelected ? "true" : "false"}
        id={`${id}--tab`}
        aria-controls={`${id}--panel`}
        tabIndex={isSelected ? 0 : "-1"}
        onClick={callAll(onClick, this.handleClick)}
        ref={this.handleRef}
        {...rest}
      >
        {children}
      </div>
    );
  }
}

Tab.contextTypes = {
  onActivate: PropTypes.func,
  onTabMount: PropTypes.func,
  onTabUnmount: PropTypes.func,
  selectedId: PropTypes.string,
  selectedTabClassName: PropTypes.string
};

Tab.propTypes = {
  id: PropTypes.string.isRequired,
  innerRef: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.node,
  onClick: PropTypes.func
};

Tab.defaultProps = {
  className: "react-tabs__tab"
};

export default Tab;
