import React from 'react';
import { map } from 'lodash';
import { connect } from 'react-redux';
import { Dropdown as DropDown } from 'semantic-ui-react';
import i18n, { languages } from '../../../locales/i18n';
import { changeLangAsync } from '../../../redux/actions/langActions';
import 'flag-icon-css/css/flag-icon.css';

const Dropdown = (props) => {
	const { resources: langs } = languages;
	const trigger = <span class={`flag-icon flag-icon-${props.lang.flag}`} />;

	const handlerLang = (lang, flag) => {
		props.dispatch(changeLangAsync(flag));
		i18n.changeLanguage(lang);
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
