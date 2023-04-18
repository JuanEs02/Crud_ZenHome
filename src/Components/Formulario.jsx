import React, { useState, useEffect } from 'react'
import { db } from '../firebase'
import { collection, doc, addDoc, onSnapshot, deleteDoc, updateDoc } from 'firebase/firestore'

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

    function todoRellenado() {
        if (!usuario.trim()) {
            alert('Ingrese un usuario')
            return false;
        }

        if (!nombre.trim()) {
            alert('Ingrese su nombre')
            return false;
        }

        if (!NID.trim()) {
            alert('Ingrese un NID (tiene maximo 9 carácteres)')
            return false;
        }

        if (!correo.trim()) {
            alert('ingrese su correo electronico')
            return false;
        }

        if (!direccion.trim()) {
            alert('Ingrese una dirrecion')
            return false;
        }

        if (!telefono.trim()) {
            alert('Ingrese su numero de telefono')
            return false;
        }

        if (!edad.trim()) {
            alert('Ingrese su edad')
            return false;
        }

        return true;
    }

    function validarUsuario() {
        if (usuario.length > 8 || usuario.length < 5) {
            alert("El usuario deber ser máximo de 8 caracteres y mínimo de 5")
            return false;
        }
        return true;
    }

    function validar_edad() {
        if (isNaN(edad)) {
            alert("Edad inválida")
            return false;
        } else if (edad < 18) {
            alert("Debes ser mayor de edad")
            return false;
        }
        return true;
    }

    function validar_nid() {
        if (isNaN(NID)) {
            alert("NID inválida")
            return false;
        } else if (NID.length < 9 || NID.length > 9) {
            alert("El NID es de 9 caracteres")
            return false;
        }
        return true;
    }

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
        setId(item.id)
        setModoEdicion(true)
    }

    const editarUsuarios = async e => {
        e.preventDefault();

        if (!todoRellenado(usuario, nombre, NID, correo, direccion, telefono, edad)
            || !validarUsuario(usuario) || !validar_edad(edad) || !validar_nid(NID)) {
            return;
        }

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
                } : item
            )

            setListaUsuarios(nuevoArray)
            setModoEdicion(false)
            setUsuario('')
            setNombre('')
            setNID('')
            setCorreo('')
            setDireccion('')
            setTelefono('')
            setEdad('')
            setId('')
        } catch (error) {
            console.log(error)
        }
        window.location.reload();
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

        if (!todoRellenado(usuario, nombre, NID, correo, direccion, telefono, edad)
            || !validarUsuario(usuario) || !validar_edad(edad) || !validar_nid(NID)) {
            return;
        }
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
        window.location.reload();
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
                                    <span className="lead">
                                        Usuario: {item.usuario}<br>
                                        </br>Nombre: {item.nombre}<br>
                                        </br>NID: {item.NID}<br>
                                        </br>Correo: {item.correo}<br>
                                        </br>Dirección: {item.direccion}<br>
                                        </br>Celular: {item.telefono}<br>
                                        </br>Edad: {item.edad}<br>
                                        </br>
                                        <img className="img-fluid img-thumbnail rounded text-center" src={item.imagenaleatoria} alt="" /><br></br><br></br>
                                    </span>
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
                        <div className="d-grid gap-2">
                            {
                                modoEdicion ? (
                                    <>
                                        <button className="btn btn-info col-12 m-1" on='submit'>Editar</button>
                                        <button className='btn btn-dark btn-block m-1' onClick={() => cancelar()}>Cancelar</button>
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