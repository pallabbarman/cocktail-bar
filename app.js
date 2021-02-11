document.getElementById('search-item').addEventListener('click', () => {
    const drinkName = document.getElementById('drink').value;
    if (!drinkName) {
        alert("Please search an item!");
    } else {
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drinkName}`)
            .then(res => res.json())
            .then(data => displayDrink(data.drinks))
            .catch(error => alert("Please search by valid name!"));
    }
    document.getElementById('drink').value = "";
})

const displayDrink = drinks => {
    const showDrink = document.getElementById('drinks');
    showDrink.innerHTML = "";
    drinks.forEach(drink => {
        const drinkItem = document.createElement('div');
        drinkItem.className = 'drink-item';
        const drinkInfo = `
        <img onclick="displayDrinksDetail('${drink.idDrink}')" src="${drink.strDrinkThumb}">
        <h4 onclick="displayDrinksDetail('${drink.idDrink}')">${drink.strDrink}</h4>`;
        drinkItem.innerHTML = drinkInfo;
        showDrink.appendChild(drinkItem);
    });
}

const displayDrinksDetail = id => {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => drinksDetails(data.drinks[0]))
        .catch(error => alert("Please search by valid name!"));
}


const drinksDetails = items => {
    console.log(items);
    document.getElementById('drinks').style.display = "none";
    document.getElementById('search-item').style.display = "none";
    document.getElementById('drink').style.display = "none";
    document.getElementById('drinksDetails').style.display = "block";
    const drinksItem = document.getElementById('drinksDetails');
    drinksItem.innerHTML = `
        <img src="${items.strDrinkThumb}"><br><br>
        <h3 id="item-name">${items.strDrink}</h3>
        <button id="back" class="btn btn-outline-primary">Back</button><br><br>
        <h6>Category: ${items.strCategory}</h6>
        <h6>Alcoholic: ${items.strAlcoholic}</h6>
        <h6>Instructions: ${items.strInstructions}</h6>
        <h6>Ingredients</h6>`;

    const ul = document.createElement('ul');
    const ingredientsList = [items.strIngredient1, items.strIngredient2, items.strIngredient3, items.strIngredient4, items.strIngredient5, items.strIngredient6, items.strIngredient7, items.strIngredient8, items.strIngredient9, items.strIngredient10, items.strIngredient11, items.strIngredient12, items.strIngredient13, items.strIngredient14, items.strIngredient15, items.strIngredient16, items.strIngredient17, items.strIngredient18, items.strIngredient19, items.strIngredient20];
    ingredientsList.forEach(items => {
        const li = document.createElement('li');
        if (items != null && items != '') {
            li.innerText = items;
            ul.appendChild(li);
        }
    });
    drinksItem.appendChild(ul);

    // back button event listener 
    document.getElementById("back").addEventListener("click", () => {
        document.getElementById('drinksDetails').style.display = "none";
        document.getElementById('drinks').style.display = "flex";
        document.getElementById('search-item').style.display = "block";
        document.getElementById('drink').style.display = "block";
    });

}