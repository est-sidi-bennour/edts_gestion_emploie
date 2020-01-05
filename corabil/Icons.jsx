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

import axios from "axios";

import {
  Container,
  Row,
  Col,
  FormGroup,
  Form,
    Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
 Table

} from "reactstrap";

import Header from "components/Headers/Header.jsx";

class Icons extends React.Component {
  constructor(){
    
    super();

    this.state={
      matiername:"",
      prof_id:"",
      classe_id:"",
      time:"",
      date:"",
      prof_idInner:"21",
      classe_idInner:"10",
      Day:[],
      profs:["dgdg"],
      classe:["xkx"],

      matiere:["sfs"],

      matiereVide:{id:"",classId:"",matiereName:"",profId:"",time:""},
      days:['lundi','mardi','mercredi','jeudi','vendredi','samedi'],
      temps:['8','10','14','16'],
      users: [
        {
          username: 'Jeff',
          online: true
        },
        {
          username: 'Alan',
          online: false
        },
        {
          username: 'Mary',
          online: true
        },
        {
          username: 'Jim',
          online: false
        },
        {
          username: 'Sara',
          online: true
        },
        {
          username: 'Laura',
          online: true
        }
      ]
    };
    this.onChange = this.onChange.bind(this);
    this.addMatiere = this.addMatiere.bind(this);
    this.fillEmploie = this.fillEmploie.bind(this)
  }
  componentDidMount(){

    this.loadClasse()
    this.loadMatiere()
    this.loadProf()

  }

 
  onChange(e){
    this.setState({[e.target.name]: e.target.value})
   


    //this.fillEmploie();
  }


  

  
  loadProf(){

    axios.get("http://localhost:8080/api/prof/all")
    .then(res => {
      const profs = res.data;
      this.setState({ profs });
    })

   
  }

  loadMatiere(){

    axios.get("http://localhost:8080/api/matiere/all")
    .then(res => {
      const matiere = res.data;
      this.setState({ matiere:matiere });
    })

  }
  
  loadClasse(){

    axios.get("http://localhost:8080/api/class/all")
    .then(res => {
      const classe = res.data;
      this.setState({ classe });
    })

  }


  fillEmploie(){
    

    let Day=[];
    for(let i=0;i<6;i++){
      Day.push([])
      for(let j=0;j<4;j++){
        Day[i].push(this.state.matiereVide)
      }
    }

    let profs=[]//this.state.matiere.filter(matiere=>matiere.profId===this.state.prof_idInner);
    for(let i=0;i<this.state.matiere.length;i++){
      if(this.state.matiere[i].profId===this.state.prof_idInner){
        profs.push(this.state.matiere[i]);
      }
    }
   

    let classe= this.state.matiere.filter( 
      matiere=>matiere.profId===20
     
      );

    
    profs.forEach(element=>element.time=element.time.split("/"))
    classe.forEach(element=>element.time=element.time.split("/"))   
    for(let i=0;i<6;i++){
      for(let j=0;j<4;j++){
        for(let k=0;k<profs.length;k++){
          if(this.state.days[i]===profs[k].time[0]&&this.state.temps[j]===profs[k].time[1]){
            Day[i][j]=profs[k];
         }
        }
      }
    }
  
    this.setState({Day})
  }



