import { useEffect, useRef, useState } from "react";

const wakeWords = [
  "hey luza",
  "hi luza",
  "hii luza",
  "hiii luza",
  "hello luza",
  "luza",
  "lusa",
  "luja",
  "luzza",
  "looser",
  "loser",
  "luzer"
];

function removeWakeWord(transcript) {
  return wakeWords
    .reduce((value, word) => value.replace(new RegExp(`\\b${word}\\b`, "i"), ""), transcript)
    .trim();
}

export function useVoiceRecognition({ onCommand, onWake, onTranscript }) {
  const recognitionRef = useRef(null);
  const manualStopRef = useRef(false);
  const isStartingRef = useRef(false);
  const isActiveRef = useRef(false);
  const armedRef = useRef(false);
  const onCommandRef = useRef(onCommand);
  const onWakeRef = useRef(onWake);
  const onTranscriptRef = useRef(onTranscript);
  const [supported, setSupported] = useState(true);
  const [listening, setListening] = useState(false);
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    onCommandRef.current = onCommand;
    onWakeRef.current = onWake;
    onTranscriptRef.current = onTranscript;
  }, [onCommand, onWake, onTranscript]);

  function updateArmed(value) {
    armedRef.current = value;
    setArmed(value);
  }

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setSupported(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      const latest = Array.from(event.results)
        .slice(event.resultIndex)
        .map((result) => result[0].transcript)
        .join(" ")
        .trim();

      onTranscriptRef.current?.(latest);
      const normalized = latest.toLowerCase();
      const woke = wakeWords.some((word) => normalized.includes(word));

      const isFinal = Array.from(event.results).some((result) => result.isFinal);

      if (woke && !armedRef.current) {
        const command = removeWakeWord(latest);
        updateArmed(true);
        onWakeRef.current?.();

        if (isFinal && command) {
          onCommandRef.current?.(command);
          updateArmed(false);
        } else if (isFinal && !command) {
          onCommandRef.current?.(latest);
          updateArmed(false);
        }
        return;
      }

      if (armedRef.current && isFinal && latest.length > 2) {
        const command = removeWakeWord(latest);
        if (command) onCommandRef.current?.(command);
        else onCommandRef.current?.(latest);
        updateArmed(false);
      }
    };

    recognition.onstart = () => {
      isStartingRef.current = false;
      isActiveRef.current = true;
      setListening(true);
    };
    recognition.onend = () => {
      isActiveRef.current = false;
      isStartingRef.current = false;
      setListening(false);
      if (recognitionRef.current && !manualStopRef.current) {
        window.setTimeout(() => safeStart(), 600);
      }
    };
    recognition.onerror = () => {
      isStartingRef.current = false;
      isActiveRef.current = false;
    };

    recognitionRef.current = recognition;
    return () => {
      recognitionRef.current = null;
      recognition.stop();
    };
  }, []);

  function safeStart() {
    if (!recognitionRef.current || isStartingRef.current || isActiveRef.current) return;
    try {
      manualStopRef.current = false;
      isStartingRef.current = true;
      recognitionRef.current?.start();
    } catch (error) {
      isStartingRef.current = false;
      if (error.name !== "InvalidStateError") {
        setListening(false);
      }
    }
  }

  function start() {
    updateArmed(true);
    safeStart();
  }

  function stop() {
    manualStopRef.current = true;
    isStartingRef.current = false;
    updateArmed(false);
    recognitionRef.current?.stop();
    setListening(false);
  }

  return { supported, listening, armed, start, stop };
}
