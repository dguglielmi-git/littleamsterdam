import React from 'react';
import { Button } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useApolloClient } from '@apollo/client';
import EmailForm from '../../EmailForm';
import SiteWebForm from '../../SiteWebForm';
import PasswordForm from '../../PasswordForm';
import DescriptionForm from '../../DescriptionForm';
import useAuth from '../../../../hooks/useAuth';
import '../../../../locales/i18n';
import './SettingsForm.scss';

export default function SettingsForm(props) {
	const { t } = useTranslation();
	const { setShowModal, setTitleModal, setChildrenModal, getUser, refetch } = props;
	const history = useHistory();
	const client = useApolloClient();
	const { logout } = useAuth();

	const onChangePassword = () => {
		setTitleModal(t('settingsFormChangePassword'));
		setChildrenModal(<PasswordForm logout={onLogout} />);
	};

	const onChangeEmail = () => {
		setTitleModal(t('settingsFormChangeEmail'));
		setChildrenModal(<EmailForm setShowModal={setShowModal} currentEmail={getUser.email} refetch={refetch} />);
	};

	const onChangeDescription = () => {
		setTitleModal(t('settingsFormChangeDesc'));
		setChildrenModal(
			<DescriptionForm setShowModal={setShowModal} currentDescription={getUser.description} refetch={refetch} />
		);
	};

	const onChangeSiteWeb = () => {
		setTitleModal(t('settingsFormChangeWeb'));
		setChildrenModal(
			<SiteWebForm setShowModal={setShowModal} currentSiteWeb={getUser.siteWeb} refetch={refetch} />
		);
	};

	// Clean Apollo Client store
	const onLogout = () => {
		client.clearStore();
		logout();
		history.push('/');
	};

	return (
		<div className="settings-form">
			<Button onClick={onChangePassword}>{t('settingsFormChangePassButton')}</Button>
			<Button onClick={onChangeEmail}>{t('settingsFormChangeEmailButton')}</Button>
			<Button onClick={onChangeDescription}>{t('settingsFormChangeDescButton')}</Button>
			<Button onClick={onChangeSiteWeb}>{t('settingsFormChangeWebButton')}</Button>
			<Button onClick={onLogout}>{t('settingsFormLogoutButton')}</Button>
			<Button onClick={() => setShowModal(false)}>{t('settingsFormCancelButton')}</Button>
		</div>
	);
}
