import React, { useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useMutation } from '@apollo/client';
import { Form, Button, Image } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';
import { LOGIN } from '../../../gql/user';
import { setToken, decodeToken } from '../../../utils/token';
import useAuth from '../../../hooks/useAuth';
import Logo from '../../../assets/Logo.png';
import Dropdown from '../../Common/Dropdown';
import '../../../locales/i18n';
import './LoginForm.scss';

export default function LoginForm() {
	const [error, setError] = useState('');
	const [login] = useMutation(LOGIN);
	const { t } = useTranslation();
	const { setUser } = useAuth();

	const formik = useFormik({
		initialValues: initialValues(),
		validationSchema: Yup.object({
			email: Yup.string().email(t('loginFormWrongEmail')).required(t('loginFormEmailRequired')),
			password: Yup.string().required(t('loginFormPassRequired')),
		}),
		onSubmit: async (formData) => {
			setError('');
			try {
				const { data } = await login({
					variables: {
						input: formData,
					},
				});

				const { token } = data.login;
				setToken(token);
				setUser(decodeToken(token));
			} catch (error) {
				setError(error.message);
			}
		},
	});

	return (
		<Form className="login-form" onSubmit={formik.handleSubmit}>
			<div className="login-form__logo">
				<Image src={Logo} />
			</div>

			<Form.Input
				type="text"
				placeholder={t('loginFormUserPass')}
				name="email"
				value={formik.values.email}
				onChange={formik.handleChange}
				error={formik.errors.email}
			/>
			<Form.Input
				type="password"
				placeholder={t('loginFormPassRequired')}
				name="password"
				value={formik.values.password}
				onChange={formik.handleChange}
				error={formik.errors.password}
			/>
			<Button fluid type="submit" className="btn-submit">
				{t('loginFormButton')}
			</Button>
			<div className="login-form__language">
				<p>{t('loginFormLangPicker')}</p>
				<Dropdown />
			</div>
			{error && <p className="submit-error">{error}</p>}
		</Form>
	);
}
function initialValues() {
	return {
		email: '',
		password: '',
	};
}
