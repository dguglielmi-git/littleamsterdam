import React from 'react';
import { Tooltip } from 'primereact/tooltip';
import { Icon } from 'semantic-ui-react';
import '../Menu.scss';

const ButtonUpload = ({ setShowModal,t }) => {
	return (
		<div className="menu__button upload" data-pr-tooltip={t('menuUploadImage')}>
			<Tooltip target=".upload" position="bottom" />
			<Icon name="upload" size="large" color="blue" onClick={() => setShowModal(true)} />
		</div>
	);
};

export default ButtonUpload;
