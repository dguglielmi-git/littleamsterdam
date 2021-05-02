import React from 'react';
import { Icon } from 'semantic-ui-react';
import '../AlbumList.scss';

const ButtonAddAlbum = ({ addAlbumModal, t }) => {
	return (
		<div className="album__addButton" onClick={() => addAlbumModal()}>
			<Icon link name="plus" size="big" color="blue" />
			<p>{t('')}</p>
		</div>
	);
};

export default ButtonAddAlbum;
