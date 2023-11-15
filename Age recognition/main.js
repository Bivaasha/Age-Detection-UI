document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('imageInput').addEventListener('change', handleImageUpload);
});

function handleImageUpload(e) {
    const image = document.getElementById('imagePreview');
    const file = e.target.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function (event) {
            image.src = event.target.result;
        };
        reader.readAsDataURL(file);
    }
}

function captureImage() {
    const image = document.getElementById('imagePreview');
    
    // Use the getUserMedia API to capture an image from the camera
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(function (stream) {
            const video = document.createElement('video');
            document.body.appendChild(video);

            video.srcObject = stream;
            video.play();

            // Capture a frame from the video stream after a delay
            setTimeout(function () {
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                context.drawImage(video, 0, 0, canvas.width, canvas.height);

                // Convert the canvas content to a data URL and set it as the image source
                image.src = canvas.toDataURL('image/png');

                // Stop the video stream and remove the video element
                stream.getTracks().forEach(track => track.stop());
                document.body.removeChild(video);
            }, 1000); // Adjust the delay as needed
        })
        .catch(function (error) {
            console.error('Error accessing camera:', error);
        });
}
