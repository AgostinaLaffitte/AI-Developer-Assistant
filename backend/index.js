import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
// Importamos la lógica de la IA desde tu nuevo servicio
import { generateAIResponse } from './services/ai.service.js';

dotenv.config();
console.log("¿Key cargada?:", process.env.GEMINI_API_KEY ? "SÍ ✅" : "NO ❌");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

/**
 * RUTA 1: Mejorar texto (READMEs, Mensajes, etc.)
 * Espera un JSON: { "text": "...", "filters": { "tone": "formal", "language": "español" } }
 */
app.post('/api/improve-text', async (req, res) => {
  const { text, filters } = req.body;

  if (!text) {
    return res.status(400).json({ error: "No enviaste ningún texto para procesar." });
  }

  try {
    const result = await generateAIResponse('editor', text, filters);
    res.json({ success: true, result });
  } catch (error) {
    res.status(500).json({ error: "Error al conectar con la IA de Google." });
  }
});

/**
 * RUTA 2: Explicar código
 * Espera un JSON: { "code": "...", "filters": { "language": "español" } }
 */
app.post('/api/explain-code', async (req, res) => {
  const { code, filters } = req.body;

  if (!code) {
    return res.status(400).json({ error: "No enviaste ningún código para explicar." });
  }

  try {
    const result = await generateAIResponse('tutor', code, filters);
    res.json({ success: true, result });
  } catch (error) {
    res.status(500).json({ error: "Error al procesar la explicación del código." });
  }
});
/**
 * RUTA 3: Generar Tests Unitarios
 * Espera: { "code": "...", "filters": { "framework": "Jest" } }
 */
app.post('/api/generate-tests', async (req, res) => {
  const { code, filters } = req.body;

  if (!code) {
    return res.status(400).json({ error: "No enviaste código para testear." });
  }

  try {
    // Usamos el tipo 'tester' que definimos en el servicio
    const result = await generateAIResponse('tester', code, filters);
    res.json({ success: true, result });
  } catch (error) {
    res.status(500).json({ error: "Error al generar los tests." });
  }
});
app.post("/test-ai", async (req, res) => {
  try {
    const result = await generateAIResponse(
      "editor",
      "i made an api with node and its fast"
    );

    res.json({ result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Ruta de salud del servidor
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Servidor y rutas de IA listos' });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor profesional corriendo en el puerto ${PORT}`);
});