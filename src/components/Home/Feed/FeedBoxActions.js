import React from 'react';
import Action from '../../Modal/ModalPublication/Actions';
import './Feed.scss';

export default function FeedBoxActions({publication}) {
	return (
		<div className="feed__box-actions">
			<Action publication={publication} />
		</div>
	);
}
