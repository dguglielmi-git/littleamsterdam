import React from 'react';
import { map } from 'lodash';
import { Grid } from 'semantic-ui-react';
import AlbumPreview from '../AlbumPreview';
import './AlbumList.scss';

const AlbumListing = ({ getCols, getAlbums, isAlbum, refetchAlbum, handleAlbumSelect }) => {
	return (
		<Grid columns={getCols()}>
			{map(getAlbums, (album, index) => (
				<Grid.Column key={index}>
					<AlbumPreview
						album={album}
						isAlbum={isAlbum}
						refetchAlbum={refetchAlbum}
						handleAlbumSelect={handleAlbumSelect}
					/>
				</Grid.Column>
			))}
		</Grid>
	);
};
export default AlbumListing;
