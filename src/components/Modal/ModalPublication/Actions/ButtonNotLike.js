import React from 'react';
import { Icon, Button, Label } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';
import { ADD_NOT_LIKE } from '../../../../gql/like';
import './Actions.scss';

const ButtonNotLike = ({ onAction, rightSize, width, countNotLikes, t }) => {
	const [addNotLike] = useMutation(ADD_NOT_LIKE);
	return (
		<Button as="div" labelPosition="right">
			<Button color="red" onClick={() => onAction(addNotLike)} size={rightSize()}>
				<Icon name="thumbs down outline" />
				{width > 500 && t('actionsNotLikeButton')}
			</Button>
			<Label as="a" basic color="red" pointing="left">
				{countNotLikes}
			</Label>
		</Button>
	);
};
export default ButtonNotLike;
