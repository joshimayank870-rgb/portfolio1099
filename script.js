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

const themeLight = document.getElementById("themeLight");
const themeDark = document.getElementById("themeDark");
const savedTheme = localStorage.getItem("theme") === "dark" ? "dark" : "light";

function setTheme(theme) {
  const isDark = theme === "dark";
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  if (themeLight) {
    themeLight.setAttribute("aria-pressed", String(!isDark));
  }
  if (themeDark) {
    themeDark.setAttribute("aria-pressed", String(isDark));
  }
}

setTheme(savedTheme);

if (themeLight) {
  themeLight.addEventListener("click", () => setTheme("light"));
}
if (themeDark) {
  themeDark.addEventListener("click", () => setTheme("dark"));
}

const cityInput = document.getElementById("cityInput");
const weatherButton = document.getElementById("weatherButton");
const weatherResult = document.getElementById("weatherResult");

async function getWeather() {
  if (!cityInput || !weatherButton || !weatherResult) {
    return;
  }

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
      if (response.status === 404) {
        throw new Error("City not found. Check the spelling.");
      }
      if (response.status === 401) {
        throw new Error("API key is invalid or not active yet.");
      }
      if (response.status === 429) {
        throw new Error("Too many requests. Please wait and retry.");
      }
      throw new Error(`Weather service error (${response.status}).`);
    }

    weatherResult.textContent = `${data.name}: ${data.main.temp}°C, ${data.weather[0].description}. Humidity: ${data.main.humidity}%.`;
  } catch (error) {
    weatherResult.textContent =
      error instanceof TypeError
        ? "Network error. Check your internet connection."
        : error.message;
    console.error("Weather error:", error);
  } finally {
    weatherButton.disabled = false;
  }
}

if (weatherButton) {
  weatherButton.addEventListener("click", getWeather);
}
if (cityInput) {
  cityInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      getWeather();
    }
  });
}
