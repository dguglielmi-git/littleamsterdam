import React from 'react';
import { Icon } from 'semantic-ui-react';
import './ModalPublication.scss';

const ModalPubTitle = ({ datePublish, onClose, t }) => {
	return (
		<div className="modal-publication__right__close">
			<p>
				<strong>{t('modalPublicationPublishDate')}</strong> {datePublish}
			</p>
			<Icon link name="close" size="big" onClick={onClose} />
		</div>
	);
};

export default ModalPubTitle;
