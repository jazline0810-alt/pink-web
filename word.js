// 1. Kunin muna ang lumang progress o gumawa ng bago (isang beses lang ide-clare)
let wordProgress = JSON.parse(localStorage.getItem("word_progress")) || {};

// Function para ma-mark na tapos na ang Module 1
function completeModule1() {
    wordProgress.mod1 = true;
    localStorage.setItem("word_progress", JSON.stringify(wordProgress));
}

// Function para ma-mark na tapos na ang Module 2
function completeModule2() {
    wordProgress.mod2 = true;
    localStorage.setItem("word_progress", JSON.stringify(wordProgress));
}

// Function para ma-mark na tapos na ang Module 3
function completeModule3() {
    wordProgress.mod3 = true;
    localStorage.setItem("word_progress", JSON.stringify(wordProgress));
}