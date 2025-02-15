import { useRouter } from 'next/router';
import React from 'react';
import { Form, Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';

import Field from '@components/common/field';
import appAxios from '@lib/api/appAxios';
import { useUserContext } from '@context/user';
import { routes } from '@lib/constants';
import { loginSchema } from '@validations/users';

type loginType = Yup.TypeOf<typeof loginSchema>;

const initialValues: loginType = {
  email: 'kalat@kanime.fr',
  password: 'azerty',
};

const LoginForm: React.FunctionComponent = () => {
  const { signIn } = useUserContext();
  const router = useRouter();

  const handleSubmit = async (values: loginType, helpers: FormikHelpers<loginType>) => {
    try {
      const response = await appAxios.post('auth/login', values);
      signIn(response.data.user);

      await router.push(`${routes.users}/${response.data.user.id}`);
    } catch (e) {
      console.log('E', e);
    }
  };

  return (
    <div className="bg-gray-50 border px-10 py-10 shadow-xl rounded">
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={loginSchema}
      >
        <Form>
          <div>
            <div className="mb-10 text-center">
              <h2 className="text-2xl font-semibold">
                Connectez-vous a {process.env.NEXT_PUBLIC_APP_NAME}
              </h2>
            </div>
            <div className="flex flex-col my-5">
              <Field label="Email" type="email" name="email" required />
            </div>
            <div className="flex flex-col my-5">
              <Field label="Mot de passe" type="password" name="password" required />
            </div>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-700 text-white text-xl px-10 py-2 rounded shadow hover:shadow-xl cursor-pointer transition transform duration-100 hover:scale-105"
            >
              Connexion
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default LoginForm;
