import React from 'react';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import { Grid } from 'semantic-ui-react';
import Feed from '../../components/Home/Feed';
import { MOBILE_RES } from '../../utils/constants';
import './Home.scss';

export default function Home() {
	const { width } = useWindowDimensions();

	return (
		<Grid className="home">
			
			{width < MOBILE_RES ? (
				<>
					<Grid.Column className="home__left" width={16}>
						<Feed />
					</Grid.Column>
				</>
			) : (
				<>
					<Grid.Column width={1} />
					<Grid.Column className="home__left" width={10}>
						<Feed />
					</Grid.Column>
					<Grid.Column className="home__right" width={3}>
						<h2>Right Side</h2>
					</Grid.Column>
				</>
			)}
		</Grid>
	);
}
