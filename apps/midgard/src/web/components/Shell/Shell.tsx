import { Layout } from 'antd';
import React, { FC, PropsWithChildren } from 'react';

const { Header, Content, Footer } = Layout;

const Shell: FC<PropsWithChildren<{}>> = ({ children }: PropsWithChildren<{}>) => {
  return (
    <Layout>
      <Header>
        <div className="logo" />
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <div className="site-layout-content">{children}</div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
    </Layout>
  );
}

export default Shell;
