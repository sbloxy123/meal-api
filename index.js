const mealsForm = document.getElementById("search-form");
const allRecipes = document.getElementById("recipe-list");
let currentRecipes = [];

async function getApiData(ingredient) {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${ingredient}`
  );
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  console.log(data);
  addDetailsToArray(data);
  showDataOnPage();
}

const addDetailsToArray = (data) => {
  currentRecipes.length = 0;
  info = data.meals;
  info.map((meal) => {
    const vid = meal.strYoutube.split("=");
    console.log(vid);
    recipeDetails = {
      name: meal.strMeal,
      instructions: meal.strInstructions,
      vid: vid[1],
    };
    currentRecipes.push(recipeDetails);
  });
};
// todo add a button so user can bookmark recipes.

const showDataOnPage = () => {
  allRecipes.innerHTML = "";

  currentRecipes.map((meal) => {
    const markup = `
      <div class="recipe-card">
          <h2 class="recipe-header">${meal.name}</h2>
          <iframe width="420" height="315"
            src="https://www.youtube.com/embed/${meal.vid}">
          </iframe>

          <p> ${meal.instructions} </p>
      </div>
    `;
    allRecipes.insertAdjacentHTML("beforeend", markup);
  });
};

mealsForm.addEventListener("submit", function (e) {
  let search = document.getElementById("search-input").value;
  e.preventDefault();
  getApiData(search);
});
