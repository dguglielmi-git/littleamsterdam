import React, { useEffect } from 'react';
import { map } from 'lodash';
import { connect } from 'react-redux';
import { useMutation } from '@apollo/client';
import { Dropdown as DropDown } from 'semantic-ui-react';
import i18n, { languages } from '../../../locales/i18n';
import { UPDATE_LANGUAGE } from '../../../gql/user';
import { changeLangAsync } from '../../../redux/actions/langActions';
import 'flag-icon-css/css/flag-icon.css';

const Dropdown = (props) => {
	const [updateLanguage] = useMutation(UPDATE_LANGUAGE);
	const { getUser, refetch } = props;
	const { resources: langs } = languages;
	const trigger = <span className={`flag-icon flag-icon-${props.lang.flag}`} />;

	useEffect(() => {
		if (getUser) {
			try {
				props.dispatch(changeLangAsync(languages.resources[`${getUser.language}`].flag));
				i18n.changeLanguage(getUser.language);
			} catch (error) {
				console.log(getUser)
				console.log(error);
			}
		}
	}, []);

	const handlerLang = async (lang, flag) => {
		i18n.changeLanguage(lang);
		props.dispatch(changeLangAsync(flag));

		if (getUser) {
			// Update DB
			try {
				await updateLanguage({
					variables: {
						input: lang,
					},
				});
				refetch();
			} catch (error) {
				console.error(error);
			}
		}
	};

	return (
		<DropDown trigger={trigger} pointing="top right" icon={null}>
			<DropDown.Menu>
				{map(langs, (data) => (
					<DropDown.Item
						icon={`flag-icon-${data.flag}`}
						text={data.text}
						onClick={() => handlerLang(data.lang, data.flag)}
					/>
				))}
			</DropDown.Menu>
		</DropDown>
	);
};

const mapStateToProps = (state) => {
	return state;
};

export default connect(mapStateToProps)(Dropdown);
