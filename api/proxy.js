// api/proxy.js
export default async function handler(req, res) {
  const targetUrl = req.query.url;

  if (!targetUrl) {
    return res.status(400).json({ error: "Falta el parámetro 'url'" });
  }

  try {
    const response = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'ProxyMediaHorizon',
        'Accept': '*/*',
      }
    });

    const contentType = response.headers.get('content-type') || 'text/plain';
    res.setHeader('Content-Type', contentType);
    const data = await response.arrayBuffer();
    res.status(200).send(Buffer.from(data));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al hacer la petición" });
  }
}
