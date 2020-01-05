/*!

=========================================================
* Argon Dashboard React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Index from "views/Index.jsx";
import AddProfs from "views/examples/AddProfs.jsx";
import Addseance from "views/examples/Addseance.jsx";
import AddClasses from "views/examples/AddClasses.jsx";
import getprofemplois from "views/examples/getprofemplois.jsx";
import getprofclasses from "views/examples/getprofclasses.jsx";

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-purple",
    component: Index,
    layout: "/admin"
  },
  {
    path: "/AddProfs",
    name: "Ajoute les professeur",
    icon: "ni ni-circle-08 text-purple",
    component: AddProfs,
    layout: "/admin"
  },
  {
    path: "/AddClasses",
    name: "Ajoute les classes",
    icon: "ni ni-single-copy-04 text-purple",
    component: AddClasses,
    layout: "/admin"
  },
  {
    path: "/Addseance",
    name: "Ajoute les séance ",
    icon: "ni ni-time-alarm text-purple",
    component: Addseance ,
    layout: "/admin"
  },
  {
    path: "/getprofemplois",
    name: " Emploie de Professeur ",
    icon: "ni ni-hat-3 text-purple",
    component: getprofemplois,
    layout: "/admin"
  }, {
    path: "/getprofclasses",
    name: "Emploie de Class",
    icon: "ni ni-archive-2 text-purple",
    component: getprofclasses,
    layout: "/admin"
  },

 
];
export default routes;
