import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import './footer.css';

function Footer() {
  return (
    <section className="absolute-bar">
      <footer className="footer-bar" data-testid="footer">
        <input
          type="image"
          src={ drinkIcon }
          alt="drink"
          width="30px"
          className="icon"
          data-testid="drinks-bottom-btn"
        />
        <input
          type="image"
          src={ mealIcon }
          alt="meal"
          width="30px"
          className="icon"
          data-testid="meals-bottom-btn"
        />
      </footer>
    </section>
  );
}

export default Footer;
