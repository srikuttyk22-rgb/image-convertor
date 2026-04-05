const dropArea = document.getElementById("dropArea");
const fileInput = document.getElementById("fileInput");
const preview = document.getElementById("preview");

dropArea.onclick = () => fileInput.click();

fileInput.addEventListener("change", handleFile);

dropArea.addEventListener("dragover", (e) => {
    e.preventDefault();
});

dropArea.addEventListener("drop", (e) => {
    e.preventDefault();
    fileInput.files = e.dataTransfer.files;
    handleFile();
});

function handleFile() {
    const file = fileInput.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = function(e) {
        preview.src = e.target.result;
        preview.style.display = "block";
    };

    reader.readAsDataURL(file);
}

function convert() {
    const file = fileInput.files[0];
    if (!file) {
        alert("Upload image first");
        return;
    }

    const format = document.getElementById("format").value;
    const widthInput = document.getElementById("width").value;
    const quality = document.getElementById("quality").value;

    const img = new Image();
    img.src = preview.src;

    img.onload = function() {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        let newWidth = widthInput || img.width;
        let newHeight = img.height * (newWidth / img.width);

        canvas.width = newWidth;
        canvas.height = newHeight;

        ctx.drawImage(img, 0, 0, newWidth, newHeight);

        const output = canvas.toDataURL(format, quality);

        const link = document.getElementById("download");
        link.href = output;
        link.download = "converted-image";
        link.style.display = "block";
        link.innerText = "Download Image";
    };
}