function attachFieldGroupsEventListeners() {
    require("anki/ui").loaded.then(() => {
        let intervalId = setInterval(() => {
            const fieldGroupSelect = document.querySelector("#field-groups");
            if (fieldGroupSelect) {
                clearInterval(intervalId);
            }
            fieldGroupSelect.addEventListener("input", () => {
                const selectedOption = Array.from(
                    fieldGroupSelect.children,
                ).filter((option) => option.selected)[0];
                const fields = selectedOption.value.split(":");
                const fieldElements =
                    document.querySelector(".fields").children;
                for (let i = 0; i < fieldElements.length; i++) {
                    if (!fieldElements[i].dataset.fieldName) {
                        continue;
                    }
                    if (!fields.includes(fieldElements[i].dataset.fieldName)) {
                        fieldElements[i].style.display = "none";
                    } else {
                        fieldElements[i].style.display = "contents";
                    }
                }
            });
        }, 100);
    });
}

function updateFieldGroups(allFields, fieldGroups) {
    const fieldElements = document.querySelector(".fields").children;
    for (let i = 0; i < fieldElements.length; i++) {
        if (allFields[i]) {
            fieldElements[i].dataset.fieldName = allFields[i];
        }
    }
    const fieldGroupSelect = document.querySelector("#field-groups");
    fieldGroupSelect.innerHTML = "";
    for (const fieldGroup of fieldGroups) {
        const option = document.createElement("option");
        option.value = fieldGroup.fields.join(":");
        option.textContent = fieldGroup.name;
        fieldGroupSelect.appendChild(option);
    }
}
