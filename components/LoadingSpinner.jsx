export default function LoadingSpinner() {
  return (
    <div class="flex space-x-2 justify-center items-center h-screen dark:invert">
      <span class="sr-only">Loading...</span>
      <div class="h-5 w-5 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div class="h-5 w-5 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div class="h-5 w-5 bg-black rounded-full animate-bounce"></div>
    </div>
  );
}
