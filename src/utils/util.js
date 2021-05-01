export function formatDate(createAt) {
	var year = createAt.getUTCFullYear();
	var month = (createAt.getUTCMonth() + 1).toString().padStart(2, '0');
	var day = createAt.getUTCDate().toString().padStart(2, '0');
	var datePublish = day + '/' + month + '/' + year;
	return datePublish;
}
