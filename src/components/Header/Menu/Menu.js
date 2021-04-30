import React, { useState } from 'react';
import { Tooltip } from 'primereact/tooltip';
import { Icon, Image } from 'semantic-ui-react';
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
				{width > 500 ? (
					<>
						<Link to={`/profile/${auth.username}`}>
							<Image src={getUser.avatar ? getUser.avatar : ImageNotFound} avatar />
						</Link>
						<div className="menu__button upload" data-pr-tooltip={t('menuUploadImage')}>
							<Tooltip target=".upload" position="bottom" />
							<Icon name="upload" size="large" color="blue" onClick={() => setShowModal(true)} />
						</div>
						<div className="menu__button setting">
							<Tooltip target=".setting" position="bottom" />
							<Icon
								className="setting"
								data-pr-tooltip={t('menuAccountSettings')}
								name="setting"
								size="large"
								color="blue"
								onClick={() => handlerModal()}
							/>
						</div>
						<div className="menu__button shutdown">
							<Tooltip target=".shutdown" position="bottom" />
							<Icon
								className="shutdown"
								data-pr-tooltip={t('menuLogoff')}
								name="setting"
								size="large"
								color="blue"
								onClick={() => onLogout()}
							/>
						</div>
						<div className="menu__button shutdow">
							<DropCommon getUser={getUser} />
						</div>
					</>
				) : (
					<div className="burger">
						<Dropdown handlerModal={handlerModal} />
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
