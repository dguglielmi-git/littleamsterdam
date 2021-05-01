import React from 'react';
import { Grid } from 'semantic-ui-react';
import './ModalPublication.scss';

const ModalLeftCol = ({ publication }) => {
	return (
		<Grid.Column
			className="modal-publication__left"
			width={10}
			style={{ backgroundImage: `url("${publication.file}")` }}
		/>
	);
};

export default ModalLeftCol;
