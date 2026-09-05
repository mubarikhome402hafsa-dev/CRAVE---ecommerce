import React from 'react'

const Footer = () => {
  return (
    <div>
  <footer id="contact" className="crave-footer">

    {/* Main Footer Content */}
    <div className="container">

      <div className="row">

        {/* Newsletter */}
        <div className="col-lg-3 col-md-6 mb-5">
          <h3 className="footer-newsletter-title">Stay in the Loop</h3>

          <p className="footer-text">
            We won't spam you, we promise.
          </p>

          <div className="newsletter-box">
            <input
              type="email"
              placeholder="E-mail *"
            />

            <button type="button">
            →
            </button>
          </div>
        </div>


        {/* Useful Links */}
        <div className="col-lg-2 col-md-6 mb-5">
          <h5 className="footer-heading">Useful Links</h5>

          <a href="#">Nationwide Shipping</a>
          <a href="#">All Products</a>
          <a href="#">Our Story</a>
          <a href="#">Contact</a>
        </div>


        {/* Store Policies */}
        <div className="col-lg-2 col-md-6 mb-5">
          <h5 className="footer-heading">Store Policies</h5>

          <a href="#">Shipping Policy</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Refund Policy</a>
          <a href="#">Terms of Service</a>
        </div>


        {/* Location & Hours */}
        <div className="col-lg-3 col-md-6 mb-5">
          <h5 className="footer-heading">Location and Hours</h5>

          <p className="footer-text">
            Lahore, Pakistan
          </p>

          <p className="footer-hours">
            <strong>Monday – Sunday:</strong>
            <br />
            12:00 PM – 11:30 PM
          </p>

          <a
            href="mailto:hello@cravedesserts.pk"
            className="footer-email"
          >
            hello@cravedesserts.pk
          </a>
        </div>

      </div>


      {/* Social Media */}
      <div className="footer-socials">

        <a href="#" aria-label="Facebook">
          <i className="fab fa-facebook-f"></i>
        </a>

        <a href="#" aria-label="Instagram">
          <i className="fab fa-instagram"></i>
        </a>

        <a href="#" aria-label="TikTok">
          <i className="fab fa-tiktok"></i>
        </a>

      </div>


      {/* Copyright */}
      <div className="footer-bottom">

        <p>
          © 2026 CRAVE Desserts & More — Developed by{" "}
          <strong>CRAVE</strong>
        </p>

      </div>

    </div>

  </footer>

    </div>
  )
}

export default Footer
