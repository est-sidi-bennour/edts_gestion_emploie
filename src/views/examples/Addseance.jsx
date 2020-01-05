import React from "react";

import axios from "axios";

import {
  Button,
  Container,
  Row,
  Col,
  FormGroup,
  Form,
    Input,
 
 Table,
 Card,
 CardHeader,
 CardBody,Alert 

} from "reactstrap";

import Header from "components/Headers/Header.jsx";


class Profile extends React.Component {
  
  constructor(){
    
    super();

    this.state={
      sessionSelected:{},
      ShowEmploie:false,
      Showadd:false,
      matiername:"",
      prof_id:"",
      classe_id:"",
      time:"",
      date:"",
      prof_idInner:'',
      classe_idInner:'',
      Day:[],
      profs:["dgdg"],
      classe:["xkx"],

      matiere:["sfs"],

      days:['lundi','mardi','mercredi','jeudi','vendredi','samedi'],
      temps:['8','10','14','16']
    };
    this.onChange = this.onChange.bind(this);
    this.addMatiere = this.addMatiere.bind(this);
    this.fillEmploie = this.fillEmploie.bind(this)
  }



  showEmploie(){
    this.setState({
      ShowEmploie:true
    })
  }
  showaddme(){
    this.setState({
      Showadd:!this.state.Showadd
    })
  }
  componentDidMount(){

    this.loadClasse()
    this.loadMatiere()
    this.loadProf()
  }

 
  onChange(e){
    this.setState({[e.target.name]: e.target.value})
   


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
  
  fillEmploie(e){
      e.preventDefault()
    let DayEmploie=[];
    for(let i=0;i<6;i++){
      DayEmploie.push([])
      for(let j=0;j<4;j++){
        DayEmploie[i].push({id:"",classId:"",matiereName:"",profId:"",time:this.state.days[i]+"/"+this.state.temps[j]})
      }
    }

    let profs=this.state.matiere.filter(matiere=>matiere.profId===parseInt(this.state.prof_idInner));
    profs.forEach(p => p.from="p")
    let classe= this.state.matiere.filter(matiere=>matiere.classId===parseInt(this.state.classe_idInner));
    //profs.forEach(element=>element.time=element.time.split("/"))
    for(let i=0;i<profs.length;i++){
      if(typeof(profs[i].time)==='string' ){
        profs[i].time=profs[i].time.split("/")
      }
    }
    //classe.forEach(element=>element.time=element.time.split("/"))
    for(let i=0;i<classe.length;i++){
      if(typeof(classe[i].time)==='string' ){
        classe[i].time=classe[i].time.split("/")
      }
    }
    classe.forEach(p => p.from="c")
    for(let i=0;i<6;i++){
      for(let j=0;j<4;j++){
        for(let k=0;k<profs.length;k++){
          if(this.state.days[i]===profs[k].time[0]&&this.state.temps[j]===profs[k].time[1]){
            DayEmploie[i][j]=profs[k];
         }
        }
      }
    }

    for(let i=0;i<6;i++){
      for(let j=0;j<4;j++){
        for(let k=0;k<classe.length;k++){
          if(this.state.days[i]===classe[k].time[0]&&this.state.temps[j]===classe[k].time[1]){
            DayEmploie[i][j]=classe[k];
         }
        }
      }
    }
    this.setState({ Day:DayEmploie })

  }


  addMatiere(e){
    let session=this.state.sessionSelected;
    e.preventDefault();



    const newMatiere={
      profId:this.state.prof_idInner,
      classId:this.state.classe_idInner,
      matiereName:this.state.matiername,
      time:session.time[0]+"/"+session.time[1]+"/"+this.state.prof_idInner+"/"+this.state.classe_idInner
    }
    axios.post("http://localhost:8080/api/matiere/add", newMatiere).then(()=>this.loadMatiere())
    this.showaddme()
  }

  afficheSession(session){

     if(session.from==="c"){
      return <td><Alert  color="primary"> matiere name : {session.matiereName}  
      <br/> Prof : {this.state.profs.find(emp => emp.id === session.profId).profName}  </Alert></td>;

    }
    else if(session.from==="p"){
      return <td><Alert  color="danger"> matiere name : {session.matiereName}<br/>classe : {this.state.classe.find(emp => emp.id === session.classId).className}  </Alert></td>;

    }
    else
      return<td><Button outline color="info" onClick={()=>this.addSeanceHere(session)}> Ajouter une séance ici</Button></td>;
  }

  addSeanceHere(sessionSelected){
    sessionSelected.time=sessionSelected.time.split("/")
    console.log(sessionSelected)
    this.setState({sessionSelected})
    this.showaddme()
  }
  
  render() {
    return (
      <>
        <Header />
        
        <Container className=" mt--9" fluid>

        
 {/* Trouver des temps vides*/}
        <Row >

        <Col className="order-xl-1" >
        <Card className="bg-secondary shadow">
          <CardHeader className="bg-white border-0">
            <Row className="align-items-center">
              <Col xs="8">
                <h3 className="mb-0">Intersection d'emplois</h3>
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
            <Form role="form" onSubmit={this.fillEmploie} >
            
              <div className="pl-lg-4">
                <Row>
                  <Col >

             

                    <FormGroup>
                      <label
                        className="form-control-label"
                        htmlFor="input-username"
                      >
                      select prof :                    </label>


                      <Input type="select" name="prof_idInner" id="exampleSelect" onChange={this.onChange}>
                      <option value="" selected> --AUCUN --</option>
                        { this.state.profs.map(prof => <option value={prof.id}> {prof.profName}</option>)}
    
                      </Input>
                    </FormGroup>
                  


                  
                    </Col>
                 
                 
                 
                    <Col >
                    
                    
              


                    <FormGroup>


                      <label
                        className="form-control-label"
                        htmlFor="input-email"
                      >
                      
                      choisir nom de matiere : 
                                            </label>

                     <Input type="select" name="classe_idInner" id="exampleSelect" onChange={this.onChange}>
                     <option value="" selected> --AUCUN --</option>
                     { this.state.classe.map(classe => <option name="calsse_id" value={classe.id} onChange={this.onChange}> {classe.className}</option>)}
  
                     </Input>
                    </FormGroup>
                  </Col>
               
                  <Col>
                  <label
                  className="form-control-label"
                  htmlFor="input-email"
                > . </label>
                    
                  <button  onClick={()=>this.showEmploie()} className="btn btn-primary btn-block  " >  obtinir l'emplois
                  </button>   


                   
                    </Col>
               
               
                  </Row>
              
           
              
              
                </div>
                <br className="my-5" />
         
              </Form>
          </CardBody>
        </Card>
      </Col>
   
        </Row>
                {/* formule prof */}
{
  this.state.Showadd? 

        <Row  >

        <Col className="order-xl-1" >
        <Card className="bg-secondary shadow">
          <CardHeader className="bg-white border-0">
            <Row className="align-items-center">
              <Col xs="8">
                <h3 className="mb-0">Ajoute les seance
                </h3>
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
            <Form role="form" onSubmit={this.addMatiere} >
             
              <div className="pl-lg-4">
                <Row>
                <Col lg="6">

                <FormGroup>

                  <h2>Ajouter une séance pour { this.state.classe.find(classe => classe.id===parseInt(this.state.classe_idInner)).className} avec PR.{ this.state.profs.find(profs => profs.id===parseInt(this.state.prof_idInner)).profName} <br/>({this.state.sessionSelected.time[0]+"/"+this.state.sessionSelected.time[1]}) </h2>

                </FormGroup>
              </Col>
                  <Col lg="6">

             

                    <FormGroup>
                      <label
                        className="form-control-label"
                        htmlFor="input-username"
                      >
                      saiser nom  matier :
                      </label>
                      <Input placeholder="Name" name="matiername" value={this.state.matiername} onChange={this.onChange} type="text" />

                    </FormGroup>
                  


                  
                    </Col>
                 
                 
                 
                    
               
               
               
                  </Row>
              
                  <Row>
           
    
             
               
               
               
                  </Row>

                
                  <Row>
           
                <Col lg="6">
                <label
                className="form-control-label"
                htmlFor="input-email">  .</label>
                <button  className="btn btn-primary btn-block  " >  ajoute seance 
                </button>              

              </Col>
             
                </Row>

              
              
                </div>
                <br className="my-5" />
         
              </Form>
          </CardBody>
        </Card>
      </Col>
   
        </Row>
        :null  }  
        <br className="my-5" />

        {/* table de emplois */}
        {
          this.state.ShowEmploie? 
        <Row >

        <Col className="order-xl-1" >
        <Card className="bg-secondary shadow">
          <CardHeader className="bg-white border-0">
            <Row className="align-items-center">
              <Col xs="8">
                <h3 className="mb-0">Trouver des temps vides</h3>
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
          <Table className="align-items-center table-dark table-flush text-white " bordered>
      <thead className="thead-dark text-white " >
        <tr >
          <th>Jours</th>
          <th>8-10</th>
          <th>10-12</th>
          <th>14-16</th>
          <th>16-18</th>
        </tr>
      </thead>
      <tbody>
      
        {this.state.Day.map(day=><tr><th scope="row">Lundi</th>{day.map(session=>this.afficheSession(session))} </tr>)}
      </tbody>
    </Table>
      </CardBody>
        </Card>
      </Col>
   
        </Row>

        :null  }  
        <br className="my-5" />

 

              
                
                
                
                
                
                
                
              
        </Container>
    
    
        </>
    );
  }
}

export default Profile;
