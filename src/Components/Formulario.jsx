import React, { useState, useEffect} from 'react'
import { db } from '../firebase'
import { collection, doc, addDoc, onSnapshot, deleteDoc, updateDoc} from 'firebase/firestore'

const Formulario = () => {

    const [id, setId] = useState(0)
    const [listaUsuarios, setListaUsuarios] = useState([])
    const [modoEdicion, setModoEdicion] = useState(false)

    const [usuario, setUsuario] = useState('')
    const [nombre, setNombre] = useState('')
    const [NID, setNID] = useState('')
    const [correo, setCorreo] = useState('')
    const [direccion, setDireccion] = useState('')
    const [telefono, setTelefono] = useState('')
    const [edad, setEdad] = useState('')
    const [imagenaleatoria, setImagenAleatoria] = useState('https://picsum.photos/200/299')

    useEffect(() => {
        const obtenerDatos = async () => {
            try {
                await onSnapshot(collection(db, 'usuarioszenhome'), (query) => {
                    setListaUsuarios(query.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
                })
            } catch (error) {
                console.log(error)
            }
        }
        obtenerDatos();
    }, [])

    const editar = item => {
        setUsuario(item.usuario)
        setNombre(item.nombre)
        setNID(item.NID)
        setCorreo(item.correo)
        setDireccion(item.direccion)
        setTelefono(item.telefono)
        setEdad(item.edad)
        setImagenAleatoria(item.imagenAleatoria)
        setId(item.id)
        setModoEdicion(true)
    }

    const editarUsuarios = async e => {
        e.preventDefault();
        try {
            const docRef = doc(db, 'usuarioszenhome', id);
            await updateDoc(docRef, {
                usuario: usuario,
                nombre: nombre,
                NID: NID,
                correo: correo,
                direccion: direccion,
                telefono: telefono,
                edad: edad,
                imagenaleatoria: imagenaleatoria
            })
            const nuevoArray = listaUsuarios.map(
                item => item.id === id ? {
                    id: id,
                    usuario: usuario,
                    nombre: nombre,
                    NID: NID,
                    correo: correo,
                    direccion: direccion,
                    telefono: telefono,
                    edad: edad,
                    imagenaleatoria: imagenaleatoria
                } : item
            )
            setListaUsuarios(nuevoArray)
            setUsuario('')
            setNombre('')
            setNID('')
            setCorreo('')
            setDireccion('')
            setTelefono('')
            setEdad('')
            setId('')
            setImagenAleatoria('')
        } catch (error) {
            console.log(error)
        }
    }

    const cancelar = () => {
        setModoEdicion(false)
        setUsuario('')
        setNombre('')
        setNID('')
        setCorreo('')
        setDireccion('')
        setTelefono('')
        setEdad('')
        setId('')
        setImagenAleatoria('')
    }

    const guardarUsuario = async (e) => {
        e.preventDefault()
        try {
            const data = await addDoc(collection(db, 'usuarioszenhome'), {
                usuario: usuario,
                nombre: nombre,
                NID: NID,
                correo: correo,
                direccion: direccion,
                telefono: telefono,
                edad: edad,
                imagenaleatoria: imagenaleatoria
            })
            setListaUsuarios(
                [...listaUsuarios, {
                    id: data.id,
                    usuario: usuario,
                    nombre: nombre,
                    NID: NID,
                    correo: correo,
                    direccion: direccion,
                    telefono: telefono,
                    edad: edad,
                    imagenaleatorialeatoria: imagenaleatoria
                }]
            )
            setUsuario('')
            setNombre('')
            setNID('')
            setCorreo('')
            setDireccion('')
            setTelefono('')
            setEdad('')
            setImagenAleatoria('https://picsum.photos/200/299')
        } catch (error) {
            console.log(error)
        }
    }

    const eliminar = async id => {
        try {
            await deleteDoc(doc(db, 'usuarioszenhome', id))
        } catch (error) {
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
                        {
                            listaUsuarios.map(item => (
                                <li className="list-group-item" key={item.id}>
                                    <span className="lead">{item.usuario}-{item.nombre}-{item.NID}-{item.correo}-{item.direccion}-{item.telefono}-{item.edad}</span>
                                    <button className='btn btn-danger btn-sm fload-end mx-2' onClick={() => eliminar(item.id)}>Eliminar</button>
                                    <button className="btn btn-info btn-sm fload-end" onClick={() => editar(item)}>Editar</button>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div className="col-4">
                    <h4 className="text-center">{modoEdicion ? 'Editar Usuario' : 'Añadir Usuario'}</h4>
                    <form onSubmit={modoEdicion ? editarUsuarios : guardarUsuario}>
                        <input type="text" className="form-control mb-2" placeholder="Ingrese nombre de usuario" value={usuario} onChange={(e) => setUsuario(e.target.value)} />
                        <input type="text" className="form-control mb-2" placeholder="Ingrese nombre completo" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                        <input type="text" className="form-control mb-2" placeholder="Ingrese NID" value={NID} onChange={(e) => setNID(e.target.value)} />
                        <input type="text" className="form-control mb-2" placeholder="Ingrese correo electrónico" value={correo} onChange={(e) => setCorreo(e.target.value)} />
                        <input type="text" className="form-control mb-2" placeholder="Ingrese una dirección" value={direccion} onChange={(e) => setDireccion(e.target.value)} />
                        <input type="text" className="form-control mb-2" placeholder="Ingrese numero de teléfono" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
                        <input type="text" className="form-control mb-2" placeholder="Ingrese su edad" value={edad} onChange={(e) => setEdad(e.target.value)} />
                        <div class="d-grid gap-2">
                            {
                                modoEdicion ? (
                                    <>
                                        <button className="btn btn-info col-12" on='submit'>Editar</button>
                                        <button className='btn btn-dark btn-block' onClick={() => cancelar()}>Cancelar</button>
                                    </>
                                ) :
                                    <button className='btn btn-dark btn-block'>Agregar</button>
                            }
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Formulario