import { parse } from 'date-fns';
import { ErrorMessage, Field, Form, Formik, FormikErrors } from 'formik';
import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import { registerUser } from '../api/user';
import { isLoggedInAtom } from '../atom';

interface RegisterUpFormValues {
  username: string;
  password: string;
  confirmPassword: string;
  birthDate: string;
}

const Register = () => {
  const [error, setError] = useState<string>();
  const initialValues: RegisterUpFormValues = {
    username: '',
    password: '',
    confirmPassword: '',
    birthDate: '',
  };
  const [isLoggedIn] = useRecoilState(isLoggedInAtom);
  const navigate = useNavigate();

  const onRegister = async (values: RegisterUpFormValues) => {
    try {
      await registerUser({
        username: values.username,
        password: values.password,
        confirmPassword: values.confirmPassword,
        birthDate: parse(values.birthDate, 'yyyy-MM-dd', new Date()),
      });
      navigate('/login', { replace: true });
    } catch (error: any) {
      let errors = error.response.data.message;
      if (Array.isArray(errors)) {
        errors = errors.join('\r\n');
      }
      setError(errors);
    }
  };

  useEffect(() => {
    if (isLoggedIn) navigate('/', { replace: true });
  }, [isLoggedIn, navigate]);

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create and account
            </h1>

            <Formik
              initialValues={initialValues}
              validate={(values) => {
                const errors = {} as FormikErrors<RegisterUpFormValues>;
                if (!values.username) {
                  errors.username = 'Required';
                }
                if (!values.password) {
                  errors.password = 'Required';
                }
                if (!values.confirmPassword) {
                  errors.confirmPassword = 'Required';
                }
                if (!values.birthDate) {
                  errors.birthDate = 'Required';
                }
                return errors;
              }}
              onSubmit={(values: RegisterUpFormValues) => onRegister(values)}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-4 md:space-y-6">
                  <div>
                    <label
                      htmlFor="username"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Username
                    </label>
                    <Field
                      type="username"
                      name="username"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                    <ErrorMessage
                      name="username"
                      component="div"
                      className="text-red-500"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Password
                    </label>
                    <Field
                      type="password"
                      name="password"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-500"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Confirm password
                    </label>
                    <Field
                      type="password"
                      name="confirmPassword"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                    <ErrorMessage
                      name="confirmPassword"
                      component="div"
                      className="text-red-500"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="birthDate"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Birthdate
                    </label>
                    <Field
                      type="date"
                      name="birthDate"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                    <ErrorMessage
                      name="birthDate"
                      component="div"
                      className="text-red-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    disabled={isSubmitting}
                  >
                    Create an account
                  </button>

                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Already have an account?{' '}
                    <NavLink
                      to="/login"
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                    >
                      Login here
                    </NavLink>
                  </p>
                  {error && (
                    <p className="text-red-500 whitespace-pre">{error}</p>
                  )}
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
