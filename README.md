# Mayank Joshi — Personal Portfolio

A responsive personal portfolio website showcasing my background, technical skills, projects, and interactive web features. The site includes light/dark themes, searchable project cards, a live weather checker, and an AI-powered portfolio assistant.

## Features

- **Personal profile:** Introduction, location, and professional summary.
- **Skills overview:** C, C++, Python, JavaScript, HTML, CSS, and MySQL.
- **Project gallery:** Browse project descriptions, technologies, and repository links.
- **Project search:** Filter projects by title, description, or technology.
- **Light and dark themes:** Switch between themes; the selected theme is saved in browser local storage.
- **Live weather checker:** Retrieve current weather and humidity for a city using the OpenWeather API.
- **AI portfolio assistant:** Ask questions about the portfolio through a server-side API endpoint powered by Groq.
- **Responsive layout:** Adapts to desktop and mobile screens.
- **Accessibility considerations:** Semantic page sections, labels for inputs, visible focus styles, and live status regions.

## Tech Stack

| Technology | Purpose |
| --- | --- |
| HTML5 | Page structure and semantic content |
| CSS3 | Responsive layout, styling, and theme variables |
| JavaScript | Theme controls, project filtering, weather lookup, and chat interface |
| OpenWeather API | Current weather data |
| Groq API | AI-generated responses for the portfolio assistant |
| Node.js serverless function | Backend endpoint for chat requests |

## Project Structure

```text
.
├── index.html          # Main portfolio page
├── style.css           # Main styles and theme definitions
├── chatbot.css         # Chat interface styles
├── script.js           # Theme, search, and weather interactions
├── chatbot.js          # Chat UI and request handling
├── api/
│   └── chat.js         # Server-side chat endpoint (if using the included API handler)
└── images/
    └── image.png       # Profile image asset
```

Keep the filenames and paths aligned with the script and stylesheet references in `index.html`. The server-side handler should be placed at `api/chat.js` when deploying on a platform that supports this serverless route.

## Getting Started

### Prerequisites

- A modern web browser.
- A code editor such as Visual Studio Code.
- For the AI assistant, a deployment/runtime that supports the `api/chat.js` serverless endpoint and environment variables.
- An active OpenWeather API key for the weather checker.

### 1. Get the project

Clone the repository:

```bash
git clone https://github.com/joshimayank870-rgb/portfolio1099.git
cd portfolio1099
```

Alternatively, download the repository and open the project folder in your editor.

### 2. Check the file paths

Confirm that the HTML references the correct files:

- `style.css`
- `chatbot.css`
- `script.js`
- `chatbot.js`
- `images/image.png`

The provided HTML loads `chatbot.js`; ensure the chat client file is named accordingly. The server-side handler should be available at `/api/chat`.

### 3. Configure API credentials

#### OpenWeather

The weather code currently contains an API key in the client-side JavaScript. **Client-side API keys are visible to visitors.** For a public deployment, restrict the key where possible or move weather requests behind a backend endpoint. If the key in the source is real, rotate it and use a replacement.

#### Groq

Set the `GROQ_API_KEY` environment variable in your local serverless environment or hosting provider. Do not put this secret in frontend JavaScript or commit it to version control.

Example environment configuration:

```bash
GROQ_API_KEY=your_groq_api_key
```

Use your hosting platform's environment-variable settings for deployed projects. Never commit a real API key to the repository.

### 4. Run locally

Because the AI assistant calls `/api/chat`, opening `index.html` directly with `file://` will not provide the complete experience. Run the project with a local development server that supports the serverless API route, or deploy it to a compatible hosting platform.

For a static preview of the portfolio layout, you can use a simple local web server or your editor's live-preview extension. Weather functionality requires internet access and a valid OpenWeather key. The AI assistant additionally requires the backend route and `GROQ_API_KEY`.

## Projects Featured

- **C++ to Python Program Conversion** — Exercises covering factorial calculation, Fibonacci series generation, and converting C++ structures into Python dictionaries.
  - [Factorial](https://github.com/joshimayank870-rgb/Factorial_1099)
  - [Fibonacci](https://github.com/joshimayank870-rgb/Fibonacci_1099)
  - [Struct to Dictionary](https://github.com/joshimayank870-rgb/Dictonary_1099)
- **Python Debugging and Testing** — Correcting errors in Python code and checking behavior with tests.
  - [Repository](https://github.com/joshimayank870-rgb/buggy-python-1099)
- **Python Code Refactoring with Cursor AI** — Improving code readability while preserving intended behavior.
  - [Repository](https://github.com/joshimayank870-rgb/messy-python-1099)
- **Queez** — A quiz-based web project built with HTML, CSS, and JavaScript.
  - [Repository](https://github.com/joshimayank870-rgb/QUIZ_1099)
- **Reading Book App** — A web app for tracking books read and saving reading progress.
  - [Repository](https://github.com/joshimayank870-rgb/ReadingList)

## Usage

1. Open the portfolio in a browser.
2. Use the **Light mode** and **Dark mode** controls to change the appearance.
3. Search projects by a title, description keyword, or technology.
4. Enter a city in the weather checker and select **Get Weather**.
5. Ask the portfolio assistant about the skills, projects, or background described on the page.

## Deployment Notes

- Deploy the frontend files and `images/` directory together, preserving their relative paths.
- Deploy the chat handler at `/api/chat` on a platform that supports serverless functions.
- Configure `GROQ_API_KEY` as a server-side environment variable.
- Configure and protect the OpenWeather API key before publishing.
- Test theme persistence, project search, weather errors, and chat error handling after deployment.

## Known Considerations

- The chat assistant can only use portfolio context supplied by the page and should not be expected to know details that are not included there.
- Weather and chat features depend on external services and internet access.
- Verify the deployed filenames: the HTML references `chatbot.js` and `chatbot.css`, while uploaded files may have different names.
- Replace any placeholder profile image or text before publishing.

## Contact

- **Email:** [joshimayank870@gmail.com](mailto:joshimayank870@gmail.com)
- **GitHub:** [joshimayank870-rgb](https://github.com/joshimayank870-rgb)

## License

No license is specified in the repository. Add a `LICENSE` file if you want to define the terms under which others may use, modify, or distribute this project.
