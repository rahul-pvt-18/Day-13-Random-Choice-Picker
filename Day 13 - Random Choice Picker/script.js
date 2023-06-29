// Get the DOM element with ID 'tags'
const tagsEl = document.getElementById('tags');

// Get the DOM element with ID 'textarea'
const textArea = document.getElementById('textarea');

// Set focus on the textarea when the page loads
textArea.focus();

// Add event listener for 'keyup' event on the textarea
textArea.addEventListener('keyup', (e) => {
    // Call the createTags function with the current textarea value
    createTags(e.target.value);
    
    // Check if the Enter key was pressed
    if (e.key === 'Enter') {
        // Set a timeout to clear the textarea value after a small delay
        setTimeout(() => {
            e.target.value = '';
        }, 10);
        
        // Call the randomSelect function to randomly select a tag
        randomSelect();
    }
});

// Function to create tags based on user input
function createTags(input) {
    // Split the input string by commas, remove any empty or whitespace-only tags, and trim leading/trailing whitespace
    const tags = input.split(',').filter(tag => tag.trim() !== '').map(tag => tag.trim());

    // Clear the existing tags in the tagsEl container
    tagsEl.innerHTML = '';

    // Create and append a span element for each tag in the tags array
    tags.forEach(tag => {
        const tagEl = document.createElement('span');
        tagEl.classList.add('tag');
        tagEl.innerText = tag;
        tagsEl.appendChild(tagEl);
    });
}

// Function to randomly select a tag and highlight/unhighlight it
function randomSelect() {
    const times = 30; // Number of times to highlight/unhighlight a tag
    const interval = setInterval(() => {
        // Pick a random tag
        const randomTag = pickRandomTag();
        
        // Highlight the tag
        highlightTag(randomTag);
        
        // Set a timeout to unhighlight the tag after a short delay
        setTimeout(() => {
            unHighlightTag(randomTag);
        }, 100);
    }, 100);

    // Set a timeout to stop the interval and highlight a random tag after 'times' iterations
    setTimeout(() => {
        clearInterval(interval);
        setTimeout(() => {
            // Pick a random tag
            const randomTag = pickRandomTag();
            
            // Highlight the tag
            highlightTag(randomTag);
        }, 100);
    }, times * 100);
}

// Function to pick a random tag from the DOM
function pickRandomTag() {
    const tags = document.querySelectorAll('.tag');
    return tags[Math.floor(Math.random() * tags.length)];
}

// Function to highlight a tag by adding the 'highlight' class
function highlightTag(tag) {
    tag.classList.add('highlight');
}

// Function to unhighlight a tag by removing the 'highlight' class
function unHighlightTag(tag) {
    tag.classList.remove('highlight');
}
