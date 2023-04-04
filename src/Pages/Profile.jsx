import Footer from '../Components/Footer';
import Header from '../Components/Header';

function Profile() {
  return (
    <>
      <Header title="Profile" />
      <section className="profile-page">
        <div className="profile-card">
          <h3 data-testid="profile-email">email@example.com</h3>
          <button type="button" data-testid="profile-done-btn">
            Done Recipes
          </button>
          <button type="button" data-testid="profile-favorite-btn">
            Favorite Recipes
          </button>
          <button type="button" data-testid="profile-logout-btn">
            Logout
          </button>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Profile;
