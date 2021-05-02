import React from 'react';
import { map } from 'lodash';
import { Grid } from 'semantic-ui-react';
import PreviewPublication from '../../Publications/PreviewPublication';
import './AlbumList.scss';

const AlbumContent = ({ getCols, getPublications }) => {
	return (
		<Grid columns={getCols()}>
			{map(getPublications, (publication, index) => (
				<Grid.Column key={index}>
					<PreviewPublication publication={publication} />
				</Grid.Column>
			))}
		</Grid>
	);
};

export default AlbumContent;
