import React from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { useMutation } from '@apollo/client';
import { Form, TextArea, Button } from 'semantic-ui-react';
import { ADD_ALBUM } from '../../../gql/album';
import { useTranslation } from 'react-i18next';
import '../../../locales/i18n';
import './AlbumForm.scss';

export default function AlbumForm(props) {
	const { t } = useTranslation();
	const { setShowModal, refetchAlbum } = props;
	const [addAlbum] = useMutation(ADD_ALBUM);

	const formik = useFormik({
		initialValues: {
			title: 'new Album',
		},
		validationSchema: Yup.object({
			title: Yup.string().required(),
		}),
		onSubmit: async (formData) => {
			try {
				await addAlbum({
					variables: {
						input: {
							title: formData.title,
						},
					},
				});
				toast.success(t('albumFormAdded'));
				refetchAlbum();
				setShowModal(false);
			} catch (error) {
				toast.error(t('albumFormErrorSaving'));
			}
		},
	});
	return (
		<div className="albumForm">
			<Form className="album-form" onSubmit={formik.handleSubmit}>
				<TextArea
					name="title"
					value={formik.values.title}
					onChange={formik.handleChange}
					className={formik.errors.title && 'error'}
				/>
				<Button type="submit" className="btn-submit">
					{t('albumFormAddButton')}
				</Button>
			</Form>
		</div>
	);
}
