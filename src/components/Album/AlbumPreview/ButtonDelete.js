import React from 'react';
import { Tooltip } from 'primereact/tooltip';
import { Icon } from 'semantic-ui-react';
import './AlbumPreview.scss';

const ButtonDelete = ({t, onDelete}) => {
	return (
		<div className="preview-album__title delete" data-pr-tooltip={t('buttonDelete')}>
			<Tooltip target=".delete" position="bottom" />
			<Icon link name="trash alternate" color="black" onClick={() => onDelete()} />
		</div>
	);
};
export default ButtonDelete;
