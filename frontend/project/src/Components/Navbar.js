import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../Context/CartContext';
import { AuthContext } from '../Context/AuthContext';
import logo from '../Assets/logo1.png';

const Navbar = () => {
  const { cartItems } = useContext(CartContext);
  const { user, login, register, logout } = useContext(AuthContext);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (isSignUp) {
        await register(formData.name, formData.email, formData.password);
      } else {
        await login(formData.email, formData.password);
      }
      document.getElementById('closeAuthModal')?.click();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg shadow-sm position-relative px-3" style={{ backgroundColor: '#FFFFFF', minHeight: '80px' }}>
        <div className="container-fluid">
          <div className="d-flex align-items-center" style={{ flex: 1 }}>
            <button className="navbar-toggler border-0 px-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
              <i className="fas fa-bars fs-4" style={{ color: '#2C1D11' }} />
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0 mt-3 mt-lg-0">
                <li className="nav-item"><Link className="nav-link text-uppercase fw-medium px-lg-3 crave-nav-link" to="/">Home</Link></li>
                <li className="nav-item"><a className="nav-link text-uppercase fw-medium px-lg-3 crave-nav-link" href="/#menu">Menu</a></li>
                <li className="nav-item"><a className="nav-link text-uppercase fw-medium px-lg-3 crave-nav-link" href="/#story">Our Story</a></li>
                <li className="nav-item"><a className="nav-link text-uppercase fw-medium px-lg-3 crave-nav-link" href="/#contact">Contact</a></li>
              </ul>
            </div>
          </div>

          <Link className="navbar-brand position-absolute top-50 start-50 translate-middle m-0" to="/">
            <img src={logo} height={60} alt="Crave Logo" loading="lazy" />
          </Link>

          {/* RIGHT SIDE: Account & Cart */}
          <div className="d-flex justify-content-end align-items-center gap-3" style={{ flex: 1 }}>
            {user ? (
              <div className="dropdown">
                <button className="btn btn-sm border-0 d-flex align-items-center gap-2" type="button" data-bs-toggle="dropdown" style={{ color: '#2C1D11' }}>
                  <i className="fas fa-user-circle fs-4" />
                  <span className="fw-semibold d-none d-md-inline">{user.name}</span>
                </button>
                <ul className="dropdown-menu dropdown-menu-end shadow border-0 mt-2">
                  <li><Link className="dropdown-item" to="/orders">My Orders</Link></li>
                  <li><Link className="dropdown-item" to="/wishlist">Wishlist</Link></li>
                  {user.role === 'admin' && <li><Link className="dropdown-item text-warning fw-bold" to="/admin">Admin Dashboard</Link></li>}
                  <li><hr className="dropdown-divider" /></li>
                  <li><button className="dropdown-item text-danger" onClick={logout}>Logout</button></li>
                </ul>
              </div>
            ) : (
              <button className="btn p-0 border-0" data-bs-toggle="modal" data-bs-target="#authModal" style={{ color: '#2C1D11' }}>
                <i className="fas fa-user fs-5" />
              </button>
            )}

            <a className="position-relative crave-cart-icon" href="#cartOffcanvas" data-bs-toggle="offcanvas" role="button">
              <i className="fas fa-shopping-cart fs-5" />
              {totalItems > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill" style={{ backgroundColor: '#B89B72', color: '#FFFFFF', fontSize: '0.65rem' }}>
                  {totalItems}
                </span>
              )}
            </a>
          </div>
        </div>
      </nav>

      {/* Auth Modal */}
      <div className="modal fade" id="authModal" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content p-4 border-0 shadow">
            <div className="modal-header border-0 p-0 mb-3">
              <h5 className="modal-title fw-bold" style={{ color: '#2C1D11' }}>{isSignUp ? "Create CRAVE Account" : "Welcome Back"}</h5>
              <button type="button" className="btn-close" id="closeAuthModal" data-bs-dismiss="modal"></button>
            </div>
            {error && <div className="alert alert-danger py-2">{error}</div>}
            <form onSubmit={handleSubmit}>
              {isSignUp && (
                <div className="mb-3">
                  <label className="form-label">Full Name</label>
                  <input type="text" className="form-control" required onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                </div>
              )}
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input type="email" className="form-control" required onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input type="password" className="form-control" required onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
              </div>
              <button type="submit" className="btn w-100 text-white fw-bold py-2" style={{ backgroundColor: '#2C1D11' }}>
                {isSignUp ? "Sign Up" : "Log In"}
              </button>
            </form>
            <p className="text-center mt-3 mb-0 text-muted" style={{ fontSize: '0.9rem' }}>
              {isSignUp ? "Already have an account?" : "Don't have an account?"}{' '}
              <span className="fw-bold text-decoration-underline" style={{ cursor: 'pointer', color: '#B89B72' }} onClick={() => setIsSignUp(!isSignUp)}>
                {isSignUp ? "Log In" : "Sign Up"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;