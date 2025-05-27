// api/proxy.js

export const config = {
  runtime: 'nodejs',
};

export default async function handler(req, res) {
  const { url } = req.query;
  if (!url) return res.status(400).json({ error: 'Missing url param' });
  try {
    const response = await fetch(url);
    const data = await response.json();
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Proxy error', details: err.message });
  }
}

export default async function handler(req, res) {
  const targetUrl = req.query.url;

  if (!targetUrl) {
    return res.status(400).json({ error: "Falta el parámetro 'url'" });
  }

  try {
    // Realizamos la petición a la URL objetivo
    const response = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'ProxyMediaHorizon', // Puedes cambiar o eliminar esta cabecera si quieres
        'Accept': '*/*',
      },
    });

    // Obtenemos el tipo de contenido para pasarlo en la respuesta
    const contentType = response.headers.get('content-type') || 'text/plain';
    res.setHeader('Content-Type', contentType);

    // Obtenemos los datos como arrayBuffer y los enviamos
    const data = await response.arrayBuffer();
    res.status(200).send(Buffer.from(data));
  } catch (error) {
    console.error("Error en proxy:", error);
    res.status(500).json({ error: "Error al hacer la petición" });
  }
}
