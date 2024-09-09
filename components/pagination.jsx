export default function Pagination({ currentPage, onPageChange }) {
  return (
    <div className="flex justify-center items-center mr-7 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex justify-center items-center px-4 py-2 mr-2 bg-teal-500 hover:bg-teal-600 text-white rounded disabled:bg-gray-300"
      >
        <svg
          fill="#fff"
          className="h-5 w-5"
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <path d="M 26 6 L 6 15.21875 L 6 16.78125 L 26 26 L 26 23.84375 L 9.46875 16 L 26 8.15625 Z"></path>
          </g>
        </svg>
        Previous
      </button>
      <span className="px-4 py-2">{currentPage}</span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        className="flex justify-center items-center px-4 py-2 ml-2 bg-teal-500 hover:bg-teal-600 text-white rounded"
      >
        Next
        <svg
          fill="#fff"
          className="h-5 w-5"
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <path d="M 6 6 L 6 8.15625 L 22.53125 16 L 6 23.84375 L 6 26 L 26 16.78125 L 26 15.21875 Z"></path>
          </g>
        </svg>
      </button>
    </div>
  );
}
