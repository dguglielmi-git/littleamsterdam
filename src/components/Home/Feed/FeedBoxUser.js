import React from 'react';
import { Image } from 'semantic-ui-react';
import ImageNotFound from '../../../assets/notLogin.png';
import "./Feed.scss";

export default function FeedBoxUser({ avatar, name }) {
	return (
		<div className="feed__box-user">
			<Image src={avatar || ImageNotFound} avatar />
			<span>{name}</span>
		</div>
	);
}
