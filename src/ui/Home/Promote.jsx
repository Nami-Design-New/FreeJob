import FormButton from "../form/FormButton";

export default function Promote() {
  return (
    <div className="promote_card ">
      <div className="content  col-md-6">
        <div className="text_content">
          <h1>Join FREEJOB World</h1>
          <p>
            Be part of a thriving network of professionals and clients. Whether
            you’re a freelancer looking for new opportunities or a company in
            need of skilled experts, FREEJOB connects you with the right people
            to get the job done.
          </p>
        </div>
        <FormButton
          style={{ marginTop: "0", width: "fit-content" }}
          content="Join Now"
        />
      </div>
      <div className="d-none d-md-block col-6 rounded overflow-hidden">
        <img src="./images/card2.png" alt="" className="img-fluid rounded " />
      </div>
    </div>
  );
}
