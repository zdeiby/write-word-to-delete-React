import React from "react";

const SECURITY_CODE = "eliminar";

function UseReducer({name}){

    const initialState = {
        value:'',
        error:false,
        deleted:false,
        confirmed:false
    }
    
    const actionTypes={
        error:'error',
        confirm:'confirm',
        check:'check',
        delete:'delete',
        reset:'reset',
        write:'write',
    }
    const reducerObject=(state, payload)=>({
        [actionTypes.confirm]:{
                ...state,
                loading:false,
                error:false,
                confirmed:true
        },
        [actionTypes.error]:{
            ...state,
            error:true,
            loading:false,
        },
       [actionTypes.check]:{
            ...state,
            loading:true,
        } ,
        [actionTypes.delete]:{
            ...state,
            deleted:true
        },
        [actionTypes.reset]:{
            ...state,
            confirmed:false,
            deleted:false,
            value:''
        },
       [actionTypes.write]:{
            ...state,
            value:payload
        }
    });

    const reducer = (state, action)=>{
        if(reducerObject(state)[action.type]){
            return reducerObject(state, action.payload)[action.type];
        }else{
            return state
        }
    }
    const [state, dispatch]= React.useReducer(reducer, initialState)
  

console.log(state)




    React.useEffect(()=>{
        console.log("iniciando proceso")
       if(state.loading){
        setTimeout(()=>{
            console.log("iniciando validacion")
            if(state.value === SECURITY_CODE){
              dispatch({
                type:actionTypes.confirm,
              })
                //setError(false)  
                console.log("terminando la validacion")
            }else{
                dispatch({
                    type:actionTypes.error,
                  })
    
         console.log("terminando el proceso")
       }
    },3000)
}      
    },[state.loading])

if(!state.deleted && !state.confirmed){
        return(
            <div>
                <h2>Eliminar {name}</h2>
                <p>Por favor escribe <b style={{color:'red'}}>eliminar</b> para confirmar que quieres borrar</p>
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
                    dispatch({
                        type:actionTypes.write, payload:e.target.value,
                      })
                }}/>
                <button
                    onClick={() => {
                        dispatch({
                            type:actionTypes.check,
                          })
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
                        dispatch({
                            type:actionTypes.delete,
                          })
                    }}
                    >eliminar</button>
                <button
                   onClick={()=>{
                    dispatch({
                        type:actionTypes.reset,
                      })
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
                    dispatch({
                        type:actionTypes.reset,
                      })
                }}
                    >resetear, volver atras</button>
        </React.Fragment>
        )
    }
    
}

export {UseReducer}




