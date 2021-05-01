import React from 'react';
import CommentForm from '../../Modal/ModalPublication/CommentForm';
import './Feed.scss';

export default function FeedBoxComment({ publication }) {
	return (
		<div className="feed__box-form">
			<CommentForm publication={publication} />
		</div>
	);
}
