import React, { useEffect, useState } from 'react';

// Import dependencies
import * as tf from "@tensorflow/tfjs";
import * as speech from "@tensorflow-models/speech-commands";

const App = () => {
  // Create model and action states
  const [model, setModel] = useState(null);
  const [action, setAction] = useState(null);
  const [labels, setLabels] = useState(null);
  const [isListening, setIsListening] = useState(false); // Track streaming status
  const [history, setHistory] = useState([]); // Track recognized actions history

  // Create Recognizer
  const loadModel = async () => {
    const recognizer = await speech.create("BROWSER_FFT");
    console.log('Model Loaded');
    await recognizer.ensureModelLoaded();
    console.log(recognizer.wordLabels());
    setModel(recognizer);
    setLabels(recognizer.wordLabels());
  };

  useEffect(() => {
    loadModel();
  }, []);

  function argMax(arr) {
    return arr.map((x, i) => [x, i]).reduce((r, a) => (a[0] > r[0] ? a : r))[1];
  }

  // Start listening for actions
  const startListening = async () => {
    if (model && !isListening) {
      setIsListening(true); // Set listening status to true
      console.log('Listening for commands');
      model.listen(result => {
        console.log(result.spectrogram);
        const detectedAction = labels[argMax(Object.values(result.scores))];
        setAction(detectedAction);
        setHistory(prevHistory => [detectedAction, ...prevHistory]); // Add new action to history
      }, { includeSpectrogram: true, probabilityThreshold: 0.9 });
    }
  };

  // Stop listening for actions
  const stopListening = () => {
    if (model && isListening) {
      model.stopListening();
      setIsListening(false); // Set listening status to false
      console.log('Stopped listening');
    }
  };

  // Clear history
  const clearHistory = () => {
    setHistory([]); // Reset history to an empty array
  };

  return (
    <div className="App flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <header className="App-header text-center">
        <button
          onClick={startListening}
          disabled={isListening}
          className="px-4 py-2 mb-2 bg-green-500 text-white rounded shadow hover:bg-green-600 disabled:bg-gray-400"
        >
          Start Listening
        </button>
        <button
          onClick={stopListening}
          disabled={!isListening}
          className="px-4 py-2 mb-2 bg-red-500 text-white rounded shadow hover:bg-red-600 disabled:bg-gray-400"
        >
          Stop Listening
        </button>
        <button
          onClick={clearHistory}
          className="px-4 py-2 mb-4 bg-yellow-500 text-white rounded shadow hover:bg-yellow-600"
        >
          Clear History
        </button>
        <div
          className={`w-16 h-16 rounded-full mb-4 ${
            isListening ? 'bg-green-500' : 'bg-red-500'
          }`}
        ></div>
        <div className="text-lg mb-4">
          {isListening ? 'Listening...' : action ? action : 'Ready'}
        </div>
        <div className="w-full max-w-md mx-auto p-4 bg-white rounded shadow">
          <h2 className="text-xl font-bold mb-2">Recognized Words</h2>
          <ul className="list-disc pl-5">
            {history.length > 0 ? (
              history.map((item, index) => (
                <li key={index} className="text-lg">{item}</li>
              ))
            ) : (
              <p className="text-lg">No recognized words</p>
            )}
          </ul>
        </div>
      </header>
    </div>
  );
}

export default App;