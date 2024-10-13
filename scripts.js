// Listen for form submission
document.getElementById('classSelectionForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission

    // Get form values
    const selectedClass = document.getElementById('classSelect').value;
    const day = document.getElementById('day').value;
    const programText = document.getElementById('program').value;
    const imageFile = document.getElementById('imageUpload').files[0];
    const voiceNoteFile = document.getElementById('voiceNote').files[0];

    if (imageFile && imageFile.type === 'image/jpeg' && voiceNoteFile && voiceNoteFile.type === 'audio/mpeg') {
        const reader = new FileReader();
        reader.onload = function (e) {
            const imageUrl = e.target.result;
            displayUpdate(selectedClass, day, programText, imageUrl, voiceNoteFile);
        };

        // Read the image file as a Data URL
        reader.readAsDataURL(imageFile);
    } else {
        alert('Please upload valid JPEG image and MP3 voice note.');
    }
});

// Function to display update
function displayUpdate(selectedClass, day, programText, imageUrl, voiceNoteFile) {
    const updatesContainer = document.getElementById('updatesContainer');

    // Create a new update item
    const updateItem = document.createElement('div');
    updateItem.classList.add('update-item');

    // Add class name, day, and program text
    const classTitle = document.createElement('h3');
    classTitle.textContent = `${selectedClass} - ${day}`;
    updateItem.appendChild(classTitle);

    const programParagraph = document.createElement('p');
    programParagraph.textContent = programText;
    updateItem.appendChild(programParagraph);

    // Add image
    const image = document.createElement('img');
    image.src = imageUrl;
    updateItem.appendChild(image);

    // Add audio (voice note)
    const audio = document.createElement('audio');
    audio.controls = true;
    const audioSource = document.createElement('source');
    audioSource.src = URL.createObjectURL(voiceNoteFile);
    audioSource.type = 'audio/mpeg';
    audio.appendChild(audioSource);
    updateItem.appendChild(audio);

    // Append the update item to the container
    updatesContainer.appendChild(updateItem);

    // Clear the form fields
    document.getElementById('classSelectionForm').reset();
}
