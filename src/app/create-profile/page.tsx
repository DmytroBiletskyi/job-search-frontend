"use client";

import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Link from 'next/link';
import * as Yup from 'yup';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const ProfileSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Password too short').required('Password is required'),
  name: Yup.string().required('Name is required'),
  desiredJobTitle: Yup.string().required('Desired Job Title is required'),
  aboutMe: Yup.string().required('About Me is required'),
});

const CreateProfilePage = () => {
  const router = useRouter();

  const handleSubmit = async (values: any) => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}register`, values);
      if (response.status === 201) {
        alert('User registered successfully');
        router.push('/login');
      }
    } catch (error) {
      alert('Error registering user. Please try again.');
      console.error('Registration error:', error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Create Profile</h1>
        <Formik
          initialValues={{ email: '', password: '', name: '', desiredJobTitle: '', aboutMe: '' }}
          validationSchema={ProfileSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <Field
                  id="email"
                  name="email"
                  type="email"
                  className="border p-2 rounded w-full border-gray-300"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <Field
                  id="password"
                  name="password"
                  type="password"
                  className="border p-2 rounded w-full border-gray-300"
                />
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
              </div>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <Field
                  id="name"
                  name="name"
                  className="border p-2 rounded w-full border-gray-300"
                />
                <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
              </div>
              <div>
                <label htmlFor="desiredJobTitle" className="block text-sm font-medium text-gray-700">
                  Desired Job Title
                </label>
                <Field
                  id="desiredJobTitle"
                  name="desiredJobTitle"
                  className="border p-2 rounded w-full border-gray-300"
                />
                <ErrorMessage name="desiredJobTitle" component="div" className="text-red-500 text-sm mt-1" />
              </div>
              <div>
                <label htmlFor="aboutMe" className="block text-sm font-medium text-gray-700">
                  About Me
                </label>
                <Field
                  as="textarea"
                  id="aboutMe"
                  name="aboutMe"
                  className="border p-2 rounded w-full border-gray-300"
                />
                <ErrorMessage name="aboutMe" component="div" className="text-red-500 text-sm mt-1" />
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600 transition-colors"
              >
                Register
              </button>
            </Form>
          )}
        </Formik>
        <div className="text-center mt-4">
          <span className="text-gray-600">Go to Login -</span>
          <Link href="/login" className="text-blue-500 hover:text-blue-700 ml-2">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CreateProfilePage;
