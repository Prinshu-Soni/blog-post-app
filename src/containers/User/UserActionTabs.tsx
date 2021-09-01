import { Box, Tab, Tabs } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Post from 'src/containers/Post';
import Todo from 'src/containers/Todo';

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
    'aria-controls': `simple-tabpanel-${index}`,
  };
};

type Props = {
  userId: number;
  activeTab: (id: number) => void;
};

const UserActionTabs: React.FC<Props> = (props: Props) => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
    props.activeTab(newValue);
  };

  return (
    <Box>
      <Tabs value={value} onChange={handleChange}>
        <Tab label="Todos" {...a11yProps(0)} />
        <Tab label="Posts" {...a11yProps(1)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Todo userId={props.userId} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Post userId={props.userId} />
      </TabPanel>
    </Box>
  );
};

export default UserActionTabs;
