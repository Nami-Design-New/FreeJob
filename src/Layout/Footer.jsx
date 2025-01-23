import { useTranslation } from "react-i18next";
import FooterBottomSection from "../ui/footer/FooterBottomSection";
import FooterSection from "../ui/footer/FooterSection";
import useGetAbout from "../hooks/about/useGetAbout";
import useGetCommunitiesList from "../hooks/community/useGetCommunitiesList";
import usePopularCategories from "../hooks/categories/usePopularCategoris";
import usePaymentMethodsList from "../hooks/usePaymentMethodsList";
import DataLoader from "../ui/DataLoader";
import { Link } from "react-router-dom";
import { Accordion } from "react-bootstrap";
import Logo from "../ui/header/Logo";
import LanguageToggle from "../ui/LanguageToggle";

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
  const { data: payments } = usePaymentMethodsList();
  const { t } = useTranslation();
  const { isLoading, data: footerCategoriesList } = useGetAbout();
  const { isLoading: isCategoryLoading, data: popularCategoriesList } =
    usePopularCategories();
  const { data: communities } = useGetCommunitiesList();
  console.log(popularCategoriesList);
  console.log(footerCategoriesList);
  console.log(communities);

  return (
    <>
      {isCategoryLoading && isLoading ? (
        <DataLoader />
      ) : (
        // <footer>
        //   <div className="container-md">
        //     {" "}
        //     <section className="copy_rights  col-md-12 col-lg-5 ">
        //       <Logo />
        //       <p>
        //         &copy; <Link to="/"> tet International Ltd. </Link>{" "}
        //         {new Date().getFullYear()}
        //       </p>
        //     </section>
        //     <div className="row">
        //       <div className="col-6 col-lg-3">
        //         <div>
        //           <h1 className="footer_section_title">
        //             {t("footer.categories")}
        //           </h1>
        //           <ul>
        //             {popularCategoriesList.map((item) => (
        //               <li key={item.name}>
        //                 <Link
        //                   className="title"
        //                   to={`/services?categories=${item.category_id}`}
        //                 >
        //                   {item.name}
        //                 </Link>
        //               </li>
        //             ))}
        //           </ul>
        //         </div>
        //       </div>
        //       <div className="col-6 col-lg-3">
        //         <div>
        //           <h1 className="footer_section_title">Categories</h1>
        //           <ul>
        //             {footerCategoriesList &&
        //               footerCategoriesList?.length > 0 && (
        //                 <div className="col-lg-3 col-6">
        //                   <div className="links pa-24">
        //                     <h4>{t("footer.importantLinks")}</h4>
        //                     <ul>
        //                       {footerCategoriesList.map((category) => (
        //                         <li key={category.id}>
        //                           <Link to={`/about/${category.id}`}>
        //                             {category.name}
        //                           </Link>
        //                         </li>
        //                       ))}
        //                       <li>
        //                         <Link to="/blogs">{t("footer.blogs")}</Link>
        //                       </li>
        //                       <li>
        //                         <Link to="/terms-conditions">
        //                           {t("footer.terms")}
        //                         </Link>
        //                       </li>
        //                       <li>
        //                         <Link to="/privacy-policy">
        //                           {t("footer.privacy")}
        //                         </Link>
        //                       </li>
        //                       <Accordion>
        //                         {communities && communities?.length > 0 && (
        //                           <Accordion.Item eventKey="0">
        //                             <Accordion.Header className="nav-link">
        //                               <span>{t("navbar.communities")}</span>
        //                             </Accordion.Header>
        //                             <Accordion.Body>
        //                               <ul>
        //                                 {communities?.map((community) => (
        //                                   <li
        //                                     key={community.id}
        //                                     className="nav-link"
        //                                   >
        //                                     <Link
        //                                       to={`/community/${community.name}`}
        //                                       // onClick={() => setIsOpen(false)}
        //                                     >
        //                                       {community.name}
        //                                     </Link>
        //                                   </li>
        //                                 ))}
        //                               </ul>
        //                             </Accordion.Body>
        //                           </Accordion.Item>
        //                         )}
        //                       </Accordion>
        //                     </ul>
        //                   </div>
        //                 </div>
        //               )}
        //           </ul>
        //         </div>
        //         {/* <FooterSection
        //           items={footerCategoriesList}
        //           title="For Clients"
        //         /> */}
        //       </div>
        //       <div className="col-6 col-lg-3">
        //         <FooterSection items={forFreelancers} title="For Freelancers" />
        //       </div>
        //       <div className="col-6 col-lg-3">
        //         <FooterSection
        //           items={businessSolutions}
        //           title="Business Solutions"
        //         />
        //       </div>
        //     </div>
        //     <FooterBottomSection />
        //   </div>
        // </footer>

        <footer>
          <div className="container">
            <div className="row upper-row">
              <div className="col-lg-3 col-md-6 col-12">
                <div className="about">
                  <Logo />
                  <p>{t("footer.about")}</p>
                  <LanguageToggle />
                </div>
              </div>
              {footerCategoriesList && footerCategoriesList?.length > 0 && (
                <div className="col-lg-3 col-6">
                  <div className="links pa-24">
                    <h4>{t("footer.importantLinks")}</h4>
                    <ul>
                      {footerCategoriesList.map((category) => (
                        <li key={category.id}>
                          <Link to={`/about/${category.id}`}>
                            {category.name}
                          </Link>
                        </li>
                      ))}
                      <li>
                        <Link to="/blogs">{t("footer.blogs")}</Link>
                      </li>
                      <li>
                        <Link to="/terms-conditions">{t("footer.terms")}</Link>
                      </li>
                      <li>
                        <Link to="/privacy-policy">{t("footer.privacy")}</Link>
                      </li>
                      <Accordion>
                        {communities && communities?.length > 0 && (
                          <Accordion.Item eventKey="0">
                            <Accordion.Header className="nav-link">
                              <span>{t("navbar.communities")}</span>
                            </Accordion.Header>
                            <Accordion.Body>
                              <ul>
                                {communities?.map((community) => (
                                  <li key={community.id} className="nav-link">
                                    <Link
                                      to={`/community/${community.name}`}
                                      // onClick={() => setIsOpen(false)}
                                    >
                                      {community.name}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </Accordion.Body>
                          </Accordion.Item>
                        )}
                      </Accordion>
                    </ul>
                  </div>
                </div>
              )}
              {popularCategoriesList && popularCategoriesList?.length > 0 && (
                <div className="col-lg-3 col-6">
                  <div className="links pa-24">
                    <h4>{t("footer.categories")}</h4>
                    <ul className="categories_links">
                      {popularCategoriesList.map((category) => (
                        <li key={category.id}>
                          <Link
                            to={`/services?categories=${category.category_id}`}
                          >
                            {category.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
              <div className="col-lg-3 col-md-6 col-12">
                <div className="d-flex flex-column gap-lg-5 gap-4 pa-24">
                  <div className="download-app">
                    <h4>{t("footer.dowloadApp")}</h4>
                    <ul>
                      <li>
                        <a
                          target="_blank"
                          href="https://apps.apple.com/app/id6605935240"
                        >
                          <div className="text">
                            <p>App Store</p>
                          </div>
                          <div className="icon">
                            <i className="fa-brands fa-apple"></i>
                          </div>
                        </a>
                      </li>
                      <li>
                        <a
                          target="_blank"
                          href="https://play.google.com/store/apps/details?id=com.app.ynjez"
                        >
                          <div className="text">
                            <p>Google Play</p>
                          </div>
                          <div className="icon">
                            <i className="fa-brands fa-google-play"></i>
                          </div>
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="follow">
                    <ul>
                      <li>
                        <Link to="#">
                          <i className="fa-brands fa-facebook-f"></i>
                        </Link>
                      </li>
                      <li>
                        <Link to="#">
                          <i className="fa-brands fa-twitter"></i>
                        </Link>
                      </li>
                      <li>
                        <Link to="#">
                          <i className="fa-brands fa-instagram"></i>
                        </Link>
                      </li>
                      <li>
                        <Link to="#">
                          <i className="fa-brands fa-linkedin-in"></i>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12 d-flex justify-content-between align-items-center flex-lg-row flex-column mb-60">
                <div className="flex-grow-1 flex-shrink-0 flex-basis-0 copy-rights d-flex">
                  <p className="mb-0">
                    {t("footer.copyright")} © {new Date().getFullYear()}{" "}
                    {t("footer.allRightsReserved")}
                  </p>
                  <div>
                    {payments && payments?.length > 0 && (
                      <div className="footer-payment d-flex align-items-center h-full gap-2">
                        <span>{t("footer.acceptPaymentsBy")} :</span>
                        <div className="d-flex align-items-center gap-2">
                          {payments?.map((payment) => (
                            <img
                              src={payment.image}
                              key={payment.id}
                              alt={`payment ${payment.id}`}
                              style={{
                                width: "50px",
                                objectFit: "cover",
                                cursor: "pointer",
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      )}
    </>
  );
}
