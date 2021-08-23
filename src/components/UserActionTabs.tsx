import React, { useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import Todo from "components/Todo";
import Posts from "./Posts";

const TabPanel = (props: any) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const a11yProps = (index: number) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
};

const UserActionTabs = ({ userId }: { userId?: number }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event: any, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box>
      <Tabs value={value} onChange={handleChange}>
        <Tab label="Todos" {...a11yProps(0)} />
        <Tab label="Posts" {...a11yProps(1)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Todo userId={userId} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Posts userId={userId} />
      </TabPanel>
    </Box>
  );
};

export default UserActionTabs;
