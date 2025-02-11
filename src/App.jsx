import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import Confetti from "react-confetti";
import Balloons from "./components/Ballon"; // Import the Balloons component
import backImage from "./assets/bg.png";
import bg_song from "./assets/media/bg_song.mp3";
const App = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const defaultSender = "Karobia";
  const defaultRecipient = " name of recipient";

  const sender = searchParams.get("sender") || defaultSender;
  const recipient = searchParams.get("recipient") || defaultRecipient;
  const message =
    searchParams.get("message") ||
    "You are the one that makes my heart skip a beat! Every moment with you is special, and I can't imagine my life without you. From your laughter to your kindness, I am grateful for every part of you. I love you more than words can say. 💖 Wishing you a day filled with love and happiness";

  const [newRecipient, setNewRecipient] = useState("");
  const [customMessage, setCustomMessage] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(true);
  const [showInputPopup, setShowInputPopup] = useState(false);

  // Generate Shareable Link and Open External Share Dialog
  const generateShareableLink = () => {
    const params = {
      sender: recipient,
      recipient: newRecipient || "Your Love",
      message:
        customMessage || "Wishing you a day filled with love and happiness!",
    };
    setSearchParams(params);
    setShowConfetti(true);
    setShowInputPopup(false); // Close the input popup
    setTimeout(() => setShowConfetti(false), 5000);

    // Generate the shareable link
    const shareUrl = `${window.location.origin}?${new URLSearchParams(
      params
    ).toString()}`;

    // Use the Web Share API if available
    if (navigator.share) {
      navigator
        .share({
          title: "Happy Valentine's Day!",
          text: `Check out this Valentine's Day message from ${sender}: ${message}`,
          url: shareUrl,
        })
        .then(() => {
          // Reset to default message after sharing
          setNewRecipient("");
          setCustomMessage("");
          setSearchParams({});
        })
        .catch((error) => {
          console.error("Error sharing:", error);
        });
    } else {
      // Fallback: Open a new tab with Twitter sharing
      window.open(
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(
          `Check out this Valentine's Day message from ${sender}: ${message}`
        )}&url=${encodeURIComponent(shareUrl)}`,
        "_blank"
      );

      // Reset to default message after sharing
      setNewRecipient("");
      setCustomMessage("");
      setSearchParams({});
    }
  };

  // Toggle Music
  const toggleMusic = () => {
    const audio = document.getElementById("background-music");
    if (isMusicPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsMusicPlaying(!isMusicPlaying);
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center text-white p-6 overflow-hidden bg-black/50">
      <img
        src={backImage}
        alt=""
        className=" absolute -z-30 h-full object-cover w-full"
      />
      <div className=" absolute z-20 bottom-10 right-5">
        <h1 className="text-sm italic font-light text-gray-300">scripted by Karobia</h1>
      </div>
      {/* Background Music */}
      <audio id="background-music" autoPlay loop>
        <source src={bg_song} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      <button
        onClick={toggleMusic}
        className="z-10 absolute top-4 right-4 bg-white bg-opacity-20 p-2 rounded-full hover:bg-opacity-30"
      >
        {isMusicPlaying ? "🔊" : "🔇"}
      </button>

      <Balloons />

      {showConfetti && <Confetti />}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-white text-black p-8 sm:p-10 md:p-12 rounded-3xl shadow-2xl w-full max-w-lg md:max-w-xl text-center z-10"
      >
        {/* Animated Heading */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-3xl sm:text-4xl font-bold text-red-500 mb-6"
        >
          Happy Valentine’s Day! ❤️
        </motion.h1>

        {/* Animated Recipient Name */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="text-lg sm:text-xl text-gray-700 mb-4"
        >
          Dear <span className="font-semibold text-black">{recipient}</span>,
        </motion.p>

        {/* Animated Message */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="text-base sm:text-lg text-gray-600 leading-relaxed italic mb-6"
        >
          {message}
        </motion.p>

        {/* Animated Sender */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
          className="text-lg sm:text-xl font-semibold text-gray-800"
        >
          With love, <span className="text-red-500">{sender}</span>
        </motion.p>
      </motion.div>

      {/* Share the Love Button */}
      <motion.button
        onClick={() => setShowInputPopup(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mt-6 bg-red-600 px-6 py-3 rounded-lg text-white font-semibold shadow-lg hover:shadow-xl z-10"
      >
        Share the Love 💌
      </motion.button>

      {/* Input Popup */}
      {showInputPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-20 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-center space-y-4"
          >
            <h2 className="text-xl font-bold">Create Your Message</h2>
            <input
              type="text"
              placeholder="Enter recipient's name"
              className="w-full p-3 rounded-lg bg-gray-200 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500"
              value={newRecipient}
              onChange={(e) => setNewRecipient(e.target.value)}
            />
            <textarea
              placeholder="Write a custom message..."
              className="w-full p-3 rounded-lg bg-gray-200 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              rows="4"
            />

            {/* Buttons Section */}
            <div className="flex flex-col sm:flex-row justify-around items-center w-full gap-3">
              <button
                onClick={generateShareableLink}
                className="bg-red-500 text-white px-6 py-2 rounded-2xl hover:bg-red-600 w-full sm:w-auto"
              >
                Generate Link
              </button>
              <button
                onClick={() => setShowInputPopup(false)}
                className="bg-gray-500 text-white px-6 py-2 rounded-2xl hover:bg-gray-600 w-full sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default App;
