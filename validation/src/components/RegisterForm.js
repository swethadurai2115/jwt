import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './RegisterForm.css'; // Import the CSS file

const validationSchema = Yup.object({
  username: Yup.string().min(3, 'Username must be at least 3 characters').required('Username is required'),
  email: Yup.string().email('Email is invalid').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const RegisterForm = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  return (
    <div className="RegisterForm">
      <h1>Register</h1>
      <Formik
        initialValues={{ username: '', email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, setErrors, setStatus }) => {
          try {
            await axios.post('http://localhost:5000/register', values);
            setStatus({ success: 'Registration successful!' });
            navigate('/user-details'); // Navigate to UserDetails page
          } catch (error) {
            setErrors({ api: error.response.data.errors || ['Server error'] });
          }
          setSubmitting(false);
        }}
      >
        {({ status, isSubmitting }) => (
          <Form>
            <div>
              <label htmlFor="username">Username:</label>
              <Field type="text" name="username" />
              <ErrorMessage name="username" component="div" className="error" />
            </div>

            <div>
              <label htmlFor="email">Email:</label>
              <Field type="email" name="email" />
              <ErrorMessage name="email" component="div" className="error" />
            </div>

            <div>
              <label htmlFor="password">Password:</label>
              <Field type="password" name="password" />
              <ErrorMessage name="password" component="div" className="error" />
            </div>

            <button type="submit" disabled={isSubmitting}>Register</button>
            {status?.success && <p className="success">{status.success}</p>}
            {status?.errors && <p className="error">{status.errors.api}</p>}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegisterForm;
