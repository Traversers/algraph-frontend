import { Button, Form, Input, Typography } from 'antd';
import axios from 'axios';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { BACKEND_REGISTER_URL } from '../../constants/constants';
import { useState } from 'react';
import { validate } from 'email-validator';
import { message } from 'antd';
import './Signup.css';
import { SIGNUP_ALERTS } from '../../constants/constants';

const { Title } = Typography;

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
      message.error(SIGNUP_ALERTS.MISSING_FIELDS);
      return false;
    }
    if (password !== confirmPassword) {
      message.error(SIGNUP_ALERTS.PASSWORDS_DONT_MATCH);
      return false;
    }
    if (password.length < 6) {
      message.error(SIGNUP_ALERTS.PASSWORD_LENGTH);
      return false;
    }
    if (!isEmailValid) {
      message.error(SIGNUP_ALERTS.EMAIL_REQUIRED);
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    if (!isFormDataValidCheck()) return;
    try {
      const { name, email, password } = signupFormData;
      const response = await axios.post(BACKEND_REGISTER_URL, {
        name,
        email,
        password,
      });
      if (response.status === 201) {
        setSignupFormData({
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
        });
        navigate('/Login');
      }
    } catch (error) {
      if (error.response?.status === 400) {
        message.error(SIGNUP_ALERTS.GENERIC_ERROR);
      } else if (error.response?.status === 409) {
        message.error(SIGNUP_ALERTS.USER_EXISTS);
      } else {
        message.error(SIGNUP_ALERTS.GENERIC_ERROR);
      }
    }
  };

  const inputFields = [
    {
      name: "name",
      placeholder: "Name",
      value: signupFormData.name,
      onChange: (e) => handleInputChange('name', e.target.value),
      rules: [{ required: true, message: SIGNUP_ALERTS.NAME_REQUIRED }]
    },
    {
      name: "email",
      placeholder: "Email",
      value: signupFormData.email,
      onChange: (e) => handleInputChange('email', e.target.value),
      rules: [
        { required: true, message: SIGNUP_ALERTS.EMAIL_REQUIRED },
        { type: 'email', message: SIGNUP_ALERTS.EMAIL_INVALID }
      ]
    },
    {
      name: "password",
      placeholder: "Password",
      value: signupFormData.password,
      onChange: (e) => handleInputChange('password', e.target.value),
      rules: [{ required: true, message: SIGNUP_ALERTS.PASSWORD_REQUIRED }]
    },
    {
      name: "confirmPassword",
      placeholder: SIGNUP_ALERTS.CONFIRM_PASSWORD,
      value: signupFormData.confirmPassword,
      onChange: (e) => handleInputChange('confirmPassword', e.target.value),
      rules: [
        { required: true, message: SIGNUP_ALERTS.PASSWORD_CONFIRM_REQUIRED },
        {
          validator(_, value) {
            if (!value || signupFormData.password === value) {
              return Promise.resolve();
            }
            return Promise.reject(new Error(SIGNUP_ALERTS.PASSWORDS_DONT_MATCH));
          }
        }
      ]
    }
  ];

  const formInputs = inputFields.map((input, index) => (
    <Form.Item key={index} name={input.name} rules={input.rules}>
      <Input
        placeholder={input.placeholder}
        value={input.value}
        onChange={input.onChange}
      />
    </Form.Item>
  ));
  
  return (
    <div className='signup-container'>
      <Title level={2}>
        {SIGNUP_ALERTS.REGISTER}
      </Title>
      <Form onFinish={handleSubmit}>
        {formInputs}
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
            {SIGNUP_ALERTS.REGISTER}
          </Button>
          <div style={{ textAlign: 'center', marginTop: '10px' }}>
            {SIGNUP_ALERTS.HAVE_ACCOUNT} <RouterLink to="/Login">{SIGNUP_ALERTS.LOGIN}</RouterLink>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Signup;
