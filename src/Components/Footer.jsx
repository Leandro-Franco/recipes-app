import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import './footer.css';

function Footer() {
  const history = useHistory();

  return (
    <section className="absolute-bar">
      <footer className="footer-bar" data-testid="footer">
        <input
          type="image"
          src={ drinkIcon }
          alt="drink"
          width="30px"
          className="icon"
          onClick={ () => history.push('/drinks') }
          data-testid="drinks-bottom-btn"
        />
        <input
          type="image"
          src={ mealIcon }
          alt="meal"
          width="30px"
          className="icon"
          onClick={ () => history.push('/meals') }
          data-testid="meals-bottom-btn"
        />
      </footer>
    </section>
  );
}

export default Footer;
