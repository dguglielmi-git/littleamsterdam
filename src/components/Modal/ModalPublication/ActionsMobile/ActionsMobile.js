import React from 'react';
import { faThumbsUp, faThumbsDown, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useMutation } from '@apollo/client';
import { ADD_LIKE, ADD_NOT_LIKE, ADD_TRASH } from '../../../../gql/like';
import './ActionsMobile.scss';

const ActionsMobile = (props) => {
	const { setOnComment, countLikes, countNotLikes, countTrash, onAction } = props;
	const [addLike] = useMutation(ADD_LIKE);
	const [addNotLike] = useMutation(ADD_NOT_LIKE);
	const [addTrash] = useMutation(ADD_TRASH);

	return (
		<div className="actions-mobile">
			<div className="actions-mobile__likes">
				<div className="actions-mobile__likes__like" onClick={() => onAction(addLike)}>
					<FontAwesomeIcon icon={faThumbsUp} color="#4186C8" size="lg" />
					<p>{countLikes}</p>
				</div>
				<div className="actions-mobile__likes__notLike" onClick={() => onAction(addNotLike)}>
					<FontAwesomeIcon icon={faThumbsDown} color="#F15739" size="lg" />
					<p>{countNotLikes}</p>
				</div>
				<div className="actions-mobile__likes__trash" onClick={() => onAction(addTrash)}>
					<FontAwesomeIcon icon={faTrash} color="#07A905" size="lg" />
					<p>{countTrash}</p>
				</div>
			</div>
			<div className="actions-mobile__comments" onClick={() => setOnComment(true)}>
				<p>20 Comentarios -</p>
			</div>
		</div>
	);
};

export default ActionsMobile;
