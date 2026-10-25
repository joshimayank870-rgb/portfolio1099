document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  const placeholders = document.querySelectorAll("body *");
  const marked = [];

  placeholders.forEach((node) => {
    if (node.children.length === 0 && node.textContent.includes("PLACEHOLDER")) {
      marked.push(node.textContent.trim());
    }
  });

  if (marked.length > 0) {
    console.info(
      `Found ${marked.length} PLACEHOLDER text nodes. Replace them with your details.`,
      marked
    );
  }

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const id = link.getAttribute("href");
      const target = id ? document.querySelector(id) : null;
      if (target) {
        event.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
});
const themeButton = document.getElementById("themeToggle");
themeButton.addEventListener("click", function () {
document.body.classList.toggle("dark-mode");
if (document.body.classList.contains("dark-mode")) {
themeButton.textContent = "Switch to Light Mode";
} else {
themeButton.textContent = "Switch to Dark Mode";
}
});
const cityInput = document.getElementById("cityInput");
const weatherButton = document.getElementById("weatherButton");
const weatherResult = document.getElementById("weatherResult");
async function getWeather() {
const city = cityInput.value.trim();
if (!city) {
weatherResult.textContent = "Please enter a city name.";
return;
}
weatherResult.textContent = "Loading weather...";
weatherButton.disabled = true;
try {
const weatherApiKey = "e5ac099b6a95f85b2baa021ff001dbb2";
const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${weatherApiKey}&units=metric`;
const response = await fetch(url);
const data = await response.json();
if (!response.ok) {
if (response.status === 404) throw new Error("City not found. Check the spelling.");
if (response.status === 401) throw new Error("API key is invalid or not active yet.");
if (response.status === 429) throw new Error("Too many requests. Please wait and retry.");
throw new Error(`Weather service error (${response.status}).`);
}
weatherResult.textContent = `${data.name}: ${data.main.temp}°C,
${data.weather[0].description}. Humidity: ${data.main.humidity}%.`;
} catch (error) {
weatherResult.textContent = error instanceof TypeError
? "Network error. Check your internet connection."
: error.message;
console.error("Weather error:", error);
} finally {
weatherButton.disabled = false;
}
}
weatherButton.addEventListener("click", getWeather);
cityInput.addEventListener("keydown", (event) => {
if (event.key === "Enter") getWeather();
});

const projectSearch = document.getElementById("projectSearch");
const projectItems = document.querySelectorAll(".projects-list li");
const projectSearchEmpty = document.getElementById("projectSearchEmpty");

function filterProjects() {
  if (!projectSearch || !projectItems.length) {
    return;
  }

  const query = projectSearch.value.trim().toLowerCase();
  let visibleCount = 0;

  projectItems.forEach((item) => {
    const title = item.querySelector(".project-title")?.textContent || "";
    const description = item.querySelector(".project-description")?.textContent || "";
    const technologies = item.getAttribute("data-technologies") || "";
    const haystack = `${title} ${description} ${technologies}`.toLowerCase();
    const matches = query === "" || haystack.includes(query);

    item.classList.toggle("is-hidden", !matches);
    if (matches) {
      visibleCount += 1;
    }
  });

  if (projectSearchEmpty) {
    projectSearchEmpty.hidden = visibleCount > 0;
  }
}

if (projectSearch) {
  projectSearch.addEventListener("input", filterProjects);
}