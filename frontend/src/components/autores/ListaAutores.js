import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBook } from 'react-icons/fa';
import { autorService } from '../../services/autorService';
import './ListaAutores.css';

const ListaAutores = () => {
  const navigate = useNavigate();
  
  const handleVerLibrosClick = (autor) => {
    // Usar autor._id o autor.id, lo que esté disponible
    const autorId = autor._id || autor.id;
    
    if (!autorId) {
      console.error('No se proporcionó un ID de autor válido:', autor);
      return;
    }
    
    console.log('Navegando a libros del autor con ID:', autorId);
    navigate(`/autores/libros/${autorId}`);
  };
  const [autores, setAutores] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const autorAEliminarId = useRef(null);
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
  const [autorAEditar, setAutorAEditar] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [formulario, setFormulario] = useState({
    nombre: '',
    nacionalidad: '',
    fecha_nacimiento: ''
  });
  const [mostrarExito, setMostrarExito] = useState(false);
  const [mensajeExito, setMensajeExito] = useState('');
  const [erroresValidacion, setErroresValidacion] = useState({});
  const [mostrarFormularioNuevo, setMostrarFormularioNuevo] = useState(false);

  const cargarAutores = async () => {
    try {
      setCargando(true);
      setError(null);
      const datos = await autorService.obtenerAutores();
      setAutores(datos);
    } catch (err) {
      console.error('Error al cargar los autores:', err);
      setError('No se pudieron cargar los autores. Por favor, intente nuevamente.');
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarAutores();
  }, []);

  // Función para formatear la fecha de nacimiento
  const formatearFecha = (fechaString) => {
    if (!fechaString) return 'Fecha desconocida';
    
    try {
      const fecha = new Date(fechaString);
      if (isNaN(fecha.getTime())) return 'Fecha inválida';
      
      const opciones = { year: 'numeric', month: 'long', day: 'numeric' };
      return fecha.toLocaleDateString('es-ES', opciones);
    } catch (error) {
      console.error('Error al formatear la fecha:', error);
      return 'Fecha inválida';
    }
  };

  const handleNuevoAutorClick = () => {
    setAutorAEditar(null);
    setFormulario({
      nombre: '',
      nacionalidad: '',
      fecha_nacimiento: ''
    });
    setError(null);
    setErroresValidacion({});
    setMostrarFormularioNuevo(true);
  };

  const handleSubmitNuevoAutor = async (e) => {
    e.preventDefault();
    
    // Limpiar errores previos
    setError(null);
    setErroresValidacion({});
    
    try {
      // Preparar los datos para enviar
      const datosNuevoAutor = {
        nombre: formulario.nombre ? formulario.nombre.trim() : '',
        nacionalidad: formulario.nacionalidad ? formulario.nacionalidad.trim() : '',
        fecha_nacimiento: formulario.fecha_nacimiento || null
      };
      
      console.log('Enviando datos para nuevo autor:', datosNuevoAutor);
      
      // Enviar los datos al backend
      await autorService.crearAutor(datosNuevoAutor);
      
      // Si llegamos aquí, el autor se creó exitosamente
      setMostrarFormularioNuevo(false);
      setMensajeExito('Autor creado exitosamente');
      setMostrarExito(true);
      
      // Recargar la lista de autores
      await cargarAutores();
      
    } catch (error) {
      console.error('Error al crear el autor:', error);
      
      // Si el error es un objeto con mensajes de validación
      if (error && typeof error === 'object' && !(error instanceof Error)) {
        console.log('Errores de validación recibidos del servidor:', error);
        setErroresValidacion(error);
      }
      // Si es un error estándar con mensaje
      else if (error && error.message) {
        setError(`Error: ${error.message}`);
      }
      // Error genérico
      else {
        setError('Ocurrió un error inesperado al crear el autor. Por favor, intente nuevamente.');
      }
    }
  };

  const handleEliminarClick = (autor) => {
    console.log('Autor recibido para eliminar:', autor); // Depuración
    
    // Verificar si el autor es un objeto y tiene _id o id
    if (autor && (autor._id || autor.id)) {
      // Usar _id si existe, de lo contrario usar id
      const autorId = autor._id || autor.id;
      console.log('ID del autor a eliminar:', autorId); // Depuración
      
      // Asignar el ID a la referencia
      autorAEliminarId.current = autorId;
      
      // Mostrar el modal de confirmación
      setMostrarConfirmacion(true);
    } else {
      console.error('No se pudo identificar el autor a eliminar. Objeto autor:', autor);
      setError('No se pudo identificar el autor a eliminar. Por favor, recargue la página e intente nuevamente.');
    }
  };

  const confirmarEliminar = async () => {
    const idAEliminar = autorAEliminarId.current;
    
    if (!idAEliminar) {
      setError('No se pudo identificar el autor a eliminar. Por favor, intente nuevamente.');
      return;
    }
    
    try {
      // Eliminar el autor
      await autorService.eliminarAutor(idAEliminar);
      
      // Si llegamos aquí, la eliminación fue exitosa
      setAutores(prevAutores => prevAutores.filter(a => a._id !== idAEliminar));
      setMostrarConfirmacion(false);
      setMensajeExito('Autor eliminado exitosamente.');
      setMostrarExito(true);
      
      // Recargar la lista completa de autores para asegurar consistencia
      try {
        const datosActualizados = await autorService.obtenerAutores();
        setAutores(datosActualizados);
      } catch (error) {
        console.error('Error al actualizar la lista de autores:', error);
        // No mostramos error al usuario ya que la eliminación fue exitosa
      }
    } catch (error) {
      console.error('Error al eliminar el autor:', {
        message: error.message,
        error: error,
        stack: error.stack
      });
      setError(error.message || 'No se pudo eliminar el autor. Por favor, intente nuevamente.');
    }
  };

  const handleEditarClick = (autor) => {
    console.log('Editando autor:', JSON.stringify(autor, null, 2)); // Depuración detallada
    
    // Verificar si el objeto autor es válido
    if (!autor) {
      console.error('Error: El objeto autor es undefined o null');
      setError('No se pudo cargar la información del autor. El objeto es inválido.');
      return;
    }
    
    // Determinar el ID del autor (puede venir como _id o id)
    const autorId = autor._id || autor.id;
    
    // Verificar si el ID existe y es válido
    if (!autorId) {
      console.error('Error: El autor no tiene un ID válido:', autor);
      setError('No se pudo identificar al autor. Falta el ID.');
      return;
    }
    
    try {
      // Asegurarse de que el autor y su ID se guarden correctamente
      const autorActualizado = {
        ...autor,
        _id: autorId // Usar el ID normalizado
      };
      
      // Eliminar la propiedad 'id' si existe para evitar duplicados
      if (autorActualizado.id) {
        delete autorActualizado.id;
      }
      
      console.log('Guardando autor en estado:', JSON.stringify(autorActualizado, null, 2));
      setAutorAEditar(autorActualizado);
      
      // Configurar el formulario con los datos del autor
      const datosFormulario = {
        nombre: autor.nombre || '',
        nacionalidad: autor.nacionalidad || '',
        fecha_nacimiento: autor.fecha_nacimiento ? new Date(autor.fecha_nacimiento).toISOString().split('T')[0] : ''
      };
      
      console.log('Configurando formulario con datos:', datosFormulario);
      setFormulario(datosFormulario);
      
      // Reiniciar estados de error
      setError(null);
      setErroresValidacion({});
      
      // Mostrar el formulario
      setMostrarFormulario(true);
      
    } catch (error) {
      console.error('Error al preparar el formulario de edición:', error);
      setError('Ocurrió un error al preparar el formulario de edición. Por favor, intente nuevamente.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormulario(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Limpiar errores previos
    setError(null);
    setErroresValidacion({});
    
    try {
      // Verificar que tengamos un ID de autor válido
      if (!autorAEditar || !autorAEditar._id) {
        throw new Error('No se pudo identificar el autor a actualizar. Por favor, recargue la página e intente nuevamente.');
      }
      
      // Preparar los datos para enviar (sin validación en el cliente)
      const datosActualizar = {
        nombre: formulario.nombre ? formulario.nombre.trim() : '',
        nacionalidad: formulario.nacionalidad ? formulario.nacionalidad.trim() : '',
        fecha_nacimiento: formulario.fecha_nacimiento || null
      };
      
      console.log('Enviando datos al servidor:', datosActualizar);
      
      // Enviar los datos al backend
      const respuesta = await autorService.actualizarAutor(autorAEditar._id, datosActualizar);
      
      console.log('Respuesta del servidor:', respuesta);
      
      if (respuesta && respuesta.success) {
        // Actualizar la lista de autores
        await cargarAutores();
        
        // Cerrar el formulario
        setMostrarFormulario(false);
        
        // Mostrar mensaje de éxito
        setMensajeExito(respuesta.message || 'Autor actualizado exitosamente');
        setMostrarExito(true);
      } else {
        throw new Error(respuesta?.error || 'La actualización no fue exitosa');
      }
      
    } catch (error) {
      console.error('Error al actualizar el autor:', error);
      
      // Si el error es un objeto con mensajes de validación (viene del servicio)
      if (error && typeof error === 'object' && !(error instanceof Error)) {
        console.log('Errores de validación recibidos del servidor:', JSON.stringify(error, null, 2));
        
        // Mapear los errores al formato esperado por el formulario
        const erroresMapeados = {};
        
        // Mapear los errores del servidor a los nombres de los campos del formulario
        console.log('Mapeando errores...');
        
        // Iterar sobre las claves del objeto de error para ver qué campos tienen errores
        Object.keys(error).forEach(key => {
          console.log(`Campo con error: ${key}, Mensaje: ${error[key]}`);
          erroresMapeados[key] = error[key];
        });
        
        console.log('Errores mapeados:', erroresMapeados);
        
        // Si hay errores mapeados, mostrarlos
        if (Object.keys(erroresMapeados).length > 0) {
          // Limpiar errores previos
          setErroresValidacion({});
          // Forzar una actualización del estado
          setTimeout(() => {
            setErroresValidacion(erroresMapeados);
          }, 0);
        } else {
          // Si no se pudieron mapear los errores, mostrarlos como un mensaje general
          setError('Error de validación en el formulario');
        }
      }
      // Si es un error estándar con mensaje
      else if (error && error.message) {
        setError(`Error: ${error.message}`);
      }
      // Error genérico
      else {
        setError('Ocurrió un error inesperado. Por favor, intente nuevamente.');
      }
    }
  };

  if (cargando) {
    return (
      <div className="cargando-container">
        <div className="spinner"></div>
        <p>Cargando autores...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p className="error-mensaje">{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="btn-reintentar"
        >
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className="lista-autores-container">
      <div className="lista-header">
        <h2>Autores</h2>
        <button 
          className="btn-nuevo"
          onClick={handleNuevoAutorClick}
        >
          + Nuevo Autor
        </button>
      </div>
      
      {/* Modal de confirmación de eliminación */}
      {mostrarConfirmacion && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Confirmar eliminación</h3>
            <p>¿Está seguro de que desea eliminar este autor?</p>
            
            <div className="advertencia">
              <p><strong>Advertencia:</strong> Esta acción también eliminará este autor de todos los libros que lo tengan asociado.</p>
            </div>
            
            <div className="modal-acciones">
              <button 
                onClick={() => setMostrarConfirmacion(false)} 
                className="btn-cancelar"
              >
                Cancelar
              </button>
              <button 
                onClick={confirmarEliminar} 
                className="btn-confirmar"
              >
                Eliminar autor
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de formulario de nuevo autor */}
      {mostrarFormularioNuevo && (
        <div className="modal-overlay">
          <div className="modal formulario-edicion">
            <h3>Nuevo Autor</h3>
            {error && <p className="error-mensaje">{error}</p>}
            <form onSubmit={handleSubmitNuevoAutor}>
              <div className="form-group">
                <label>Nombre *</label>
                <input
                  type="text"
                  name="nombre"
                  value={formulario.nombre}
                  onChange={handleInputChange}
                  className={erroresValidacion.nombre ? 'input-error' : ''}
                />
                {erroresValidacion.nombre && (
                  <span className="error-mensaje">{erroresValidacion.nombre}</span>
                )}
              </div>
              
              <div className="form-group">
                <label>Nacionalidad</label>
                <input
                  type="text"
                  name="nacionalidad"
                  value={formulario.nacionalidad}
                  onChange={handleInputChange}
                  className={erroresValidacion.nacionalidad ? 'input-error' : ''}
                />
                {erroresValidacion.nacionalidad && (
                  <span className="error-mensaje">{erroresValidacion.nacionalidad}</span>
                )}
              </div>
              
              <div className="form-group fecha-container">
                <label>Fecha de Nacimiento</label>
                <input
                  type="date"
                  name="fecha_nacimiento"
                  value={formulario.fecha_nacimiento}
                  onChange={handleInputChange}
                  className={erroresValidacion.fecha_nacimiento ? 'input-error' : ''}
                />
                {erroresValidacion.fecha_nacimiento && (
                  <span className="error-mensaje">{erroresValidacion.fecha_nacimiento}</span>
                )}
              </div>
              
              <div className="form-acciones">
                <button 
                  type="button" 
                  onClick={() => setMostrarFormularioNuevo(false)}
                  className="btn-cancelar"
                >
                  Cancelar
                </button>
                <button type="submit" className="btn-guardar">
                  Crear Autor
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* Modal de formulario de edición */}
      {mostrarFormulario && (
        <div className="modal-overlay">
          <div className="modal formulario-edicion">
            <h3>Editar Autor</h3>
            {error && <p className="error-mensaje">{error}</p>}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Nombre</label>
                <input
                  type="text"
                  name="nombre"
                  value={formulario.nombre}
                  onChange={handleInputChange}
                  className={erroresValidacion.nombre ? 'input-error' : ''}
                />
                {erroresValidacion.nombre && (
                  <span className="error-mensaje">{erroresValidacion.nombre}</span>
                )}
              </div>
              
              <div className="form-group">
                <label>Nacionalidad</label>
                <input
                  type="text"
                  name="nacionalidad"
                  value={formulario.nacionalidad}
                  onChange={handleInputChange}
                  className={erroresValidacion.nacionalidad ? 'input-error' : ''}
                />
                {erroresValidacion.nacionalidad && (
                  <span className="error-mensaje">{erroresValidacion.nacionalidad}</span>
                )}
              </div>
              
              <div className="form-group fecha-container">
                <label>Fecha de Nacimiento</label>
                <input
                  type="date"
                  name="fecha_nacimiento"
                  value={formulario.fecha_nacimiento}
                  onChange={handleInputChange}
                  className={erroresValidacion.fecha_nacimiento ? 'input-error' : ''}
                />
                {erroresValidacion.fecha_nacimiento && (
                  <span className="error-mensaje">{erroresValidacion.fecha_nacimiento}</span>
                )}
              </div>
              
              <div className="form-acciones">
                <button 
                  type="button" 
                  onClick={() => setMostrarFormulario(false)}
                  className="btn-cancelar"
                >
                  Cancelar
                </button>
                <button type="submit" className="btn-guardar">
                  Guardar Cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de éxito */}
      {mostrarExito && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>¡Éxito!</h3>
            <p>{mensajeExito}</p>
            <button 
              onClick={() => setMostrarExito(false)}
              className="btn-aceptar"
            >
              Aceptar
            </button>
          </div>
        </div>
      )}
      
      <div className="autores-grid">
        {autores.length > 0 ? (
          autores.map((autor) => (
            <div key={autor._id} className="autor-card">
              <div className="autor-avatar">
                {autor.nombre ? autor.nombre.charAt(0).toUpperCase() : 'A'}
              </div>
              
              <div className="autor-info">
                <h3 className="autor-nombre">{autor.nombre || 'Nombre no disponible'}</h3>
                
                <div className="autor-detalle">
                  <div className="detalle-item">
                    <span className="detalle-etiqueta">Nacionalidad:</span>
                    <span className="detalle-valor">{autor.nacionalidad || 'No especificada'}</span>
                  </div>
                  
                  <div className="detalle-item">
                    <span className="detalle-etiqueta">Nacimiento:</span>
                    <span className="detalle-valor">{formatearFecha(autor.fecha_nacimiento)}</span>
                  </div>
                </div>
                
                {autor.biografia && (
                  <div className="autor-biografia">
                    <p>{autor.biografia}</p>
                  </div>
                )}
                
                <div className="autor-acciones">
                  <div className="acciones-izquierda">
                    <button 
                      className="btn-ver-libros"
                      onClick={() => handleVerLibrosClick(autor)}
                      title="Ver libros de este autor"
                    >
                      <FaBook />
                    </button>
                  </div>
                  <div className="acciones-derecha">
                    <button 
                      className="btn-actualizar"
                      onClick={() => handleEditarClick(autor)}
                    >
                      Actualizar
                    </button>
                    <button 
                      className="btn-eliminar"
                      onClick={() => handleEliminarClick(autor)}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
                

              </div>
            </div>
          ))
        ) : (
          <div className="sin-datos">
            No hay autores registrados
          </div>
        )}
      </div>
    </div>
  );
};

export default ListaAutores;
