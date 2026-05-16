import React from 'react';

const Navbar = ({ currentPage, setCurrentPage, productCount }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark sticky-top" style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
      <div className="container">
        {/* Logo */}
        <span className="navbar-brand d-flex align-items-center gap-2 fw-bold fs-4 text-white" style={{ cursor: 'pointer' }} onClick={() => setCurrentPage('home')}>
          <i className="bi bi-shop-window"></i>
          <span>NovaStore</span>
        </span>

        {/* Toggle button for mobile */}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Nav links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-lg-center gap-2">
            <li className="nav-item">
              <button
                className={`btn btn-sm ${currentPage === 'home' ? 'btn-light text-primary fw-semibold' : 'btn-outline-light'}`}
                onClick={() => setCurrentPage('home')}
              >
                <i className="bi bi-house me-1"></i> Ana Sayfa
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`btn btn-sm ${currentPage === 'add' ? 'btn-light text-primary fw-semibold' : 'btn-outline-light'}`}
                onClick={() => setCurrentPage('add')}
              >
                <i className="bi bi-plus-circle me-1"></i> Ürün Ekle
              </button>
            </li>
            <li className="nav-item">
              <span className="badge rounded-pill text-bg-warning fs-6 px-3 py-1">
                <i className="bi bi-box-seam me-1"></i>
                {productCount} Ürün
              </span>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
