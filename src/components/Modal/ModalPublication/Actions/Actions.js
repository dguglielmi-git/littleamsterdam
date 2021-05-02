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
import { COUNT_COMMENTS } from '../../../../gql/comment';
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

	/**
	 * Generic code for having a clean code when called to useQuery()
	 * and help us to avoid repeating code.
	 */
	const genericPublication = {
		variables: {
			idPublication: publication.id,
		},
	};
	const useQueries = (query) => useQuery(query, genericPublication);

	const { loading: loadingLike, refetch: refetchLike } = useQueries(IS_LIKE);
	const { loading: loadingTrash, refetch: refetchTrash } = useQueries(IS_TRASH);
	const { loading: loadingNotLike, refetch: refetchNotLike } = useQueries(IS_NOT_LIKE);

	const { data: dataCountLikes, loading: loadingCount, refetch: refetchCount } = useQueries(COUNT_LIKE);
	const { data: dataCountNL, loading: loadingCountNL, refetch: refetchCountNL } = useQueries(COUNT_NOT_LIKE);
	const { data: dataCountTrash, loading: loadingCountTrash, refetch: refetchCountTrash } = useQueries(COUNT_TRASH);
	const { data: dataCountComments, loading: loadingComments } = useQueries(COUNT_COMMENTS);

	const removeLikes = async () => {
		try {
			await deleteLike(genericPublication);
			await deleteNotLike(genericPublication);
			await deleteTrash(genericPublication);
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

	const onLike = async (anon) => {
		// Semaphore
		if (saving) {
			return null;
		}
		setSaving(true);
		try {
			await removeLikes();
			await anon(genericPublication);
			refetchAll();
		} catch (error) {
			console.log(error);
		}
		setSaving(false);
	};

	const rightSize = () => (width < MOBILE_RES ? 'mini' : 'medium');

	if (
		loadingLike ||
		loadingCount ||
		loadingNotLike ||
		loadingCountNL ||
		loadingTrash ||
		loadingCountTrash ||
		loadingComments
	)
		return null;

	const { countLikes } = dataCountLikes;
	const { countNotLikes } = dataCountNL;
	const { countTrash } = dataCountTrash;
	const { countComments } = dataCountComments;
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
					countComments={countComments}
					t={t}
				/>
			)}
		</>
	);
}
