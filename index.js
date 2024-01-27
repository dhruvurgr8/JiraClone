const form = document.querySelector(".form");
form.addEventListener("submit", formData);
const containers = document.querySelectorAll(".drop"); //get all the containers to add drop event
let draggableElement = null;

function formData(e) {
  e.preventDefault();
  const data = {
    developer: form.developer.value,
    title: form.title.value,
    description: form.description.value,
    status: form.status.value,
    time: form.deadline.value,
  };
  const divs = document.getElementsByClassName(data.status)[0]; //Accessing div where we have to append content
  const content = document.createElement("div");
  content.draggable = "true";
  content.addEventListener("dragstart", dragStart); // adding dragStart event

  content.className = "content";
  // function for dragStart
  function dragStart(e) {
    draggableElement = e.currentTarget;
    console.log(draggableElement);
  }
  // Adding html for whole div which is to be appended
  content.innerHTML = `
  

  <div>
    <p class="title">${data.title}</p>
    <p class="description">${data.description}</p>
  </div>
  <div class="user-info">
    <span class="time">${data.time} Days</span>
    <span class="profile" width="20px">${data.developer[0]}</span>
  </div>
  `;
  divs.appendChild(content);
}

// adding drop event
for (i = 0; i < containers.length; i++) {
  containers[i].addEventListener("dragover", (e) => {
    if (draggableElement.parentNode.id == e.currentTarget.id) {
      return;
    }
    e.preventDefault();
  });
  containers[i].addEventListener("drop", dropping);
}
// function for drop event
function dropping(e) {
  e.currentTarget.appendChild(draggableElement);
}
