"use strict";

const content = window.ARCHIVE_CONTENT;
const main = document.querySelector("main");
const nav = document.querySelector("nav");
const menu = document.querySelector(".menu-toggle");
const reader = document.querySelector("#reader");
const readerContent = document.querySelector("#reader-content");
const sections = [];
let readerTrigger;

// 설정에 적힌 모든 문장은 HTML이 아닌 일반 텍스트로 표시합니다.
function element(tag, className, value) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (value != null) node.textContent = value;
  return node;
}

function paragraphs(lines) {
  const group = element("div", "prose");
  for (const line of lines) group.append(element("p", "", line));
  return group;
}

// 외부 링크는 HTTP(S), 로컬 이미지는 assets 폴더의 상대 경로만 허용합니다.
function safeURL(value, image = false) {
  if (typeof value !== "string" || !value.trim()) return null;
  try {
    const raw = value.trim();
    if (image && /^assets\//.test(raw)) {
      const path = decodeURIComponent(raw);
      if (!path.includes("\\") && !path.split("/").some(part => part === "..")) return raw;
      return null;
    }
    const url = new URL(raw);
    if (["http:", "https:"].includes(url.protocol)) return url.href;
  } catch {
    return null;
  }
  return null;
}

function external(url, label) {
  const href = safeURL(url);
  if (!href) return null;
  const link = element("a", "text-link", label + " ↗");
  link.href = href;
  return link;
}

function addPhoto(parent, item, onError) {
  const src = safeURL(item.image, true);
  if (!src) return false;
  const img = element("img");
  img.alt = item.alt || item.title || "";
  img.addEventListener("error", onError || (() => img.remove()), { once: true });
  img.src = src;
  parent.append(img);
  return true;
}

// 기본 dialog가 배경 조작을 막고 Escape를 처리합니다. 닫을 때 초점을 돌려줍니다.
function openReader(item, trigger, photoOnly = false) {
  readerTrigger = trigger;
  readerContent.replaceChildren();
  const title = element("h2", "", item.title);
  title.id = "reader-title";
  readerContent.append(title);
  if (!photoOnly && item.date) readerContent.append(dateLabel(item.date));
  addPhoto(readerContent, item, photoOnly ? () => readerContent.append(element("p", "muted", "이미지를 불러오지 못했습니다.")) : undefined);
  if (!photoOnly) readerContent.append(paragraphs(item.body));
  reader.classList.toggle("photo-reader", photoOnly);
  reader.scrollTop = 0;
  reader.showModal();
}

reader.querySelector(".close").addEventListener("click", () => reader.close());
reader.addEventListener("close", () => readerTrigger?.focus());
reader.addEventListener("click", event => {
  if (event.target !== reader) return;
  const bounds = reader.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right ||
      event.clientY < bounds.top || event.clientY > bounds.bottom) reader.close();
});

function dateLabel(date) {
  const time = element("time", "date", date);
  time.dateTime = date;
  return time;
}

function prologue(section) {
  const data = content.prologue;
  const image = element("div", "hero-image");
  image.setAttribute("aria-hidden", "true");
  addPhoto(image, data);
  section.append(image);
  const inner = element("div", "hero-inner wrap");
  const eyebrow = element("p", "eyebrow hero-label", data.label);
  const title = element("h1", "", content.title);
  const subtitle = element("p", "hero-subtitle", data.subtitle);
  const quote = element("blockquote", "", "“" + data.quote + "”");
  inner.append(eyebrow, title, subtitle, quote);
  const destination = Object.keys(content.sections).find(id => id !== "prologue" && content.sections[id].show);
  if (destination) {
    const enter = element("a", "enter", data.enter + "  ↓");
    enter.href = "#" + destination;
    inner.append(enter);
  }
  section.append(inner);
}

function about(body) {
  const details = element("dl", "profile");
  for (const item of content.about.details) {
    if (!item.value) continue;
    const pair = element("div");
    pair.append(element("dt", "", item.label), element("dd", "", item.value));
    details.append(pair);
  }
  body.classList.add("about-grid");
  body.append(paragraphs(content.about.paragraphs));
  if (details.childElementCount) body.append(details);
}

function preferences(body) {
  const list = element("div", "works");
  const filters = element("div", "filters");
  filters.setAttribute("role", "group");
  filters.setAttribute("aria-label", "작품 카테고리");
  const categories = [...new Set(content.preferences.map(item => item.category).filter(Boolean))];
  const controls = [];
  const cards = [];
  for (const item of content.preferences) {
    const card = element("article", "work");
    const photo = element("button", "work-photo");
    photo.type = "button";
    photo.setAttribute("aria-label", item.title + " 이미지 확대");
    photo.addEventListener("click", () => openReader(item, photo, true));
    if (addPhoto(photo, item, () => photo.remove())) card.append(photo);
    const info = element("div", "work-info");
    info.append(element("p", "eyebrow", item.category), element("h3", "", item.title), element("p", "muted", item.description));
    const link = external(item.url, "작품 링크");
    if (link) info.append(link);
    card.append(info);
    cards.push({ card, category: item.category });
    list.append(card);
  }
  for (const category of [null, ...categories]) {
    const button = element("button", "filter", category ?? "전체");
    button.type = "button";
    button.setAttribute("aria-pressed", String(category === null));
    button.addEventListener("click", () => {
      for (const control of controls) control.setAttribute("aria-pressed", String(control === button));
      for (const entry of cards) entry.card.hidden = category !== null && category !== entry.category;
      status.textContent = cards.filter(entry => !entry.card.hidden).length + "개 작품";
    });
    controls.push(button);
    filters.append(button);
  }
  const status = element("p", "sr-only");
  status.setAttribute("role", "status");
  if (categories.length) body.append(filters, status);
  body.append(cards.length ? list : element("p", "muted", "아직 등록된 작품이 없습니다."));
}

