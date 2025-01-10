import { useSelector } from "react-redux";

export default function HowToStart() {
  const lang = useSelector((state) => state.language.lang);
  return (
    <div className="howToStart">
      <h1 className="howToStart_header">Do You Have Work To Do?</h1>
      <div className="howToStart_content">
        <ul className="howToStart_text">
          <li className="main_item">
            <span>Add Project</span>
            <ul>
              <li className="sub_item">
                Add details of the project you need done and the skills required
                and get quotes <br></br> from specialized freelancers in
                minutes.
              </li>{" "}
            </ul>
          </li>
          <li className="main_item">
            <span> Choose the right freelancer</span>
            <ul>
              <li className="sub_item">
                Compare freelancers&apos; offers, browse their profiles, ratings
                and work, negotiate with them via messages and choose the best
                one to implement your project.
              </li>
            </ul>
          </li>
          <li className="main_item">
            <span> Receive the project</span>
            <ul>
              {" "}
              <li className="sub_item">
                The freelancer you choose will work on your project and follow
                up with you until you get the agreed upon work results and
                deliver the project.
              </li>{" "}
            </ul>
          </li>
        </ul>
        <div
          className={`${
            lang === "ar" ? "ar" : ""
          } howToStart_imgaeContainer d-none d-lg-block`}
        >
          <img src="./images/card1.png" className="img-fluid" />
        </div>
      </div>
    </div>
  );
}
