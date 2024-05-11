import { Button, Form, Input } from 'antd';
import axios, { HttpStatusCode } from 'axios';
import { BACKEND_REGISTER_URL } from '../constants/constants';
import Link from 'antd/es/typography/Link';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validate } from 'email-validator';
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
  const navigate = useNavigate();
  const [signupFormData, setSignupFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (fieldName, value) => {
    setSignupFormData({ ...signupFormData, [fieldName]: value });
  };

  const isFormDataValidCheck = () => {
    const { name, email, password, confirmPassword } = signupFormData;
    const isAllFieldsFilled = name && email && password && confirmPassword;
    const isEmailValid = validate(email);
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
      navigate('/Login');
    } catch (error) {
      console.log(`error`, error);
      if (error.response?.status === HttpStatusCode.BadRequest) {
        alert(error.response.data.message);
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
        onChange={(e) => handleInputChange('name', e.target.value)}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="email"
        label="E-mail"
        value={signupFormData.email}
        onChange={(e) => handleInputChange('email', e.target.value)}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        value={signupFormData.password}
        onChange={(e) => handleInputChange('password', e.target.value)}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        value={signupFormData.confirmPassword}
        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
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
