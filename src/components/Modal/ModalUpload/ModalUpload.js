import React, { useState, useCallback } from 'react';
import { Modal, Icon, Button, Dimmer, Loader } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';
import { useDropzone } from 'react-dropzone';
import { useMutation } from '@apollo/client';
import { toast } from 'react-toastify';
import { PUBLISH } from '../../../gql/publication';
import '../../../locales/i18n';
import './ModalUpload.scss';

export default function ModalUpload(props) {
	const { t } = useTranslation();
	const { show, setShow, idAlbum, refetchPublication } = props;
	const [fileUpload, setFileUpload] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [publish] = useMutation(PUBLISH);

	const onDrop = useCallback((acceptedFile) => {
		const file = acceptedFile[0];
		setFileUpload({
			type: 'image',
			file,
			preview: URL.createObjectURL(file),
		});
	});

	const { getRootProps, getInputProps } = useDropzone({
		accept: 'image/jpeg, image/png',
		noKeyboard: true,
		multiple: false,
		onDrop,
	});

	const onClose = () => {
		setIsLoading(false);
		setFileUpload(null);
		setShow(false);
	};

	const onPublish = async () => {
		try {
			setIsLoading(true);
			const result = await publish({
				variables: {
					file: fileUpload.file,
					album: idAlbum === undefined ? '0' : idAlbum,
				},
			});
			const { data } = result;
			if (!data.publish.status) {
				toast.warning(t('modalUploadPublishError'));
				setIsLoading(false);
			} else {
				if (refetchPublication !== undefined) refetchPublication();
				onClose();
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Modal size="small" open={show} onClose={onClose} className="modal-upload">
			<div {...getRootProps()} className="dropzone" style={fileUpload && { border: 0 }}>
				{!fileUpload && (
					<>
						<Icon name="cloud upload" />
						<p>{t('modalUploadDragAndDrop')}</p>
					</>
				)}

				<input {...getInputProps()} />
			</div>

			{fileUpload?.type === 'image' && (
				<div className="image" style={{ backgroundImage: `url("${fileUpload.preview}")` }} />
			)}
			{fileUpload && (
				<Button className="btn-upload btn-action" onClick={onPublish}>
					{t('modalUploadPublishButton')}
				</Button>
			)}

			{isLoading && (
				<Dimmer active className="publishing">
					<Loader />
					<p>{t('modalUploadPublishingMsg')}</p>
				</Dimmer>
			)}
		</Modal>
	);
}
