function SearchBar() {
  return (
    <form>
      <input
        type="text"
        className="text-input"
        placeholder="Search"
        data-testid="search-input"
      />

      <label htmlFor="ingredient-search-radio">
        Ingredient
        <input
          type="radio"
          data-testid="ingredient-search-radio"
          id="ingredient-search-radio"
          name="ingredient"
          value="ingredient"
        />
      </label>

      <label htmlFor="name-search-radio">
        Name
        <input
          type="radio"
          data-testid="name-search-radio"
          id="name-search-radio"
          name="name"
          value="name"
        />
      </label>

      <label htmlFor="first-letter-search-radio">
        First Letter
        <input
          type="radio"
          data-testid="first-letter-search-radio"
          id="first-letter-search-radio"
          name="firstLetter"
          value="firstLetter"
        />
      </label>

      <button
        type="button"
        data-testid="exec-search-btn"
      >
        Find
      </button>
    </form>

  );
}

export default SearchBar;
