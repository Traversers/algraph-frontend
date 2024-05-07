import { Button, Form, Input } from 'antd';
import axios, { HttpStatusCode } from 'axios';
import { BACKEND_REGISTER_URL } from '../constants/constants';
import Link from 'antd/es/typography/Link';
import { useState } from 'react';
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};
const Signup = () => {
  const [signupFormData, setSignupFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleNameChange = (e) => {
    setSignupFormData({ ...signupFormData, name: e.target.value });
  };

  const handleEmailChange = (e) => {
    setSignupFormData({ ...signupFormData, email: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setSignupFormData({ ...signupFormData, password: e.target.value });
  };

  const handleConfirmPasswordChange = (e) => {
    setSignupFormData({ ...signupFormData, confirmPassword: e.target.value });
  };

  const isFormDataValidCheck = () => {
    const { name, email, password, confirmPassword } = signupFormData;
    const isAllFieldsFilled = name && email && password && confirmPassword;
    const isEmailValid = email.includes('@') && email.includes('.');
    if (!isAllFieldsFilled) {
      alert('Please fill in all fields');
      return false;
    }
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return false;
    }
    if (password.length < 6) {
      alert('Password must be at least 6 characters long');
      return false;
    }
    if (!isEmailValid) {
      alert('Please enter a valid email address');
      return false;
    }
    return true;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormDataValidCheck()) return;
    try {
      const { name, email, password } = signupFormData;
      const response = await axios.post(BACKEND_REGISTER_URL, {
        name,
        email,
        password,
      });
      if (response.status === HttpStatusCode.Created)
        alert('Registration successful');
      setSignupFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
    } catch (error) {
      console.log(`error`, error);
      if (error.response?.status === HttpStatusCode.BadRequest) {
        alert('Please fill in all fields');
      } else if (error.response?.status === HttpStatusCode.Conflict) {
        alert('User already exists');
      } else {
        alert('Server error occurred, please try again later');
      }
    }
  };

  return (
    <Form
      {...formItemLayout}
      name="register"
      initialValues={{
        residence: ['zhejiang', 'hangzhou', 'xihu'],
        prefix: '86',
      }}
      style={{
        maxWidth: 600,
      }}
      scrollToFirstError
    >
      <Form.Item
        name="name"
        label="name"
        value={signupFormData.name}
        onChange={handleNameChange}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="email"
        label="E-mail"
        value={signupFormData.email}
        onChange={handleEmailChange}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        value={signupFormData.password}
        onChange={handlePasswordChange}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        value={signupFormData.confirmPassword}
        onChange={handleConfirmPasswordChange}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit" onClick={handleSubmit}>
          Register
        </Button>
        <Link href="/Login">Already have an account? Log in!</Link>
      </Form.Item>
    </Form>
  );
};
export default Signup;
