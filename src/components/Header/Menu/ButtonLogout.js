import React from 'react';
import { Tooltip } from 'primereact/tooltip';
import { Icon } from 'semantic-ui-react';
import './Menu.scss';

const ButtonLogout = ({ onLogout, t }) => {
	return (
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
	);
};
export default ButtonLogout;
