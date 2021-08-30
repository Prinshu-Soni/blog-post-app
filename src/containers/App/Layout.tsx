import { Container } from '@material-ui/core';
import React from 'react';
import Header from 'src/components/Header';
import User from 'src/containers/User';

const Layout: React.FC = () => {
  return (
    <>
      <Header />
      <Container disableGutters>
        <User />
      </Container>
    </>
  );
};

export default Layout;
