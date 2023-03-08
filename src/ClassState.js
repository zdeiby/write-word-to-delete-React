import React from "react";
const SECURITY_CODE='paradigma'
class ClassState extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            error:false,
            loading:false,
            value:'',
        }
    }

    //USE EFECT CON CLASS
    componentDidMount(){   //lee antes que se monte un componente
        console.log("componentDidMount")
    }
    componentWillUnmount(){   //desmonta un componente
        console.log(" componentWillUnmount")
    }
    componentWillMount(){  // monta un componente
        console.log("componentWillMount")
    }
    componentDidUpdate(){   //similar al use efect para mirar que se actualizò algo 
        console.log("actualizacion")
        if(!!this.state.loading){

        
                setTimeout(()=>{
                    if(this.state.value === SECURITY_CODE){
                        this.setState({loading:false, error:false}) 
                    }else{
                        this.setState({loading:false,error:true}) 
                    }
                    
        },3000)
        console.log(this.state.value)
    }
    }
    //FIN USE EFECT CLASSS
  


    

    render(){
       
        return(
            <div>
                <h2>Eliminar {this.props.name}</h2>
                <p>Por favor escribe el codigo de seguridad</p>
                {(this.state.error && !this.state.loading) && (
                <p> error: el codigo es incorrecto</p>
                 )}
                  {this.state.loading && (
                <p> Cargando...</p>
                 )}
                <input placeholder="Codigo de seguridad"
                value={this.state.value}
                onChange={(e)=>{
                    this.setState({value:e.target.value})
                }}/>
                <button
                onClick={()=>this.setState(prevState=>({loading:true}))}
                    > Comprobar</button>
            </div>
        )
    }
}

export {ClassState}