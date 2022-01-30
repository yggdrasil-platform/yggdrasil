import { Typography } from 'antd';
import { NextPage } from 'next';
import React from 'react';

// Components
import Shell from '../../components/Shell';

const { Title } = Typography;

const Login: NextPage = () => {
  return (
    <Shell>
      <Title>{`Log me in!`}</Title>
    </Shell>
  );
}

export default Login;
