import React, { useState, useEffect, useMemo } from 'react';
import { Provider } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { ToastContainer } from 'react-toastify';
import { getToken, decodeToken, removeToken } from './utils/token';
import AuthContext from './context/AuthContext';
import Navigation from './routes/Navigation';
import client from './config/apollo';
import store from './redux/store';
import Auth from './views/Auth';

function App() {
	const [auth, setAuth] = useState(undefined);
	const history = useHistory();

	useEffect(() => {
		const token = getToken();
		if (!token) {
			setAuth(null);
		} else {
			try {
				const { exp } = decodeToken(token);
				if (Date.now() >= (exp * 1000)) {
					cleanStorage();
				} else {
					try {
						setAuth(decodeToken(token));
					} catch (error) {
						cleanStorage();
					}
				}
			} catch (error) {
				cleanStorage();
			}
		}
	}, []);

	const cleanStorage = () => {
		client.clearStore();
		logout();
		history.push('/');
	}

	const logout = () => {
		removeToken();
		setAuth(null);
	};

	const setUser = (user) => {
		setAuth(user);
	};

	const authData = useMemo(
		() => ({
			auth,
			logout,
			setUser,
		}),
		[auth]
	);

	if (auth === undefined) return null;

	return (
		<Provider store={store}>
			<ApolloProvider client={client}>
				<AuthContext.Provider value={authData}>
					{!auth ? <Auth /> : <Navigation />}
					<ToastContainer
						position="top-right"
						autoClose={5000}
						hideProgressBar
						newestOnTop
						closeOnClick
						rtl={false}
						pauseOnFocusLoss
						draggable
						pauseOnHover
					/>
				</AuthContext.Provider>
			</ApolloProvider>
		</Provider>
	);
}

export default App;
