import React, { useState } from 'react';
import { Container } from 'semantic-ui-react';
import LoginForm from '../../components/Auth/LoginForm';
import RegisterForm from '../../components/Auth/RegisterForm';
import { useTranslation } from 'react-i18next';
import '../../locales/i18n';
import './Auth.scss';

export default function Auth() {
	const { t } = useTranslation();
	const [showLogin, setShowLogin] = useState(true);

	return (
		<Container fluid className="auth">
			<div className="container-form">
				{showLogin ? <LoginForm /> : <RegisterForm setShowLogin={setShowLogin} />}
			</div>

			<div className="change-form">
				<p>
					{showLogin ? (
						<>
							{t('notAccount')}
							<span onClick={() => setShowLogin(!showLogin)}>{t('register')}</span>
						</>
					) : (
						<>
							{t('loginWithAccount')}
							<span onClick={() => setShowLogin(!showLogin)}>{t('loginMsg')}</span>
						</>
					)}
				</p>
			</div>
		</Container>
	);
}
