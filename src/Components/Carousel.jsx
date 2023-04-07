import { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import './carousel.css';

function Carousel({ recomended, path }) {
  const [position, setPosition] = useState();
  const wrapperRef = useRef(null);
  const cinquanta = 50;

  console.log(path);

  const handlePrev = () => {
    setPosition((prev) => prev + cinquanta);
    wrapperRef.current.style.transform = `translateX(${position + cinquanta}%)`;
  };

  const handleNext = () => {
    setPosition((prev) => prev - cinquanta);
    wrapperRef.current.style.transform = `translateX(${position - cinquanta}%)`;
  };

  return (
    <div className="carousel-container">
      <div className="carousel-wrapper" ref={ wrapperRef }>
        { recomended.map((recipe, idx) => (
          <article
            data-testid={ `${idx}-recommendation-card` }
            className="carousel-item"
            key={ idx }
          >
            <img
              alt={ path }
              src={ recipe[`str${path}Thumb`] }
              className="card-img"
            />
            <p data-testid={ `${idx}-recommendation-title` }>
              { recipe[`str${path}`] }
            </p>
          </article>
        )) }
      </div>
      <button onClick={ handlePrev }>Prev</button>
      <button onClick={ handleNext }>Next</button>
    </div>
  );
}

Carousel.propTypes = {
  recomended: PropTypes.arrayOf({}),
  path: PropTypes.string,
}.isRequired;

export default Carousel;
