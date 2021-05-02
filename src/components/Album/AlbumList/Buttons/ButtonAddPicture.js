import React from 'react';
import { Popup, Icon } from 'semantic-ui-react';
import '../AlbumList.scss';

const ButtonAddPicture = ({ t, setShowModalUpload }) => (
	<Popup
		content={t('albumListUploadPic')}
		trigger={
			<Icon
				className="icons"
				link
				name="cloud upload"
				size="large"
				color="blue"
				onClick={() => setShowModalUpload(true)}
			/>
		}
	/>
);

export default ButtonAddPicture;