  addMatiere(e){
    e.preventDefault();
    const newMatiere={
      profId:this.state.prof_id,
      classId:this.state.classe_id,
      matiereName:this.state.matiername,
      time:this.state.date+"/"+this.state.time+"/"+this.state.prof_id+"/"+this.state.classe_id
    }
    axios.post("http://localhost:8080/api/matiere/add", newMatiere).then()
  }



  
  render() {
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className=" mt--7" fluid        >
          {/* Table */}
          <Form role="form" onSubmit={this.addMatiere}>
                  <Row>
                  <Col>
                    <FormGroup >
                      <InputGroup className="input-group-alternative ">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-hat-3" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="Name" name="matiername" value={this.state.matiername} onChange={this.onChange} type="text" />
                      </InputGroup>

                    </FormGroup>
                    </Col>
                    <Col>
                    <FormGroup>
                    <Input type="select" name="prof_id" id="exampleSelect" onChange={this.onChange}>
                    <option value="" selected> --select prof--</option>
                      { this.state.profs.map(prof => <option value={prof.id}> {prof.profName}</option>)}
  
                    </Input>
                                        
                  </FormGroup>
                  </Col>
                  <Col>
                  <FormGroup>
                  <Input type="select" name="classe_id" id="exampleSelect" onChange={this.onChange}>
                  <option value="" selected> --select classe--</option>
                  { this.state.classe.map(classe => <option name="calsse_id" value={classe.id} onChange={this.onChange}> {classe.className}</option>)}

                  </Input>
                                      
                </FormGroup>
                </Col>
                <Col>
                <FormGroup>
                <Input type="select" name="date" id="exampleSelect" onChange={this.onChange}>
                <option value="" selected> --select jour--</option>
                <option value="lundi"> lundi</option>
                <option value="mardi"> mardi</option>
                <option value="mercredi"> mercredi</option>
                <option value="jeudi"> jeudi</option>
                <option value="vendredi"> vendredi</option>
                <option value="samedi"> samedi</option>

                </Input>
                                    
              </FormGroup>
              </Col>

              <Col>
              <FormGroup>
              <Input type="select" name="time" id="exampleSelect" onChange={this.onChange}>
              <option value="" selected> --select time--</option>
              <option value="8"> 8-10</option>
              <option value="10"> 10-12</option>
              <option value="14"> 14-16</option>
              <option value="16"> 16-18</option>


              </Input>
                                  
            </FormGroup>
            </Col>

                 

                  
                  
                    </Row>


                    <Col>
                    <div className="text-center">
                      <input color="primary" type="submit"/>
                        
                     
                    </div>
                    </Col>


                    </Form>
                    <Form role="form" onSubmit={this.fillEmploie}>
                  <Row>

                    <Col>
                    <FormGroup>
                    <Input type="select" name="prof_idInner" id="exampleSelect" onChange={this.onChange}>
                    <option value="" selected> --select prof--</option>
                      { this.state.profs.map(prof => <option value={prof.id}> {prof.profName}</option>)}
  
                    </Input>
                                        
                  </FormGroup>
                  </Col>
                  <Col>
                  <FormGroup>
                  <Input type="select" name="classe_idInner" id="exampleSelect" onChange={this.onChange}>
                  <option value="" selected> --select classe--</option>
                  { this.state.classe.map(classe => <option name="calsse_id" value={classe.id} onChange={this.onChange}> {classe.className}</option>)}

                  </Input>
                                      
                </FormGroup>
                </Col>                  
                    </Row>
                    <Col>
                    <div className="text-center">
                      <input color="primary" type="submit"/>
                        
                     
                    </div>
                    </Col>


                    </Form>
                    <Table bordered>
      <thead>
        <tr>
          <th>Jours</th>
          <th>8-10</th>
          <th>10-12</th>
          <th>14-16</th>
          <th>16-18</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">Lundi</th>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <th scope="row">Mardi</th>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <th scope="row">Mercredi</th>
          <td>Larry</td>
          <td>the Bird</td>
          <td>@twitter</td>
        </tr>
        <tr>
        <th scope="row">Jeudi</th>
        <td>Larry</td>
        <td>the Bird</td>
        <td>@twitter</td>
      </tr>
      <tr>
      <th scope="row">Vendredi</th>
      <td>Larry</td>
      <td>the Bird</td>
      <td>@twitter</td>
    </tr>
    <tr>
    <th scope="row">Samedi</th>
    <td>Larry</td>
    <td>the Bird</td>
    <td>@twitter</td>
  </tr>
      </tbody>
    </Table>
        </Container>
      </>
    );
  }
}

export default Icons;



<FormGroup >
<InputGroup className="input-group-alternative ">
  <InputGroupAddon addonType="prepend">
    <InputGroupText>
      <i className="ni ni-hat-3" />
    </InputGroupText>
  </InputGroupAddon>
  <Input placeholder="Name" name="profname" value={this.state.profname} onChange={this.onChange} type="text" />
</InputGroup>
</FormGroup>