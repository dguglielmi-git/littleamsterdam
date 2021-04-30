import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ModalBasic from '../../Modal/ModalBasic';
import { Grid, Image } from 'semantic-ui-react';
import { GET_USER } from '../../../gql/user';
import { useQuery } from '@apollo/client';
import useAuth from '../../../hooks/useAuth';
import UserNotFound from '../UserNotFound';
import HeaderProfile from './HeaderProfile';
import SettingsForm from './SettingsForm';
import AvatarForm from '../AvatarForm';
import Followers from './Followers';
import ImageNotFound from '../../../assets/notLogin.png';
import '../../../locales/i18n';
import './Profile.scss';

export default function Profile(props) {
	const { t } = useTranslation();
	const { username, totalPublications } = props;
	const [showModal, setShowModal] = useState(false);
	const [titleModal, setTitleModal] = useState('');
	const [childrenModal, setChildrenModal] = useState(null);
	const { auth } = useAuth();
	const { data, loading, error, refetch } = useQuery(GET_USER, {
		variables: { username },
	});

	// Avoid to render twice
	if (loading) return null;

	if (error) return <UserNotFound />;
	const { getUser } = data;

	const handlerModal = (type) => {
		switch (type) {
			case 'avatar':
				setTitleModal(t('profileChangePicture'));
				setChildrenModal(<AvatarForm setShowModal={setShowModal} auth={auth} />);
				setShowModal(true);
				break;
			case 'settings':
				setTitleModal('');
				setChildrenModal(
					<SettingsForm
						setShowModal={setShowModal}
						setTitleModal={setTitleModal}
						setChildrenModal={setChildrenModal}
						getUser={getUser}
						refetch={refetch}
					/>
				);
				setShowModal(true);
				break;
			default:
				break;
		}
	};
	return (
		<>
			<Grid className="profile">
				<Grid.Column width={5} className="profile__left">
					<Image
						src={getUser.avatar ? getUser.avatar : ImageNotFound}
						avatar
						onClick={() => username === auth.username && handlerModal('avatar')}
					/>
				</Grid.Column>
				<Grid.Column width={11} className="profile__right">
					<HeaderProfile getUser={getUser} auth={auth} handlerModal={handlerModal} />
					<div className="other">
						<p className="name">{getUser.name}</p>
						{getUser.siteWeb && (
							<a href={getUser.siteWeb} className="siteWeb">
								{getUser.siteWeb}
							</a>
						)}
						{getUser.description && <p className="description">{getUser.description}</p>}
					</div>
					<Followers username={username} totalPublications={totalPublications} idUser={getUser.id} />
				</Grid.Column>
			</Grid>

			<ModalBasic show={showModal} setShow={setShowModal} title={titleModal}>
				{childrenModal}
			</ModalBasic>
		</>
	);
}
