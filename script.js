function convertImage() {
    const fileInput = document.getElementById("upload");
    const format = document.getElementById("format").value;

    const file = fileInput.files[0];

    if (!file) {
        alert("Please upload an image");
        return;
    }

    const img = new Image();
    const reader = new FileReader();

    reader.onload = function(e) {
        img.src = e.target.result;
    };

    reader.readAsDataURL(file);

    img.onload = function() {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = img.width;
        canvas.height = img.height;

        ctx.drawImage(img, 0, 0);

        const converted = canvas.toDataURL(format);

        const link = document.getElementById("downloadLink");
        link.href = converted;
        link.download = "converted-image";
        link.style.display = "block";
        link.innerText = "Download Image";
    };
}