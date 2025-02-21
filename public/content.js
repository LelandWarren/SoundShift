(async () => {
    if (window.hasAudioProcessor) return;
    window.hasAudioProcessor = true;
  
    console.log("Audio Transformer: Injecting Web Audio API Hook");
  
    const audioContext = new AudioContext();
    await audioContext.audioWorklet.addModule(URL.createObjectURL(new Blob([`
      class PitchShifterProcessor extends AudioWorkletProcessor {
        static get parameterDescriptors() {
          return [{ name: "pitch", defaultValue: 0, minValue: -24, maxValue: 24 }];
        }
  
        process(inputs, outputs, parameters) {
          const input = inputs[0];
          const output = outputs[0];
          if (!input || input.length === 0) return true;
  
          const pitchValue = parameters.pitch.length > 0 ? parameters.pitch[0] : 0;
          const pitchFactor = Math.pow(2, pitchValue / 12);
  
          for (let channel = 0; channel < input.length; channel++) {
            const inputChannel = input[channel];
            const outputChannel = output[channel];
  
            for (let i = 0; i < inputChannel.length; i++) {
              outputChannel[i] = inputChannel[Math.floor(i / pitchFactor)] || 0;
            }
          }
          return true;
        }
      }
  
      registerProcessor("pitch-shifter-processor", PitchShifterProcessor);
    `], { type: "application/javascript" })));
  
    const pitchShifterNode = new AudioWorkletNode(audioContext, "pitch-shifter-processor");
    pitchShifterNode.parameters.get("pitch").value = 0;
  
    function processMediaElements() {
      document.querySelectorAll("audio, video").forEach((element) => {
        if (element.hasAudioProcessor) return;
        element.hasAudioProcessor = true;
  
        console.log("Processing media element:", element);
  
        const source = audioContext.createMediaElementSource(element);
        source.connect(pitchShifterNode).connect(audioContext.destination);
      });
    }
  
    chrome.runtime.onMessage.addListener((message) => {
      if (message.type === "UPDATE_PITCH") {
        pitchShifterNode.parameters.get("pitch").value = message.value;
        console.log("Updated pitch to:", message.value);
      }
    });
  
    processMediaElements();
    const observer = new MutationObserver(processMediaElements);
    observer.observe(document, { childList: true, subtree: true });
  })();
  