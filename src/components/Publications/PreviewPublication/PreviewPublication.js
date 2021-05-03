import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Image, Confirm } from 'semantic-ui-react';
import ModalPublication from '../../Modal/ModalPublication';
import { useTranslation } from 'react-i18next';
import ButtonDelete from '../../Album/AlbumPreview/ButtonDelete';
import { DELETE_PUBLICATION } from '../../../gql/publication';
import { useMutation } from '@apollo/client';
import './PreviewPublication.scss';

export default function PreviewPublication(props) {
	const { publication, isOwner, refetchPublication } = props;
	const { t } = useTranslation();
	const [showModal, setShowModal] = useState(false);
	const [showConfig, setShowConfirm] = useState(false);
	const [deletePublication] = useMutation(DELETE_PUBLICATION);

	const handleConfirm = () => setShowConfirm(true);
	const closeConfirm = () => setShowConfirm(false);

	const deletePicture = async () => {
		// Remove Picture
		console.log(publication.id);
		try {
			await deletePublication({
				variables: { idPublication: publication.id },
			});
			toast.success(t('previewPublicationDeleteOk'));
			if (refetchPublication !== undefined) refetchPublication();
		} catch (error) {
			console.log(error);
			toast.error(t('previewPublicationDeleteError'));
		}
		setShowConfirm(false);

		closeConfirm();
	};

	return (
		<>
			<div className="preview-publication">
				<div className="preview-publication__buttons">
					{isOwner && <ButtonDelete t={t} onDelete={handleConfirm} />}
				</div>
				<div className="preview-publication__image-box">
					<Image
						className="preview-publication__image-box-image"
						onClick={() => setShowModal(true)}
						src={publication.file}
					/>
				</div>
			</div>
			<ModalPublication show={showModal} setShow={setShowModal} publication={publication} />
			<Confirm
				open={showConfig}
				onCancel={closeConfirm}
				onConfirm={deletePicture}
				content={t('previewPublicationDelete')}
				size="mini"
			/>
		</>
	);
}
