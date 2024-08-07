import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllDetectedWords,
  deleteWord,
  updateWordPinStatus,
  updateWordTitle,
} from "../redux/wordsSlice";
import { MdLabelImportantOutline } from "react-icons/md";
import { FiTrash, FiEdit } from "react-icons/fi";
import { BsThreeDots } from "react-icons/bs";

const Sidebar = ({ isOpen, setTitle, setWords }) => {
  const dispatch = useDispatch();
  const detectedWords = useSelector((state) => state.words.detectedWords);
  const status = useSelector((state) => state.words.status);
  const [showMore, setShowMore] = useState({});
  const [openMenuIndex, setOpenMenuIndex] = useState(null);
  const [editingWord, setEditingWord] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const menuRef = useRef(null);
  const modalRef = useRef(null);

  const obj = useSelector((state) => state.auth);

  useEffect(() => {
    if (obj._id) {
      dispatch(fetchAllDetectedWords());
    }
  }, [obj]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        (!modalRef.current || !modalRef.current.contains(event.target))
      ) {
        setOpenMenuIndex(null);
        setEditingWord(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuRef, modalRef]);

  const groupByDate = (words) => {
    return words.reduce((acc, word) => {
      const date = getRelativeDate(word.createdAt);
      if (!acc[date]) acc[date] = [];
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
  const pinnedWords = detectedWords
    ? detectedWords.filter((word) => word.isPinned)
    : [];
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
    dispatch(updateWordPinStatus(word));
  };

  const handleEdit = (word) => {
    setEditingWord(word);
    setNewTitle(word.title || word.words.join(", "));
  };

  const handleSaveEdit = () => {
    if (newTitle.trim()) {
      dispatch(updateWordTitle({ id: editingWord._id, title: newTitle }));
      setTitle(newTitle);
      setEditingWord(null);
    }
  };

  const handleWordItem = (title, words) => {
    setTitle(title || "");
    setWords(words);
  };

  const handleMenuToggle = (id) => {
    setOpenMenuIndex(openMenuIndex === id ? null : id);
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
        {status === "loading" && (
          <div className="flex flex-col gap-4">
            <div className="skeleton h-32 w-full"></div>
            <div className="skeleton h-4 w-28"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
          </div>
        )}
        {hasPinnedItems && (
          <div>
            <h2 className="text-lg text-center mt-2 font-bold">Pinned</h2>
            <ul>
              {pinnedWords.map((word, idx) => {
                const id = `pinned-${word._id}`; // Use word._id for uniqueness
                return (
                  <li
                    key={id}
                    className="mb-2 flex items-center justify-between relative"
                  >
                    <span
                      onClick={() => handleWordItem(word.title, word.words)}
                      className="hover:cursor-pointer"
                    >
                      {word.title === ""
                        ? renderWordsWithEllipsis(word.words)
                        : word.title}
                    </span>
                    <div className="flex gap-2">
                      <BsThreeDots
                        className="cursor-pointer text-xl"
                        onClick={() => handleMenuToggle(id)}
                      />
                      {openMenuIndex === id && (
                        <div
                          ref={menuRef}
                          className="absolute right-0 top-6 bg-gray-700 text-white rounded-lg shadow-lg flex flex-col p-2 space-y-2 z-10"
                        >
                          <div
                            className="flex items-center gap-4 cursor-pointer p-2 rounded-lg transition-transform transform hover:bg-gray-600 hover:scale-105"
                            onClick={() => handlePin(word)}
                          >
                            <MdLabelImportantOutline className="text-xl text-yellow-600" />
                            <span className="text-sm">Unpin</span>
                          </div>
                          <div
                            className="flex items-center gap-4 cursor-pointer p-2 rounded-lg transition-transform transform hover:bg-gray-600 hover:scale-105"
                            onClick={() => handleEdit(word)}
                          >
                            <FiEdit className="text-xl text-green-400 hover:text-green-300" />
                            <span className="text-sm">Edit</span>
                          </div>
                          <div
                            className="flex items-center gap-4 cursor-pointer p-2 rounded-lg transition-transform transform hover:bg-gray-600 hover:scale-105"
                            onClick={() => handleDelete(word._id)}
                          >
                            <FiTrash className="text-xl text-red-400 hover:text-red-300" />
                            <span className="text-sm">Delete</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {Object.keys(groupedWords).map((date, index) =>
          date === "Today" ||
          date === "Yesterday" ||
          (!hasTodayOrYesterday && date === "Last 7 Days") ? (
            <div key={index} className="mt-6">
              <h2 className="text-lg text-center font-bold">{date}</h2>
              <ul>
                {(showMore[date]
                  ? groupedWords[date]
                  : groupedWords[date].slice(0, 5)
                ).map((word, idx) => {
                  const id = `unpinned-${date}-${word._id}`; // Use word._id and date for uniqueness
                  return (
                    <li
                      key={id}
                      className="mb-2 flex items-center justify-between relative"
                    >
                      <span
                        onClick={() => handleWordItem(word.title, word.words)}
                        className="hover:cursor-pointer"
                      >
                        {word.title === ""
                          ? renderWordsWithEllipsis(word.words)
                          : word.title}
                      </span>
                      <div className="flex gap-2">
                        <BsThreeDots
                          className="cursor-pointer text-xl"
                          onClick={() => handleMenuToggle(id)}
                        />
                        {openMenuIndex === id && (
                          <div
                            ref={menuRef}
                            className="absolute right-0 top-6 bg-gray-700 text-white rounded-lg shadow-lg flex flex-col p-2 space-y-2 z-10"
                          >
                            <div
                              className="flex items-center gap-4 cursor-pointer p-2 rounded-lg transition-transform transform hover:bg-gray-600 hover:scale-105"
                              onClick={() => handlePin(word)}
                            >
                              <MdLabelImportantOutline className="text-xl text-yellow-600" />
                              <span className="text-sm">Pin</span>
                            </div>
                            <div
                              className="flex items-center gap-4 cursor-pointer p-2 rounded-lg transition-transform transform hover:bg-gray-600 hover:scale-105"
                              onClick={() => handleEdit(word)}
                            >
                              <FiEdit className="text-xl text-green-400 hover:text-green-300" />
                              <span className="text-sm">Edit</span>
                            </div>
                            <div
                              className="flex items-center gap-4 cursor-pointer p-2 rounded-lg transition-transform transform hover:bg-gray-600 hover:scale-105"
                              onClick={() => handleDelete(word._id)}
                            >
                              <FiTrash className="text-xl text-red-400 hover:text-red-300" />
                              <span className="text-sm">Delete</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </li>
                  );
                })}
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
          ) : null
        )}
      </div>

      {/* Edit Modal */}
      {editingWord && (
        <div className="fixed inset-0 w-screen flex items-start justify-center bg-gray-800 bg-opacity-75 z-50">
          <div
            ref={modalRef}
            className="bg-gray-900 p-8 rounded-lg mt-20 shadow-lg w-2/4 max-w-4xl"
          >
            <h3 className="text-lg font-bold text-center">Edit Title</h3>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="bg-gray-600 text-white px-3 py-2 rounded-md mt-4 w-full"
            />
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={handleSaveEdit}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-400"
              >
                Save
              </button>
              <button
                onClick={() => setEditingWord(null)}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
