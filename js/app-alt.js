// Grab the form
const searchIngredient = document.querySelector('#search-ingredient');

// Listen for submit
searchIngredient.addEventListener('submit', (e) => {
	// prevent refresh
	e.preventDefault();

	// grab user input
	const userInput = searchIngredient.ingredient.value.trim();

	// reset form after submitting
	searchIngredient.reset();

	// For errors
	const errorOutput = document.querySelector('#error');

	// invoke searchForMeal and pass userInput
	searchForMeal(userInput)
		.then((data) => {
			updateUI(data), console.log('Here are your meals.', data);
		})
		.catch((error) => {
			console.log('Error - digestive problems.', error);
			errorOutput.innerText = 'No results. Try to adjust search parameters.';
		});
});

// get meal list
const searchForMeal = async (search) => {
	const mealList = await getMeal(search);

	return mealList;
};

// Use the meal ID from mealList data to get the full recipe for each individual meal
const getIndividualRecipe = async (mealId) => {
	const lookup = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;

	const response = await fetch(lookup);

	if (response.status !== 200) {
		throw new Error('Cannot fetch data. Response status is not 200.');
	}

	const individualRecipe = await response.json();

	console.log(individualRecipe);

	return individualRecipe;
};

// Get recipe summary
const renderSummary = (meal) => {
	const summary = `
		<h2>${meal.strMeal}</h2>
		<img class="meal-image" src="${meal.strMealThumb}" alt="${meal.strMeal}">
	`;

	return summary;
};

// create a function that returns html template
const renderRecipe = (data) => {
	const recipe = `
		<p class="details">Origin: ${data.meals[0].strArea}</p>
		<p class="details">Category: ${data.meals[0].strCategory}</p>

		<h3><b>Ingredients:</b></h3>
		<ul>
			<li>${data.meals[0].strMeasure1} ${data.meals[0].strIngredient1}</li>
			<li>${data.meals[0].strMeasure2} ${data.meals[0].strIngredient2}</li>
			<li>${data.meals[0].strMeasure3} ${data.meals[0].strIngredient3}</li>
			<li>${data.meals[0].strMeasure4} ${data.meals[0].strIngredient4}</li>
			<li>${data.meals[0].strMeasure5} ${data.meals[0].strIngredient5}</li>
			<li>${data.meals[0].strMeasure6} ${data.meals[0].strIngredient6}</li>
			<li>${data.meals[0].strMeasure7} ${data.meals[0].strIngredient7}</li>
			<li>${data.meals[0].strMeasure8} ${data.meals[0].strIngredient8}</li>
			<li>${data.meals[0].strMeasure9} ${data.meals[0].strIngredient9}</li>
			<li>${data.meals[0].strMeasure10} ${data.meals[0].strIngredient10}</li>
			<li>${data.meals[0].strMeasure11} ${data.meals[0].strIngredient11}</li>
			<li>${data.meals[0].strMeasure12} ${data.meals[0].strIngredient12}</li>
			<li>${data.meals[0].strMeasure13} ${data.meals[0].strIngredient13}</li>
			<li>${data.meals[0].strMeasure14} ${data.meals[0].strIngredient14}</li>
			<li>${data.meals[0].strMeasure15} ${data.meals[0].strIngredient15}</li>
			<li>${data.meals[0].strMeasure16} ${data.meals[0].strIngredient16}</li>
			<li>${data.meals[0].strMeasure17} ${data.meals[0].strIngredient17}</li>
			<li>${data.meals[0].strMeasure18} ${data.meals[0].strIngredient18}</li>
			<li>${data.meals[0].strMeasure19} ${data.meals[0].strIngredient19}</li>
			<li>${data.meals[0].strMeasure20} ${data.meals[0].strIngredient20}</li>
		</ul>

		<h3>Instructions</h3>
		<p class="instructions">${data.meals[0].strInstructions}</p>

		<p class="instructions">Video instructions: <a href="${data.meals[0].strYoutube}">Youtube link</a></p>

		<p class="instructions">Source: <a href="${data.meals[0].strSource}">Recipe source</a></p>
	`;

	return recipe;
};

// Update the UI
const updateUI = (data) => {
	const mealsSection = document.querySelector('#meals');

	data.meals.forEach((meal) => {
		getIndividualRecipe(meal.idMeal)
			.then((data) => {
				mealsSection.innerHTML += renderSummary(meal);
				mealsSection.innerHTML += renderRecipe(data);
			})
			.catch((error) => {
				console.log(error, 'Error - something could not be digested.');
			});
	});
};
