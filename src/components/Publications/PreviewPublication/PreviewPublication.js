import React, { useState } from 'react';
import { Image, Confirm } from 'semantic-ui-react';
import ModalPublication from '../../Modal/ModalPublication';
import { useTranslation } from 'react-i18next';
import ButtonDelete from '../../Album/AlbumPreview/ButtonDelete';
import './PreviewPublication.scss';

export default function PreviewPublication(props) {
	const { publication } = props;
	const { t } = useTranslation();
	const [showModal, setShowModal] = useState(false);
	const [showConfig, setShowConfirm] = useState(false);

	const handleConfirm = () => setShowConfirm(true);
	const closeConfirm = () => setShowConfirm(false);

	const deletePicture = () => {
		// Remove Picture
		console.log(publication);
		closeConfirm();
	};
	return (
		<>
			<div className="preview-publication">
				<div className="preview-publication__buttons">
					<ButtonDelete t={t} onDelete={handleConfirm} />
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
