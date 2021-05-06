import { ApolloClient, InMemoryCache } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import { setContext } from 'apollo-link-context';
import { getToken } from '../utils/token';

const httpLink = createUploadLink({
	//uri: 'https://graphql.littleamsterdam.com.ar',
	//uri: 'http://172.31.31.96:4000',
	//uri: 'http://ec2-3-143-231-2.us-east-2.compute.amazonaws.com:4000',
	//uri: 'https://ec2-3-143-231-2.us-east-2.compute.amazonaws.com:4000/',
	//uri: "http://192.168.100.9:4000",
	//uri: 'http://35.194.24.231:4000',
	uri: 'https://lamsterdam-gql.herokuapp.com/',
});

const authLink = setContext((_, { headers }) => {
	const token = getToken();

	return {
		headers: {
			...headers,
			Authorization: token ? `Bearer ${token}` : '',
		},
	};
});

const client = new ApolloClient({
	connectToDevTools: true,
	cache: new InMemoryCache(),
	link: authLink.concat(httpLink),
});

export default client;
