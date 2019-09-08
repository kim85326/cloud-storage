"use strict";

var uploadFileInput = document.getElementById("upload-file-input");
var cloudMonsterDom = document.getElementById("cloud-monster");
var uploadFileModalDom = document.getElementById("cloud-monster-upload-file-modal");
var storageModalDom = document.getElementById("cloud-monster-storage-modal");
cloudMonsterDom.addEventListener("mouseover", function () {
  console.log("hover");
  cloudMonsterDom.classList.add("active");
  storageModalDom.classList.add("show");
});
cloudMonsterDom.addEventListener("mouseleave", function () {
  console.log("mouseleave");
  cloudMonsterDom.classList.remove("active");
  storageModalDom.classList.remove("show");
});
uploadFileInput.addEventListener("change", function () {
  console.log("uploadFileInput change");
  cloudMonsterDom.classList.add("active");
  uploadFileModalDom.classList.add("show");
  setTimeout(function () {
    cloudMonsterDom.classList.remove("active");
    uploadFileModalDom.classList.remove("show");
  }, 3000);
});
//# sourceMappingURL=index.js.map
