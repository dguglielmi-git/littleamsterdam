import React from 'react';
import { size, map } from 'lodash';
import { Image } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';
import ImageNotFound from '../../../assets/notLogin.png';
import { useHistory } from 'react-router-dom';
import '../../../locales/i18n';
import './ListUsers.scss';

export default function ListUsers(props) {
	const { t } = useTranslation();
	const { users, setShowModal } = props;
	const history = useHistory();

	const goToUser = (username) => {
		setShowModal(false);
		history.push(`/${username}`);
	};

	console.log(users);
	return (
		<div className="list-users">
			{size(users) === 0 ? (
				<p className="list-users__not-users">{t('listUsersUsersNotFound')}</p>
			) : (
				map(users, (user, index) => (
					<div key={index} className="list-users__user" onClick={() => goToUser(user.username)}>
						<Image src={user.avatar || ImageNotFound} avatar />
						<div>
							<p>{user.name}</p>
							<p>{user.username}</p>
						</div>
					</div>
				))
			)}
		</div>
	);
}
