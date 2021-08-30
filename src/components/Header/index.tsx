import { AppBar, Toolbar, Typography } from '@material-ui/core';
import React from 'react';

const Header: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">Blog Post App</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
