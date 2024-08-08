import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { addRecognizedWord, clearRecognizedWords, fetchAllDetectedWords, sendRecognizedWords } from '../redux/wordsSlice';
import * as tf from "@tensorflow/tfjs";
import * as speech from '@tensorflow-models/speech-commands';

const AudioRecorder = () => {
  const [model, setModel] = useState(null);
  const [labels, setLabels] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [currentWord, setCurrentWord] = useState(null);
  const dispatch = useDispatch();
  const { recognizedWords, status } = useSelector((state) => state.words);
  const { enqueueSnackbar } = useSnackbar();
  const audioContext = new AudioContext({sampleRate: 44100});
  console.log("audiocontext sample rate: ",audioContext.sampleRate);

  const loadModel = async () => {
    const recognizer = await speech.create('BROWSER_FFT');
    console.log('Model Loaded');
    await recognizer.ensureModelLoaded();
    enqueueSnackbar('Model loaded successfully', { variant: 'success' });
    const wordLabels = recognizer.wordLabels();
    setModel(recognizer);
    setLabels(wordLabels);
  };


async function testAudioContext() {
  try {
    const oscillator = audioContext.createOscillator();
    oscillator.connect(audioContext.destination);
    oscillator.start();
    await new Promise(resolve => setTimeout(resolve, 1000)); // Play for 1 second
    oscillator.stop();
    console.log('AudioContext test passed');
  } catch (error) {
    console.error('AudioContext test failed:', error);
  }
}

useEffect(() => {
    testAudioContext();
    loadModel();
  }, []);

  function argMax(arr) {
    return arr.map((x, i) => [x, i]).reduce((r, a) => (a[0] > r[0] ? a : r))[1];
  }

  const startListening = async () => {
    if (model && !isListening) {
      setIsListening(true);
      console.log('Listening for commands');
      model.listen(
        (result) => {
          console.log(result.spectrogram);
          const detectedAction = labels[argMax(Object.values(result.scores))];
          setCurrentWord(detectedAction);
          dispatch(addRecognizedWord(detectedAction));
        },
        { includeSpectrogram: true, probabilityThreshold: 0.9 }
      );
    }
  };

  const stopListening = async () => {
    if (model && isListening) {
      model.stopListening();
      setIsListening(false);
      console.log('Stopped listening');

      // Send the recognized words to the backend
      if (recognizedWords.length > 0) {
        const action = await dispatch(sendRecognizedWords(recognizedWords));
        if (sendRecognizedWords.fulfilled.match(action)) {
          enqueueSnackbar('Words saved successfully', { variant: 'success' });
        } else {
          enqueueSnackbar('Failed to save words', { variant: 'error' });
        }
      }
      dispatch(fetchAllDetectedWords());
      dispatch(clearRecognizedWords());
      setCurrentWord(null);
    }
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
        <div
          className={`w-16 h-16 rounded-full mb-4 ${
            isListening ? 'bg-green-500' : 'bg-red-500'
          }`}
        ></div>
        <div className="text-lg mb-4">
          {isListening ? 'Listening...' : 'Ready'}
        </div>
        <div className="w-full max-w-3xl mx-auto p-4 bg-white rounded shadow">
          <h2 className="text-xl font-bold mb-2">Recognized Words</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {labels.map((label, index) => (
              <div
                key={index}
                className={`p-4 rounded text-black font-bold text-center ${
                  currentWord === label
                    ? 'bg-yellow-300 animate-blink'
                    : 'bg-gray-300 hover:bg-gray-100'
                }`}
              >
                {label}
              </div>
            ))}
          </div>
        </div>
      </header>
    </div>
  );
};

export default AudioRecorder;