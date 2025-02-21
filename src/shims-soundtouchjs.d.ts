declare module "soundtouchjs" {
  export class SimpleFilter {
    constructor(source: any, target: any);
    extract: () => void;
  }

  export class PitchShifter {
    constructor(context: AudioContext, options?: { pitch?: number });
    input: AudioNode;
    output: AudioNode;
    setPitch: (pitch: number) => void;
  }
}
