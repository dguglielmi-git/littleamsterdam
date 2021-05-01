import React from 'react';
import { Icon, Button, Label } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';
import { ADD_TRASH } from '../../../../gql/like';
import './Actions.scss';

const ButtonTrash = ({ onAction, rightSize, width, t, countTrash }) => {
	const [addTrash] = useMutation(ADD_TRASH);
	return (
		<Button as="div" labelPosition="right">
			<Button color="green" onClick={() => onAction(addTrash)} size={rightSize()}>
				<Icon name="trash alternate outline" />
				{width > 500 && t('actionsTrashButton')}
			</Button>
			<Label as="a" basic color="green" pointing="left">
				{countTrash}
			</Label>
		</Button>
	);
};

export default ButtonTrash;
