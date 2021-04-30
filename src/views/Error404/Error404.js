import React from 'react';
import { Image } from 'semantic-ui-react';
import Sadness from '../../assets/sadness.png';
import { useTranslation } from 'react-i18next';
import '../../locales/i18n';
import './Error404.scss';

export default function Error404() {
	const { t } = useTranslation();
	return (
		<div className="error404">
			<Image src={Sadness} />
			<div classname="error404__message">
				<h1>{t('error404')}</h1>
				<h3>{t('error404Message')}</h3>
			</div>
		</div>
	);
}
