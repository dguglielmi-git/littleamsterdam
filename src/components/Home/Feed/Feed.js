import React, { useState, useEffect } from 'react';
import { map } from 'lodash';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_PUBLICATIONS_FOLLOWEDS } from '../../../gql/publication';
import ModalPublication from '../../Modal/ModalPublication';
import FeedBoxUser from './FeedBoxUser';
import FeedBoxPhoto from './FeedBoxPhoto';
import FeedBoxActions from './FeedBoxActions';
import FeedBoxComment from './FeedBoxComment';
import './Feed.scss';

export default function Feed() {
	const [showModal, setShowModal] = useState(false);
	const [publicationSelect, setPublicationSelect] = useState(null);
	const { data, loading, startPolling, stopPolling } = useQuery(GET_PUBLICATIONS_FOLLOWEDS);

	useEffect(() => {
		startPolling(1000);
		return () => {
			stopPolling();
		};
	}, [startPolling, stopPolling]);

	if (loading) return null;
	const { getPublicationsFolloweds } = data;

	const openPublication = (publication) => {
		setPublicationSelect(publication);
		setShowModal(true);
	};

	return (
		<>
			<div className="feed">
				{map(getPublicationsFolloweds, (publication, index) => (
					<div key={index} className="feed__box">
						<Link to={`/profile/${publication.idUser.username}`}>
							<FeedBoxUser avatar={publication.idUser.avatar} name={publication.idUser.name} />
						</Link>
						<FeedBoxPhoto publication={publication} openPublication={openPublication} />
						<FeedBoxActions publication={publication} />
						<FeedBoxComment publication={publication} />
					</div>
				))}
			</div>
			{showModal && <ModalPublication show={showModal} setShow={setShowModal} publication={publicationSelect} />}
		</>
	);
}
