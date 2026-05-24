// ----------------------------------------
// Shared helper functions
// ----------------------------------------

function setMessage(message) {
    const messageBox = document.querySelector("#messageBox");

    if (messageBox) {
        messageBox.textContent = message;
        messageBox.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    }
}

function getSavedResources() {
    const savedResources = localStorage.getItem("noodleResources");

    if (!savedResources) {
        return [];
    }

    return JSON.parse(savedResources);
}

function saveResources(resources) {
    localStorage.setItem("noodleResources", JSON.stringify(resources));
}

function createEmptyState(message) {
    const emptyState = document.createElement("div");
    emptyState.className = "empty-state";
    emptyState.textContent = message;
    return emptyState;
}

// ----------------------------------------
// Student dashboard behaviour
// ----------------------------------------

const courseButtons = document.querySelectorAll(".open-course-btn");

courseButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        const courseName = button.dataset.course;

        setMessage("Planned outcome: opening the course page for " + courseName + ".");
    });
});

const checkboxes = document.querySelectorAll(".task-checkbox");

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

const focusButton = document.querySelector("#focusButton");
const assignmentPanel = document.querySelector("#assignmentPanel");

if (focusButton && assignmentPanel) {
    focusButton.addEventListener("click", function () {
        assignmentPanel.classList.add("highlight");

        setMessage("Planned outcome: highlighting urgent assignments and due-soon work.");

        setTimeout(function () {
            assignmentPanel.classList.remove("highlight");
        }, 1800);
    });
}

const courseButton = document.querySelector("#courseButton");

if (courseButton) {
    courseButton.addEventListener("click", function () {
        setMessage("Planned outcome: opening ISCG7427 Agile and Lean Software Delivery.");
    });
}

const continueButton = document.querySelector("#continueButton");

if (continueButton) {
    continueButton.addEventListener("click", function () {
        setMessage("Planned outcome: continuing Topic 5: Agile Estimation and Planning Poker.");
    });
}

const resourceButtons = document.querySelectorAll(".resource-item");

resourceButtons.forEach(function (resourceButton) {
    resourceButton.addEventListener("click", function () {
        const resourceName = resourceButton.dataset.resource;

        setMessage("Planned outcome: previewing important resource - " + resourceName + ".");
    });
});

// ----------------------------------------
// Student dashboard uploaded resources
// ----------------------------------------

const studentUploadedResources = document.querySelector("#studentUploadedResources");
const studentResourceCount = document.querySelector("#studentResourceCount");

function renderStudentDashboardResources() {
    if (!studentUploadedResources) {
        return;
    }

    const resources = getSavedResources();
    studentUploadedResources.innerHTML = "";

    if (studentResourceCount) {
        if (resources.length === 0) {
            studentResourceCount.textContent = "3 default resources";
        } else {
            studentResourceCount.textContent = "3 default + " + resources.length + " uploaded";
        }
    }

    if (resources.length === 0) {
        const emptyState = document.createElement("div");
        emptyState.className = "empty-state";
        emptyState.textContent = "No lecturer-uploaded resources yet.";
        studentUploadedResources.appendChild(emptyState);
        return;
    }

    resources.forEach(function (resource) {
        const button = document.createElement("button");
        button.className = "resource-item lecturer-uploaded-resource";
        button.type = "button";
        button.dataset.resource = resource.title;

        button.innerHTML = `
            <span>📌</span>
            <div>
                <strong>${resource.title}</strong>
                <p>${resource.description}</p>
                <small>${resource.topic} · ${resource.file}</small>
            </div>
        `;

        studentUploadedResources.appendChild(button);
    });
}

renderStudentDashboardResources();

if (studentUploadedResources) {
    studentUploadedResources.addEventListener("click", function (event) {
        const resourceButton = event.target.closest(".resource-item");

        if (!resourceButton) {
            return;
        }

        const resourceName = resourceButton.dataset.resource;

        setMessage(
            "Opening lecturer-uploaded resource: " +
            resourceName +
            ". The description was shown before opening."
        );
    });
}

const courseSearch = document.querySelector("#courseSearch");
const courseCards = document.querySelectorAll("[data-course-card]");

if (courseSearch) {
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
}

// ----------------------------------------
// Lecturer resource upload behaviour
// ----------------------------------------

const resourceUploadForm = document.querySelector("#resourceUploadForm");
const uploadedResourceList = document.querySelector("#uploadedResourceList");
const studentPreviewList = document.querySelector("#studentPreviewList");
const resourceCount = document.querySelector("#resourceCount");
const resourceListLabel = document.querySelector("#resourceListLabel");
const saveResourceButton = document.querySelector("#saveResourceButton");
const clearFormButton = document.querySelector("#clearFormButton");
const jumpToUploadButton = document.querySelector("#jumpToUploadButton");
const viewStudentPreviewButton = document.querySelector("#viewStudentPreviewButton");
const showEvidenceButton = document.querySelector("#showEvidenceButton");

let editingResourceId = null;

function resetResourceForm() {
    if (!resourceUploadForm) {
        return;
    }

    resourceUploadForm.reset();
    editingResourceId = null;

    if (saveResourceButton) {
        saveResourceButton.textContent = "Save resource";
    }
}

