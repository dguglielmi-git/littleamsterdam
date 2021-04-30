import React from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { Form, Button } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';
import { UPDATE_USER } from '../../../gql/user';
import '../../../locales/i18n';
import './SiteWebForm.scss';

export default function SiteWebForm(props) {
	const { t } = useTranslation();
	const { setShowModal, currentSiteWeb, refetch } = props;
	const [updateUser] = useMutation(UPDATE_USER);

	const formik = useFormik({
		initialValues: {
			siteWeb: currentSiteWeb || '',
		},
		validationSchema: Yup.object({
			siteWeb: Yup.string().required(),
		}),
		onSubmit: async (formData) => {
			try {
				await updateUser({
					variables: {
						input: formData,
					},
				});
				refetch();
				toast.success(t('siteWebFormUpdateOk'));
				setShowModal(false);
			} catch (error) {
				toast.error(t('siteWebFormUpdateError'));
			}
		},
	});
	return (
		<Form className="site-web-form" onSubmit={formik.handleSubmit}>
			<Form.Input
				name="siteWeb"
				placeholder={t('siteWebFormWebsite')}
				value={formik.values.siteWeb}
				onChange={formik.handleChange}
				className={formik.errors.siteWeb && 'error'}
			/>
			<Button type="submit" className="btn-submit">
				{t('siteWebFormUpdateButton')}
			</Button>
		</Form>
	);
}
