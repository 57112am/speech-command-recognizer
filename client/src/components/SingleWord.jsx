import React from 'react';

const SingleWord = ({ words, title, setWords, date }) => {
  const handleBackClick = () => {
    setWords([]); // Reset the words array
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg m-10">
      <h3 className="text-xl font-bold mb-2 text-center text-gray-800">Detected Words</h3>
      {title !== ""?<h4 className="text-xl font-bold mb-2 text-center text-gray-800">{title}</h4>:""}
      <h3 className="text-xl font-bold mb-2 text-center text-gray-800">Created At: {date.slice(0,10)}</h3>
      <div className="flex flex-wrap gap-2 mb-4">
        {words.map((word, idx) => (
          <span
            key={idx}
            className="inline-block bg-blue-100 text-blue-800 text-sm font-medium py-1 px-3 rounded-full shadow-sm"
          >
            {word}
          </span>
        ))}
      </div>
      <button
        onClick={handleBackClick}
        className="bg-red-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-red-600"
      >
        Back
      </button>
    </div>
  );
};

export default SingleWord;