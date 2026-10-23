import { AudioPlaybackMode } from '../types/learning';

// Quranic & Arabic Audio Controller with strict provenance integrity:
// 1. Attempts to stream verified human recitation MP3 recordings (EveryAyah / Quran.com WBW) when audioUrl is provided.
// 2. NEVER plays synthesized musical oscillator tones as Quran recitation.
// 3. If verified MP3 streaming is unreachable (e.g. offline/sandboxed network) or unavailable (e.g. Hadith text),
//    checks whether a real Arabic TTS voice ('ar*') exists in the browser and explicitly reports
//    'synthetic-tts-fallback' so the UI labels it as synthetic pronunciation assistance (not recitation).
// 4. If neither verified recording nor Arabic TTS voice is available, reports 'unavailable' immediately.

const WORD_AUDIO_MAP: Record<string, string> = {
  'w-bismi': 'https://audio.qurancdn.com/wbw/001_001_001.mp3',
  'w-allahi': 'https://audio.qurancdn.com/wbw/001_001_002.mp3',
  'w-arrahmani': 'https://audio.qurancdn.com/wbw/001_001_003.mp3',
  'w-arrahimi': 'https://audio.qurancdn.com/wbw/001_001_004.mp3',
  'w-alhamdu': 'https://audio.qurancdn.com/wbw/001_002_001.mp3',
  'w-lillahi': 'https://audio.qurancdn.com/wbw/001_002_002.mp3',
  'w-rabbi': 'https://audio.qurancdn.com/wbw/001_002_003.mp3',
  'w-alamin': 'https://audio.qurancdn.com/wbw/001_002_004.mp3',
  'w-maliki': 'https://audio.qurancdn.com/wbw/001_004_001.mp3',
  'w-yawmi': 'https://audio.qurancdn.com/wbw/001_004_002.mp3',
  'w-addini': 'https://audio.qurancdn.com/wbw/001_004_003.mp3',
  'w-iyyaka': 'https://audio.qurancdn.com/wbw/001_005_001.mp3',
  'w-nabudu': 'https://audio.qurancdn.com/wbw/001_005_002.mp3',
  'w-nastain': 'https://audio.qurancdn.com/wbw/001_005_004.mp3',
  'w-ihdina': 'https://audio.qurancdn.com/wbw/001_006_001.mp3',
  'w-asshiratha': 'https://audio.qurancdn.com/wbw/001_006_002.mp3',
  'w-almustaqima': 'https://audio.qurancdn.com/wbw/001_006_003.mp3',
  'w-dzalika': 'https://audio.qurancdn.com/wbw/002_002_001.mp3',
  'w-alkitabu': 'https://audio.qurancdn.com/wbw/002_002_002.mp3',
  'w-qul': 'https://audio.qurancdn.com/wbw/112_001_001.mp3',
  'w-huwa': 'https://audio.qurancdn.com/wbw/112_001_002.mp3',
  'w-ahad': 'https://audio.qurancdn.com/wbw/112_001_004.mp3',
  'w-asshamad': 'https://audio.qurancdn.com/wbw/112_002_002.mp3',
  'w-walasri': 'https://audio.qurancdn.com/wbw/103_001_001.mp3',
  'w-innal': 'https://audio.qurancdn.com/wbw/103_002_001.mp3',
  'w-insana': 'https://audio.qurancdn.com/wbw/103_002_002.mp3',
  'w-khusr': 'https://audio.qurancdn.com/wbw/103_002_004.mp3',
};

const LESSON_AUDIO_MAP: Record<string, string> = {
  'lesson-ayah-1': 'https://everyayah.com/data/Alafasy_128kbps/001001.mp3',
  'lesson-ayah-1b': 'https://everyayah.com/data/Alafasy_128kbps/001004.mp3',
  'lesson-ayah-2': 'https://everyayah.com/data/Alafasy_128kbps/001002.mp3',
  'lesson-ayah-3': 'https://everyayah.com/data/Alafasy_128kbps/002002.mp3',
  'lesson-ayah-4': 'https://everyayah.com/data/Alafasy_128kbps/112001.mp3',
  'lesson-ayah-5': 'https://everyayah.com/data/Alafasy_128kbps/103002.mp3',
  'lesson-tajwid-1': 'https://everyayah.com/data/Alafasy_128kbps/001001.mp3',
  'lesson-tajwid-2': 'https://everyayah.com/data/Alafasy_128kbps/001002.mp3',
  'lesson-prayer-1': 'https://everyayah.com/data/Alafasy_128kbps/001005.mp3',
};

export function resolveWordAudioUrl(wordId: string, explicitUrl?: string): string | undefined {
  return explicitUrl || WORD_AUDIO_MAP[wordId];
}

export function resolveLessonAudioUrl(lessonId: string, explicitUrl?: string): string | undefined {
  return explicitUrl || LESSON_AUDIO_MAP[lessonId];
}

class RecitationAudioController {
  private currentAudio: HTMLAudioElement | null = null;
  private isPlayingState = false;
  private lastMode: AudioPlaybackMode = 'idle';

  public getLastMode(): AudioPlaybackMode {
    return this.lastMode;
  }

