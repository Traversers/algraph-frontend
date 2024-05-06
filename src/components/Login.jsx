import { useState } from 'react';
import { login } from '../services/user.service';
import { Link as RouterLink } from 'react-router-dom';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { HttpStatusCode } from 'axios';
const Login = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      console.log(`name:`, name);
      console.log(`password:`, password);
      const response = await login(name, password);
      console.log(`response`, response);
      if (response.status === HttpStatusCode.Ok) {
        console.log(`Login successful`);
      } else {
        console.log(`Login failed`);
      }
      setName('');
      setPassword('');
    } catch (error) {
      const errorStatusCode = error.response?.status;
      if (errorStatusCode === HttpStatusCode.BadRequest) {
        alert('Please fill in all fields');
      } else if (errorStatusCode === HttpStatusCode.Unauthorized) {
        alert('user was not found or password is incorrect');
      } else if (errorStatusCode === HttpStatusCode.InternalServerError) {
        alert('server error occurred, please try again later');
      }
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
