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
import React from "react";

import Chart from "chart.js";

import classnames from "classnames";

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col
} from "reactstrap";

import { Line, Bar } from "react-chartjs-2";

import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "variables/charts.jsx";

import Header from "components/Headers/Header.jsx";

class Index extends React.Component {
 
  render() {
    return (
      <>
        {/* Page content */}
       

          <Container>
  <Row className="justify-content-md-center">
   
    <Col lg={{size: "auto"}}>
      <span><img 
   

      alt="..."
    
      src={require("assets/img/theme/test.png")}
    />   </span>
    </Col>
  
   
  </Row>
</Container>
      </>
    );
  }
}

export default Index;
