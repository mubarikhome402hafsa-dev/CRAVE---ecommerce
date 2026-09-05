import React from 'react'
// import image from '../Assets/dummy.avif'
import process1 from '../Assets/process1.png'
import process2 from '../Assets/process2.png'
import process3 from '../Assets/process3.png'
import process4 from '../Assets/process4.png'

const ProcessSec = () => {
  return (
    <div>
      <section className="process-section">

  <div className="container">

    <div className="row">

      {/* Item 1 */}
      <div className="col-12 col-lg-3">
        <div className="process-item">
          <img src={process1} alt="Order confirmation" />

          <div>
            <h5>Order Confirmation</h5>
            <p>
              Place the order, send payment, and get confirmation.
            </p>
          </div>
        </div>
      </div>

      {/* Item 2 */}
      <div className="col-12 col-lg-3">
        <div className="process-item">
          <img src={process2} alt="Baked and packed" />

          <div>
            <h5>Baked & Packed</h5>
            <p>
              Fresh out of the oven and carefully packed.
            </p>
          </div>
        </div>
      </div>

      {/* Item 3 */}
      <div className="col-12 col-lg-3">
        <div className="process-item">
          <img src={process3} alt="En route" />

          <div>
            <h5>En Route</h5>
            <p>
              Order dispatched, delivery in 3–7 days.
            </p>
          </div>
        </div>
      </div>

      {/* Item 4 */}
      <div className="col-12 col-lg-3">
        <div className="process-item">
          <img src={process4} alt="Delivery" />

          <div>
            <h5>Delivery</h5>
            <p>
              Get ready to receive your order.
            </p>
          </div>
        </div>
      </div>

    </div>

  </div>

</section>
    </div>
  )
}

export default ProcessSec
