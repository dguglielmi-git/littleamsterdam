import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, Grid } from 'semantic-ui-react';
import { formatDate } from '../../../utils/util';
import Comments from './Comments';
import CommentForm from './CommentForm';
import ModalLeftCol from './ModalLeftCol';
import ModalPubTitle from './ModalPubTitle';
import useWindowDimensions from '../../../hooks/useWindowDimensions';
import { MOBILE_RES } from '../../../utils/constants';
import Actions from './Actions';
import ActionsMobile from './ActionsMobile';
import CommentsMobile from './CommentsMobile';
import '../../../locales/i18n';
import './ModalPublication.scss';

export default function ModalPublication(props) {
	const { t } = useTranslation();
	const { width } = useWindowDimensions();
	const [onComment, setOnComment] = useState(false);
	const { show, setShow, publication } = props;
	const onClose = () => setShow(false);
	let datePublish = formatDate(new Date(publication.createAt * 1));

	return (
		<>
			{width > MOBILE_RES ? (
				<Modal open={show} onClose={onClose} className="modal-publication">
					<Grid>
						<ModalLeftCol publication={publication} />
						<Grid.Column className="modal-publication__right" width={6}>
							<ModalPubTitle datePublish={datePublish} onClose={onClose} t={t} />
							<Comments publication={publication} />
							<CommentForm publication={publication} />
						</Grid.Column>
					</Grid>
				</Modal>
			) : (
				<>
					{!onComment ? (
						<Modal open={show} onClose={onClose} className="mobile-publication">
							<div className="mobile-publication__photo">
								<img src={publication.file} alt="" height="300px" />
							</div>
							{/*<ActionsMobile setOnComment={setOnComment} />*/}
							<Actions publication={publication} onComment={onComment} setOnComment={setOnComment} />
						</Modal>
					) : (
						<Modal open={show} onClose={onClose} className="mobile-comments">
							<CommentsMobile publication={publication} setOnComment={setOnComment} />
						</Modal>
					)}
				</>
			)}
		</>
	);
}
