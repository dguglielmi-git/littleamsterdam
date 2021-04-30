import React, { useState, useEffect } from 'react';
import { map, size } from 'lodash';
import { Grid, Icon } from 'semantic-ui-react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_USER } from '../../../gql/user';
import { GET_ALBUMS } from '../../../gql/album';
import { GET_PUBLICATIONS } from '../../../gql/publication';
import { useTranslation } from 'react-i18next';
import '../../../locales/i18n';
import AlbumForm from '../AlbumForm';
import AlbumPreview from '../AlbumPreview';
import useAuth from '../../../hooks/useAuth';
import ModalBasic from '../../Modal/ModalBasic';
import useWindowDimensions from '../../../hooks/useWindowDimensions';
import PreviewPublication from '../../Publications/PreviewPublication';

import './AlbumList.scss';

export default function AlbumList() {
	const { auth } = useAuth();
	const { t } = useTranslation();
	const { username } = useParams();
	const { width } = useWindowDimensions();
	const [isAlbum, setIsAlbum] = useState(false);
	const [titleModal, setTitleModal] = useState('');
	const [showModal, setShowModal] = useState(false);
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

	const ButtonBack = () => {
		return (
			<Icon
				className="icons"
				link
				name="arrow alternate circle left outline"
				size="large"
				color="blue"
				onClick={() => setAlbumSelected(false)}
			/>
		);
	};

	const ButtonAddPicture = () => {
		return <Icon className="icons" link name="cloud upload" size="large" color="blue" />;
	};

	const getCols = () => (width > 600 ? 4 : 1);

	const ButtonAddAlbum = () => {
		return (
			<div className="album__addButton" onClick={() => addAlbumModal()}>
				<Icon link name="plus" size="big" color="blue" />
				<p>{t('')}</p>
			</div>
		);
	};

	return (
		<div className="album">
			{size(getAlbums) > 0 ? (
				<>
					{albumSelected && (
						<div className="album__goBack">
							<ButtonBack /> {isAlbum && <ButtonAddPicture />}{' '}
						</div>
					)}
					{!albumSelected ? (
						<>
							{isAlbum && <ButtonAddAlbum />}
							<Grid columns={getCols()}>
								{map(getAlbums, (album, index) => (
									<Grid.Column key={index}>
										<AlbumPreview
											album={album}
											isAlbum={isAlbum}
											refetchAlbum={refetchAlbum}
											handleAlbumSelect={handleAlbumSelect}
										/>
									</Grid.Column>
								))}
							</Grid>
						</>
					) : (
						<>
							{getPublications && size(getPublications) > 0 ? (
								<Grid columns={getCols}>
									{map(getPublications, (publication, index) => (
										<Grid.Column key={index}>
											<PreviewPublication publication={publication} />
										</Grid.Column>
									))}
								</Grid>
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
		</div>
	);
}
