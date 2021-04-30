import React, { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'semantic-ui-react';
import { useDropzone } from 'react-dropzone';
import { useMutation } from '@apollo/client';
import { toast } from 'react-toastify';
import { UPDATE_AVATAR, GET_USER, DELETE_AVATAR } from '../../../gql/user';
import '../../../locales/i18n';
import './AvatarForm.scss';

export default function AvatarForm(props) {
	const { t } = useTranslation();
	const { setShowModal, auth } = props;
	const [loading, setLoading] = useState(false);

	const [updateAvatar] = useMutation(UPDATE_AVATAR, {
		update(cache, { data: { updateAvatar } }) {
			const { getUser } = cache.readQuery({
				query: GET_USER,
				variables: { username: auth.username },
			});
			cache.writeQuery({
				query: GET_USER,
				variables: { username: auth.username },
				data: {
					getUser: { ...getUser, avatar: updateAvatar.urlAvatar },
				},
			});
		},
	});

	const [deleteAvatar] = useMutation(DELETE_AVATAR, {
		update(cache) {
			const { getUser } = cache.readQuery({
				query: GET_USER,
				variables: { username: auth.username },
			});

			cache.writeQuery({
				query: GET_USER,
				variables: { username: auth.username },
				data: {
					getUser: { ...getUser, avatar: '' },
				},
			});
		},
	});

	const onDrop = useCallback(async (acceptedFile) => {
		const file = acceptedFile[0];

		try {
			setLoading(true);
			const result = await updateAvatar({ variables: { file } });
			const { data } = result;

			if (!data.updateAvatar.status) {
				toast.warning(t('avatarFormUpdateError'));
				setLoading(false);
			} else {
				setLoading(false);
				setShowModal(false);
			}
		} catch (error) {
			console.log(error);
		}
	}, []);

	const { getRootProps, getInputProps } = useDropzone({
		accept: 'image/jpeg, image/png',
		noKeyboard: true,
		multiple: false,
		onDrop,
	});

	const onDeleteAvatar = async () => {
		try {
			const result = await deleteAvatar();
			const { data } = result;
			if (!data.deleteAvatar) {
				toast.warning(t('avatarFormDeleteError'));
			} else {
				setShowModal(false);
			}
		} catch (error) {
			toast.warning(t('avatarFormDeleteError'));
		}
	};

	return (
		<div className="avatar-form">
			<Button {...getRootProps()} loading={loading}>
				{t('avatarFormLoadPicture')}
			</Button>
			<Button onClick={onDeleteAvatar}>{t('avatarFormDeleteCurrentPicture')}</Button>
			<Button onClick={() => setShowModal(false)}>{t('avatarFormCancel')}</Button>
			<input {...getInputProps()} />
		</div>
	);
}
