// https://www.themealdb.com
const key = 1;

const getMeal = async (search) => {
	// const endpoint = `https://www.themealdb.com/api/json/v1/${key}/search.php?s=${search}`;
	const endpoint = `https://www.themealdb.com/api/json/v1/${key}/filter.php?i=${search}`;

	const response = await fetch(endpoint);

	if (response.status !== 200) {
		throw new Error('Cannot fetch data. Response status is not 200.');
	}

	const data = await response.json();

	return data;
};
