import React from 'react';
import { faThumbsUp, faThumbsDown, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useMutation } from '@apollo/client';
import { ADD_LIKE, ADD_NOT_LIKE, ADD_TRASH } from '../../../../gql/like';
import './ActionsMobile.scss';

const ActionsMobile = ({ setOnComment, countLikes, countNotLikes, countTrash, onAction, countComments, t }) => {
	const [addLike] = useMutation(ADD_LIKE);
	const [addNotLike] = useMutation(ADD_NOT_LIKE);
	const [addTrash] = useMutation(ADD_TRASH);

    // Font Awesome generic component
	const FA = ({ cn, icon, color, counter, onFunc }) => {
		return (
			<div className={`actions-mobile__likes__${cn}`} onClick={() => onAction(onFunc)}>
				<FontAwesomeIcon icon={icon} color={color} size="lg" />
				<p>{counter}</p>
			</div>
		);
	};

	const CommentLine = ({ cc }) => (
		<p>
			{cc} {cc === 1 ? t('actionsMobileComment') : t('actionsMobileComments')}{' '}
		</p>
	);

	return (
		<div className="actions-mobile">
			<div className="actions-mobile__likes">
				<FA cn="like" icon={faThumbsUp} color="#4186C8" counter={countLikes} onFunc={addLike} />
				<FA cn="notLike" icon={faThumbsDown} color="#F15739" counter={countNotLikes} onFunc={addNotLike} />
				<FA cn="trash" icon={faTrash} color="#07A905" counter={countTrash} onFunc={addTrash} />
			</div>
			<div className="actions-mobile__comments" onClick={() => setOnComment(true)}>
				<CommentLine cc={countComments} />
			</div>
		</div>
	);
};
export default ActionsMobile;
