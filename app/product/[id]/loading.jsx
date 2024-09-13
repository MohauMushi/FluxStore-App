import LoadingSpinner from "../../../components/LoadingSpinner";

/**
 * Loading component to be displayed while content is being fetched.
 * @returns {JSX.Element} A centered loading spinner.
 */
export default function Loading() {
  return (
    // Container for the loading spinner with full-screen height
    <div className="container mx-auto px-4 py-8 h-screen">
      {/* Loading spinner component */}
      <LoadingSpinner />
    </div>
  );
}
