import FooterBottomSection from "./footer/FooterBottomSection";
import FooterSection from "./footer/FooterSection";

const categories = [
  { title: "Graphics & Design", subtitle: "" },
  { title: "Digital Marketing", subtitle: "" },
  { title: "Writing & Translation", subtitle: "" },
  { title: "Video & Animation", subtitle: "" },
  { title: "Music & Audio", subtitle: "" },
  { title: "Programming & Tech", subtitle: "" },
  { title: "AI Services", subtitle: "" },
  { title: "Consulting", subtitle: "" },
  { title: "Data", subtitle: "" },
  { title: "Business", subtitle: "" },
  { title: "Personal Growth & Hobbies", subtitle: "" },
  { title: "Photography", subtitle: "" },
  { title: "Finance", subtitle: "" },
  { title: "End-to-End Projects", subtitle: "" },
  { title: "Service Catalog", subtitle: "" },
];

const forClients = [
  { title: "How Fiverr Works", subtitle: "" },
  { title: "Customer Success Stories", subtitle: "" },
  { title: "Trust & Safety", subtitle: "" },
  { title: "Quality Guide", subtitle: "" },
  { title: "Fiverr Learn", subtitle: "Online Courses" },
  { title: "Fiverr Guides", subtitle: "" },
  { title: "Fiverr Answers", subtitle: "" },
];
const forFreelancers = [
  { title: "Become a Fiverr Freelancer", subtitle: "" },
  { title: "Become an Agency", subtitle: "" },
  { title: "Kickstart", subtitle: "" },
  { title: "Community Hub", subtitle: "" },
  { title: "Forum", subtitle: "" },
  { title: "Events", subtitle: "" },
];

const businessSolutions = [
  { title: "Fiverr Pro", subtitle: "" },
  { title: "Project Management Service", subtitle: "" },
  { title: "ClearVoice", subtitle: "Content Marketing" },
  { title: "Working Not Working", subtitle: "Creative Talent" },
  { title: "AutoDS", subtitle: "Dropshipping Tool" },
  { title: "Fiverr Logo Maker", subtitle: "" },
  { title: "Contact Sales", subtitle: "" },
];

export default function Footer() {
  return (
    <footer>
      <div className="container-md">
        <div className="row">
          <div className="col-md-6 col-lg-3">
            <FooterSection items={categories} title="Categories" />
          </div>
          <div className="col-md-6 col-lg-3">
            <FooterSection items={forClients} title="For Clients" />
          </div>
          <div className="col-md-6 col-lg-3">
            <FooterSection items={forFreelancers} title="For Freelancers" />
          </div>
          <div className="col-md-6 col-lg-3">
            <FooterSection
              items={businessSolutions}
              title="Business Solutions"
            />
          </div>
        </div>
        <FooterBottomSection />
      </div>
    </footer>
  );
}
