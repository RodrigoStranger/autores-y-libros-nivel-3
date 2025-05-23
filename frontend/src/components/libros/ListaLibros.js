import React, { useEffect, useState } from 'react';
import { libroService } from '../../services/libroService';
import { autorService } from '../../services/autorService';
import { generoService } from '../../services/generoService';
import { getGenreColor } from '../../styles/colors';
import { FaSpinner } from 'react-icons/fa';
import './ListaLibros.css';

const ListaLibros = () => {
  const [libros, setLibros] = useState([]);
  const [mostrandoAgotados, setMostrandoAgotados] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [reintentar, setReintentar] = useState(false);
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
  const [libroAEliminar, setLibroAEliminar] = useState(null);
  const [eliminando, setEliminando] = useState(false);
  const [mensajeExito, setMensajeExito] = useState('');
  const [mostrarExito, setMostrarExito] = useState(false);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [libroAEditar, setLibroAEditar] = useState(null);
  const [generos, setGeneros] = useState([]);
  const [autores, setAutores] = useState([]);
  const [nuevoGenero, setNuevoGenero] = useState('');
  const [nuevoAutor, setNuevoAutor] = useState('');
  const [erroresValidacion, setErroresValidacion] = useState({});
  const [formulario, setFormulario] = useState({
    titulo: '',
    fecha_publicacion: '',
    paginas: '',
    sinopsis: '',
    disponibilidad: true,
    generos: [],
    autores: []
  });

  useEffect(() => {
    const cargarLibros = async () => {
      try {
        setCargando(true);
        setError(null);
        const datos = mostrandoAgotados 
          ? await libroService.obtenerLibrosNoDisponibles()
          : await libroService.obtenerLibros();
        setLibros(datos);
      } catch (err) {
        console.error('Error al cargar los libros:', err);
        setError(err.message || 'No se pudieron cargar los libros. Por favor, intente nuevamente.');
      } finally {
        setCargando(false);
      }
    };

    cargarLibros();
  }, [reintentar, mostrandoAgotados]);

  // Cargar géneros y autores al montar el componente
  const cargarDatos = async () => {
    try {
      console.log('Cargando géneros y autores...');
      const [generosData, autoresData] = await Promise.all([
        generoService.obtenerGeneros(),
        autorService.obtenerAutores()
      ]);
      
      console.log('Datos de géneros:', generosData);
      console.log('Datos de autores:', autoresData);
      
      // Asegurarse de que son arrays
      const generos = Array.isArray(generosData) ? generosData : [];
      const autores = Array.isArray(autoresData) ? autoresData : [];
      
      console.log('Géneros procesados:', generos);
      console.log('Autores procesados:', autores);
      
      setGeneros(generos);
      setAutores(autores);
      
      return { generos, autores };
    } catch (error) {
      console.error('Error al cargar datos:', error);
      setGeneros([]);
      setAutores([]);
      return { generos: [], autores: [] };
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  // Función para manejar cambios en los inputs del formulario
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormulario(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Función para abrir el formulario de creación
  const abrirFormularioCreacion = () => {
    setLibroAEditar(null);
    setFormulario({
      titulo: '',
      fecha_publicacion: '',
      paginas: '',
      sinopsis: '',
      disponibilidad: true,
      generos: [],
      autores: []
    });
    setNuevoGenero('');
    setNuevoAutor('');
    setErroresValidacion({});
    
    // Asegurarse de que los géneros y autores estén cargados
    if (generos.length === 0 || autores.length === 0) {
      cargarDatos().then(() => setMostrarFormulario(true));
    } else {
      setMostrarFormulario(true);
    }
  };

  // Función para abrir el formulario de edición
  const abrirFormularioEdicion = async (libro) => {
    try {
      // Asegurarse de que los géneros y autores estén cargados
      await cargarDatos();
      
      setLibroAEditar(libro);
      setFormulario({
        titulo: libro.titulo || '',
        fecha_publicacion: libro.fecha_publicacion ? libro.fecha_publicacion.split('T')[0] : '',
        paginas: libro.paginas || '',
        sinopsis: libro.sinopsis || '',
        disponibilidad: libro.disponibilidad !== undefined ? libro.disponibilidad : true,
        generos: libro.generos ? [...libro.generos] : [],
        autores: libro.autores ? [...libro.autores] : []
      });
      setMostrarFormulario(true);
    } catch (error) {
      console.error('Error al cargar datos para edición:', error);
      setError('No se pudieron cargar los datos necesarios para editar el libro');
    }
  };

  // Función para manejar la edición de un libro
  const handleEditarClick = (libro) => {
    abrirFormularioEdicion(libro);
  };

  // Función para agregar un nuevo género
  const agregarGenero = () => {
    if (nuevoGenero) {
      // Obtener el nombre del género seleccionado
      const generoSeleccionado = generos.find(g => (g._id === nuevoGenero || g.id === nuevoGenero));
      const nombreGenero = generoSeleccionado ? (generoSeleccionado.nombre || generoSeleccionado.name) : nuevoGenero;
      
      if (nombreGenero && !formulario.generos.includes(nombreGenero)) {
        setFormulario(prev => ({
          ...prev,
          generos: [...prev.generos, nombreGenero]
        }));
        setNuevoGenero('');
      }
    }
  };

  // Función para eliminar un género
  const eliminarGenero = (generoAEliminar) => {
    setFormulario(prev => ({
      ...prev,
      generos: prev.generos.filter(g => g !== generoAEliminar)
    }));
  };

  // Función para agregar un nuevo autor
  const agregarAutor = () => {
    if (nuevoAutor) {
      // Obtener el nombre del autor seleccionado
      const autorSeleccionado = autores.find(a => (a._id === nuevoAutor || a.id === nuevoAutor));
      const nombreAutor = autorSeleccionado ? 
        (autorSeleccionado.nombre || autorSeleccionado.name || 'Sin nombre') : 
        nuevoAutor;
      
      if (nombreAutor && !formulario.autores.includes(nombreAutor)) {
        setFormulario(prev => ({
          ...prev,
          autores: [...prev.autores, nombreAutor]
        }));
        setNuevoAutor('');
      }
    }
  };

  // Función para eliminar un autor
  const eliminarAutor = (autorAEliminar) => {
    setFormulario(prev => ({
      ...prev,
      autores: prev.autores.filter(a => a !== autorAEliminar)
    }));
  };



  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Limpiar errores previos
    setErroresValidacion({});
    setError(null);
    
    try {
      // Crear un objeto con los datos del formulario
      const datosLibro = {
        titulo: formulario.titulo,
        fecha_publicacion: formulario.fecha_publicacion,
        paginas: formulario.paginas,
        sinopsis: formulario.sinopsis,
        disponibilidad: formulario.disponibilidad,
        generos: formulario.generos,
        autores: formulario.autores
      };
      
      let respuesta;
      if (libroAEditar) {
        // Actualizar libro existente
        respuesta = await libroService.actualizarLibro(libroAEditar._id, datosLibro);
        setMensajeExito('Libro actualizado exitosamente');
      } else {
        // Crear nuevo libro
        respuesta = await libroService.crearLibro(datosLibro);
        setMensajeExito('Libro creado exitosamente');
      }
      
      // Si la respuesta indica éxito, cerrar el formulario y actualizar la lista
      if (respuesta && respuesta.success) {
        setMostrarFormulario(false);
        setReintentar(prev => !prev);
        setMostrarExito(true);
      }
    } catch (error) {
      console.error('Error al guardar el libro:', error);
      
      // Si el error es un objeto con mensajes de validación
      if (typeof error === 'object' && error !== null) {
        setErroresValidacion(error);
      } 
      // Si hay un mensaje de error
      else if (error.message) {
        setError(error.message);
      } 
      // Error genérico
      else {
        setError('Error al procesar la solicitud. Por favor, intente nuevamente.');
      }
    }
  };

  // Función para formatear la fecha
  const formatearFecha = (fechaString) => {
    if (!fechaString) return 'Fecha desconocida';
    
    try {
      const fecha = new Date(fechaString);
      if (isNaN(fecha.getTime())) return 'Fecha inválida';
      
      return fecha.toLocaleDateString('es-ES', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    } catch (error) {
      console.error('Error al formatear la fecha:', error);
      return 'Fecha inválida';
    }
  };

  // Función para manejar la confirmación de eliminación
  const confirmarEliminar = (libro) => {
    setLibroAEliminar(libro);
    setMostrarConfirmacion(true);
  };

  // Función para cancelar la eliminación
  const cancelarEliminar = () => {
    setMostrarConfirmacion(false);
    setLibroAEliminar(null);
  };

  // Función para eliminar un libro
  const eliminarLibro = async () => {
    if (!libroAEliminar) return;
    
    try {
      setEliminando(true);
      const response = await libroService.eliminarLibro(libroAEliminar._id);
      
      // Actualizar la lista de libros eliminando el libro eliminado
      setLibros(prevLibros => prevLibros.filter(libro => libro._id !== libroAEliminar._id));
      
      setMostrarConfirmacion(false);
      
      // Mostrar el mensaje de éxito del backend o uno por defecto
      setMensajeExito(response?.message || 'Libro eliminado exitosamente');
      setMostrarExito(true);
      
    } catch (error) {
      console.error('Error al eliminar el libro:', error);
      setError(error.message || 'No se pudo eliminar el libro. Intente nuevamente.');
    } finally {
      setEliminando(false);
      setLibroAEliminar(null);
    }
  };

  if (cargando) {
    return (
      <div className="cargando-container">
        <div className="spinner"></div>
        <p>Cargando libros...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p className="error-mensaje">{error}</p>
        <button 
          onClick={() => setReintentar(!reintentar)} 
          className="btn-reintentar"
        >
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className="lista-libros">
      <div className="encabezado-acciones">
        <h2>{mostrandoAgotados ? 'Libros Agotados' : 'Lista de Libros'}</h2>
        <div className="botones-accion">
          <button 
            className="btn-secundario" 
            onClick={() => setMostrandoAgotados(!mostrandoAgotados)}
          >
            {mostrandoAgotados ? 'Ver Todos los Libros' : 'Ver Libros Agotados'}
          </button>
          <button 
            className="btn-nuevo" 
            onClick={abrirFormularioCreacion}
            disabled={mostrandoAgotados}
            title={mostrandoAgotados ? 'No se pueden agregar libros desde la vista de agotados' : ''}
          >
            <span>+</span> Crear Libro
          </button>
        </div>
      </div>
      {/* Modal de éxito */}
      {mostrarExito && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>¡Operación Exitosa!</h3>
            <p>{mensajeExito}</p>
            <div className="modal-acciones">
              <button 
                className="btn-aceptar"
                onClick={() => setMostrarExito(false)}
              >
                Aceptar
              </button>
            </div>
          </div>
        </div>
      )}
      
      {mostrarConfirmacion && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Confirmar eliminación</h3>
            <p>¿Estás seguro de que deseas eliminar el libro "{libroAEliminar?.titulo}"?</p>
            <p className="advertencia">
              <strong>Advertencia:</strong> Esta acción eliminará permanentemente el libro y no se podrá deshacer.
            </p>
            <div className="modal-acciones">
              <button 
                onClick={cancelarEliminar} 
                className="btn-cancelar"
                disabled={eliminando}
              >
                Cancelar
              </button>
              <button 
                onClick={eliminarLibro} 
                className="btn-confirmar"
                disabled={eliminando}
              >
                {eliminando ? (
                  <>
                    <FaSpinner className="spinner" /> Eliminando...
                  </>
                ) : (
                  'Eliminar'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
      
      <div className="libros-grid">
        {libros.length > 0 ? (
          libros.map((libro) => (
            <div key={libro._id} className="libro-card">
              <div className="libro-cabecera">
                <h3 className="libro-titulo">{libro.titulo}</h3>
                <div className="libro-meta">
                  <span className="fecha">{formatearFecha(libro.fecha_publicacion)}</span>
                  <span className="paginas">{libro.paginas} págs.</span>
                </div>
              </div>
              
              <div className="libro-autores">
                <h4>Autores</h4>
                <div className="autores-lista">
                  {libro.autores && libro.autores.length > 0 ? (
                    libro.autores.map((autor, idx) => (
                      <span key={`autor-${idx}`} className="autor">
                        {autor}
                      </span>
                    ))
                  ) : (
                    <span className="sin-autor">Sin autores</span>
                  )}
                </div>
              </div>
              
              <div className="libro-generos">
                <h4>Géneros</h4>
                <div className="generos-lista">
                  {libro.generos && libro.generos.length > 0 ? (
                    libro.generos.map((genero, idx) => {
                      // Si el género es un objeto, extraer el nombre, de lo contrario usar el valor directo
                      const nombreGenero = genero && typeof genero === 'object' ? 
                        (genero.nombre || genero.name || 'Sin nombre') : 
                        genero;
                        
                      return (
                        <span 
                          key={`genero-${idx}`} 
                          className="genero"
                          style={{
                            '--genre-color': getGenreColor(nombreGenero),
                            '--genre-color-light': `${getGenreColor(nombreGenero)}33`
                          }}
                        >
                          {nombreGenero}
                        </span>
                      );
                    })
                  ) : (
                    <span className="sin-genero">Sin géneros</span>
                  )}
                </div>
              </div>
              
              <div className="libro-sinopsis">
                <h4>Sinopsis</h4>
                <p>{libro.sinopsis}</p>
              </div>
              
              <div className="libro-acciones">
                <button 
                  onClick={() => handleEditarClick(libro)}
                  className="btn-editar"
                  title="Actualizar libro"
                >
                  Actualizar
                </button>
                <button 
                  onClick={() => confirmarEliminar(libro)}
                  className="btn-eliminar"
                  title="Eliminar libro"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="sin-datos">
            No hay libros registrados
          </div>
        )}
      </div>

      {/* Modal de formulario de libro */}
      {mostrarFormulario && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>{libroAEditar ? 'Editar Libro' : 'Nuevo Libro'}</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Título:</label>
                <input
                  type="text"
                  name="titulo"
                  value={formulario.titulo}
                  onChange={handleInputChange}
                  className={`form-control ${erroresValidacion.titulo ? 'input-error' : ''}`}
                />
                {erroresValidacion.titulo && (
                  <div className="mensaje-error">{erroresValidacion.titulo}</div>
                )}
              </div>

              <div className="form-group">
                <label>Fecha de publicación:</label>
                <input
                  type="date"
                  name="fecha_publicacion"
                  value={formulario.fecha_publicacion}
                  onChange={handleInputChange}
                  className={`form-control ${erroresValidacion.fecha_publicacion ? 'input-error' : ''}`}
                />
                {erroresValidacion.fecha_publicacion && (
                  <div className="mensaje-error">{erroresValidacion.fecha_publicacion}</div>
                )}
              </div>

              <div className="form-group">
                <label>Páginas:</label>
                <input
                  type="number"
                  name="paginas"
                  value={formulario.paginas}
                  onChange={handleInputChange}
                  min="1"
                  className={`form-control ${erroresValidacion.paginas ? 'input-error' : ''}`}
                />
                {erroresValidacion.paginas && (
                  <div className="mensaje-error">{erroresValidacion.paginas}</div>
                )}
              </div>

              <div className="form-group">
                <label>
                  <input
                    type="checkbox"
                    name="disponibilidad"
                    checked={formulario.disponibilidad}
                    onChange={handleInputChange}
                  />
                  {' '}Disponible
                </label>
              </div>

              <div className="form-group">
                <label>Géneros:</label>
                <div className="input-con-boton">
                  <select
                    value={nuevoGenero}
                    onChange={(e) => setNuevoGenero(e.target.value)}
                    className={`select-con-boton ${erroresValidacion.generos ? 'input-error' : ''}`}
                  >
                    <option value="">Selecciona un género</option>
                    {Array.isArray(generos) && generos.length > 0 ? (
                      generos.map((genero) => {
                        const generoId = genero._id || genero.id;
                        const generoNombre = genero.nombre || genero.name || 'Sin nombre';
                        return (
                          <option key={generoId} value={generoId}>
                            {generoNombre}
                          </option>
                        );
                      })
                    ) : (
                      <option disabled>No hay géneros disponibles</option>
                    )}
                  </select>
                  <button
                    type="button"
                    onClick={agregarGenero}
                    className="btn-agregar"
                    disabled={!nuevoGenero}
                  >
                    + Agregar
                  </button>
                </div>
                {erroresValidacion.generos && (
                  <div className="mensaje-error">{erroresValidacion.generos}</div>
                )}
                <div className="lista-etiquetas">
                  {formulario.generos.map((generoNombre, index) => (
                    <span key={index} className="etiqueta">
                      {generoNombre}
                      <button
                        type="button"
                        onClick={() => eliminarGenero(generoNombre)}
                        className="btn-eliminar-etiqueta"
                      >
                        &times;
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label>Autores:</label>
                <div className="input-con-boton">
                  <select
                    value={nuevoAutor}
                    onChange={(e) => setNuevoAutor(e.target.value)}
                    className={`select-con-boton ${erroresValidacion.autores ? 'input-error' : ''}`}
                  >
                    <option value="">Selecciona un autor</option>
                    {Array.isArray(autores) && autores.length > 0 ? (
                      autores.map((autor) => {
                        const autorId = autor._id || autor.id;
                        const autorNombre = autor.nombre || autor.name || 'Sin nombre';
                        return (
                          <option key={autorId} value={autorId}>
                            {autorNombre}
                          </option>
                        );
                      })
                    ) : (
                      <option disabled>No hay autores disponibles</option>
                    )}
                  </select>
                  <button
                    type="button"
                    onClick={agregarAutor}
                    className="btn-agregar"
                    disabled={!nuevoAutor}
                  >
                    + Agregar
                  </button>
                </div>
                {erroresValidacion.autores && (
                  <div className="mensaje-error">{erroresValidacion.autores}</div>
                )}
                <div className="lista-etiquetas">
                  {formulario.autores.map((nombreAutor, index) => (
                    <span key={index} className="etiqueta">
                      {nombreAutor}
                      <button
                        type="button"
                        onClick={() => eliminarAutor(nombreAutor)}
                        className="btn-eliminar-etiqueta"
                      >
                        &times;
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label>Sinopsis:</label>
                <textarea
                  name="sinopsis"
                  value={formulario.sinopsis}
                  onChange={handleInputChange}
                  rows="4"
                  className={`form-control ${erroresValidacion.sinopsis ? 'input-error' : ''}`}
                />
                {erroresValidacion.sinopsis && (
                  <div className="mensaje-error">{erroresValidacion.sinopsis}</div>
                )}
              </div>

              <div className="modal-acciones">
                <button
                  type="button"
                  onClick={() => {
                    setMostrarFormulario(false);
                    setLibroAEditar(null);
                    setErroresValidacion({});
                  }}
                  className="btn-cancelar"
                >
                  Cancelar
                </button>
                <button type="submit" className="btn-guardar">
                  {libroAEditar ? 'Guardar Cambios' : 'Crear Libro'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListaLibros;
