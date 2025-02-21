async function setupAudioProcessor(element: HTMLMediaElement) {
    if ((element as any).hasAudioProcessor) return;
    (element as any).hasAudioProcessor = true;
  
    element.addEventListener("loadeddata", async () => {
      console.log("Processing media element after loaded:", element);
  
      const audioContext = new AudioContext();
  
      try {
        // Add a small delay before loading the worklet
        await new Promise((resolve) => setTimeout(resolve, 500));
  
        // Ensure pitch-processor.js is available
        const processorURL = chrome.runtime.getURL("pitch-processor.js");
        console.log("Loading AudioWorklet module:", processorURL);
  
        await audioContext.audioWorklet.addModule(processorURL);
  
        const source = audioContext.createMediaElementSource(element);
        console.log("Created media source:", source);
  
        const pitchProcessor = new AudioWorkletNode(audioContext, "pitch-processor");
  
        // Connect nodes
        source.connect(pitchProcessor);
        pitchProcessor.connect(audioContext.destination);
  
        (element as any).pitchShifter = pitchProcessor;
        console.log("Connected AudioWorkletNode for pitch shifting");
      } catch (error) {
        console.error("Error loading AudioWorklet module:", error);
      }
    });
  }
  