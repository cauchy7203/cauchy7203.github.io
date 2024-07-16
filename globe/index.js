/**
 * Main source file for LDLP Landing Page
 * Handles events such as clicks on tabs
 */

const STATE = {
  selectedTab: "carbon",
};

const onTabClick = (event) => {
  const tabs = event.target.parentElement.children;
  const activeButton = Array.from(tabs).find((button) => button.classList.contains("active"));

  if (event.target.id === activeButton.id) {
    return;
  }

  activeButton.classList.remove("active");
  event.target.classList.add("active");

  STATE.selectedTab = event.target.id;

  setActiveSlide(`${activeButton.id}-slide`, `${event.target.id}-slide`);
}

const findButtons = () => {
  const tabs = document.getElementById("tabs");

  Array.from(tabs.children).forEach((button) => {
    button.addEventListener("click", onTabClick);
  });
};

const setActiveSlide = (previous, current) => {
  const container = document.getElementById("slides-container");

  const previousSlide = Array.from(container.children).find((slide) => slide.id === previous);
  const currentSlide = Array.from(container.children).find((slide) => slide.id === current);

  previousSlide.classList.remove("visible");
  currentSlide.classList.add("visible");
};

function activateAnalysis() {
  const analysis = document.getElementById("analysis");
  const benchmark = document.getElementById("benchmark");

  const analysisButton = document.getElementById("analysis-button");
  const benchmarkButton = document.getElementById("benchmark-button");

  benchmark.classList.remove("visible");
  analysis.classList.add("visible");

  benchmarkButton.classList.remove("active");
  analysisButton.classList.add("active");
}

function activateBenchmark() {
  const analysis = document.getElementById("analysis");
  const benchmark = document.getElementById("benchmark");

  const analysisButton = document.getElementById("analysis-button");
  const benchmarkButton = document.getElementById("benchmark-button");

  benchmark.classList.add("visible");
  analysis.classList.remove("visible");

  benchmarkButton.classList.add("active");
  analysisButton.classList.remove("active");
}

const main = () => {
  findButtons();
};

main();
