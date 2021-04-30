import React, { useState, useEffect, useMemo } from 'react';
import { Provider } from 'react-redux';
import { ApolloProvider } from '@apollo/client';
import { ToastContainer } from 'react-toastify';
import client from './config/apollo';
import Auth from './views/Auth';
import { getToken, decodeToken, removeToken } from './utils/token';
import AuthContext from './context/AuthContext';
import Navigation from './routes/Navigation';
import store from './redux/store';

function App() {
	const [auth, setAuth] = useState(undefined);

	useEffect(() => {
		const token = getToken();
		if (!token) {
			setAuth(null);
		} else {
			setAuth(decodeToken(token));
		}
	}, []);

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
