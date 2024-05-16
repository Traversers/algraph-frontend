import { useState } from 'react';
import axios from 'axios';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { BACKEND_LOGIN_URL } from '../../constants/constants';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Typography } from 'antd';
import { message } from 'antd';
import storageService from '../../services/storageService';
import './Login.css';
import { LOGIN_ALERTS } from '../../constants/constants';

const { Title } = Typography;

const Login = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    try {
      const response = await axios.post(BACKEND_LOGIN_URL, { name, password });
      const token = response.data;
      storageService.setData('accessToken', token.accessToken);
      storageService.setData('refreshToken', token.refreshToken);
      setName('');
      setPassword('');
      navigate('/StartPage');
      
    } catch (error) {
      if (error.response) {
        const errorStatusCode = error.response.status;
        if (errorStatusCode === 400) {
          message.error(LOGIN_ALERTS.GENERIC_ERROR);
        } else if (errorStatusCode === 401) {
          message.error(LOGIN_ALERTS.INVALID_CREDENTIALS);
        } else if (errorStatusCode === 500) {
          message.error(LOGIN_ALERTS.GENERIC_ERROR);
        }
      } else {
        message.error(LOGIN_ALERTS.GENERIC_ERROR);
      }
    }
  };

  const formItems = [
    {
      name: "name",
      rules: [{ required: true, message: LOGIN_ALERTS.USERNAME_REQUIRED }],
      inputProps: {
        prefix: <UserOutlined className="site-form-item-icon" />,
        placeholder: "Username"
      }
    },
    {
      name: "password",
      rules: [{ required: true, message: LOGIN_ALERTS.PASSWORD_REQUIRED }],
      inputProps: {
        prefix: <LockOutlined className="site-form-item-icon" />,
        type: "password",
        placeholder: "Password"
      }
    }
  ];

  const formFields = formItems.map((item, index) => (
    <Form.Item key={index} name={item.name} rules={item.rules}>
      <Input {...item.inputProps} />
    </Form.Item>
  ));

  return (
    <div className='login-wrapper'>
      <Title level={2}>{LOGIN_ALERTS.LOG_IN}</Title>
      <Form name="normal_login" className="login-form" onFinish={handleSubmit}>
        {formFields}
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            style={{ width: '100%' }}
          >
            {LOGIN_ALERTS.LOG_IN}
          </Button>
          <div className='login'>
            {LOGIN_ALERTS.NO_ACCOUNT} <RouterLink to="/Signup">{LOGIN_ALERTS.REGISTER}</RouterLink>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
