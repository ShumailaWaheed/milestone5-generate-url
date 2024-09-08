document.addEventListener('DOMContentLoaded', function () {
    const toggleButton = document.getElementById('toggleSkills');
    const skillsList = document.getElementById('skillsList');
    const skillsHeading = document.querySelector('#skillsContainer h2');
    const saveButton = document.getElementById('saveChanges');
    const shareButton = document.getElementById('shareLink');
    const downloadButton = document.getElementById('downloadPdf');
    const shareUrl = document.getElementById('shareUrl');

    // Toggle Skills
    if (toggleButton && skillsList && skillsHeading) {
        toggleButton.addEventListener('click', function () {
            if (skillsList.classList.contains('hidden')) {
                skillsList.classList.remove('hidden');
                skillsHeading.style.display = 'block';
                toggleButton.textContent = 'Hide Skills';
            } else {
                skillsList.classList.add('hidden');
                skillsHeading.style.display = 'none';
                toggleButton.textContent = 'Show Skills';
            }
        });
    }

    // Save changes functionality
    if (saveButton) {
        saveButton.addEventListener('click', function() {
            alert("Changes saved successfully!");
        });
    }

    // Shareable link functionality
    if (shareButton) {
        shareButton.addEventListener('click', function() {
            shareUrl.style.display = "block";
            shareUrl.textContent = "https://example.com/shareable-link"; // Replace with actual URL
        });
    }

    // Download as PDF functionality
    if (downloadButton) {
        downloadButton.addEventListener('click', function() {
            const resumeContent = document.getElementById('resumeContent'); // Ensure this ID matches an element in your HTML
            if (resumeContent) {
                const options = {
                    margin: 1,
                    filename: 'Shumaila_Waheed_Resume.pdf',
                    image: { type: 'jpeg', quality: 0.98 },
                    html2canvas: { scale: 2 },
                    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
                };

                html2pdf().from(resumeContent).set(options).save().catch(error => {
                    console.error('Error generating PDF:', error);
                    alert('Failed to generate PDF. Please try again.');
                });
            } else {
                alert('Resume content not found.');
            }
        });
    }
});
