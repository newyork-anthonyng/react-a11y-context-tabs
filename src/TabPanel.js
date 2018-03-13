import React from "react";
import PropTypes from "prop-types";

const TabPanel = (
  { id, children, className, ...rest },
  { selectedId, forceRenderTabPanel, selectedTabPanelClassName }
) => {
  const isSelected = id === selectedId;

  let updatedClassName = className;
  if (isSelected) updatedClassName += ` ${selectedTabPanelClassName}`;

  return (
    <div
      id={`${id}--panel`}
      className={updatedClassName}
      aria-labelledby={`${id}--tab`}
      {...rest}
    >
      {(isSelected || forceRenderTabPanel) && children}
    </div>
  );
};

TabPanel.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
  children: PropTypes.node
};

TabPanel.defaultProps = {
  className: "react-tabs__tab-panel"
};

TabPanel.contextTypes = {
  selectedId: PropTypes.string,
  forceRenderTabPanel: PropTypes.bool,
  selectedTabPanelClassName: PropTypes.string
};

export default TabPanel;
