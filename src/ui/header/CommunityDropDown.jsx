import { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import useGetCommunitiesList from "../../hooks/useGetCommunitiesList";

export default function CommunityDropDown() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const { data: communities } = useGetCommunitiesList();
  return (
    <li
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <Dropdown show={isOpen}>
        <Dropdown.Toggle as="button" className="com_btn">
          {t("communities.community")}
        </Dropdown.Toggle>
        <Dropdown.Menu className="community_dropdown">
          {communities?.map((community) => (
            <li key={community.id}>
              <Dropdown.Item as="p">
                <Link
                  to={`/community/${community.name}`}
                  onClick={() => setIsOpen(false)}
                >
                  {community.name}
                </Link>
              </Dropdown.Item>
            </li>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </li>
  );
}
