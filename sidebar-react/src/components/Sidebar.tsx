import { useRef } from "react";
import { CalendarIcon, CreateIcon, DashboardIcon, DropDownIcon, HomeIcon, ProfileIcon, TodoIcon } from "../icons/icons";

const sidebarItems = [
  {
    label: "Home",
    path: "/",
    children: null,
    Icon : HomeIcon
  },
  {
    label: "Dahboard",
    path: "/dashboard",
    children: null,
    Icon : DashboardIcon
  },
  {
    label: "Create",
    path: "/create",
    // Change these
    children: ["Folder", "Document", "Project"],
    Icon : CreateIcon,
    dropDownIcon : DropDownIcon
  },
  {
    label: "Todo List",
    path: "/",
    children: ["Work", "Private", "Coding", "Gardening", "School"],
    Icon : TodoIcon,
    dropDownIcon : DropDownIcon
  },
  {
    label: "Calendar",
    path: "/calendar",
    children: null,
    Icon : CalendarIcon
  },
  {
    label: "Profile",
    path: "Profile",
    children: null,
    Icon : ProfileIcon
  },
];

export default function Sidebar() {
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const sidebarBtn = useRef<HTMLButtonElement | null>(null);

  const closeAllSubMenus = () => {
    if (sidebarRef.current) {
      const sidebar = sidebarRef.current;
      Array.from(sidebar.getElementsByClassName("show")).forEach((ul) => {
        ul.classList.remove("show");
        //@ts-ignore
        ul.previousElementSibling.classList.remove("rotate");
      });
    }
  };

  const toggleSidebar = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (sidebarRef.current) {
      const sidebar = sidebarRef.current;
      const sidebarToggleBtn = e.currentTarget;
      sidebar.classList.toggle("close");
      sidebarToggleBtn.classList.toggle("rotate");

      closeAllSubMenus();
    }
  };

  const toggleSubMenu = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const button = e.currentTarget;
    const sidebar = sidebarRef.current;
    const toggleBtn = sidebarBtn.current;
    if (!button.nextElementSibling?.classList.contains("show")) {
      closeAllSubMenus();
    }

    button.nextElementSibling?.classList.toggle("show");
    button.classList.toggle("rotate");

    if (sidebar && toggleBtn && sidebar.classList.contains("close")) {
      sidebar.classList.toggle("close");
      toggleBtn.classList.toggle("rotate");
    }
  };

  return (
    <nav ref={sidebarRef} className="sidebar">
      <ul>
        <li>
          <span className="logo">Logo</span>
          <button
            className="toggle-sidebar"
            ref={sidebarBtn}
            onClick={toggleSidebar}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#e3e3e3"
            >
              <path d="M440-240 200-480l240-240 56 56-183 184 183 184-56 56Zm264 0L464-480l240-240 56 56-183 184 183 184-56 56Z" />
            </svg>
          </button>
        </li>
        {sidebarItems.map((item) => (
          <li>
            {item.children ? (
              <>
                <button className="dropdown-btn" onClick={toggleSubMenu}>
                  {item.Icon}
                  <span>{item.label}</span>
                  {item.dropDownIcon}
                </button>
                <ul className="sub-menu">
                  <div>
                    {item.children.map((subItem) => (
                        <li>
                        <a href="#">{subItem}</a>
                      </li>
                    ))}
                  </div>
                </ul>
              </>
            ) : (
              <a href="/">
                {item.Icon}
                <span>{item.label}</span>
              </a>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
