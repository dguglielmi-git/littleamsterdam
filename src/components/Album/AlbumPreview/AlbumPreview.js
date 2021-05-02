import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import { DELETE_ALBUM } from '../../../gql/album';
import { Image, Confirm } from 'semantic-ui-react';
import ButtonDelete from './ButtonDelete';
import ImgNotFound from '../../../assets/imgNotFound.png';
import '../../../locales/i18n';
import './AlbumPreview.scss';

export default function PreviewPublication(props) {
	const { album, isAlbum, refetchAlbum, handleAlbumSelect } = props;
	const [showConfig, setShowConfirm] = useState(false);
	const [removeAlbum] = useMutation(DELETE_ALBUM);
	const { t } = useTranslation();

	const handleConfirm = () => setShowConfirm(true);
	const closeConfirm = () => setShowConfirm(false);

	const deleteAlbum = async () => {
		try {
			await removeAlbum({
				variables: { idAlbum: album.id },
			});
			toast.success(t('albumPreviewAlbumDeleted'));
			refetchAlbum();
		} catch (error) {
			toast.error(t('albumPreviewErrorDelete'));
		}
		setShowConfirm(false);
	};

	return (
		<>
			<div className="preview-album">
				<div className="preview-album__title">
					<strong>{album.title}</strong>
					{isAlbum && <ButtonDelete t={t} onDelete={handleConfirm} />}
				</div>
				<div className="preview-album__image-box">
					<Image
						className="preview-album__image"
						src={album.picture === 'none' ? ImgNotFound : album.picture}
						onClick={() => handleAlbumSelect(album.id)}
					/>
				</div>
			</div>
			<Confirm
				open={showConfig}
				onCancel={closeConfirm}
				onConfirm={deleteAlbum}
				content={t('albumPreviewConfirmDelete')}
				size="mini"
			/>
		</>
	);
}