function afterimages(body) {
  const list = element("ol", "archive-list");
  content.afterimages.forEach((item, index) => {
    const entry = element("li");
    const button = element("button", "archive-row");
    button.type = "button";
    const info = element("span", "archive-info");
    info.append(element("span", "archive-title", item.title), element("span", "muted", item.summary));
    if (item.date) info.append(dateLabel(item.date));
    const number = element("span", "eyebrow", String(index + 1).padStart(2, "0"));
    const arrow = element("span", "archive-arrow", "↗");
    number.setAttribute("aria-hidden", "true");
    arrow.setAttribute("aria-hidden", "true");
    button.append(number, info, arrow);
    button.addEventListener("click", () => openReader(item, button));
    entry.append(button);
    list.append(entry);
  });
  body.append(list.children.length ? list : element("p", "muted", "아직 등록된 기록이 없습니다."));
}

function monologue(body) {
  const entries = [...content.monologues].sort((a, b) => (b.date || "").localeCompare(a.date || ""));
  const size = Number.isInteger(content.monologuePageSize) && content.monologuePageSize > 0 ? content.monologuePageSize : 3;
  const list = element("div", "notes");
  const more = element("button", "text-link", "독백 더 보기 ↓");
  more.type = "button";
  function appendBatch(moveFocus) {
    const start = list.children.length;
    for (const item of entries.slice(start, start + size)) {
      const entry = element("article", "note");
      entry.tabIndex = -1;
      if (item.date) entry.append(dateLabel(item.date));
      entry.append(element("p", "", item.text));
      list.append(entry);
    }
    if (moveFocus) list.children[start]?.focus();
    more.hidden = list.children.length >= entries.length;
  }
  appendBatch(false);
  more.addEventListener("click", () => appendBatch(true));
  body.append(entries.length ? list : element("p", "muted", "아직 등록된 독백이 없습니다."), more);
}

function connection(body) {
  const data = content.connection;
  body.append(paragraphs(data.paragraphs));
  const link = external(data.url, data.linkLabel);
  if (link) body.append(link);
  if (data.dm) body.append(element("p", "muted dm", data.dm));
}

// 화면과 메뉴를 같은 설정에서 생성해 숨긴 섹션으로 연결되는 링크를 만들지 않습니다.
const renderers = { prologue, about, preferences, afterimages, monologue, connection };
document.title = content.title;
document.querySelector("#wordmark").textContent = content.title;
document.querySelector(".footer").append(element("span", "", content.title), element("span", "", content.footer));

Object.entries(content.sections).forEach(([id, config], index) => {
  if (!config.show || !Object.hasOwn(renderers, id)) return;
  const section = element("section", id === "prologue" ? "hero" : "chapter");
  section.id = id;
  section.tabIndex = -1;
  const link = element("a", "", config.title);
  link.href = "#" + id;
  nav.append(link);
  sections.push({ section, link });
  if (id === "prologue") {
    prologue(section);
  } else {
    const inner = element("div", "wrap chapter-inner reveal");
    const heading = element("header", "chapter-heading");
    heading.append(
      element("p", "eyebrow chapter-number", String(index).padStart(2, "0")),
      element("h2", "", config.title),
      element("p", "chapter-subtitle", config.subtitle),
    );
    const body = element("div", "chapter-body");
    renderers[id](body);
    inner.append(heading, body);
    section.append(inner);
  }
  main.append(section);
});

if (!sections.length) menu.hidden = true;

function setMenu(open) {
  menu.setAttribute("aria-expanded", String(open));
}
menu.addEventListener("click", () => setMenu(menu.getAttribute("aria-expanded") !== "true"));
nav.addEventListener("click", event => {
  if (event.target.matches("a")) setMenu(false);
});
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && menu.getAttribute("aria-expanded") === "true" && !reader.open) {
    setMenu(false);
    menu.focus();
  }
});

// 한 프레임에 한 번만 진행률과 현재 목차를 갱신합니다.
const progress = document.querySelector(".progress");
let pending = false;
let current;
function updateScroll() {
  pending = false;
  const bottom = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
  progress.style.setProperty("--progress", bottom ? Math.min(1, Math.max(0, window.scrollY / bottom)) : 0);
  let active = sections[0];
  for (const item of sections) {
    if (item.section.getBoundingClientRect().top <= window.innerHeight * 0.34) active = item;
  }
  if (bottom > 0 && window.scrollY >= bottom - 2) active = sections.at(-1);
  if (current === active) return;
  current?.link.removeAttribute("aria-current");
  active?.link.setAttribute("aria-current", "location");
  current = active;
}
function scheduleScroll() {
  if (pending) return;
  pending = true;
  requestAnimationFrame(updateScroll);
}
window.addEventListener("scroll", scheduleScroll, { passive: true });
window.addEventListener("resize", scheduleScroll);
if ("ResizeObserver" in window) new ResizeObserver(scheduleScroll).observe(main);
updateScroll();

// 이미 화면에 있는 영역은 그대로 표시하고, 아래쪽 섹션에만 나타나는 효과를 줍니다.
if ("IntersectionObserver" in window && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.remove("awaiting");
      observer.unobserve(entry.target);
    }
  }, { rootMargin: "0px 0px -24px" });
  for (const item of document.querySelectorAll(".reveal")) {
    if (item.getBoundingClientRect().top < window.innerHeight) continue;
    item.classList.add("awaiting");
    observer.observe(item);
  }
}

// 파일을 직접 열거나 주소에 섹션 앵커가 붙은 경우에도 이동합니다.
if (location.hash) {
  const destination = document.getElementById(location.hash.slice(1));
  destination?.scrollIntoView({ behavior: "instant" });
}
