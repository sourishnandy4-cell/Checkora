import { useSettingsStore, ThemeId } from '../store/settingsStore';

class AmbientAudioEngine {
  private ctx: AudioContext | null = null;
  private currentNodes: AudioNode[] = [];
  private gainNode: GainNode | null = null;
  private isPlaying = false;

  private initCtx() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  private stopAll() {
    this.currentNodes.forEach(node => {
      if ('stop' in node) {
        try { (node as OscillatorNode | AudioBufferSourceNode).stop(); } catch {}
      }
      try { node.disconnect(); } catch {}
    });
    this.currentNodes = [];
    if (this.gainNode) {
      try { this.gainNode.disconnect(); } catch {}
      this.gainNode = null;
    }
  }

  // Brown noise generator (soothing, dull roar)
  private createBrownNoise(ctx: AudioContext) {
    const bufferSize = 2 * ctx.sampleRate;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let lastOut = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      output[i] = (lastOut + (0.02 * white)) / 1.02;
      lastOut = output[i];
      output[i] *= 3.5; // (roughly compensate for gain)
    }
    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuffer;
    noise.loop = true;
    return noise;
  }

  // White noise generator
  private createWhiteNoise(ctx: AudioContext) {
    const bufferSize = 2 * ctx.sampleRate;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }
    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuffer;
    noise.loop = true;
    return noise;
  }

  public start(themeId: ThemeId) {
    const { enableAmbientSound, ambientVolume } = useSettingsStore.getState();
    if (!enableAmbientSound || ambientVolume <= 0) return;

    this.stopAll();
    this.isPlaying = true;
    const ctx = this.initCtx();
    
    this.gainNode = ctx.createGain();
    const volumeLevel = (ambientVolume / 100) * 0.4; // Max ambient volume is relatively low
    this.gainNode.gain.setValueAtTime(0.001, ctx.currentTime);
    this.gainNode.gain.exponentialRampToValueAtTime(volumeLevel, ctx.currentTime + 2); // 2s fade in
    this.gainNode.connect(ctx.destination);

    if (themeId === 'ocean') {
      // Ocean waves: brown noise passed through lowpass filter modulated by LFO
      const noise = this.createBrownNoise(ctx);
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      
      const lfo = ctx.createOscillator();
      lfo.type = 'sine';
      lfo.frequency.value = 0.08; // very slow wave

      const lfoGain = ctx.createGain();
      lfoGain.gain.value = 400; // frequency swing

      filter.frequency.value = 500; // base frequency
      
      lfo.connect(lfoGain);
      lfoGain.connect(filter.frequency);

      noise.connect(filter);
      filter.connect(this.gainNode);

      noise.start();
      lfo.start();
      this.currentNodes.push(noise, filter, lfo, lfoGain);

    } else if (themeId === 'forest') {
      // Wind: brown noise with higher cutoff
      const noise = this.createBrownNoise(ctx);
      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 600;
      filter.Q.value = 0.5;

      const lfo = ctx.createOscillator();
      lfo.type = 'sine';
      lfo.frequency.value = 0.15;
      const lfoGain = ctx.createGain();
      lfoGain.gain.value = 200;
      
      lfo.connect(lfoGain);
      lfoGain.connect(filter.frequency);

      noise.connect(filter);
      filter.connect(this.gainNode);
      noise.start();
      lfo.start();
      this.currentNodes.push(noise, filter, lfo, lfoGain);

    } else if (themeId === 'crimson') {
      // Rain: white noise with highpass
      const noise = this.createWhiteNoise(ctx);
      const filter = ctx.createBiquadFilter();
      filter.type = 'highpass';
      filter.frequency.value = 1000;
      
      noise.connect(filter);
      filter.connect(this.gainNode);
      noise.start();
      this.currentNodes.push(noise, filter);

    } else if (themeId === 'aurora') {
      // Space ambient: slow detuned sine waves
      const freqs = [110, 110.5, 164.8, 165, 220]; // A2, E3, A3 roughly
      freqs.forEach(f => {
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.value = f;
        
        const oscGain = ctx.createGain();
        oscGain.gain.value = 0.2;

        const lfo = ctx.createOscillator();
        lfo.type = 'sine';
        lfo.frequency.value = 0.05 + Math.random() * 0.05;
        const lfoGain = ctx.createGain();
        lfoGain.gain.value = 0.1;
        lfo.connect(lfoGain);
        lfoGain.connect(oscGain.gain);

        osc.connect(oscGain);
        oscGain.connect(this.gainNode!);
        osc.start();
        lfo.start();
        this.currentNodes.push(osc, oscGain, lfo, lfoGain);
      });
      
    } else if (themeId === 'wooden' || themeId === 'walnut') {
      // Crackling fire / tavern: low brown noise rumble
      const noise = this.createBrownNoise(ctx);
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 150;
      
      noise.connect(filter);
      filter.connect(this.gainNode);
      noise.start();
      this.currentNodes.push(noise, filter);
    } else {
      // mono / default: faint room tone
      const noise = this.createBrownNoise(ctx);
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 50;
      
      const vGain = ctx.createGain();
      vGain.gain.value = 0.2;
      
      noise.connect(filter);
      filter.connect(vGain);
      vGain.connect(this.gainNode);
      noise.start();
      this.currentNodes.push(noise, filter, vGain);
    }
  }

  public stop() {
    if (!this.isPlaying) return;
    this.isPlaying = false;
    if (this.gainNode && this.ctx) {
      // Fade out over 2 seconds
      try {
        this.gainNode.gain.cancelScheduledValues(this.ctx.currentTime);
        this.gainNode.gain.setValueAtTime(this.gainNode.gain.value, this.ctx.currentTime);
        this.gainNode.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 2);
        setTimeout(() => this.stopAll(), 2000);
      } catch {
        this.stopAll();
      }
    } else {
      this.stopAll();
    }
  }

  public getIsPlaying() {
    return this.isPlaying;
  }
}

export const ambientAudio = new AmbientAudioEngine();
