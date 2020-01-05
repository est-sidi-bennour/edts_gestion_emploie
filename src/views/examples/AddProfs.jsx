
import React from "react";

import axios from "axios";

import {
  Card,
  CardHeader,
  Table,
  Container,
  Row,
  CardBody,
  FormGroup,
  Form,
  Input,
  Col,
  Badge,
  Button
} from "reactstrap";

import Header from "components/Headers/Header.jsx";

class Tables extends React.Component {
  constructor(){
    super();
    this.state={
      classname:"",
      profname:"",
      profs:[],
      classe:[]
    };
    this.onChange = this.onChange.bind(this);
    this.addClasse = this.addClasse.bind(this);
    this.addProf = this.addProf.bind(this);

  }

  onChange(e){
    this.setState({[e.target.name]: e.target.value})
  }


  addClasse(e){
    e.preventDefault();
    const newClasse={
      className:this.state.classname
    };
     axios.post("http://localhost:8080/api/class/add", newClasse).then(() => this.loadClasse())


  }

  addProf(e){
    e.preventDefault();
    const newProf={
      profname:this.state.profname
    };
     axios.post("http://localhost:8080/api/prof/add", newProf).then(() => this.loadProf())

  }

  loadProf(){
    axios.get("http://localhost:8080/api/prof/all")
      .then(res => {
        const profs = res.data;
        this.setState({ profs });
      })
  }
  loadClasse(){
    axios.get("http://localhost:8080/api/class/all")
    .then(res => {
      const classe = res.data;
      this.setState({ classe });
    })
  }
  componentDidMount(){
    this.loadProf()
    this.loadClasse()
  }


  render() {
    return (
      <>
      <Header />
        <Container className="mt--9" fluid>
                {/* formule */}

        <Row className="mt-5" >


        {/* card prof */}

        <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
          <Card className="card-profile shadow">
            <Row className="justify-content-center">
              <Col className="order-lg-2" lg="3">
                <div className="card-profile-image">
                  <a href="#pablo" onClick={e => e.preventDefault()}>
                    <img
                      alt="..."
                      className="rounded-circle"
                      src={require("assets/img/theme/team-4-800x800.jpg")}
                    />
                  </a>
                </div>
              </Col>
            </Row>
            <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
              <div className="d-flex justify-content-between">
              
              </div>
            </CardHeader>
            <CardBody className="pt-0 pt-md-4">
              <Row>
                <div className="col">
                  <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                    <div>
                      <span className="heading">22</span>
                      <span className="description">matiers</span>
                    </div>
                    <div>
                      <span className="heading">05</span>
                      <span className="description">class</span>
                    </div>
                    <div>
                      <span className="heading">10</span>
                      <span className="description">professeur</span>
                    </div>
                  </div>
                </div>
              </Row>
              <div className="text-center">
                <h3>
                Pour générer emploi du temps: 
                                 
                </h3>
             
              
                <div>
                  <i className="ni education_hat mr-2" />
                  Ajouter tous les professeur EST sidi bennour
                </div>
                <br className="my-8" />
            
              </div>
              <br className="my-5" />
              <row><button  className="btn btn-primary btn-block  " >  Plus d'informations
              </button></row>

              <br className="my-5" />


            </CardBody>
          </Card>
        </Col>
      
        {/* formule prof */}

        <Col className="order-xl-1" xl="8">
        <Card className="bg-secondary shadow">
          <CardHeader className="bg-white border-0">
            <Row className="align-items-center">
              <Col xs="8">
                <h3 className="mb-0">Ajoute les professeur</h3>
              </Col>
              <Col className="text-right" xs="4">
                <Button
                  color="primary"
                  href="#pablo"
                  onClick={e => e.preventDefault()}
                  size="sm"
                >
                  Settings
                </Button>
              </Col>
            </Row>
          </CardHeader>
          <CardBody>
            <Form role="form" onSubmit={this.addProf} >
              <h6 className="heading-small text-muted mb-4">
              professeur information
              </h6>
              <div className="pl-lg-4">
                <Row>
                  <Col lg="6">
                  
                    <FormGroup>
                      <label
                        className="form-control-label"
                        htmlFor="input-username"
                      >
                        Username
                      </label>
                      <Input
                      placeholder="Name" 
                      name="profname" 
                      value={this.state.profname}
                       onChange={this.onChange} 
                       type="text"
                      />
                    </FormGroup>
                  


                  
                    </Col>
                  <Col lg="6">
                    <FormGroup>
                      <label
                        className="form-control-label"
                        htmlFor="input-email"
                      >
                        Email address
                      </label>
                      <Input
                        className="form-control-alternative"
                        id="input-email"
                        placeholder="ayoub@example.com"
                        type="email"
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col lg="6">
                    <FormGroup>
                      <label
                        className="form-control-label"
                        htmlFor="input-first-name"
                      >
                        First name
                      </label>
                      <Input
                        className="form-control-alternative"
                        id="input-first-name"
                        placeholder="First name"
                        type="text"
                      />
                    </FormGroup>
                  </Col>
                  <Col lg="6">
                    <FormGroup>
                      <label
                        className="form-control-label"
                        htmlFor="input-last-name"
                      >
                        Last name
                      </label>
                      <Input
                        className="form-control-alternative"
                        id="input-last-name"
                        placeholder="Last name"
                        type="text"
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <row><button  className="btn btn-primary btn-block  " type="submit" > Ajoute le professeur </button></row>
                </div>
                <br className="my-5" />
         
              </Form>
          </CardBody>
        </Card>
      </Col>
   
        </Row>
 

        {/* table */}

        <Row className="mt-5" >
            <div className="col">
              <Card className="bg-default shadow">
                <CardHeader className="bg-transparent border-0">
                  <h3 className="text-white mb-0">Les list des professeurs </h3>
                </CardHeader>
                <Table className="align-items-center table-dark table-flush" responsive>
                  <thead className="thead-dark">
                    <tr>
                      <th scope="col">id</th>
                      <th scope="col">Prof Name</th>
                      <th scope="col">les heures </th>
                      <th scope="col">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                  { this.state.profs.map(prof => <tr>
                    <td>{prof.id}</td><td>{prof.profName}</td>
                    <td>24 h par semaine </td>
                    <td>
                      <Badge color="" className="badge-dot mr-4">
                        <i className="bg-success" />
                        Disponibles
                      </Badge>
                    </td>
                    
                    </tr>)}
                 
                  </tbody>
                </Table>
                </Card>
                </div>
                </Row>


           

          
      
          </Container>
      </>
    );
  }
}

export default Tables;
