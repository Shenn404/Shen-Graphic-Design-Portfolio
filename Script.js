document.addEventListener("DOMContentLoaded", () => {
    // Year in footer
    const yearSpan = document.getElementById("year");
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Fade in on load
    document.body.classList.add("fade-in");

    // Mark active TOP NAV item based on current filename
    const path = window.location.pathname;
    let file = path.substring(path.lastIndexOf("/") + 1);
    if (!file) file = "index.html";

    const navLinks = document.querySelectorAll("header nav a[href]");
    navLinks.forEach(link => {
        const href = link.getAttribute("href");
        if (!href || href.startsWith("#")) return;

        const hrefFile = href.split("/").pop();
        if (hrefFile === file) {
            link.classList.add("is-active");
        }
    });

    // Fade-out transition when navigating between pages
    navLinks.forEach(link => {
        const href = link.getAttribute("href") || "";
        if (!href || href.startsWith("#")) return; // hash links scroll normally

        link.addEventListener("click", (e) => {
            const targetFile = href.split("/").pop();
            if (targetFile === file) return; // already on this page

            e.preventDefault();
            document.body.classList.remove("fade-in");
            document.body.classList.add("fade-out");

            setTimeout(() => {
                window.location.href = href;
            }, 320);
        });
    });

    // ==============================
    // WORK PAGE SUB-TABS (PS / AE)
    // ==============================
    const workTabs = document.querySelectorAll(".work-tabs .work-tab");

    if (workTabs.length) {
        workTabs.forEach(tab => {
            tab.addEventListener("click", (e) => {
                // Stop the instant jump
                e.preventDefault();

                // Highlight active tab
                workTabs.forEach(t => t.classList.remove("is-active"));
                tab.classList.add("is-active");

                // Get target section from href (#photoshop-work / #aftereffects-work)
                const href = tab.getAttribute("href") || "";
                const hashIndex = href.indexOf("#");
                if (hashIndex === -1) return;

                const targetId = href.slice(hashIndex + 1);
                const targetEl = document.getElementById(targetId);
                if (!targetEl) return;

                // Calculate scroll position with header offset
                const header = document.querySelector("header");
                const headerHeight = header ? header.offsetHeight : 0;

                const rect = targetEl.getBoundingClientRect();
                const targetY = rect.top + window.scrollY - headerHeight - 20; // extra 20px breathing room

                // Smooth scroll to the section
                window.scrollTo({
                    top: targetY,
                    behavior: "smooth"
                });
            });
        });
    }
});

function slideCard(btn, dir) {
    const container = btn.parentElement;
    const track = container.querySelector('.slider-track');
    const buttons = container.querySelectorAll('.slider-btn');
    const total = track.children.length;

    let index = track.dataset.index ? parseInt(track.dataset.index) : 0;

    index += dir;

    if (index < 0) index = 0;
    if (index > total - 1) index = total - 1;

    track.style.transform = `translateX(-${index * 100}%)`;
    track.dataset.index = index;

    // hide/show arrows
    buttons[0].style.opacity = index === 0 ? "0.2" : "0.6"; // left
    buttons[1].style.opacity = index === total - 1 ? "0.2" : "0.6"; // right
}

