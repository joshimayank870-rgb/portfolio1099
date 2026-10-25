# Portfolio Project Audit

**Project:** Mayank Joshi — Personal Portfolio  
**Audit type:** Static code review of the uploaded source files  
**Scope:** HTML, CSS, browser-side JavaScript, and server-side chat handler  
**Limitations:** This is a source-based review. The project was not executed, deployed, or tested against live APIs during this audit.

## 1. Executive Summary

The project has a clear portfolio structure and useful interactive features: project filtering, light/dark themes, a weather lookup, and an AI-powered portfolio assistant. The code includes some good practices, such as semantic sections, labels for inputs, `textContent` for displaying chat messages, request validation in the chat handler, and server-side storage of the Groq API key.

Before public deployment, prioritize credential security and confirm that the frontend filenames, backend route, and hosting setup match. Some behaviors also need browser testing.

## 2. Findings at a Glance

| Priority | Finding | Evidence / impact | Recommended action |
| --- | --- | --- | --- |
| **Critical if key is active** | Weather API key is embedded in frontend JavaScript | Anyone who can load the page can inspect the key and reuse it within its provider permissions | Rotate the exposed key if real; restrict it where possible or proxy weather requests through a backend |
| **High** | Chat file naming may not match HTML references | HTML references `chatbot.js` and `chatbot.css`; uploaded files include similarly named files such as `chat.js` and `chatbot.js`, so confirm the actual deployed names | Ensure the files deployed at the referenced paths exist and contain the intended code |
| **High** | Chat endpoint requires serverless hosting support | Browser sends `POST /api/chat`; backend handler expects `GROQ_API_KEY` | Deploy the handler at the matching route and configure the environment variable in the hosting platform |
| **Medium** | Profile image alt text still contains placeholder wording | The image source is `images/image.png`, but the alt text asks to add a placeholder profile photo | Replace the alt text with an accurate description, or use empty alt text if the image is purely decorative |
| **Medium** | Duplicate or inconsistent source variants are present | Several uploaded JavaScript/CSS files overlap in responsibility; variants contain different implementations | Choose one canonical version of each file and remove or archive obsolete copies |
| **Medium** | Theme state may be initialized in more than one place | HTML sets `data-theme` from local storage, and `script.js` also reads and applies the saved theme | Keep one consistent initialization strategy and test first paint and theme buttons |
| **Medium** | Weather response parsing could be more defensive | The code parses JSON before checking `response.ok` and assumes expected response fields exist | Handle non-JSON responses and validate the response shape before reading weather fields |
| **Low** | Empty footer / placeholder content needs cleanup | HTML includes an empty footer and the JavaScript checks for `PLACEHOLDER` text | Remove unused elements and replace all placeholder copy and image assets before release |
| **Low** | No automated test suite is evident in the supplied files | No project-level automated test configuration was included in the reviewed source excerpts | Add smoke tests for filtering, theme persistence, weather errors, and chat success/failure |

## 3. Security Review

### 3.1 Weather API key exposure — highest priority

The uploaded `script.js` contains an OpenWeather API key directly in browser-side JavaScript. Frontend code is delivered to every visitor, so a key placed there should be treated as public.

**Actions:**
1. If the key is real and active, rotate it in the OpenWeather account.
2. Review usage for unexpected activity.
3. Avoid committing replacement credentials to source control.
4. For a public site, proxy weather requests through a backend and store the key in an environment variable, or apply provider-supported restrictions where appropriate.
5. Check the repository history and deployment artifacts for previously committed secrets.

### 3.2 Groq API key handling

The chat handler reads `process.env.GROQ_API_KEY`, which is preferable to placing the secret in browser code.

**Actions:**
- Configure `GROQ_API_KEY` through the hosting provider's secret/environment-variable settings.
- Never commit a real key in a `.env` file.
- Add `.env` and other secret files to `.gitignore`.
- If a key was ever committed or exposed, rotate it.

### 3.3 Chat endpoint abuse and resource limits

The handler validates request types and caps question, context, history count, and message sizes. These are useful safeguards. However, the supplied handler does not show authentication, rate limiting, or an explicit request-body limit configured at the hosting layer.

**Actions:**
- Add rate limiting or another abuse-control mechanism appropriate for a public endpoint.
- Set request-size and execution-time limits in the hosting platform.
- Consider stricter allowed-origin/CSRF controls if the deployment architecture requires them.
- Keep provider errors generic for clients and avoid returning secret or internal implementation details.
- Review provider usage limits and spending controls.

### 3.4 Chat content and DOM handling

The chat client inserts user and assistant messages using `document.createElement("p")` and `textContent`, which avoids interpreting message text as HTML. Keep this pattern; do not replace it with `innerHTML` for untrusted messages.

### 3.5 Privacy

The chat request sends portfolio text, the question, and recent conversation history to the backend, which forwards messages to the configured AI provider. Make sure the portfolio's privacy notice (if applicable) reflects this data flow. Do not send unnecessary personal information in the portfolio context.

