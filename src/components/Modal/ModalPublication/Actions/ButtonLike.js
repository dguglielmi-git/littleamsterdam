import React from 'react';
import { Icon, Button, Label } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';
import { ADD_LIKE } from '../../../../gql/like';
import './Actions.scss';

const ButtonLike = ({ onAction, rightSize, countLikes, width, t }) => {
	const [addLike] = useMutation(ADD_LIKE);

	return (
		<Button as="div" labelPosition="right">
			<Button color="blue" onClick={() => onAction(addLike)} size={rightSize()}>
				<Icon name="thumbs up outline" />
				{width > 500 && t('actionsLikeButton')}
			</Button>
			<Label as="a" basic color="blue" pointing="left">
				{countLikes}
			</Label>
		</Button>
	);
};

export default ButtonLike;
