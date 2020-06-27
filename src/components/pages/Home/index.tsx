import * as React from 'react';
import { Helmet } from 'react-helmet';
import { PROJECT } from '../../../constants';
import Layout from '../../Layout';

const Home: React.SFC = () => (
  <>
    <Helmet>
      <title>{ PROJECT.TITLE } - Home</title>
    </Helmet>
    <Layout>
      Home
    </Layout>
  </>
);

export default Home;