## 4. Functionality and Integration Review

### HTML and asset paths
- Confirm `style.css`, `chatbot.css`, `script.js`, and `chatbot.js` exist at the paths referenced by `index.html`.
- Confirm `images/image.png` exists and is the intended profile asset.
- Verify the chat handler is deployed at `/api/chat`.
- Confirm the actual serverless runtime supports the handler's request/response API.

### Theme toggle
- The page initializes the theme using local storage, and `script.js` also reads and applies the saved value.
- Test both buttons, refresh persistence, and keyboard interaction.
- The theme buttons should reflect the current state through their `aria-pressed` attributes.
- Test behavior when browser storage is unavailable or throws an exception if broad resilience is required.

### Project search
- The filtering logic searches project title, description, and technology metadata.
- Test case-insensitive searches, whitespace-only input, no-match feedback, and clearing the search.
- Ensure each project's `data-technologies` attribute stays synchronized with the displayed technologies.

### Weather checker
- Test valid cities, misspelled cities, invalid/inactive API keys, rate limits, offline/network failure, and malformed provider responses.
- Check that the interface restores the button state after errors.
- Avoid displaying raw internal error details to users if they could reveal implementation information.

### AI portfolio assistant
- The client posts `question`, `portfolioContext`, and recent `history` to `/api/chat`.
- The server validates these fields and calls the Groq chat-completions endpoint.
- Test greetings, empty input, long messages, provider failure, invalid JSON responses, missing API credentials, and empty model output.
- Confirm the chat script is initialized only once and that the HTML element IDs match the JavaScript selectors.
- The backend prompt asks for concise answers and instructs the model not to invent personal details; this is a useful constraint, but model output should still be treated as unverified.

## 5. Accessibility and Responsive Design

**Positive signs in the supplied code**
- The document declares its language and viewport.
- Sections use headings and accessible labels.
- Chat messages use a log region and live announcements.
- Weather output uses `aria-live="polite"`.
- Focus styles are defined for several controls.
- CSS switches the project grid to one column on narrow screens.

**Recommended checks**
- Verify color contrast in both themes, including muted text and button states.
- Navigate the entire page using only a keyboard.
- Check focus visibility and logical focus order.
- Test screen-reader announcements for chat and weather updates.
- Ensure the profile image alternative text is meaningful.
- Test at narrow viewport widths and browser zoom levels.
- Confirm theme button labels and `aria-pressed` values stay synchronized.

## 6. Code Quality and Maintainability

- Consolidate duplicate or alternate script/style files into a single authoritative version.
- Keep selectors and element IDs consistent between HTML and JavaScript.
- Add small helper functions for repeated error handling if the codebase grows.
- Consider separating API calls from UI event handlers to simplify testing.
- Avoid logging sensitive data or unnecessary user content.
- Add basic automated tests and a repeatable deployment checklist.
- Document required environment variables and serverless runtime expectations.

## 7. Recommended Remediation Plan

### Before publishing
- [ ] Rotate the weather key if it is real and active.
- [ ] Remove exposed credentials from the frontend and repository history where applicable.
- [ ] Verify the exact frontend filenames referenced by `index.html`.
- [ ] Verify `/api/chat` is deployed and `GROQ_API_KEY` is configured securely.
- [ ] Replace profile image alt text and all placeholder content.
- [ ] Confirm the profile image and other static assets exist.
- [ ] Test the weather and chatbot with valid and invalid requests.

### Soon after
- [ ] Add rate limiting and suitable request-size limits to the chat API.
- [ ] Improve defensive parsing for external API responses.
- [ ] Check keyboard accessibility and color contrast in both themes.
- [ ] Consolidate duplicate source variants.
- [ ] Add automated smoke tests and document the deployment process.

## 8. Suggested Manual Smoke-Test Matrix

| Test | Expected result |
| --- | --- |
| Load the page | Main sections and styles load without console errors |
| Switch to dark mode and refresh | Dark mode remains selected |
| Search for `Python` | Matching projects remain visible |
| Search for an unmatched term | No-match message appears |
| Submit an empty chat message | A validation message appears; no request is sent |
| Ask a portfolio question | A response appears once, or a clear error is shown |
| Submit chat while provider is unavailable | The send button is re-enabled and an error is shown |
| Look up a valid city | Current temperature, description, and humidity are displayed |
| Look up an invalid city | A clear city-not-found message is displayed |
| Use the page on mobile and with keyboard only | Layout remains usable and focus is visible |

## 9. Audit Conclusion

The project is a promising portfolio with a practical set of interactive features. The most important release blockers are credential exposure and ensuring that the frontend files, serverless endpoint, and environment configuration line up. After these are addressed, complete the manual smoke tests and accessibility checks before treating the site as production-ready.

**Audit status:** Static review completed; runtime behavior and deployment remain unverified.
