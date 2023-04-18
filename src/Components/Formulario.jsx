import React, { useState } from 'react'
import { db } from '../firebase'
import { collection, doc, addDoc, onSnapshot, deleteDoc, updateDoc } from 'firebase/firestore'

const Formulario = () => {

    const [id, setId] = useState(0)
    const [listaUsuarios, setListaUsuarios] = useState([])

    const [usuario, setUsuario] = useState('')
    const [nombre, setNombre] = useState('')
    const [NID, setNID] = useState('')
    const [correo, setCorreo] = useState('')
    const [direccion, setDireccion] = useState('')
    const [telefono, setTelefono] = useState('')
    const [nacimiento, setNacimiento] = useState('')
    const [imagenaleatoria, setImagenAleatoria] = useState('https://picsum.photos/200/299')

    const guardarUsuario = async (e) => {
        e.preventDefault()
        try{
            const data = await addDoc(collection(db,'usuarioszenhome'),{
                usuario: usuario,
                nombre: nombre,
                NID: NID,
                correo: correo,
                direccion: direccion,   
                telefono: telefono,
                nacimiento: nacimiento
            })
        }catch(error){
            console.log(error)
        }
    }
    return (
        <div className='container mt-5'>
            <h1 className="text-center">Zen Home</h1>
            <hr />
            <div className="row">
                <div className="col-8">
                    <h4 className="text-center">Lista de Usuarios</h4>
                    <ul className="list-group">
                        <li className="list-group-item">
                            Item temporal
                        </li>
                    </ul>
                </div>
                <div className="col-4">
                    <h4 className="text-center">Añadir Usuario</h4>
                    <form onSubmit={guardarUsuario}>
                        <input type="text" className="form-control mb-2" placeholder="Ingrese nombre de usuario" value={usuario} onChange={(e)=>setUsuario(e.target.value)}/>
                        <input type="text" className="form-control mb-2" placeholder="Ingrese nombre completo" value={nombre} onChange={(e)=>setNombre(e.target.value)}/>
                        <input type="text" className="form-control mb-2" placeholder="Ingrese NID" value={NID} onChange={(e)=>setNID(e.target.value)}/>
                        <input type="text" className="form-control mb-2" placeholder="Ingrese correo electrónico" value={correo} onChange={(e)=>setCorreo(e.target.value)}/>
                        <input type="text" className="form-control mb-2" placeholder="Ingrese una dirección" value={direccion} onChange={(e)=>setDireccion(e.target.value)}/>
                        <input type="text" className="form-control mb-2" placeholder="Ingrese numero de teléfono" value={telefono} onChange={(e)=>setTelefono(e.target.value)}/>
                        <input type="text" className="form-control mb-2" placeholder="Ingrese fecha de nacimiento" value={nacimiento} onChange={(e)=>setNacimiento(e.target.value)}/>
                        <div class="d-grid gap-2">
                            <button className='btn btn-dark btn-block'>Agregar</button>
                            <button className='btn btn-dark btn-block'>Cancelar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Formulario