  public playVerifiedOrFallback(options: {
    arabicText: string;
    audioUrl?: string;
    rate?: number;
    onModeChange?: (mode: AudioPlaybackMode) => void;
    onTimeUpdate?: (currentSeconds: number, durationSeconds: number) => void;
    onStart?: () => void;
    onEnd?: () => void;
  }): void {
    const {
      arabicText,
      audioUrl,
      rate = 1.0,
      onModeChange,
      onTimeUpdate,
      onStart,
      onEnd,
    } = options;

    this.stop();

    if (audioUrl && typeof window !== 'undefined' && typeof Audio !== 'undefined') {
      try {
        this.lastMode = 'loading';
        onModeChange?.('loading');

        const audio = new Audio();
        audio.crossOrigin = 'anonymous';
        audio.preload = 'auto';
        audio.src = audioUrl;
        audio.playbackRate = rate;
        this.currentAudio = audio;

        let settled = false;
        const loadTimeout = window.setTimeout(() => {
          if (!settled) {
            settled = true;
            this.cleanupAudioElement();
            this.trySyntheticArabicTts(arabicText, rate, onModeChange, onStart, onEnd);
          }
        }, 3500);

        audio.onloadedmetadata = () => {
          if (audio.duration && Number.isFinite(audio.duration)) {
            onTimeUpdate?.(0, audio.duration);
          }
        };

        audio.ontimeupdate = () => {
          if (audio.duration && Number.isFinite(audio.duration)) {
            onTimeUpdate?.(audio.currentTime, audio.duration);
          }
        };

        audio.onplaying = () => {
          settled = true;
          clearTimeout(loadTimeout);
          this.isPlayingState = true;
          this.lastMode = 'verified-recording';
          onModeChange?.('verified-recording');
          onStart?.();
        };

        audio.onended = () => {
          this.isPlayingState = false;
          onEnd?.();
        };

        audio.onerror = () => {
          if (!settled) {
            settled = true;
            clearTimeout(loadTimeout);
            this.cleanupAudioElement();
            this.trySyntheticArabicTts(arabicText, rate, onModeChange, onStart, onEnd);
          }
        };

        const playPromise = audio.play();
        if (playPromise && typeof playPromise.catch === 'function') {
          playPromise.catch(() => {
            if (!settled) {
              settled = true;
              clearTimeout(loadTimeout);
              this.cleanupAudioElement();
              this.trySyntheticArabicTts(arabicText, rate, onModeChange, onStart, onEnd);
            }
          });
        }
        return;
      } catch {
        this.cleanupAudioElement();
      }
    }

    this.trySyntheticArabicTts(arabicText, rate, onModeChange, onStart, onEnd);
  }

  private trySyntheticArabicTts(
    arabicText: string,
    rate: number,
    onModeChange?: (mode: AudioPlaybackMode) => void,
    onStart?: () => void,
    onEnd?: () => void
  ): void {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        const voices = window.speechSynthesis.getVoices();
        const arabicVoice = voices.find((v) =>
          v.lang.toLowerCase().startsWith('ar')
        );

        // Only play TTS if an actual Arabic voice is available, and label it honestly as synthetic TTS
        if (arabicVoice) {
          window.speechSynthesis.cancel();
          const utterance = new SpeechSynthesisUtterance(arabicText);
          utterance.lang = arabicVoice.lang || 'ar-SA';
          utterance.voice = arabicVoice;
          utterance.rate = Math.min(1.0, Math.max(0.65, rate));
          utterance.pitch = 1.0;

          this.isPlayingState = true;
          this.lastMode = 'synthetic-tts-fallback';
          onModeChange?.('synthetic-tts-fallback');
          onStart?.();

          utterance.onend = () => {
            this.isPlayingState = false;
            onEnd?.();
          };
          utterance.onerror = () => {
            this.isPlayingState = false;
            this.lastMode = 'unavailable';
            onModeChange?.('unavailable');
            onEnd?.();
          };

          window.speechSynthesis.speak(utterance);
          return;
        }
      } catch {
        // Fall through to unavailable
      }
    }

    // Never play musical oscillator tones or non-Arabic TTS as Quran recitation
    this.isPlayingState = false;
    this.lastMode = 'unavailable';
    onModeChange?.('unavailable');
    onEnd?.();
  }

  // Backward-compatible method used by components; routes strictly through playVerifiedOrFallback
  public speakArabic(
    arabicText: string,
    rate = 0.85,
    _unusedFreqs?: number[],
    onStart?: () => void,
    onEnd?: () => void,
    lessonId?: string,
    explicitAudioUrl?: string,
    onModeChange?: (mode: AudioPlaybackMode) => void
  ): void {
    const resolvedUrl = lessonId
      ? resolveLessonAudioUrl(lessonId, explicitAudioUrl)
      : explicitAudioUrl;
    this.playVerifiedOrFallback({
      arabicText,
      audioUrl: resolvedUrl,
      rate,
      onModeChange,
      onStart,
      onEnd,
    });
  }

  public playWordAudio(
    wordId: string,
    arabicText: string,
    rate = 1.0,
    onStart?: () => void,
    onEnd?: () => void,
    explicitAudioUrl?: string,
    onModeChange?: (mode: AudioPlaybackMode) => void
  ): void {
    const resolvedUrl = resolveWordAudioUrl(wordId, explicitAudioUrl);
    this.playVerifiedOrFallback({
      arabicText,
      audioUrl: resolvedUrl,
      rate,
      onModeChange,
      onStart,
      onEnd,
    });
  }

  public seekTo(seconds: number): void {
    if (this.currentAudio && Number.isFinite(seconds)) {
      try {
        this.currentAudio.currentTime = Math.max(0, seconds);
      } catch {
        // Ignore seek errors if stream not seekable
      }
    }
  }

  private cleanupAudioElement(): void {
    if (this.currentAudio) {
      try {
        this.currentAudio.pause();
        this.currentAudio.src = '';
      } catch {
        // Ignore
      }
      this.currentAudio = null;
    }
  }

  public stop(): void {
    this.cleanupAudioElement();
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
