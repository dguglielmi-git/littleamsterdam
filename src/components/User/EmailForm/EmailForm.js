import React from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { Form, Button } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';
import { UPDATE_USER } from '../../../gql/user';
import '../../../locales/i18n';
import './EmailForm.scss';

export default function EmailForm(props) {
	const { t } = useTranslation();
	const { setShowModal, currentEmail, refetch } = props;
	const [updateUser] = useMutation(UPDATE_USER);

	const formik = useFormik({
		initialValues: {
			email: currentEmail || '',
		},
		validateOnChange: false,
		validationSchema: Yup.object({
			email: Yup.string().email().required(),
		}),
		onSubmit: async (formData) => {
			try {
				await updateUser({
					variables: {
						input: formData,
					},
				});
				refetch();
				toast.success(t('emailFormEmailUpdateOk'));
				setShowModal(false);
			} catch (error) {
				toast.error(t('emailFormUpdateError'));
			}
		},
	});
	return (
		<Form className="email-form" onSubmit={formik.handleSubmit}>
			<Form.Input
				placeholder={t('emailFormEnterNewMail')}
				name="email"
				value={formik.values.email}
				onChange={formik.handleChange}
				error={formik.errors.email && true}
			/>
			<Button type="submit" className="btn-submit">
				{t('emailFormUpdateButton')}
			</Button>
		</Form>
	);
}
