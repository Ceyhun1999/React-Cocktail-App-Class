export default class CocktailServices {
    _path = "https://www.thecocktaildb.com/api/json/v1/1";

    getData(url) {
        return fetch(url).then(
            (result) => result.json(),
            (error) => error
        );
    }

    getRandomCocktail() {
        return this.getData(`${this._path}/random.php`).then((res) => this._transformCocktail(res.drinks[0]));
    }

    getCocktailById(id) {
        return this.getData(`${this._path}/lookup.php?i=${id}`).then((res) =>
            this._transformCocktail(res.drinks[0])
        );
    }

    getCocktailByLetter(letter) {
        return this.getData(`${this._path}/search.php?f=${letter}`).then((res) =>
            res.drinks.map((item) => this._transformCocktail(item))
        );
    }

    _transformCocktail(obj) {
        return {
            id: obj.idDrink,
            isAlc: obj.strAlcoholic,
            cat: obj.strCategory,
            name: obj.strDrink,
            img: obj.strDrinkThumb,
            desc: obj.strInstructions,
            ings: Object.entries(obj)
                .filter((item) => item[0].includes("strIngredient") && item[1] !== null)
                .map((item) => item[1]),
        };
    }
}
