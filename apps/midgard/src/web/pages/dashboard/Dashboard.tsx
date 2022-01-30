import { Typography } from 'antd';
import { NextPage } from 'next';
import React from 'react';

// Components
import Shell from '../../components/Shell';

const { Title } = Typography;

const Dashboard: NextPage = () => {
  return (
    <Shell>
      <Title>{`Board of dash`}</Title>
    </Shell>
  );
}


export default Dashboard;
