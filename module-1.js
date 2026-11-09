// Module State
let activeLessonId = "lesson1";
let completedLessons = {
    lesson1: false,
    lesson2: false,
    quiz1: false
};

// Lesson Data Mapping
const lessonsData = {
    lesson1: {
        badge: "LESSON 1.1",
        heading: "Understanding the Word Interface & Ribbon",
        videoUrl: "https://www.youtube.com/embed/S-nHYzK-BVg",
        overview: <p>In this lesson, you will get familiar with the core components of Microsoft Word:</p><ul><li><strong>The Ribbon:</strong> Organized into tabs (Home, Insert, Layout, etc.) and command groups.</li><li><strong>Quick Access Toolbar:</strong> Located at the top left for quick actions like Save, Undo, and Redo.</li><li><strong>The Canvas & Ruler:</strong> Your main workspace and alignment guide.</li><li><strong>Status Bar:</strong> Displays page numbers, word count, and zoom controls at the bottom.</li></ul>
    },
    lesson2: {
        badge: "LESSON 1.2",
        heading: "Font Formatting, Paragraph Alignment & Spacing",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        overview: <p>In this lesson, you will learn essential text formatting techniques:</p><ul><li><strong>Font Group:</strong> Changing font family, size, bold, italic, underline, and color.</li><li><strong>Paragraph Alignment:</strong> Left, Center, Right, and Justified alignment.</li><li><strong>Line Spacing:</strong> Adjusting line and paragraph spacing for clean layout design.</li></ul>
    },
    quiz1: {
        badge: "QUIZ 1",
        heading: "Module 1 Knowledge Check",
        videoUrl: "https://www.youtube.com/embed/S-nHYzK-BVg",
        overview: <p style="color:#00d2ff; font-weight:bold;">Test your knowledge of Module 1 concepts!</p><p>1. Which area houses commands like Home, Insert, and Layout?</p><p style="color:#8b949e; margin-top:10px;">(Module 1 Assessment Check)</p>
    }
};

// Initialize Page
document.addEventListener("DOMContentLoaded", function() {
    const savedName = localStorage.getItem("user");
    if (savedName) {
        const userNameElem = document.getElementById("userName");
        if (userNameElem) userNameElem.textContent = savedName;
    }

    const savedProgress = JSON.parse(localStorage.getItem("msword_mod1_completed"));
    if (savedProgress) {
        completedLessons = savedProgress;
        updateUI();
    }
});

// Switch Active Lesson
function switchLesson(lessonId) {
    activeLessonId = lessonId;

    document.querySelectorAll(".lesson-card").forEach(card => card.classList.remove("active"));
    const activeCard = document.getElementById(card-${lessonId});
    if (activeCard) {
        activeCard.classList.add("active");
    }

    const data = lessonsData[lessonId];
    if (data) {
        document.getElementById("activeBadge").textContent = data.badge;
        document.getElementById("activeHeading").textContent = data.heading;
        document.getElementById("youtubeIframe").src = data.videoUrl;
        document.getElementById("overviewBody").innerHTML = data.overview;
    }

    updateMarkCompleteBtn();
    updateNavButtons();
}

// Toggle Complete Status for Active Lesson
function toggleCurrentLessonComplete() {
    completedLessons[activeLessonId] = !completedLessons[activeLessonId];
    localStorage.setItem("msword_mod1_completed", JSON.stringify(completedLessons));
    updateUI();
}

// Update All UI Components
function updateUI() {
    let completedCount = 0;
    const keys = Object.keys(completedLessons);

    keys.forEach(key => {
        const card = document.getElementById(card-${key});
        if (card) {
            if (completedLessons[key]) {
                card.classList.add("completed");
                const icon = card.querySelector(".lesson-check-icon i");
                if (icon) icon.className = "fa-solid fa-circle-check";
                completedCount++;
            } else {
                card.classList.remove("completed");
                const icon = card.querySelector(".lesson-check-icon i");
                if (icon) icon.className = "fa-regular fa-circle-check";
            }
        }
    });

    const percentage = Math.round((completedCount / keys.length) * 100);
    const progressFill = document.getElementById("progressBarFill");
    const progressText = document.getElementById("progressPercentageText");
    
    if (progressFill) progressFill.style.width = percentage + "%";
    if (progressText) progressText.textContent = percentage + "%";

    const statusVal = document.getElementById("statusValue");
    if (statusVal) {
        if (percentage === 100) {
            statusVal.textContent = "Completed";
            statusVal.style.color = "#00d2ff";

            let mswordProgress = JSON.parse(localStorage.getItem("msword_progress")) || {};
            mswordProgress.mod1 = true;
            localStorage.setItem("msword_progress", JSON.stringify(mswordProgress));
        } else {
            statusVal.textContent = "In Progress";
            statusVal.style.color = "#e3b341";
        }
    }

    updateMarkCompleteBtn();
}

function updateMarkCompleteBtn() {
    const btn = document.getElementById("markCompleteBtn");
    const text = document.getElementById("markCompleteText");

    if (btn && text) {
        if (completedLessons[activeLessonId]) {
            btn.classList.add("is-completed");
            text.textContent = "Completed";
        } else {
            btn.classList.remove("is-completed");
            text.textContent = "Mark as Complete";
        }
    }
}

function updateNavButtons() {
    const keys = Object.keys(lessonsData);
    const currentIndex = keys.indexOf(activeLessonId);

    const prevBtn = document.getElementById("prevBtn");
    if (prevBtn) prevBtn.disabled = (currentIndex === 0);
    
    const nextBtn = document.getElementById("nextBtn");
    if (nextBtn) {
        if (currentIndex === keys.length - 1) {
            nextBtn.innerHTML = 'Finish Module <i class="fa-solid fa-check"></i>';
        } else {
            nextBtn.innerHTML = 'Next Lesson <i class="fa-solid fa-arrow-right"></i>';
        }
    }
}

function navigate(direction) {
    const keys = Object.keys(lessonsData);
    const currentIndex = keys.indexOf(activeLessonId);

    if (direction === 'prev' && currentIndex > 0) {
        switchLesson(keys[currentIndex - 1]);
    } else if (direction === 'next') {
        if (currentIndex < keys.length - 1) {
            switchLesson(keys[currentIndex + 1]);
        } else {
            window.location.href = "ms-word.html";
        }
    }
}

function resetProgress() {
    completedLessons = { lesson1: false, lesson2: false, quiz1: false };
    localStorage.removeItem("msword_mod1_completed");
    updateUI();
}