function renderLecturerResources() {
    if (!uploadedResourceList && !studentPreviewList) {
        return;
    }

    const resources = getSavedResources();

    if (resourceCount) {
        resourceCount.textContent = resources.length;
    }

    if (resourceListLabel) {
        resourceListLabel.textContent = resources.length + (resources.length === 1 ? " item" : " items");
    }

    if (uploadedResourceList) {
        uploadedResourceList.innerHTML = "";

        if (resources.length === 0) {
            uploadedResourceList.appendChild(createEmptyState("No uploaded resources yet. Add one using the form on the left."));
        } else {
            resources.forEach(function (resource) {
                const card = document.createElement("div");
                card.className = "managed-resource-card";

                card.innerHTML = `
                    <div class="resource-meta">
                        <span class="resource-topic-tag">${resource.topic}</span>
                        <span class="resource-file-tag">${resource.file}</span>
                    </div>
                    <h3>${resource.title}</h3>
                    <p>${resource.description}</p>
                    <div class="resource-actions">
                        <button class="small-action-button edit-resource-button" data-edit-id="${resource.id}">Edit description</button>
                        <button class="small-action-button delete-resource-button" data-delete-id="${resource.id}">Delete</button>
                    </div>
                `;

                uploadedResourceList.appendChild(card);
            });
        }
    }

    if (studentPreviewList) {
        studentPreviewList.innerHTML = "";

        if (resources.length === 0) {
            studentPreviewList.appendChild(createEmptyState("Student preview is empty until a lecturer uploads a resource."));
        } else {
            resources.forEach(function (resource) {
                const card = document.createElement("article");
                card.className = "student-preview-card";

                card.innerHTML = `
                    <div class="resource-meta">
                        <span class="resource-topic-tag">${resource.topic}</span>
                    </div>
                    <h3>${resource.title}</h3>
                    <p>${resource.description}</p>
                    <button class="small-action-button" type="button">Open resource</button>
                `;

                studentPreviewList.appendChild(card);
            });
        }
    }
}

if (resourceUploadForm) {
    renderLecturerResources();

    resourceUploadForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const topic = document.querySelector("#courseTopic").value;
        const title = document.querySelector("#resourceTitle").value.trim();
        const file = document.querySelector("#resourceFile").value.trim();
        const description = document.querySelector("#resourceDescription").value.trim();

        const resources = getSavedResources();

        if (editingResourceId) {
            const resourceToEdit = resources.find(function (resource) {
                return resource.id === editingResourceId;
            });

            if (resourceToEdit) {
                resourceToEdit.topic = topic;
                resourceToEdit.title = title;
                resourceToEdit.file = file;
                resourceToEdit.description = description;
            }

            saveResources(resources);
            renderLecturerResources();
            resetResourceForm();
            setMessage("Updated resource description successfully. Students can now see the edited description before opening the resource.");
            return;
        }

        const newResource = {
            id: Date.now().toString(),
            topic: topic,
            title: title,
            file: file,
            description: description
        };

        resources.push(newResource);
        saveResources(resources);
        renderLecturerResources();
        resetResourceForm();
        setMessage("Resource uploaded successfully. The title and description now appear in the lecturer list and student preview.");
    });
}

if (uploadedResourceList) {
    uploadedResourceList.addEventListener("click", function (event) {
        const editButton = event.target.closest("[data-edit-id]");
        const deleteButton = event.target.closest("[data-delete-id]");

        if (editButton) {
            const resourceId = editButton.dataset.editId;
            const resources = getSavedResources();
            const resourceToEdit = resources.find(function (resource) {
                return resource.id === resourceId;
            });

            if (resourceToEdit) {
                document.querySelector("#courseTopic").value = resourceToEdit.topic;
                document.querySelector("#resourceTitle").value = resourceToEdit.title;
                document.querySelector("#resourceFile").value = resourceToEdit.file;
                document.querySelector("#resourceDescription").value = resourceToEdit.description;

                editingResourceId = resourceId;

                if (saveResourceButton) {
                    saveResourceButton.textContent = "Update resource";
                }

                resourceUploadForm.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

                setMessage("Editing selected resource. Update the description and save again.");
            }
        }

        if (deleteButton) {
            const resourceId = deleteButton.dataset.deleteId;
            const resources = getSavedResources().filter(function (resource) {
                return resource.id !== resourceId;
            });

            saveResources(resources);
            renderLecturerResources();
            resetResourceForm();
            setMessage("Resource removed from the lecturer list and student preview.");
        }
    });
}

if (clearFormButton) {
    clearFormButton.addEventListener("click", function () {
        resetResourceForm();
        setMessage("Resource form cleared.");
    });
}

if (jumpToUploadButton && resourceUploadForm) {
    jumpToUploadButton.addEventListener("click", function () {
        resourceUploadForm.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    });
}

if (viewStudentPreviewButton && studentPreviewList) {
    viewStudentPreviewButton.addEventListener("click", function () {
        studentPreviewList.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    });
}

if (showEvidenceButton) {
    showEvidenceButton.addEventListener("click", function () {
        setMessage("TDD-style check: Given a lecturer enters a topic, title, file/link, and description, when they save the resource, then the resource title and description display for lecturer and student preview.");
    });
}
