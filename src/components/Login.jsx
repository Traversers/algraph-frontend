import { useState } from 'react';
import axios from 'axios';
import { Link as RouterLink } from 'react-router-dom';
import { BACKEND_LOGIN_URL } from '../constants/constants';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { HttpStatusCode } from 'axios';
const Login = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(BACKEND_LOGIN_URL, { name, password });
      const token = response.data;
      localStorage.setItem('accessToken', token.accessToken);
      localStorage.setItem('refreshToken', token.refreshToken);
      alert('Login successful');
      setName('');
      setPassword('');
      window.location.href = '/StartPage';
    } catch (error) {
      console.log(`error`, error);
      const errorStatusCode = error.response?.status;
      if (errorStatusCode === HttpStatusCode.BadRequest) {
        alert(error.response.data);
      } else if (errorStatusCode === HttpStatusCode.Unauthorized) {
        alert('user was not found or password is incorrect');
      } else if (errorStatusCode === HttpStatusCode.InternalServerError) {
        alert('server error occurred, please try again later');
      }
      alert(error.response.data);
    }
  };
  return (
    <Form name="normal_login" className="login-form">
      <Form.Item
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Username"
        />
      </Form.Item>
      <Form.Item
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="login-form-button"
          onClick={handleSubmit}
        >
          Log in
        </Button>
        <span>
          <RouterLink to="../Signup">
            {'Don`t have an account? Register now!'}
          </RouterLink>
        </span>
      </Form.Item>
    </Form>
  );
};
export default Login;
