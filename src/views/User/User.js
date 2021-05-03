import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { size } from 'lodash';
import { useQuery } from '@apollo/client';
import { GET_PUBLICATIONS } from '../../gql/publication';
import Profile from '../../components/User/Profile';
import Publications from '../../components/Publications';
import UserNotFound from '../../components/User/UserNotFound';
import './User.scss';

export default function User() {
	const { username } = useParams();
	const { data, loading, startPolling, stopPolling, refetch: refetchPublication } = useQuery(GET_PUBLICATIONS, {
		variables: { username },
	});

	useEffect(() => {
		// run StartPolling every 1 sec
		startPolling(1000);
		return () => {
			stopPolling();
		};
	}, [startPolling, stopPolling]);

	if (loading) return null;

	if (data === undefined) return <UserNotFound />;

	const { getPublications } = data;

	return (
		<div>
			<Profile username={username} totalPublications={size(getPublications)} />
			<Publications getPublications={getPublications} refetchPublication={refetchPublication} />
		</div>
	);
}
