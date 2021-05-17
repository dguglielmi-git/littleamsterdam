import React from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { Form, TextArea, Button } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';
import { UPDATE_USER } from '../../../gql/user';
import '../../../locales/i18n';
import './DescriptionForm.scss';

export default function DescriptionForm(props) {
	const { t } = useTranslation();
	const { setShowModal, currentDescription, refetch } = props;
	const [updateUser] = useMutation(UPDATE_USER);

	const formik = useFormik({
		initialValues: {
			description: currentDescription || '',
		},
		validateOnChange: false,
		validationSchema: Yup.object({
			description: Yup.string().required(),
		}),
		onSubmit: async (formData) => {
			try {
				await updateUser({
					variables: {
						input: formData,
					},
				});
				refetch();
				toast.success(t('descriptionFormDescUpdatedOk'));
				setShowModal(false);
			} catch (error) {
				toast.error(t('descriptionFormUpdateError'));
			}
		},
	});
	return (
		<Form className="description-form" onSubmit={formik.handleSubmit}>
			<TextArea
				name="description"
				value={formik.values.description}
				onChange={formik.handleChange}
				className={formik.errors.description && 'error'}
			/>
			<Button type="submit" className="btn-submit">
				{t('descriptionFormUpdateButton')}
			</Button>
		</Form>
	);
}
