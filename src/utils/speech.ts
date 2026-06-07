import { KokoroTTS } from 'kokoro-js';
import { env } from '@huggingface/transformers';

// Ensure it doesn't try to look for the massive model locally on the dev server
env.allowLocalModels = false;

type VoiceGender = 'male' | 'female';

class KokoroEngine {
  private tts: any = null;
  public isLoading: boolean = false;
  public isReady: boolean = false;
  
  private audioContext: AudioContext | null = null;
  private currentSource: AudioBufferSourceNode | null = null;
  
  private queue: string[] = [];
  private isPlaying: boolean = false;
  
  public gender: VoiceGender = 'female';
  
  // Optional callback to notify React of loading state
  public onLoadingStateChange: ((isLoading: boolean) => void) | null = null;

  constructor() {
    // We defer initialization until the first time the user tries to speak,
    // to avoid downloading the model if they never use the Voice Coach.
  }

  private async init() {
    if (this.tts || this.isLoading || this.isReady) return;
    
    this.isLoading = true;
    if (this.onLoadingStateChange) this.onLoadingStateChange(true);
    
    try {
      // Default dtype is usually auto-selected (fp32 or q8).
      // We explicitly request 'q8' (8-bit quantization) to drastically reduce initial download size.
      this.tts = await KokoroTTS.from_pretrained('hexgrad/Kokoro-82M', {
        dtype: 'q8',
      });
      this.isReady = true;
    } catch (e) {
      console.error("Failed to load Kokoro TTS Model:", e);
      this.isReady = false;
    } finally {
      this.isLoading = false;
      if (this.onLoadingStateChange) this.onLoadingStateChange(false);
      
      // If we queued anything while loading, process it now
      this.processQueue();
    }
  }

  public setGender(gender: VoiceGender) {
    this.gender = gender;
  }

  public speak(text: string) {
    // Synchronously create AudioContext on user action to bypass Autoplay block
    if (!this.audioContext || this.audioContext.state === 'closed') {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      this.audioContext = new AudioContextClass({ sampleRate: 24000 });
    }
    
    if (this.audioContext.state === 'suspended') {
      this.audioContext.resume().catch(() => {});
    }

    if (!this.isReady) {
      this.queue.push(text);
      this.init();
      return;
    }
    
    this.queue.push(text);
    if (!this.isPlaying) {
      this.processQueue();
    }
  }

  public stop() {
    this.queue = []; // Clear queue
    
    if (this.currentSource) {
      try {
        this.currentSource.stop();
        this.currentSource.disconnect();
      } catch (e) {
        // Ignore if already stopped
      }
      this.currentSource = null;
    }
    
    this.isPlaying = false;
  }

  private async processQueue() {
    if (this.queue.length === 0 || !this.isReady || this.isPlaying) return;
    
    this.isPlaying = true;
    const text = this.queue.shift()!;
    
    try {
      if (!this.audioContext) return;
      
      // Resume context if suspended (browser autoplay policy)
      if (this.audioContext.state === 'suspended') {
        await this.audioContext.resume().catch(() => {});
      }

      // 'af_bella' is a high quality female voice, 'am_adam' is male
      const voice = this.gender === 'female' ? 'af_bella' : 'am_adam';
      
      const audioResult = await this.tts.generate(text, { voice });
      
      const floatArray = audioResult.audio;
      const sampleRate = audioResult.sampling_rate || 24000;
      
      const buffer = this.audioContext.createBuffer(1, floatArray.length, sampleRate);
      buffer.getChannelData(0).set(floatArray);
      
      this.currentSource = this.audioContext.createBufferSource();
      this.currentSource.buffer = buffer;
      this.currentSource.connect(this.audioContext.destination);
      
      this.currentSource.onended = () => {
        this.isPlaying = false;
        this.currentSource = null;
        this.processQueue();
      };
      
      this.currentSource.start();
      
    } catch (e) {
      console.error("Kokoro TTS generation failed:", e);
      this.isPlaying = false;
      this.processQueue();
    }
  }
}

// Export a singleton instance
export const speechSynth = new KokoroEngine();
