import { Modal } from "react-bootstrap";
import { Link } from "react-router";

export default function ChooseCategoryPath({ show, close }) {
  return (
    <Modal size="lg" onHide={close} show={show} centered>
      <Modal.Header closeButton>
        <Modal.Title>Continue search in</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="container p-5">
          <div className="choose_path">
            <div className="choise">
              <Link to="/services">
                <div>
                  <img
                    src="./images/toprojects.png"
                    alt=""
                    className="img-fluid"
                  />
                </div>
                <p>Services</p>
              </Link>
            </div>
            <div className="choise">
              <Link to>
                <div>
                  <img
                    className="img-fluid"
                    src="./images/toservices.png"
                    alt=""
                  />
                </div>
                <p>Projects</p>
              </Link>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
