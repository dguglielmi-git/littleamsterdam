import React from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Form, Button } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';
import { useMutation } from '@apollo/client';
import { ADD_COMMENT } from '../../../../gql/comment';
import '../../../../locales/i18n';
import './CommentForm.scss';

export default function CommentForm(props) {
	const { t } = useTranslation();
	const { publication } = props;
	const [addComment] = useMutation(ADD_COMMENT);

	const formik = useFormik({
		initialValues: {
			comment: '',
		},
		validateOnChange: false,
		validationSchema: Yup.object({
			comment: Yup.string().required(),
		}),
		onSubmit: async (formData) => {
			try {
				await addComment({
					variables: {
						input: {
							idPublication: publication.id,
							comment: formData.comment,
						},
					},
				});
				formik.handleReset();
			} catch (error) {
				console.log(error);
			}
		},
	});
	return (
		<Form className="comment-form" onSubmit={formik.handleSubmit}>
			<Form.Input
				placeholder={t('commentFormAddComment')}
				name="comment"
				value={formik.values.comment}
				onChange={formik.handleChange}
				error={formik.errors.comment && true}
			/>
			<Button type="submit">{t('commentFormCommentButton')}</Button>
		</Form>
	);
}
