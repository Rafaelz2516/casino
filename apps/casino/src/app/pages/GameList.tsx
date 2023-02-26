import { Field, Form, Formik } from 'formik';
import { useMemo, useState } from 'react';

import List from '../components/List';

interface SearchFormValues {
  search: string;
}

const GamesList = () => {
  const initialValues: SearchFormValues = {
    search: '',
  };
  const [toggle, setToggle] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const queryList = useMemo(() => ['?', `?name=${searchTerm}&`], [searchTerm]);

  const onSearch = async ({ search}: SearchFormValues): Promise<void> => {
    setToggle(1);
    setSearchTerm(search);
  };

  return (
    <div className="container max-w-5xl mx-auto p-8">
      <Formik
        initialValues={initialValues}
        onSubmit={(values: SearchFormValues) => onSearch(values)}
      >
        {({ isSubmitting }) => (
          <Form className="  mx-auto flex items-center pb-10 w-5/12">
            <div className="relative w-full">
              <label htmlFor="search" className="sr-only">
                Se
              </label>
              <Field
                type="text"
                name="search"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>

            <button
              type="submit"
              className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              disabled={isSubmitting}
            >
              Search
            </button>
          </Form>
        )}
      </Formik>

      <List query={queryList[toggle]} />
    </div>
  );
};

export default GamesList;
