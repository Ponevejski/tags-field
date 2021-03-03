"use strict";

const tagField = document.querySelector(".tag-field");
const tagInput = document.querySelector(".fields input");
const addBtn = document.querySelector(".fields button");
const readOnlyBtn = document.querySelector("#read");
let storage = null;

if (localStorage.getItem("storage")) {
  tagField.innerHTML = localStorage.getItem("storage");
}

function toLocal() {
  storage = tagField.innerHTML;
  localStorage.setItem("storage", storage);
}

function newElement() {
  let tag = document.createElement("p");
  tag.classList.add("tag");

  let inputValue = tagInput.value;
  let text = document.createTextNode(inputValue);
  tag.append(text);

  if (inputValue == "") {
    alert("Empty data");
  } else {
    tagField.prepend(tag);
  }
  tagInput.value = "";

  let closeBtn = document.createElement("span");
  let closeBtnText = document.createTextNode("X");
  closeBtn.classList.add("close");
  closeBtn.append(closeBtnText);
  tag.append(closeBtn);
  toLocal();
}

function removeTag(event) {
  const target = event.target;
  if (target.tagName === "SPAN") {
    let del = target.parentNode;
    del.remove();
    toLocal();
  }
}

function readOnlyMode() {
  if (tagInput.disabled == false) {
    tagInput.disabled = true;
    addBtn.removeEventListener("click", newElement);
    tagField.removeEventListener("click", removeTag);
  } else {
    tagInput.disabled = false;
    addBtn.addEventListener("click", newElement);
    tagField.addEventListener("click", removeTag);
  }
}

readOnlyBtn.addEventListener("click", readOnlyMode);

addBtn.addEventListener("click", newElement);

tagField.addEventListener("click", removeTag);
