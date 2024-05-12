import React, { useState } from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import logo from './Logo.png';

const items = [
  {
    key: 'logo',
    icon: <img src={logo} alt="Logo" style={{ width: 120, height: 50 }} />,
  },
  {
    label: 'Login',
    key: 'mail',
    link: '/login',
  },
  {
    label: 'Submenu',
    key: 'SubMenu',
    icon: <SettingOutlined />,
  
  },
  {
    key: 'man',
    icon: <UserOutlined />,
    style: { marginLeft: 'auto' },
    children: [
      {
        label: 'Profile',
        key: 'profile',
      },
      {
        label: 'Settings',
        key: 'settings',
      },
      {
        label: 'Logout',
        key: 'logout',
      },
    ],
  },
];

const Navbar = () => {
  const [current, setCurrent] = useState('mail');
  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  return (
    <div>
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
      />
    </div>
  );
};

export default Navbar;