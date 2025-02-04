// Function to handle when an element enters the viewport
function handleIntersection(entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Add fade-in-up class to trigger the animation
        entry.target.classList.add('fade-in-up');
        observer.unobserve(entry.target); // Stop observing once the animation is triggered
      }
    });
  }
  
  // Create an intersection observer to watch elements
  const observer = new IntersectionObserver(handleIntersection, {
    threshold: 0.5, // 50% of the element must be visible
  });
  
  // Target elements to animate
  const elementsToAnimate = document.querySelectorAll('.animate');
  
  elementsToAnimate.forEach(element => {
    observer.observe(element); // Observe each element
  });
  