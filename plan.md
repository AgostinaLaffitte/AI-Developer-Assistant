# 🚀 Plan de Ejecución: AI Developer Assistant

## 📋 Fase 1: Cimientos y Backend (Prioridad Alta)
*El objetivo aquí es tener la "inteligencia" funcionando, aunque no haya interfaz.*

- [x] **Setup Inicial**
    - [x] Inicializar repositorio Git.
    - [x] Crear carpeta `/backend` e iniciar proyecto Node.js (`npm init`).
    - [x] Instalar dependencias: `express`, `cors`, `dotenv` y el SDK de la IA (ej. `openai`).
- [x] **Configuración de IA**
    - [x] Obtener API Key (OpenAI, Anthropic o Google Gemini).
    - [x] Crear archivo `.env` para proteger la Key.
    - [x] Crear un archivo `services/ai.service.js` para centralizar la lógica de las llamadas a la API.
- [x] **Desarrollo de Endpoints**
    - [x] **POST** `/api/improve-text`: Configurar el *System Prompt* para que actúe como editor técnico.
    - [x] **POST** `/api/explain-code`: Configurar el *System Prompt* para que explique lógica de programación de forma sencilla.
    - [x] POST /api/generate-tests (Tester)
- [X] **Pruebas de Backend**
    - [X] Probar ambos endpoints usando Postman o Insomnia.

---

## 🎨 Fase 2: Frontend Base (Prioridad Media)
*Conectar la interfaz con la lógica que ya creaste.*

- [x] **Setup de Angular**
    - [x] Crear proyecto con Angular CLI (`ng new ai-assistant`).
    - [x] Generar componentes: `InputArea`, `OutputDisplay` y `Dashboard`.
    - [x] Configurar `HttpClientModule` para las peticiones.
- [x] **Capa de Servicios**
    - [x] Crear `services/ai-api.service.ts` para conectar con el backend de Node.js.
- [x] **Lógica de Interfaz**
    - [x] Implementar `FormGroup` o `ngModel` para capturar el texto del usuario.
    - [x] Crear funciones para los botones: `onImproveText()` y `onExplainCode()`.
    - [x] Manejar estados de carga (un simple spinner o texto de "Procesando...").

---

## ✨ Fase 3: Pulido y UX (Prioridad Estética)
*Hacer que la herramienta sea agradable de usar.*

- [x] **Diseño Visual**
    - [x] Implementar un layout limpio (puedes usar CSS puro o Tailwind para ir rápido).
    - [x] Diferenciar visualmente el área de código del área de texto (usar fuentes monoespaciadas para el código).
- [x] **Mejoras de UX**
    - [x] Agregar un botón de "Copiar al portapapeles" en el output.
    - [x] Implementar manejo de errores (si la API falla, avisar al usuario).
- [x] **Documentación del Proyecto**
    - [x] Redactar el `README.md` final (¡puedes usar tu propia app para mejorarlo!).

---

## 🛠️ Detalles Técnicos Sugeridos

| Componente | Tecnología | Nota |
| :--- | :--- | :--- |
| **Runtime** | Node.js v18+ | Estabilidad para Express. |
| **Estilos** | CSS Grid / Flexbox | Diseño simple: una columna en móvil, dos en desktop. |
| **Prompting** | System Messages | "Eres un tutor de programación senior, explica este código línea por línea". |