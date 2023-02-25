import { ErrorMessage, Field, Form, Formik, FormikErrors, FormikHelpers } from 'formik';
import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';

import { loginUser } from '../api/user';
import { isLoggedInAtom, userAtom } from '../atom';

interface LoginFormValues {
  username: string;
  password: string;
}

const Login = () => {
  const [error, setError] = useState<string>();
  const setUser = useSetRecoilState(userAtom);
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInAtom);
  const navigate = useNavigate();

  const initialValues: LoginFormValues = { username: '', password: '' };

  const onLogin = async (values: LoginFormValues): Promise<void> => {
    try {
      const data = await loginUser({
        username: values.username,
        password: values.password,
      });
      localStorage.setItem('jwtToken', data.token);
      setIsLoggedIn(true);
      setUser(data.user);
      navigate('/', { replace: true });
    } catch (e: any) {
      console.log(e);
      setError(e.response.data.message)
    }
  };

  useEffect(() => {
    if (isLoggedIn) navigate('/', { replace: true });
  }, [isLoggedIn, navigate]);

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>

            <Formik
              initialValues={initialValues}
              validate={(values) => {
                const errors = {} as FormikErrors<LoginFormValues>;
                if (!values.username) {
                  errors.username = 'Required';
                }
                if (!values.password) {
                  errors.password = 'Required';
                }
                return errors;
              }}
              onSubmit={(
                values: LoginFormValues,
                { setSubmitting }: FormikHelpers<LoginFormValues>
              ) => onLogin(values)}
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

                  <div className="flex items-center justify-between">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="remember"
                          aria-describedby="remember"
                          type="checkbox"
                          className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label
                          htmlFor="remember"
                          className="text-gray-500 dark:text-gray-300"
                        >
                          Remember me
                        </label>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    disabled={isSubmitting}
                  >
                    Sign in
                  </button>

                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Don’t have an account yet?
                    <NavLink
                      to="/register"
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                    >
                      Sign up
                    </NavLink>
                  </p>

                  {error && <p className="text-red-500">{error}</p>}
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
