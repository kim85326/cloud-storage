"use strict";

var uploadFileInput = document.getElementById("upload-file-input");
var cloudMonsterDom = document.getElementById("cloud-monster");
var uploadFileModalDom = document.getElementById("cloud-monster-upload-file-modal");
var storageModalDom = document.getElementById("cloud-monster-storage-modal");
cloudMonsterDom.addEventListener("mouseover", function () {
  cloudMonsterDom.classList.add("active");
  storageModalDom.classList.add("show");
});
cloudMonsterDom.addEventListener("mouseleave", function () {
  cloudMonsterDom.classList.remove("active");
  storageModalDom.classList.remove("show");
});
uploadFileInput.addEventListener("change", function () {
  cloudMonsterDom.classList.add("active");
  uploadFileModalDom.classList.add("show");
  fakeProgress();
  setTimeout(function () {
    cloudMonsterDom.classList.remove("active");
    uploadFileModalDom.classList.remove("show");
  }, 5500);
});

function fakeProgress() {
  var descrition = uploadFileModalDom.querySelector(".cloud-monster-modal-description");
  var progress = uploadFileModalDom.querySelector(".progress-bar-value");
  descrition.innerText = "剩餘5秒";
  progress.style.width = "0%";
  setTimeout(function () {
    descrition.innerText = "剩餘4秒";
    progress.style.width = "20%";
  }, 1000);
  setTimeout(function () {
    descrition.innerText = "剩餘3秒";
    progress.style.width = "50%";
  }, 2000);
  setTimeout(function () {
    descrition.innerText = "剩餘2秒";
    progress.style.width = "60%";
  }, 3000);
  setTimeout(function () {
    descrition.innerText = "剩餘1秒";
    progress.style.width = "70%";
  }, 4000);
  setTimeout(function () {
    descrition.innerText = "剩餘0秒";
    progress.style.width = "100%";
  }, 5000);
}
//# sourceMappingURL=index.js.map
