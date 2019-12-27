import React from 'react';
import Overview from '../../components/Overview';
import Installation from '../../components/Installation';
import QuickStart from '../../components/QuickStart';
import Contributing from '../../components/Contributing';
import Container from '../../components/Container';

const Home = () => (
  <Container>
    <Overview/>
    <Installation/>
    <QuickStart/>
    <Contributing/>
  </Container>
);

export default Home;