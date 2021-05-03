import React from 'react';
import { map } from 'lodash';
import { Grid } from 'semantic-ui-react';
import PreviewPublication from '../../Publications/PreviewPublication';
import './AlbumList.scss';

const AlbumContent = (props) => {
	const { getCols, getPublications, isOwner, refetchPublication } = props;
	return (
		<Grid columns={getCols()}>
			{map(getPublications, (publication, index) => (
				<Grid.Column key={index}>
					<PreviewPublication
						isOwner={isOwner}
						publication={publication}
						refetchPublication={refetchPublication}
					/>
				</Grid.Column>
			))}
		</Grid>
	);
};

export default AlbumContent;
