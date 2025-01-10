import ServiceDetailsSectionHeader from "./ServiceDetailsSectionHeader";
import { CiEdit } from "react-icons/ci";
import { LiaFileSolid } from "react-icons/lia";
import { FaCartPlus, FaMinus, FaPlus } from "react-icons/fa6";
import { useNavigate } from "react-router";
export default function ServiseDetailsComponent() {
  let islogged = true;
  const navigate = useNavigate();
  return (
    <section className="service_details_component">
      <section className="img_card">
        <img
          className="img-fluid"
          src="/images/tempServiceImage.png"
          alt="service name"
        />
      </section>
      <section className="service_description">
        <ServiceDetailsSectionHeader title="Service Description">
          <LiaFileSolid />
        </ServiceDetailsSectionHeader>
        <p>
          Dear customer: If you need distinctive designs, here is my offer.. You
          will get one image design (number 1) from the following list: - Images
          for your website - Facebook and Instagram stories - Facebook and
          Instagram posts and many services related to image design such as
          banners, infographics and presentations. Service features: In return
          for the service, you will get: - Unique, high-quality designs. -
          Design in the language of your choice. - Deliver the work in JPG or
          PNG format - I accept your criticism with open arms. - I guarantee
          that the work will be completed as quickly as possible and with the
          best quality. *** Notes please focus on them - The design is modified
          only once - Design using Canva
        </p>
      </section>
      <section className="buyer_instructions">
        <ServiceDetailsSectionHeader title="Buyer Instructions">
          <CiEdit />
        </ServiceDetailsSectionHeader>
        <ul>
          <li>I am not responsible for the Apple account. And the domains.</li>
          <li>I am not responsible for the Apple account. And the domains.</li>
        </ul>
      </section>
      <section className="adds_on">
        <ServiceDetailsSectionHeader title="Available Add-ons for This Service">
          <LiaFileSolid />
        </ServiceDetailsSectionHeader>
        <ul>
          <li>
            <input type="checkbox" />
            <label>
              <p>3d photo design</p>
              <p>For an additional 10 to the service price</p>
            </label>
          </li>
          <li>
            <input type="checkbox" />
            <label>
              <p>3d photo design</p>
              <p>For an additional 10 to the service price</p>
            </label>
          </li>
        </ul>
      </section>
      <section>
        <div className="add_cart">
          <div className="input_field">
            <button
              className="add"
              // disabled={formLoading}
              // onClick={handleIncreaseQuantity}
            >
              <FaPlus />
            </button>
            <input type="number" min={1} readOnly value="1" />
            <button className="minus">
              <FaMinus />
            </button>
          </div>
          <div className="total d-flex justify-content-between align-items-center">
            <p>
              Total : <br />
              <span>
                + <span id="num">1</span>
                Additional Service
              </span>
            </p>
            <h6>200 $</h6>
          </div>
          <div className="d-flex w-100 gap-2">
            {
              <button className="request_order">
                <FaCartPlus />
                Add to Cart
              </button>
            }
            <button
              className="request_order"
              onClick={() => {
                if (islogged === true) {
                  navigate("/login");
                } else {
                  // setShowCollectionModel(true);
                }
              }}
            >
              <FaPlus />
              Add To Collection
            </button>
          </div>
        </div>
      </section>
    </section>
  );
}
