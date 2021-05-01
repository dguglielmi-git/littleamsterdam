import React, { useState } from 'react';
import { useHistory, Redirect, useParams } from 'react-router-dom';
import { Dropdown, Icon } from 'semantic-ui-react';
import { useApolloClient } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import useAuth from '../../../hooks/useAuth';
import '../../../locales/i18n';

const trigger = <Icon name="bars" style={{ fontSize: '30px', marginTop: '5px' }} />;

export default function DropdownMenu(props) {
	const { t } = useTranslation();
	const { handlerModal } = props;
	const { auth, logout } = useAuth();
	const client = useApolloClient();
	const history = useHistory();
	const [redirect, setRedirect] = useState(false);
	const { username } = useParams();

	// Cleaning Apollo Client Cache
	const onLogout = () => {
		client.clearStore();
		logout();
		history.push('/');
	};

	const goHome = () => setRedirect(!(username === auth.username));

	if (redirect) return <Redirect to={`/profile/${auth.username}`} />;

	return (
		<Dropdown trigger={trigger} pointing="top right" icon={null}>
			<Dropdown.Menu>
				<Dropdown.Item icon="user" text={t('menuDropdownAccount')} onClick={() => goHome()} />
				<Dropdown.Item icon="settings" text={t('menuDropdownSettings')} onClick={() => handlerModal()} />
				<Dropdown.Item icon="sign out" text={t('menuDropdownLogout')} onClick={() => onLogout()} />
			</Dropdown.Menu>
		</Dropdown>
	);
}
