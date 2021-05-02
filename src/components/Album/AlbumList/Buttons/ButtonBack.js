import React from 'react';
import { Icon, Popup } from 'semantic-ui-react';
import '../AlbumList.scss';

const ButtonBack = ({setAlbumSelected, t}) => (
	<Popup
		content={t('albumListGoBack')}
		trigger={
			<Icon
				className="icons"
				link
				name="arrow alternate circle left outline"
				size="large"
				color="blue"
				onClick={() => setAlbumSelected(false)}
			/>
		}
	/>
);

export default ButtonBack;
