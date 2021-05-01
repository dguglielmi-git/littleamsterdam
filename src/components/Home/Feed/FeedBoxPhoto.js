import React from 'react';
import './Feed.scss';

export default function FeedBoxPhoto({ publication, openPublication }) {
	return (
		<div
			className="feed__box-photo"
			style={{ backgroundImage: `url("${publication.file}")` }}
			onClick={() => openPublication(publication)}
		/>
	);
}
