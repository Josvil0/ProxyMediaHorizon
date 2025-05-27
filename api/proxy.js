// /api/proxy.js
export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: "Missing URL parameter" });
  }

  try {
    const response = await fetch(url);
    const data = await response.text();
    res.setHeader("Content-Type", "text/plain");
    res.status(200).send(data);
  } catch (err) {
    res.status(500).json({ error: "Error fetching the resource" });
  }
}
