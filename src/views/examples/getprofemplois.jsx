
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

class Icons extends React.Component {
  constructor(){
    
    super();

    this.state={
      ShowMe:false,
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

      matiereVide:{id:"",classId:"",matiereName:"",profId:"",time:""},
      days:['lundi','mardi','mercredi','jeudi','vendredi','samedi'],
      temps:['8','10','14','16']
    };
    this.onChange = this.onChange.bind(this);
    this.addMatiere = this.addMatiere.bind(this);
    this.fillEmploie = this.fillEmploie.bind(this)

  }

  showaddseance(){
    this.setState({
      ShowMe:true
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
    if(e!=="ppp"){
      e.preventDefault()
    }
    let DayEmploie=[];
    for(let i=0;i<6;i++){
      DayEmploie.push([])
      for(let j=0;j<4;j++){
        DayEmploie[i].push(this.state.matiereVide)
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
    console.log(classe)
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
    e.preventDefault();
    const newMatiere={
      profId:this.state.prof_id,
      classId:this.state.classe_id,
      matiereName:this.state.matiername,
      time:this.state.date+"/"+this.state.time+"/"+this.state.prof_id+"/"+this.state.classe_id
    }
    axios.post("http://localhost:8080/api/matiere/add", newMatiere).then(()=>this.loadMatiere())
    this.fillEmploie("ppp")
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
      return<td><Alert  color="dark"> emptye</Alert></td>;
  }


  
  render() {
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className=" mt--9" fluid>

        
        {/* Trouver des temps vides*/}
               <Row >
       
               <Col className="order-xl-1" >
               <Card className="bg-secondary shadow">
               
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
                             S'il vous plaît choisir profsseur  :
                             </label>
       
       
                             <Input type="select" name="prof_idInner" id="exampleSelect" onChange={this.onChange}>
                             <option value="" selected> --select prof--</option>
                               { this.state.profs.map(prof => <option value={prof.id}> {prof.profName}</option>)}
           
                             </Input>
                           </FormGroup>
                         
       
       
                         
                           </Col>
                        
                        
                        
                         <Col>
                         <label
                         className="form-control-label"
                         htmlFor="input-email"
                       > . </label>
                           
                         <button  onClick={()=>this.showaddseance()} className="btn btn-primary btn-block  " >  Plus d'informations
                         </button>   
       
       
                          
                           </Col>
                      
                      
                         </Row>
                     
                  
                     
                     
                       </div>
                
                     </Form>
                 </CardBody>
               </Card>
             </Col>
          
             
       
             
               </Row>
               <br className="my-5" />
       
               {/* table de emplois */}
               {
                 this.state.ShowMe? 
               <Row >
       
               <Col className="order-xl-1" >
               <Card className="bg-secondary shadow">
               
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
       
               {/* formule prof */}
     
                     
                       
                       
                       
                       
                       
                       
                       
                     
               </Container>
           
    
        </>
    );
  }
}

export default Icons;
