import PropTypes from 'prop-types';
import './recipes.css';
import { useFilter } from '../Contexts/ProviderFilter';

function Recipes({ path, recipes, categories }) {
  const { categoryFilter, setCategoryFilter } = useFilter();

  console.log(categories);

  return (
    <>
      <section className="category-filter">
        { categories?.map((category) => (
          <button
            type="button"
            key={ category.strCategory }
            data-testid={ `${category.strCategory}-category-filter` }
            className="category-btn"
            onClick={ () => {
              setCategoryFilter({
                ...categoryFilter, [`${path}Filter`]: category.strCategory });
            } }
          >
            {category.strCategory}
          </button>
        )) }
      </section>
      <section className="recipes-grid">
        { recipes?.map((recipe, idx) => (
          <article
            key={ recipe[`id${path}`] }
            data-testid={ `${idx}-recipe-card` }
            className="recipes-card"
          >
            <img
              data-testid={ `${idx}-card-img` }
              alt={ path }
              src={ recipe[`str${path}Thumb`] }
              className="card-img"
            />
            <p
              data-testid={ `${idx}-card-name` }
              className="card-text"
            >
              { recipe[`str${path}`] }
            </p>
          </article>
        ))}
      </section>
    </>
  );
}

Recipes.propTypes = { path: PropTypes.string }.isRequired;

export default Recipes;
