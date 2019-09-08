const uploadFileInput = document.getElementById("upload-file-input");
const cloudMonsterDom = document.getElementById("cloud-monster");
const uploadFileModalDom = document.getElementById(
    "cloud-monster-upload-file-modal"
);
const storageModalDom = document.getElementById("cloud-monster-storage-modal");

cloudMonsterDom.addEventListener("mouseover", () => {
    cloudMonsterDom.classList.add("active");
    storageModalDom.classList.add("show");
});

cloudMonsterDom.addEventListener("mouseleave", () => {
    cloudMonsterDom.classList.remove("active");
    storageModalDom.classList.remove("show");
});

uploadFileInput.addEventListener("change", () => {
    cloudMonsterDom.classList.add("active");
    uploadFileModalDom.classList.add("show");

    fakeProgress();

    setTimeout(() => {
        cloudMonsterDom.classList.remove("active");
        uploadFileModalDom.classList.remove("show");
    }, 5500);
});

function fakeProgress() {
    const descrition = uploadFileModalDom.querySelector(
        ".cloud-monster-modal-description"
    );
    const progress = uploadFileModalDom.querySelector(".progress-bar-value");
    descrition.innerText = "剩餘5秒";
    progress.style.width = "0%";

    setTimeout(() => {
        descrition.innerText = "剩餘4秒";
        progress.style.width = "20%";
    }, 1000);

    setTimeout(() => {
        descrition.innerText = "剩餘3秒";
        progress.style.width = "50%";
    }, 2000);

    setTimeout(() => {
        descrition.innerText = "剩餘2秒";
        progress.style.width = "60%";
    }, 3000);

    setTimeout(() => {
        descrition.innerText = "剩餘1秒";
        progress.style.width = "70%";
    }, 4000);

    setTimeout(() => {
        descrition.innerText = "剩餘0秒";
        progress.style.width = "100%";
    }, 5000);
}
