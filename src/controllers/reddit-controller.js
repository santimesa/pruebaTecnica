import { getConnection } from '../database/connection';

export const getRedits = async (req, res) => {
  try {
    // Obtener la conexión a la base de datos
    const connection = await getConnection();

    // Ejecutar la consulta y obtener resultados
    const [results] = await connection.query('SELECT * FROM subreddits   LEFT JOIN  colors ON subreddits.banner_color_id = colors.id LEFT JOIN images ON subreddits.icon_img_id = images.id;');

    // Mostrar los resultados en la consola para depuración
    console.log('Resultados obtenidos:', results);

    // Enviar los resultados al cliente
    res.json(
        results
    );
  } catch (error) {
    // Manejar errores durante la consulta
    console.error('Error durante la consulta:', error.message);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};


export const createNewReditsDataBase = async (req, res) => {
  try {
    // Obtener la conexión a la base de datos
    const connection = await getConnection();
    const response = await fetch('https://www.reddit.com/reddits.json');
    const data = await response.json();

    // Extraer los subreddits relevantes
    const reddits = data.data.children.map(async (child) => {
      const { id, display_name, title, url, created_utc, description, public_description, banner_img, banner_background_color } = child.data;

      try {
       // Insertar en la tabla `colors`
       let bannerColorId = null;
       if (banner_background_color) {
         const [colorResult] = await connection.query(
           'INSERT INTO colors (banner_background_color) VALUES (?)',
           [banner_background_color]
         );
         bannerColorId = colorResult.insertId;
       }
 
       // Insertar en la tabla `images`
       let iconImgId = null;
       if (banner_img) {
         const [imageResult] = await connection.query(
           'INSERT INTO images (icon_img) VALUES (?)',
           [banner_img]
         );
         iconImgId = imageResult.insertId;
       }
 
       if(banner_background_color && banner_img)// Insertar en la tabla `subreddits` con referencias a las otras tablas
       {
        await connection.query(
          'INSERT INTO subreddits (id_identification_api, display_name, title, url, public_description, created_utc, description, banner_color_id, icon_img_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
          [id, display_name, title, url, created_utc, description, public_description, bannerColorId, iconImgId]
        );
       } 

      } catch (error) {
        console.error('Error al insertar en la base de datos:', error.message);
      }
    });
    
    if(reddits) res.status(200).json('Carga Exitosa!!!!');
  } catch (error) {
    console.error('Intenta nuevamente que hay incosistencias en el servicio', error.message);
    res.status(500).json({ error: 'Error al consumir la API de Reddit' });
  }
};
