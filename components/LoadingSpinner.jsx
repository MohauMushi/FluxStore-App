/**
 * LoadingSpinner Component
 *
 * This component renders a loading spinner animation using three bouncing dots.
 * It's designed to be centered on the screen and provides a visual indication
 * of loading or processing.
 *
 * @returns {JSX.Element} A div containing the loading spinner animation
 */
export default function LoadingSpinner() {
  return (
    // Container for the loading spinner, centered on the screen
    <div className="flex space-x-2 justify-center items-center h-screen dark:invert">
      {/* Screen reader text for accessibility */}
      <span className="sr-only">Loading...</span>
      {/* First bouncing dot with a slight delay */}
      <div className="h-5 w-5 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      {/* Second bouncing dot with a shorter delay */}
      <div className="h-5 w-5 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      {/* Third bouncing dot with no delay */}
      <div className="h-5 w-5 bg-black rounded-full animate-bounce"></div>
    </div>
  );
}
