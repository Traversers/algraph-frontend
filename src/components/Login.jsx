import { useState } from 'react';
import { login } from '../services/user.service';
import { Link as RouterLink } from 'react-router-dom';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import { HttpStatusCode } from 'axios';
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await login(username, password);
      console.log(`response`, response);
    } catch (error) {
      const errorStatus = error.response.status;
      if (errorStatus === HttpStatusCode.NotFound) {
        alert('user not found');
      }
      if (errorStatus === HttpStatusCode.Unauthorized) {
        alert('user not found');
      }
      if (errorStatus === HttpStatusCode.BadRequest) {
        alert('server error please try again later');
      }
      if (errorStatus === HttpStatusCode.UnprocessableEntity) {
        alert('user not found');
      }
    }
  };
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };
  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your Username!',
          },
        ]}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Username"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
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
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <a className="login-form-forgot" href="">
          Forgot password
        </a>
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
