import React, { useState } from 'react';
import { Image } from 'semantic-ui-react';
import { useApolloClient } from '@apollo/client';
import { useHistory, Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_USER } from '../../../gql/user';
import { useTranslation } from 'react-i18next';
import SettingsForm from '../../User/Profile/SettingsForm';
import ModalUpload from '../../Modal/ModalUpload';
import ModalBasic from '../../Modal/ModalBasic';
import Dropdown from './Dropdown';
import useAuth from '../../../hooks/useAuth';
import useWindowDimensions from '../../../hooks/useWindowDimensions';
import ImageNotFound from '../../../assets/notLogin.png';
import DropCommon from '../../Common/Dropdown';
import '../../../locales/i18n';
import 'flag-icon-css/css/flag-icon.css';
import { MOBILE_RES } from '../../../utils/constants';
import ButtonUpload from './Buttons/ButtonUpload';
import ButtonSettings from './Buttons/ButtonSettings';
import ButtonLogout from './Buttons/ButtonLogout';
import './Menu.scss';

export default function Menu() {
	const history = useHistory();
	const { t } = useTranslation();
	const client = useApolloClient();
	const { auth, logout } = useAuth();
	const { width } = useWindowDimensions();
	const [titleModal, setTitleModal] = useState('');
	const [showModal, setShowModal] = useState(false);
	const [childrenModal, setChildrenModal] = useState(null);
	const [showModalBasic, setShowModalBasic] = useState(false);
	const { data, loading, error, refetch } = useQuery(GET_USER, {
		variables: { username: auth.username },
	});

	if (loading || error) return null;
	const { getUser } = data;

	// Cleaning Apollo Client Cache
	const onLogout = () => {
		client.clearStore();
		logout();
		history.push('/');
	};

	const handlerModal = (type) => {
		setTitleModal('');
		setChildrenModal(
			<SettingsForm
				setShowModalBasic={setShowModalBasic}
				setTitleModal={setTitleModal}
				setChildrenModal={setChildrenModal}
				getUser={getUser}
				refetch={refetch}
			/>
		);
		setShowModalBasic(true);
	};

	return (
		<>
			<div className="menu">
				{width > MOBILE_RES ? (
					<>
						<Link to={`/profile/${auth.username}`}>
							<Image src={getUser.avatar ? getUser.avatar : ImageNotFound} avatar />
						</Link>
						<ButtonUpload setShowModal={setShowModal} t={t} />
						<ButtonSettings handlerModal={handlerModal} t={t} />
						<ButtonLogout onLogout={onLogout} t={t} />
						<div className="menu__button shutdow">
							<DropCommon getUser={getUser} refetch={refetch} />
						</div>
					</>
				) : (
					<div className="mobile">
						<div className="mobile__burger">
							<Dropdown handlerModal={handlerModal} />
						</div>
						<div className="mobile__lang">
							<DropCommon getUser={getUser} refetch={refetch} />
						</div>
					</div>
				)}
			</div>
			<ModalUpload show={showModal} setShow={setShowModal} />
			<ModalBasic show={showModalBasic} setShow={setShowModalBasic} title={titleModal}>
				{childrenModal}
			</ModalBasic>
		</>
	);
}
