import React from 'react'
import image from '../Assets/dummy.avif'
import msgImg from '../Assets/msgSec.png'

const MsgSec = () => {
  return (
    <div>
      <section id="story" className="message-section">

  <div className="container">

    <div className="row align-items-center">

      {/* Text */}
      <div className="col-12 col-lg-7">
        <h3>Spreading Happiness, One Sweet Moment at a Time</h3>
        <p>At CRAVE, we believe that the best moments are often the sweetest ones. What started with a love for freshly baked desserts has grown into a place where every cake, cookie, and carefully crafted drink is made to bring a little more happiness to your day.</p>

        <p>
          From beautifully crafted cakes made for celebrations to thick, gooey cookies filled with irresistible flavors, our desserts are baked with care and made to be enjoyed. Whether you're treating yourself, surprising someone special, or simply craving something delicious, there's always a little something waiting for you at CRAVE.
        </p>

        <p>
        And because every sweet treat deserves the perfect companion, our refreshing drinks are here to complete the experience. We want every visit to feel warm, delicious, and memorable because at CRAVE, it's not just about dessert. It's about creating moments worth craving. 
        </p>
        <h6>Warmly,</h6>
        <h6>CRAVE Family</h6>
      </div>

      {/* Image */}
      <div className="col-12 col-lg-5">
        <img
          src={msgImg}
          className="img-fluid"
          alt="CRAVE desserts"
        />
      </div>

    </div>

  </div>

</section>
    </div>
  )
}

export default MsgSec
