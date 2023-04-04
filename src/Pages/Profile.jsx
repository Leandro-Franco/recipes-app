import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../Components/Footer';
import Header from '../Components/Header';

function Profile() {
  const [email, setEmail] = useState('');
  const history = useHistory();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    setEmail(user.email);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <>
      <Header title="Profile" />
      <section className="profile-container">
        <h2 data-testid="profile-email">{ email }</h2>
        <button
          type="button"
          onClick={ () => history.push('/done-recipes') }
          data-testid="profile-done-btn"
        >
          Done Recipes
        </button>
        <button
          type="button"
          onClick={ () => history.push('/favorite-recipes') }
          data-testid="profile-favorite-btn"
        >
          Favorite Recipes
        </button>
        <button
          type="button"
          onClick={ handleLogout }
          data-testid="profile-logout-btn"
        >
          Logout
        </button>
      </section>
      <Footer />
    </>
  );
}

export default Profile;
