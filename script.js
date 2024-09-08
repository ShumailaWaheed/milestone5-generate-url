document.addEventListener('DOMContentLoaded', () => {
    function makeEditable() {
        const editableSections = document.querySelectorAll('[contenteditable="true"]');

        editableSections.forEach(section => {
            section.addEventListener('click', () => {
                const isEditable = section.isContentEditable;
                section.contentEditable = !isEditable;
                section.style.border = isEditable ? 'none' : '1px solid #ccc';
                section.focus();
            });
        });
    }

    function toggleSkills() {
        const toggleButton = document.getElementById('toggleSkills');
        const skillsList = document.getElementById('skillsList');
        const skillsHeading = document.querySelector('#skillsContainer h2');

        if (toggleButton && skillsList && skillsHeading) {
            toggleButton.addEventListener('click', () => {
                const isHidden = skillsList.classList.contains('hidden');

                if (isHidden) {
                    skillsList.classList.remove('hidden');
                    skillsHeading.style.display = 'block';
                    toggleButton.textContent = 'Hide Skills';
                } else {
                    skillsList.classList.add('hidden');
                    skillsHeading.style.display = 'none';
                    toggleButton.textContent = 'Show Skills';
                }
            });
        } else {
            console.error('Elements with the specified IDs are not found.');
        }
    }

    function saveChanges() {
        const saveButton = document.getElementById('saveChanges');
        if (saveButton) {
            saveButton.addEventListener('click', () => {
                alert('Changes saved!'); // Replace with actual save functionality
            });
        } else {
            console.error('Save button not found.');
        }
    }

    function getShareableLink() {
        const shareButton = document.getElementById('shareLink');
        const shareUrlElement = document.getElementById('shareUrl');
        if (shareButton && shareUrlElement) {
            shareButton.addEventListener('click', () => {
                const username = prompt("Enter your username");
                if (username) {
                    fetch('/create-resume', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            username: username,
                            resumeData: {
                                summary: document.querySelector('#summary p').innerText,
                                education: Array.from(document.querySelectorAll('#education .card')).map(card => card.innerText).join(' | '),
                                skills: Array.from(document.querySelectorAll('#skills .card')).map(card => card.innerText).join(' | '),
                                workExperience: Array.from(document.querySelectorAll('#work-experience .card')).map(card => card.innerText).join(' | ')
                            }
                        })
                    })
                    .then(response => response.json())
                    .then(data => {
                        shareUrlElement.style.display = 'block';
                        shareUrlElement.innerText = `Shareable Link: ${data.url}`;
                    })
                    .catch(error => console.error('Error:', error));
                }
            });
        } else {
            console.error('Share button or share URL element not found.');
        }
    }

    function downloadPdf() {
        const downloadButton = document.getElementById('downloadPdf');
        if (downloadButton) {
            downloadButton.addEventListener('click', () => {
                const username = prompt("Enter your username");
                if (username) {
                    const resumeId = prompt("Enter resume ID");
                    if (resumeId) {
                        window.open(`http://localhost:3000/download/${resumeId}`, '_blank');
                    }
                }
            });
        } else {
            console.error('Download button not found.');
        }
    }

    makeEditable();
    toggleSkills();
    saveChanges();
    getShareableLink();
    downloadPdf();
});
