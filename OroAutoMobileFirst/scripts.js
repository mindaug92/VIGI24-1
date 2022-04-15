let form = document.querySelector("#reservation-form");

let makeAdditionalGadgetsClickable = (() => {
  let additionalItems = form.querySelectorAll(".additional-item");
  for (let i = 0; i < additionalItems.length; i++) {
    let item = additionalItems[i];
    item.addEventListener("click", () => {
      let checkbox = item.querySelector("input[type='checkbox']");
      checkbox.addEventListener("click", (e) => e.stopPropagation());
      checkbox.checked = !checkbox.checked;
    });
  }
})();

let alertData = (name, lastname, personalCode) => {
  alert(`Vardas: ${name}\nPavarde: ${lastname}\nAsmens kodas: ${personalCode}`);
};

let handleSubmit = (e) => {
  e.preventDefault();
  alertData(form.name.value, form.lastname.value, form.personalCode.value);
};

form.addEventListener("submit", handleSubmit);
