import Dashboard from "views/Dashboard/Dashboard.jsx";
import ProjectPage from "views/Pages/ProjectPage.jsx";
import CustomerList from "views/Pages/CustomerList.jsx";
import CustomerForm from "views/Pages/CustomerForm.jsx";

// @material-ui/icons
import Apps from "@material-ui/icons/Apps";
import DashboardIcon from "@material-ui/icons/Dashboard";
import Image from "@material-ui/icons/Image";

var dashRoutes = [
  {
    path: "/developer",
    name: "Developer",
    icon: DashboardIcon,
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/customer-page",
    name: "Customer",
    icon: Apps,
    component: CustomerList,
    layout: "/admin"
  },
  {
    path: "/project-page",
    name: "Project",
    icon: Image,
    component: ProjectPage,
    layout: "/admin"
  },
  {
    path: "/customer-form",
    // name: "Project",
    // icon: Image,
    component: CustomerForm,
    layout: "/admin"
  },
 ];
export default dashRoutes;
