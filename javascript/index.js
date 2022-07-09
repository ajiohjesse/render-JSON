import stringValidator from "./stringValidator.js";

const validString = new stringValidator();

const title = document.getElementById("title");
const type = document.getElementById("type");
const imgUrl = document.getElementById("imgUrl");
const details = document.getElementById("details");
const link = document.getElementById("link");
const btn = document.getElementById("submit-btn");
const message = document.querySelector(".message");

const page = document.getElementById("page");

btn.addEventListener("click", (e) => {
  e.preventDefault();

  let source = "";
  if (page.dataset.id === "HTML") {
    source =
      "https://getpantry.cloud/apiv1/pantry/36d21064-c792-42f9-b80b-f9fd0c7a5dc5/basket/html-tutorial";
  } else if (page.dataset.id === "CSS") {
    source = "http://localhost:8080/htmlTutorial";
  } else if (page.dataset.id === "JAVASCRIPT") {
    source = "http://localhost:8080/htmlTutorial";
  }

  if (
    validString.isEmpty(title.value) ||
    validString.isEmpty(type.value) ||
    validString.isEmpty(imgUrl.value) ||
    validString.isEmpty(details.value) ||
    validString.isEmpty(link.value)
  ) {
    alert("All inputs are mandatory");
  } else {
    let id = new Date().getTime();

    const data = {
      id,
      title: title.value.toLowerCase(),
      type: type.value.toLowerCase(),
      imgUrl: imgUrl.value.toLowerCase(),
      details: details.value.toLowerCase(),
      link: link.value.toLowerCase(),
    };

    const request = new XMLHttpRequest();
    request.open("GET", source);
    request.setRequestHeader("Accept", "application/json");
    request.setRequestHeader("Content-Type", "application/json");

    request.onload = () => {
      if (request.status >= 200 && request.status < 400) {
        renderMessage("Recieved data.", "success");
        const response = JSON.parse(request.responseText);
        const tutorial = response.tutorial;
        tutorial.push(data);
        const newData = JSON.stringify({ tutorial: [...tutorial] });

        const upload = new XMLHttpRequest();

        upload.open("POST", source);

        upload.setRequestHeader("Accept", "application/json");

        upload.setRequestHeader("Content-Type", "application/json");

        upload.onload = () => {
          if (request.status >= 200 && request.status < 400) {
            renderMessage("Upload successful.", "success");
            title.value = "";
            type.value = "";
            imgUrl.value = "";
            details.value = "";
            link.value = "";
          } else {
            renderMessage("Upload failed.", "danger");
          }
        };

        upload.onerror = () => {
          renderMessage("Error in connection.", "danger");
        };

        upload.send(newData);
      } else {
        renderMessage("Get data failed.", "danger");
      }
    };

    request.onerror = () => {
      renderMessage("Error in connection.", "danger");
    };

    request.send();
  }
});

const renderMessage = (msg, classname) => {
  message.textContent = msg;
  message.classList.remove("success");
  message.classList.remove("danger");
  message.classList.add(classname);

  setTimeout(() => {
    message.classList.remove("success");
    message.classList.remove("danger");
  }, 5000);
};
