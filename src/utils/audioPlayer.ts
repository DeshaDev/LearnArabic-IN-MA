// Accessible pronunciation and recitation audio helper using Web Speech API (ar-SA)
// with gentle Web Audio API chime/cadence fallback so audio controls work reliably
// offline or in headless environments while clearly stating audio provenance.

class RecitationAudioController {
  private audioCtx: AudioContext | null = null;
  private isPlayingState = false;
  private stopTimeout: number | null = null;

  public speakArabic(
    arabicText: string,
    rate = 0.85,
    freqSequence: number[] = [293.66, 329.63, 392.0, 329.63],
    onStart?: () => void,
    onEnd?: () => void
  ): void {
    this.stop();
    this.isPlayingState = true;
    onStart?.();

    // Try native Arabic speech synthesis if available and supported
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(arabicText);
        utterance.lang = 'ar-SA';
        utterance.rate = rate;
        utterance.pitch = 1.0;

        const voices = window.speechSynthesis.getVoices();
        const arabicVoice = voices.find((v) => v.lang.toLowerCase().startsWith('ar'));
        if (arabicVoice) {
          utterance.voice = arabicVoice;
        }

        utterance.onend = () => {
          this.isPlayingState = false;
          onEnd?.();
        };
        utterance.onerror = () => {
          this.isPlayingState = false;
          onEnd?.();
        };

        window.speechSynthesis.speak(utterance);
      } catch {
        // Fallback handled below
      }
    }

    // Play a soft acoustic reference cadence so headless/offline users receive immediate audible/timed feedback
    try {
      const AudioContextClass =
        window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        if (!this.audioCtx) {
          this.audioCtx = new AudioContextClass();
        }
        if (this.audioCtx.state === 'suspended') {
          this.audioCtx.resume();
        }
        const now = this.audioCtx.currentTime;
        const stepDuration = 0.38 / rate;
        freqSequence.forEach((freq, idx) => {
          if (!this.audioCtx) return;
          const osc = this.audioCtx.createOscillator();
          const gain = this.audioCtx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + idx * stepDuration);

          gain.gain.setValueAtTime(0.001, now + idx * stepDuration);
          gain.gain.exponentialRampToValueAtTime(0.06, now + idx * stepDuration + 0.05);
          gain.gain.exponentialRampToValueAtTime(
            0.001,
            now + (idx + 1) * stepDuration - 0.02
          );

          osc.connect(gain);
          gain.connect(this.audioCtx.destination);
          osc.start(now + idx * stepDuration);
          osc.stop(now + (idx + 1) * stepDuration);
        });
      }
    } catch {
      // Ignore AudioContext restriction if any
    }

    const totalMs = Math.max(1400, Math.round((freqSequence.length * 400) / rate));
    this.stopTimeout = window.setTimeout(() => {
      if (this.isPlayingState) {
        this.isPlayingState = false;
        onEnd?.();
      }
    }, totalMs);
  }

  public stop(): void {
    if (this.stopTimeout !== null) {
      clearTimeout(this.stopTimeout);
      this.stopTimeout = null;
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch {
        // Ignore
      }
    }
    this.isPlayingState = false;
  }
}

export const audioController = new RecitationAudioController();
