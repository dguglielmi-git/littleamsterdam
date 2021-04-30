import React from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { Form, Button } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';
import { UPDATE_USER } from '../../../gql/user';
import '../../../locales/i18n';
import './PasswordForm.scss';

export default function PasswordForm(props) {
	const { logout } = props;
	const { t } = useTranslation();
	const [updateUser] = useMutation(UPDATE_USER);

	const formik = useFormik({
		initialValues: initialValues(),
		validationSchema: Yup.object({
			currentPassword: Yup.string().required(),
			newPassword: Yup.string()
				.required()
				.oneOf([Yup.ref('repeatNewPassword')]),
			repeatNewPassword: Yup.string()
				.required()
				.oneOf([Yup.ref('newPassword')]),
		}),
		onSubmit: async (formValues) => {
			try {
				const result = await updateUser({
					variables: {
						input: {
							currentPassword: formValues.currentPassword,
							newPassword: formValues.newPassword,
						},
					},
				});

				if (!result.data.updateUser) {
					toast.error(t('passwordFormPassChangeError'));
				} else {
					toast.success(t('passwordFormPassUpdateOk'));
					logout();
				}
			} catch (error) {
				toast.error(t('passwordFormPassChangeError'));
			}
		},
	});

	return (
		/*
        value={formik.values.<campo>
        onChange={formik.handleChange}
        error={formik.errors.<campo>}
        
        *** In case we don't want the field shows the message but highlight it with red color, we use the following:
        error={formik.errors.<campo> && true}
    */
		<Form className="password-form" onSubmit={formik.handleSubmit}>
			<Form.Input
				type="password"
				placeholder={t('passwordFormCurrentPass')}
				name="currentPassword"
				value={formik.values.currentPassword}
				onChange={formik.handleChange}
				error={formik.errors.currentPassword && true}
			/>
			<Form.Input
				type="password"
				placeholder={t('passwordFormNewPass')}
				name="newPassword"
				value={formik.values.newPassword}
				onChange={formik.handleChange}
				error={formik.errors.newPassword && true}
			/>
			<Form.Input
				type="password"
				placeholder={t('passwordFormRepeatPass')}
				name="repeatNewPassword"
				values={formik.values.repeatNewPassword}
				onChange={formik.handleChange}
				error={formik.errors.repeatNewPassword && true}
			/>
			<Button type="submit" className="btn-submit">
				{t('passwordFormUpdateButton')}
			</Button>
		</Form>
	);
}

function initialValues() {
	return {
		currentPassword: '',
		newPassword: '',
		repeatNewPassword: '',
	};
}
