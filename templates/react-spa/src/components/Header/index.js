
import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';

import './header.css';

const { Header } = Layout;

export default class HeadWraper extends React.Component {
  state = {
    current: 'mail',
  }
  
  handleClick = (e) => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  }

  render(){
    return (
      <Header>
        <div className="logo"> LOGO </div>
        <Menu className="menu" theme="dark" onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal" >
          <Menu.Item key="mail">
            <Icon type="mail" />
            <Link to="/reports">报表</Link>
          </Menu.Item>
          <Menu.Item key="alipay">
            <Icon type="mail" />
            <Link to="/boards">看板</Link>
          </Menu.Item>
        </Menu>
      </Header>
    );
  }
}



