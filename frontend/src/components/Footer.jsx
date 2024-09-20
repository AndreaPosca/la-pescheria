      import logoFooter from "../assets/logo-footer.jpg"
      import { useNavigate } from "react-router-dom"


      
      {/* FOOTER */}
      export default function MyFooter() {
        const navigate = useNavigate();
        return (
      <div className="container-fluid mt-2">
        <div className="row text-center text-md-start d-flex align-items-center">
          {/* Prima colonna: La Pescheria */}
          <div className="col-12 col-md-4 mb-4 mb-md-0">
            <h2 className="text-center">La Pescheria</h2>
            <ul className="anchor-list list-unstyled">
              <li>
                <div className="link-container text-center">
                  <a onClick={() => navigate('/gallery')} className="link-one">
                    I nostri prodotti
                  </a>
                </div>
              </li>
              <li>
                <div className="link-container text-center">
                  <a onClick={() => navigate('/ricette')} className="link-two">
                    Le ricette
                  </a>
                </div>
              </li>
              <li>
                <div className="link-container text-center">
                  <a onClick={() => navigate('/bacheca')} className="link-three">
                    La nostra bacheca
                  </a>
                </div>
              </li>
            </ul>
          </div>

          {/* Seconda colonna: Link utili */}
          <div className="col-12 col-md-4 mb-4 mb-md-0">
            <h4 className="text-center">Informazioni utili</h4>
            <p className="text-center">Contattaci: 3356573984</p>
            <p className="text-center">Email: lapescheria@gmail.com</p>
          </div>

          {/* Terza colonna: Logo */}
          <div className="col-12 col-md-4 d-flex justify-content-center justify-content">
            <a className="logo-footer">
              <img src={logoFooter} alt="Logo Footer" className="img-fluid" />
            </a>
          </div>
        </div>
      </div>
    )
}