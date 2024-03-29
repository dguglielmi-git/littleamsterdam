import React from 'react';
import { Button } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';
import { useQuery, useMutation } from '@apollo/client';
import { IS_FOLLOW, FOLLOW, UN_FOLLOW } from '../../../../gql/follow';
import '../../../../locales/i18n';
import './HeaderProfile.scss';

export default function HeaderProfile(props) {
	const { t } = useTranslation();
	const { getUser, auth, handlerModal } = props;
	const [follow] = useMutation(FOLLOW);
	const [unFollow] = useMutation(UN_FOLLOW);
	const { data, loading, refetch } = useQuery(IS_FOLLOW, {
		variables: {
			username: getUser.username,
		},
	});

	const onUnFollow = async () => {
		try {
			await unFollow({
				variables: {
					username: getUser.username,
				},
			});
			refetch();
		} catch (error) {
			console.log(error);
		}
	};

	const onFollow = async () => {
		try {
			await follow({
				variables: {
					username: getUser.username,
				},
			});
			refetch();
		} catch (error) {
			console.log(error);
		}
	};

	const buttonFollow = () => {
		if (data.isFollow) {
			return (
				<Button className="btn-danger" onClick={onUnFollow}>
					{t('headerProfileStopFollowing')}
				</Button>
			);
		} else
			return (
				<Button className="btn-action" onClick={onFollow}>
					{t('headerProfileFollow')}
				</Button>
			);
	};

	return (
		<div className="header-profile">
			<h2>{getUser.username}</h2>
			{getUser.username === auth.username ? (
				<Button onClick={() => handlerModal('settings')}>{t('headerProfileSettings')}</Button>
			) : (
				!loading && buttonFollow()
			)}
		</div>
	);
}
