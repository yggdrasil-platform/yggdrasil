import { Typography } from 'antd';
import { NextPage } from 'next';
import React from 'react';

// Components
import Shell from '../components/Shell';

const { Title } = Typography;

const NotFound: NextPage = () => {
  return (
    <Shell>
      <Title>{`Lost your marbles?`}</Title>
    </Shell>
  );
}

export default NotFound;

