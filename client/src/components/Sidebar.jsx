import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllDetectedWords,
  deleteWord,
  updateWordPinStatus,
} from "../redux/wordsSlice";
import { MdLabelImportantOutline } from "react-icons/md";
import { FiTrash } from "react-icons/fi";

const Sidebar = ({ isOpen }) => {
  const dispatch = useDispatch();
  const detectedWords = useSelector((state) => state.words.detectedWords);
  const status = useSelector((state) => state.words.status);
  const [showMore, setShowMore] = useState({});

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchAllDetectedWords());
    }
  }, [dispatch, status]);

  const groupByDate = (words) => {
    return words.reduce((acc, word) => {
      const date = getRelativeDate(word.createdAt);
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(word);
      return acc;
    }, {});
  };

  const getRelativeDate = (date) => {
    const today = new Date();
    const targetDate = new Date(date);

    const diffDays = Math.floor((today - targetDate) / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    return targetDate.toDateString();
  };

  const groupedWords = detectedWords ? groupByDate(detectedWords) : {};
  const pinnedWords = detectedWords ? detectedWords.filter(word => word.isPinned) : [];
  const hasPinnedItems = pinnedWords.length > 0;
  const hasTodayOrYesterday =
    groupedWords["Today"]?.length > 0 || groupedWords["Yesterday"]?.length > 0;

  const handleShowMore = (date) => {
    setShowMore((prev) => ({ ...prev, [date]: !prev[date] }));
  };

  const handleDelete = (wordId) => {
    dispatch(deleteWord(wordId));
  };

  const handlePin = (word) => {
    dispatch(updateWordPinStatus(word)); // Dispatch the action to update pin status
  };

  const renderWordsWithEllipsis = (words) => {
    if (words.length > 2) {
      return `${words.slice(0, 2).join(", ")} ...`;
    }
    return words.join(", ");
  };

  return (
    <aside
      className={`fixed top-16 left-0 h-full bg-gray-800 text-white transition-transform transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } w-64`}
    >
      <div className="p-6">
        <h2 className="text-center text-2xl">History</h2>
        {hasPinnedItems && (
          <div>
            <h2 className="text-lg text-center mt-2 font-bold">Pinned</h2>
            <ul>
              {pinnedWords.map((word, idx) => (
                <li
                key={idx}
                className="mb-2 flex items-center justify-between"
              >
                <span>{renderWordsWithEllipsis(word.words)}</span>
                <div className="flex gap-2">
                  <MdLabelImportantOutline
                    className="cursor-pointer text-xl text-yellow-600"
                    onClick={() => handlePin(word)}
                  />
                  <FiTrash
                    className="cursor-pointer text-xl hover:text-red-500"
                    onClick={() => handleDelete(word._id)} // Add the delete handler here
                  />
                </div>
              </li>
              ))}
            </ul>
          </div>
        )}

        {Object.keys(groupedWords).map(
          (date, index) =>
            (date === "Today" ||
              date === "Yesterday" ||
              (!hasTodayOrYesterday && date === "Last 7 Days")) && (
              <div key={index} className="mt-6">
                <h2 className="text-lg text-center font-bold">{date}</h2>
                <ul>
                  {(showMore[date]
                    ? groupedWords[date]
                    : groupedWords[date].slice(0, 5)
                  ).map((word, idx) => (
                    <li
                      key={idx}
                      className="mb-2 flex items-center justify-between"
                    >
                      <span>{renderWordsWithEllipsis(word.words)}</span>
                      <div className="flex gap-2">
                        <MdLabelImportantOutline
                          className="cursor-pointer text-xl hover:text-yellow-600"
                          onClick={() => handlePin(word)}
                        />
                        <FiTrash
                          className="cursor-pointer text-xl hover:text-red-500"
                          onClick={() => handleDelete(word._id)} // Add the delete handler here
                        />
                      </div>
                    </li>
                  ))}
                  {groupedWords[date].length > 5 && (
                    <li
                      className="text-gray-400 cursor-pointer"
                      onClick={() => handleShowMore(date)}
                    >
                      {showMore[date] ? "Show Less" : "Show More"}
                    </li>
                  )}
                </ul>
              </div>
            )
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
