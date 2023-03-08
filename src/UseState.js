import React from "react";

const SECURITY_CODE = "paradigma";

function UseState({name}){
    const [state, setState]= React.useState({
        error:false,
        loading:false,
        value:'', 
        deleted:false,
        confirmed: false,
    })
  

console.log(state)

const onConfirm=()=>{
    setState({ 
        ...state,
        loading:false,
        error:false,
        confirmed:true
    }) 
}

const onError=()=>{
    setState({
        ...state,
        error:true, 
        loading:false
    })
}

function onWrite(e){
    setState({...state,value:e.target.value})
}
function onCheck(){
    setState({...state,loading:true});
}
function onDelete(){
    setState({
        ...state,
        deleted:true
    })
}

const onReset=()=>{
    setState({
        ...state,
        confirmed:false,
        deleted:false,
        value:''
    })
}

    React.useEffect(()=>{
        console.log("iniciando proceso")
       if(state.loading){
        setTimeout(()=>{
            console.log("iniciando validacion")
            if(state.value === SECURITY_CODE){
                onConfirm();
                //setError(false)  
                console.log("terminando la validacion")
            }else{
                onError();
    
         console.log("terminando el proceso")
       }
    },3000)
}      
    },[state.loading])

if(!state.deleted && !state.confirmed){
        return(
            <div>
                <h2>Eliminar {name}</h2>
                <p>Por favor escribe el codigo de seguridad</p>
                {(state.error && !state.loading) && (
                    <p> error: el codigo es incorrecto</p>
                )}
                {state.loading && (
                    <p>  cargando...</p>
                )}
                <input 
                placeholder="Codigo de seguridad"
                value={state.value}
                onChange={(e)=>{
                  onWrite(e);
                }}/>
                <button
                    onClick={() => {
                        onCheck();
                       // setError(false)
                     }}
                > Comprobar</button>
            </div>
        )
    }else if(!!state.confirmed && !state.deleted){
        return(
            <React.Fragment>
               <div>
                <h2>Eliminar {name}</h2>
                <p>Pedimos confirmacion ¿Estàs seguro?</p>
                <button 
                    onClick={()=>{
                        onDelete();
                    }}
                    >eliminar</button>
                <button
                   onClick={()=>{
                onReset();
                }}
                    >cancelar</button>
                </div>
            </React.Fragment>
        )
    } else{
        return(
            <React.Fragment>
            <h2>Eliminar {name}</h2>
            <p>Eliminado con exito</p>
            <button
                   onClick={()=>{
                   onReset();
                }}
                    >resetear, volver atras</button>
        </React.Fragment>
        )
    }
    
}

export {UseState}