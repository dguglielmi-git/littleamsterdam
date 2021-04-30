import React from 'react';
import './UserNotFound.scss';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import '../../../locales/i18n';

export default function UserNotFound() {
	const { t } = useTranslation();
	return (
		<div className="user-not-found">
			<p>{t('userNotFoundMsg')}</p>
			<p>{t('userNotFoundLinkErrorMsg')}</p>
			<Link to="/">{t('userNotFoundGoBack')}</Link>
		</div>
	);
}
