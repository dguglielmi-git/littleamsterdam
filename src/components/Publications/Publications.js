import React, { useState } from 'react';
import { map } from 'lodash';
import { useTranslation } from 'react-i18next';
import { Grid, Tab } from 'semantic-ui-react';
import AlbumList from '../Album/AlbumList';
import ButtonAddPicture from '../Album/AlbumList/Buttons/ButtonAddPicture';
import PreviewPublication from './PreviewPublication';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import ModalUpload from '../Modal/ModalUpload';
import '../../locales/i18n';
import './Publications.scss';

export default function Publications(props) {
	const { t } = useTranslation();
	const { getPublications } = props;
	const { width } = useWindowDimensions();
	const [showUpload, setShowUpload] = useState(false);

	const getCols = () => (width > 600 ? 4 : 1);

	const panes = [
		{
			menuItem: t('publicationsMenuPublish'),
			render: () => showPublications(),
		},
		{
			menuItem: t('publicationsMenuAlbum'),
			render: () => (
				<Tab.Pane attached={false}>
					<AlbumList />
				</Tab.Pane>
			),
		},
	];

	const showPublications = () => {
		return (
			<Tab.Pane attached={false}>
				<div className="publications__upload">
					<ButtonAddPicture t={t} setShowModalUpload={setShowUpload} />
				</div>
				<Grid columns={getCols()}>
					{map(getPublications, (publication, index) => (
						<Grid.Column key={index}>
							<PreviewPublication publication={publication} />
						</Grid.Column>
					))}
				</Grid>
			</Tab.Pane>
		);
	};

	return (
		<div className="publications">
			<Tab menu={{ secondary: true }} panes={panes} />
			<ModalUpload show={showUpload} setShow={setShowUpload} />
		</div>
	);
}
