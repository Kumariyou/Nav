let imageHistory = [];
let currentImageIndex = -1;

function uploadImage(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(event) {
        const imageUrl = event.target.result;
        const imageElement = document.createElement("img");
        imageElement.src = imageUrl;
        imageElement.classList.add("imagePreview");
        imageElement.addEventListener("click", () => selectImage(imageElement));
        document.getElementById("imageContainer").appendChild(imageElement);

        // Store image URL in history
        imageHistory.push(imageUrl);
        currentImageIndex = imageHistory.length - 1;
    };
    reader.readAsDataURL(file);
}

function deleteImage() {
    if (currentImageIndex >= 0) {
        const imageElement = document.querySelector(".imagePreview.selected");
        if (imageElement) {
            imageElement.remove();
            imageHistory.splice(currentImageIndex, 1);
            currentImageIndex--;
        }
    }
}

function undo() {
    if (currentImageIndex > 0) {
        currentImageIndex--;
        displayImageFromHistory();
    }
}

function redo() {
    if (currentImageIndex < imageHistory.length - 1) {
        currentImageIndex++;
        displayImageFromHistory();
    }
}

function selectImage(imageElement) {
    document.querySelectorAll(".imagePreview").forEach(img => img.classList.remove("selected"));
    imageElement.classList.add("selected");
}

function displayImageFromHistory() {
    const imageUrl = imageHistory[currentImageIndex];
    const imageElement = document.createElement("img");
    imageElement.src = imageUrl;
    imageElement.classList.add("imagePreview");
    imageElement.addEventListener("click", () => selectImage(imageElement));
    document.getElementById("imageContainer").appendChild(imageElement);
}
document.getElementById("uploadInput").addEventListener("change", uploadImage);
