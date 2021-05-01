import React, { useState } from 'react';
import useWindowDimensions from '../../../../hooks/useWindowDimensions';
import { useTranslation } from 'react-i18next';
import { useMutation, useQuery } from '@apollo/client';
import { MOBILE_RES } from '../../../../utils/constants';
import {
	IS_LIKE,
	IS_NOT_LIKE,
	IS_TRASH,
	DELETE_LIKE,
	DELETE_NOT_LIKE,
	DELETE_TRASH,
	COUNT_LIKE,
	COUNT_NOT_LIKE,
	COUNT_TRASH,
} from '../../../../gql/like';
import ButtonLike from './ButtonLike';
import ButtonNotLike from './ButtonNotLike';
import ButtonTrash from './ButtonTrash';
import ActionsMobile from '../ActionsMobile';
import '../../../../locales/i18n';
import './Actions.scss';

export default function Actions(props) {
	const { publication, setOnComment, onComment } = props;
	const { t } = useTranslation();
	const { width } = useWindowDimensions();
	const [saving, setSaving] = useState(false);
	const [deleteLike] = useMutation(DELETE_LIKE);
	const [deleteNotLike] = useMutation(DELETE_NOT_LIKE);
	const [deleteTrash] = useMutation(DELETE_TRASH);

	// Generic function
	const useQueries = (query) =>
		useQuery(query, {
			variables: {
				idPublication: publication.id,
			},
		});

	const { loading: loadingLike, refetch: refetchLike } = useQueries(IS_LIKE);
	const { loading: loadingTrash, refetch: refetchTrash } = useQueries(IS_TRASH);
	const { loading: loadingNotLike, refetch: refetchNotLike } = useQueries(IS_NOT_LIKE);

	const { data: dataCountLikes, loading: loadingCount, refetch: refetchCount } = useQueries(COUNT_LIKE);
	const { data: dataCountNL, loading: loadingCountNL, refetch: refetchCountNL } = useQueries(COUNT_NOT_LIKE);
	const { data: dataCountTrash, loading: loadingCountTrash, refetch: refetchCountTrash } = useQueries(COUNT_TRASH);

	const removeLikes = async () => {
		try {
			await deleteLike({
				variables: {
					idPublication: publication.id,
				},
			});
			await deleteNotLike({
				variables: {
					idPublication: publication.id,
				},
			});
			await deleteTrash({
				variables: {
					idPublication: publication.id,
				},
			});
		} catch (error) {
			console.log(error);
		}
	};

	const refetchAll = () => {
		refetchNotLike();
		refetchCountNL();
		refetchTrash();
		refetchCountTrash();
		refetchLike();
		refetchCount();
	};

	const onLike = async (func) => {
		if (saving) {
			return null;
		}
		setSaving(true);
		try {
			await removeLikes();
			await func({
				variables: {
					idPublication: publication.id,
				},
			});
			refetchAll();
		} catch (error) {
			console.log(error);
		}
		setSaving(false);
	};

	const rightSize = () => {
		if (width < MOBILE_RES) {
			return 'mini';
		} else return 'medium';
	};

	if (loadingLike || loadingCount || loadingNotLike || loadingCountNL || loadingTrash || loadingCountTrash)
		return null;

	const { countLikes } = dataCountLikes;
	const { countNotLikes } = dataCountNL;
	const { countTrash } = dataCountTrash;

	return (
		<>
			{onComment === undefined ? (
				<div className={width < MOBILE_RES ? 'actions-cell' : 'actions'}>
					<ButtonLike onAction={onLike} rightSize={rightSize} width={width} countLikes={countLikes} t={t} />
					<ButtonNotLike
						onAction={onLike}
						rightSize={rightSize}
						width={width}
						countNotLikes={countNotLikes}
						t={t}
					/>
					<ButtonTrash onAction={onLike} rightSize={rightSize} width={width} countTrash={countTrash} t={t} />
				</div>
			) : (
				<ActionsMobile
					onAction={onLike}
					setOnComment={setOnComment}
					countLikes={countLikes}
					countNotLikes={countNotLikes}
					countTrash={countTrash}
				/>
			)}
		</>
	);
}
