const uploadFileInput = document.getElementById("upload-file-input");
const cloudMonsterDom = document.getElementById("cloud-monster");
const uploadFileModalDom = document.getElementById(
    "cloud-monster-upload-file-modal"
);
const storageModalDom = document.getElementById("cloud-monster-storage-modal");

cloudMonsterDom.addEventListener("mouseover", () => {
    console.log("hover");
    cloudMonsterDom.classList.add("active");
    storageModalDom.classList.add("show");
});

cloudMonsterDom.addEventListener("mouseleave", () => {
    console.log("mouseleave");
    cloudMonsterDom.classList.remove("active");
    storageModalDom.classList.remove("show");
});

uploadFileInput.addEventListener("change", () => {
    console.log("uploadFileInput change");
    cloudMonsterDom.classList.add("active");
    uploadFileModalDom.classList.add("show");

    setTimeout(() => {
        cloudMonsterDom.classList.remove("active");
        uploadFileModalDom.classList.remove("show");
    }, 3000);
});
