import React from 'react';
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Comments from '../Comments';
import CommentForm from '../CommentForm';
import './CommentsMobile.scss';

const CommentsMobile = ({ publication, setOnComment }) => {
	return (
		<div className="comments-mobile">
			<div className="comments-mobile__header" onClick={() => setOnComment(false)}>
				<FontAwesomeIcon icon={faArrowCircleLeft} color="#4186C8" size="2x" />
			</div>
			<Comments publication={publication} />
			<CommentForm publication={publication} />
		</div>
	);
};

export default CommentsMobile;
