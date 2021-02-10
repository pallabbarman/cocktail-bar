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
        <img onclick="displayFoodDetail('${drink.idMeal}')" src="${drink.strDrinkThumb}">
        <h4 onclick="displayFoodDetail('${drink.idMeal}')">${drink.strDrink}</h4>`;
        drinkItem.innerHTML = drinkInfo;
        showDrink.appendChild(drinkItem);
    });
}