const root = document.documentElement,
    btn = document.querySelector("#theme"),
    txt = document.querySelector("#themeText"),
    icon = document.querySelector("#themeIcon");

function setTheme(t) {
    root.dataset.theme = t;
    txt.textContent = t === "light" ? "Dark" : "Light";
    icon.textContent = t === "light" ? "☾" : "☀";
    localStorage.setItem("theme", t)
}
setTheme(localStorage.getItem("theme") || "light");
btn.onclick = () => setTheme(root.dataset.theme === "light" ? "dark" : "light");
const menu = document.querySelector("#menu"),
    nav = document.querySelector("nav");
menu.onclick = () => nav.classList.toggle("open");
document.querySelectorAll("nav a").forEach(a => a.onclick = () => nav.classList.remove("open"));
const data = {
    dir: ["FILM DIRECTION", "DIRECT THE<br>STORY.", "History of cinema, storytelling, screenplay understanding, shot division, cinematography basics, camera movement, continuity, actor handling, editing, storyboarding, production design and a short film direction project."],
    act: ["ACTING", "PERFORM FOR<br>THE CAMERA.", "Abhinayam, Navarasas, dialogue delivery, voice and speech training, camera acting, character development, dubbing, TV & OTT techniques and audition preparation."],
    scr: ["SCRIPT WRITING", "WRITE FOR<br>THE SCREEN.", "Story development, logline and synopsis writing, screenplay structure, dialogue writing, 3-act structure, feature films, short films, web series, documentaries and bound script preparation."],
    ai: ["AI FILM MAKING", "IMAGINE. PROMPT.<br>CREATE.", "Learn an end-to-end AI-assisted filmmaking workflow: concept development, prompt design, script and storyboard creation, image and video generation, AI voice and sound, editing, VFX, continuity and a portfolio-ready AI short film."]
};
const view = document.querySelector("#courseView");
document.querySelectorAll(".course-nav button").forEach(b => b.onclick = () => {
    document.querySelectorAll(".course-nav button").forEach(x => x.classList.remove("active"));
    b.classList.add("active");
    let k = b.dataset.course,
        d = data[k];
    view.className = "course-view " + k;
    document.querySelector("#courseLabel").textContent = d[0];
    document.querySelector("#courseHeadline").innerHTML = d[1];
    document.querySelector("#courseCopy").textContent = d[2]
});
function submitEnquiry(e) {
    e.preventDefault();

    const d = new FormData(e.target);

    const message = `*FIDAS FILM ACADEMY - NEW ENQUIRY*

• Name: ${d.get("name")}
• Phone: ${d.get("phone")}
• Email: ${d.get("email")}
• Program: ${d.get("course")}

*Message:*
${d.get("message") || "No message provided."}`;

    const url = "https://wa.me/916303002948?text=" + encodeURIComponent(message);

    window.open(url, "_blank");
}
document.querySelector("#form")?.addEventListener("submit", submitEnquiry);
document.querySelector("#heroForm")?.addEventListener("submit", submitEnquiry);
const heroImages = document.querySelectorAll(".visual-main img");

if (heroImages.length) {
    let current = 0;

    setInterval(() => {
        heroImages[current].classList.remove("active");

        current = (current + 1) % heroImages.length;

        heroImages[current].classList.add("active");
    }, 5000);
}
const courseDetails = {
    dir: {
        title: "Professional Certificate Course in Film Direction",
        program: "FLAGSHIP PROGRAM",
        highlights: ["History of Cinema & Film Production", "Storytelling & Screenplay Understanding", "Shot Division & Shot Listing", "Cinematography Basics", "Camera Angles & Movements", "Screen Direction & Continuity", "Actor Handling & Character Development", "Editing & Post Production", "Storyboarding & Production Design", "Short Film Direction Project"],
        skills: ["Visual Storytelling", "Leadership & Team Management", "Creative Direction", "Shot Composition", "Production Planning", "Film Execution"],
        careers: ["Film Director", "Assistant Director", "OTT Content Director", "Commercial Director", "Short Film Creator", "Creative Producer"]
    },
    act: {
        title: "Professional Certificate Course in Acting",
        program: "PERFORMANCE PROGRAM",
        highlights: ["Abhinayam (4 Types)", "Navarasas", "Dialogue Delivery", "Voice & Speech Training", "Camera Acting", "Solo & Group Performances", "Character Development", "Dubbing & Voice Modulation", "TV & OTT Acting Techniques", "Audition Preparation"],
        skills: ["Screen Presence", "Emotional Expression", "Voice Control", "Body Language", "Camera Confidence", "Character Performance"],
        careers: ["Film Actor", "TV Actor", "OTT Artist", "Voice Artist", "Anchor / Presenter", "Content Creator"]
    },
    scr: {
        title: "Professional Certificate Course in Script Writing",
        program: "WRITING PROGRAM",
        highlights: ["Story Development", "Logline & Synopsis Writing", "Screenplay Structure", "Dialogue Writing", "3-Act Structure", "Feature Film Writing", "Short Film Writing", "Web Series Writing", "Documentary Writing", "Bound Script Preparation"],
        skills: ["Creative Writing", "Screenplay Formatting", "Story Structure", "Character Writing", "Dialogue Crafting", "Script Pitching"],
        careers: ["Screenwriter", "Dialogue Writer", "Web Series Writer", "TV Writer", "Content Writer", "Creative Consultant"]
    }
};
let activeCourse = "dir";
const detailsBtn = document.querySelector("#detailsBtn");
document.querySelectorAll(".course-nav button").forEach(b => b.addEventListener("click", () => {
    activeCourse = b.dataset.course;
    detailsBtn.href = "course.html?course=" + activeCourse
}));

const sections = [...document.querySelectorAll("main section[id]")],
    indicators = [...document.querySelectorAll(".section-indicator a")];
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            indicators.forEach(a => a.classList.toggle("active", a.dataset.section === entry.target.id))
        }
    })
}, {
    rootMargin: "-35% 0px -55% 0px"
});
sections.forEach(s => observer.observe(s));
window.addEventListener("scroll", () => {
    const h = document.documentElement.scrollHeight - innerHeight;
    document.querySelector("#scrollProgress").style.transform = `scaleX(${h?scrollY/h:0})`
}, {
    passive: true
});