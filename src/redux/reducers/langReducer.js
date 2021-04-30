import i18n, { languages } from '../../locales/i18n';

const initialState = {
	flag: languages.resources.hasOwnProperty(i18n.language.substr(0, 2))
		? languages.resources[`${i18n.language.substr(0, 2)}`].flag
		: 'gb',
};


function language(state = initialState, action) {
	if (action.type.length === 2) {
		state = {
			...state,
			flag: action.type,
		};
	}
	return state;
}
export default language;
