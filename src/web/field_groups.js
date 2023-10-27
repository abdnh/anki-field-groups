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

function onFieldGroupChanged() {
    const fieldGroupSelect = document.querySelector("#field-groups");
    const selectedOption = Array.from(fieldGroupSelect.children).filter(
        (option) => option.selected,
    )[0];
    const fields = selectedOption.value.split(":");
    const fieldElements = document.querySelector(".fields").children;
    for (let i = 0; i < fieldElements.length; i++) {
        if (!fields.includes(fieldElements[i].dataset.fieldName)) {
            fieldElements[i].style.display = "none";
        } else {
            fieldElements[i].style.display = "contents";
        }
    }
}
