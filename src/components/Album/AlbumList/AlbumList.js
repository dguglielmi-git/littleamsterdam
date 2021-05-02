import React, { useState, useEffect } from 'react';
import { size } from 'lodash';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_USER } from '../../../gql/user';
import { GET_ALBUMS } from '../../../gql/album';
import { GET_PUBLICATIONS } from '../../../gql/publication';
import { useTranslation } from 'react-i18next';
import '../../../locales/i18n';
import AlbumForm from '../AlbumForm';
import AlbumListing from './AlbumListing';
import AlbumContent from './AlbumContent';
import ButtonBack from './Buttons/ButtonBack';
import ButtonAddAlbum from './Buttons/ButtonAddAlbum';
import ButtonAddPicture from './Buttons/ButtonAddPicture';
import useAuth from '../../../hooks/useAuth';
import ModalBasic from '../../Modal/ModalBasic';
import ModalUpload from '../../Modal/ModalUpload';
import useWindowDimensions from '../../../hooks/useWindowDimensions';

import './AlbumList.scss';

export default function AlbumList() {
	const { auth } = useAuth();
	const { t } = useTranslation();
	const { username } = useParams();
	const { width } = useWindowDimensions();
	const [isAlbum, setIsAlbum] = useState(false);
	const [titleModal, setTitleModal] = useState('');
	const [showModal, setShowModal] = useState(false);
	const [showModalUpload, setShowModalUpload] = useState(false);
	const [childrenModal, setChildrenModal] = useState(null);
	const [albumSelected, setAlbumSelected] = useState(false);
	const [idAlbumSelected, setIdAlbumSelected] = useState('-1');

	const { data, loading } = useQuery(GET_USER, {
		variables: { username },
	});

	const { data: dataPublication, loading: loadingPublication, refetch: refetchPublication } = useQuery(
		GET_PUBLICATIONS,
		{
			variables: { username, idAlbum: idAlbumSelected },
		}
	);

	const idUser = data.getUser.id;

	const { data: dataAlbum, loading: loadingAlbum, refetch: refetchAlbum } = useQuery(GET_ALBUMS, {
		variables: { id: idUser },
	});

	useEffect(() => {
		setIsAlbum(username === auth.username);
	}, [username, auth.username]);

	if (loading || loadingAlbum || loadingPublication) return null;

	const { getAlbums } = dataAlbum;
	const { getPublications } = dataPublication || null;

	const addAlbumModal = () => {
		setTitleModal(t('albumListName'));
		setChildrenModal(<AlbumForm setShowModal={setShowModal} refetchAlbum={refetchAlbum} />);
		setShowModal(true);
	};

	const handleAlbumSelect = (id) => {
		setAlbumSelected(true);
		setIdAlbumSelected(id);
		refetchPublication();
	};

	const getCols = () => (width > 600 ? 4 : 1);

	return (
		<div className="album">
			{size(getAlbums) > 0 ? (
				<>
					{albumSelected && (
						<div className="album__goBack">
							<ButtonBack setAlbumSelected={setAlbumSelected} t={t} />
							{isAlbum && <ButtonAddPicture t={t} setShowModalUpload={setShowModalUpload}/>}{' '}
						</div>
					)}
					{!albumSelected ? (
						<>
							{isAlbum && <ButtonAddAlbum addAlbumModal={addAlbumModal} t={t} />}
							<AlbumListing
								getCols={getCols}
								getAlbums={getAlbums}
								isAlbum={isAlbum}
								refetchAlbum={refetchAlbum}
								handleAlbumSelect={handleAlbumSelect}
							/>
						</>
					) : (
						<>
							{getPublications && size(getPublications) > 0 ? (
								<AlbumContent getCols={getCols} getPublications={getPublications} />
							) : (
								<div>{t('albumListEmpty')}</div>
							)}
						</>
					)}
				</>
			) : (
				<div>{t('albumListNotFound')}</div>
			)}
			<ModalBasic show={showModal} setShow={setShowModal} title={titleModal}>
				{childrenModal}
			</ModalBasic>
			<ModalUpload show={showModalUpload} setShow={setShowModalUpload} idAlbum={idAlbumSelected} />
		</div>
	);
}
