import React from 'react'

const Formulario = () => {
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
                    <form>
                        <input type="text" className="form-control mb-2" placeholder="Ingrese nombre de usuario" />
                        <input type="text" className="form-control mb-2" placeholder="Ingrese nombre completo" />
                        <input type="text" className="form-control mb-2" placeholder="Ingrese NID" />
                        <input type="text" className="form-control mb-2" placeholder="Ingrese correo electrónico" />
                        <input type="text" className="form-control mb-2" placeholder="Ingrese una dirección" />
                        <input type="text" className="form-control mb-2" placeholder="Ingrese numero de teléfono" />
                        <input type="text" className="form-control mb-2" placeholder="Ingrese fecha de nacimiento" />
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