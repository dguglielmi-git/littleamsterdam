import React from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, Grid, Icon } from 'semantic-ui-react';
import CommentForm from './CommentForm';
import Comments from './Comments';
import '../../../locales/i18n';
import './ModalPublication.scss';

export default function ModalPublication(props) {
	const { t } = useTranslation();
	const { show, setShow, publication } = props;

	const onClose = () => setShow(false);
	var createAt = new Date(publication.createAt * 1);
	var year = createAt.getUTCFullYear();
	var month = (createAt.getUTCMonth() + 1).toString().padStart(2, '0');
	var day = createAt.getUTCDate().toString().padStart(2, '0');
	var datePublish = day + '/' + month + '/' + year;

	return (
		<Modal open={show} onClose={onClose} className="modal-publication">
			<Grid>
				<Grid.Column
					className="modal-publication__left"
					width={10}
					style={{ backgroundImage: `url("${publication.file}")` }}
				/>

				<Grid.Column className="modal-publication__right" width={6}>
					<div className="modal-publication__right__close">
						<p>
							<strong>{t('modalPublicationPublishDate')}</strong> {datePublish}
						</p>
						<Icon link name="close" size="big" onClick={onClose} />
					</div>

					<Comments publication={publication} />
					<CommentForm publication={publication} />
				</Grid.Column>
			</Grid>
		</Modal>
	);
}
