// --- 1. SETUP ---
// Create a canvas element and get its 2D rendering context
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');

// Add the canvas to the HTML document
document.body.appendChild(canvas);

// Global variables
let trail = [];
let isDrawing = false;

// Function to set canvas size
function setCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

// Initial setup
setCanvasSize();

// --- 2. EVENT LISTENERS ---
// Listen for window resizing
window.addEventListener('resize', setCanvasSize);

// Mouse Events
canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    addParticle(e.clientX, e.clientY); // Add particle on initial click
});

canvas.addEventListener('mousemove', (e) => {
    if (isDrawing) {
        addParticle(e.clientX, e.clientY);
    }
});

canvas.addEventListener('mouseup', () => {
    isDrawing = false;
});

// Touch Events
canvas.addEventListener('touchstart', (e) => {
    e.preventDefault(); // Prevent default browser actions (like scrolling)
    isDrawing = true;
    // Use the first touch point
    addParticle(e.touches[0].clientX, e.touches[0].clientY);
});

canvas.addEventListener('touchmove', (e) => {
    e.preventDefault();
    if (isDrawing) {
        addParticle(e.touches[0].clientX, e.touches[0].clientY);
    }
});

canvas.addEventListener('touchend', () => {
    isDrawing = false;
});


// --- 3. PARTICLE LOGIC ---
// A function to create and add a particle to the trail
function addParticle(x, y) {
    const particle = {
        x: x,
        y: y,
        size: Math.random() * 30 + 20, // Random size between 20 and 50
        alpha: 1.0 // Start fully opaque (alpha is 0.0 to 1.0)
    };
    trail.push(particle);
}


// --- 4. ANIMATION LOOP ---
function animate() {
    // Set a semi-transparent background to create the fading trail effect
    ctx.fillStyle = 'rgba(40, 40, 40, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Loop backwards through the trail to safely remove particles
    for (let i = trail.length - 1; i >= 0; i--) {
        const p = trail[i];

        // Start drawing the particle
        ctx.beginPath();
        // Set the particle's color and fade it out with alpha
        ctx.fillStyle = `rgba(200, 200, 200, ${p.alpha})`;
        // Create a circle (arc from 0 to 2*PI)
        ctx.arc(p.x, p.y, p.size / 2, 0, Math.PI * 2);
        ctx.fill();

        // Update the particle's alpha
        p.alpha -= 0.02;

        // Remove the particle if it's fully faded
        if (p.alpha <= 0) {
            trail.splice(i, 1);
        }
    }

    // Request the next frame to continue the loop
    requestAnimationFrame(animate);
}

// Start the animation!
animate();