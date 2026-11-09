// Kunin muna ang lumang progress o gumawa ng bago
let pptProgress = JSON.parse(localStorage.getItem("powerpoint_progress")) || {};

// I-mark na tapos na ang Module 1
pptProgress.mod1 = true;

// I-save pabalik sa localStorage
localStorage.setItem("powerpoint_progress", JSON.stringify(pptProgress));
// Kunin ang progress
let pptProgress = JSON.parse(localStorage.getItem("powerpoint_progress")) || {};

// I-mark na tapos na ang Module 2
pptProgress.mod2 = true;

// I-save pabalik sa localStorage
localStorage.setItem("powerpoint_progress", JSON.stringify(pptProgress));
// Kunin ang progress
let pptProgress = JSON.parse(localStorage.getItem("powerpoint_progress")) || {};

// I-mark na tapos na ang Module 2
pptProgress.mod2 = true;

// I-save pabalik sa localStorage
localStorage.setItem("powerpoint_progress", JSON.stringify(pptProgress));
