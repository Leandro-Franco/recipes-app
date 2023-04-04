import PropTypes from 'prop-types';
import './recipes.css';

function Recipes({ path, recipes }) {
  console.log(recipes);

  return (
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
  );
}

Recipes.propTypes = { path: PropTypes.string }.isRequired;

export default Recipes;
