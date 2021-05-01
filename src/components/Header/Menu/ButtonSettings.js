import React from 'react';
import { Tooltip } from 'primereact/tooltip';
import { Icon } from 'semantic-ui-react';
import './Menu.scss';

const ButtonSettings = ({ handlerModal, t }) => {
	return (
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
	);
};

export default ButtonSettings;
