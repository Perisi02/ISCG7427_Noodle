// ----------------------------------------
// Course button behaviour
// ----------------------------------------

// Finds all buttons with the class "open-course-btn"
const courseButtons = document.querySelectorAll(".open-course-btn");

// Finds the message box at the bottom of the page
const messageBox = document.querySelector("#messageBox");

// Adds a click event to each course button
courseButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        const courseName = button.dataset.course;

        messageBox.textContent =
            "Planned outcome: opening the course page for " + courseName + ".";

        messageBox.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    });
});

// ----------------------------------------
// Checkbox task completion behaviour
// ----------------------------------------

// Finds all task checkboxes
const checkboxes = document.querySelectorAll(".task-checkbox");

// When a checkbox is ticked, the related task becomes faded/struck through
checkboxes.forEach(function (checkbox) {
    checkbox.addEventListener("change", function () {
        const taskItem = checkbox.closest("li");

        if (checkbox.checked) {
            taskItem.classList.add("completed-task");
        } else {
            taskItem.classList.remove("completed-task");
        }
    });
});

// ----------------------------------------
// Urgent work button behaviour
// ----------------------------------------

const focusButton = document.querySelector("#focusButton");
const assignmentPanel = document.querySelector("#assignmentPanel");

focusButton.addEventListener("click", function () {
    assignmentPanel.classList.add("highlight");

    messageBox.textContent =
        "Planned outcome: highlighting urgent assignments and due-soon work.";

    setTimeout(function () {
        assignmentPanel.classList.remove("highlight");
    }, 1800);

    assignmentPanel.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
});

// ----------------------------------------
// Open Agile course shortcut
// ----------------------------------------

const courseButton = document.querySelector("#courseButton");

courseButton.addEventListener("click", function () {
    messageBox.textContent =
        "Planned outcome: opening ISCG7427 Agile and Lean Software Delivery.";

    messageBox.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
});

// ----------------------------------------
// Continue learning button planned outcome
// ----------------------------------------

const continueButton = document.querySelector("#continueButton");

continueButton.addEventListener("click", function () {
    messageBox.textContent =
        "Planned outcome: continuing Topic 5: Agile Estimation and Planning Poker.";

    messageBox.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
});

// ----------------------------------------
// Important resource planned outcome
// ----------------------------------------

const resourceButtons = document.querySelectorAll(".resource-item");

resourceButtons.forEach(function (resourceButton) {
    resourceButton.addEventListener("click", function () {
        const resourceName = resourceButton.dataset.resource;

        messageBox.textContent =
            "Planned outcome: previewing important resource - " + resourceName + ".";

        messageBox.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    });
});

// ----------------------------------------
// Basic course search/filter behaviour
// ----------------------------------------

const courseSearch = document.querySelector("#courseSearch");
const courseCards = document.querySelectorAll("[data-course-card]");

courseSearch.addEventListener("input", function () {
    const searchText = courseSearch.value.toLowerCase();

    courseCards.forEach(function (card) {
        const cardText = card.textContent.toLowerCase();

        if (cardText.includes(searchText)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
});