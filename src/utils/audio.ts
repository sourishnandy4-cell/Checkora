import { useSettingsStore } from '../store/settingsStore';

class ChessAudioEngine {
  private ctx: AudioContext | null = null;

  private initCtx() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  play(type: 'move' | 'capture' | 'check' | 'win' | 'lose' | 'alarm') {
    const { enableSound, soundVolume } = useSettingsStore.getState();
    if (!enableSound) return;

    try {
      const ctx = this.initCtx();
      const volumeNode = ctx.createGain();
      
      // Map 0-100 volume scale to 0.0 - 1.0 gain level
      volumeNode.gain.setValueAtTime((soundVolume / 100) * 0.5, ctx.currentTime);
      volumeNode.connect(ctx.destination);

      const time = ctx.currentTime;

      if (type === 'move') {
        // Stark wooden "tock" click
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(450, time);
        // Quick frequency slide down to simulate wood thud
        osc.frequency.exponentialRampToValueAtTime(120, time + 0.06);

        gain.gain.setValueAtTime(1, time);
        gain.gain.exponentialRampToValueAtTime(0.01, time + 0.08);

        osc.connect(gain);
        gain.connect(volumeNode);

        osc.start(time);
        osc.stop(time + 0.09);

      } else if (type === 'capture') {
        // Sharp "snap" sound combining white noise burst and high pitch triangle drop
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, time);
        osc.frequency.exponentialRampToValueAtTime(200, time + 0.08);

        gain.gain.setValueAtTime(0.8, time);
        gain.gain.exponentialRampToValueAtTime(0.01, time + 0.12);

        // Add high-frequency crackle overlay using basic FM synthesis
        const modulator = ctx.createOscillator();
        const modGain = ctx.createGain();
        modulator.frequency.setValueAtTime(1200, time);
        modGain.gain.setValueAtTime(300, time);

        modulator.connect(modGain);
        modGain.connect(osc.frequency);
        
        osc.connect(gain);
        gain.connect(volumeNode);

        modulator.start(time);
        osc.start(time);
        
        modulator.stop(time + 0.12);
        osc.stop(time + 0.12);

      } else if (type === 'check') {
        // Urgent high pitch double alarm
        const playBeep = (startTime: number) => {
          const osc1 = ctx.createOscillator();
          const osc2 = ctx.createOscillator();
          const gain = ctx.createGain();

          osc1.type = 'sine';
          osc1.frequency.setValueAtTime(650, startTime);
          
          osc2.type = 'triangle';
          osc2.frequency.setValueAtTime(800, startTime);

          gain.gain.setValueAtTime(0.6, startTime);
          gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.12);

          osc1.connect(gain);
          osc2.connect(gain);
          gain.connect(volumeNode);

          osc1.start(startTime);
          osc2.start(startTime);

          osc1.stop(startTime + 0.13);
          osc2.stop(startTime + 0.13);
        };

        playBeep(time);
        playBeep(time + 0.16);

      } else if (type === 'win') {
        // Joyful, high-fidelity rising major chord arpeggio
        const notes = [261.63, 329.63, 392.00, 523.25]; // C4, E4, G4, C5
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          const noteStart = time + idx * 0.08;

          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, noteStart);

          gain.gain.setValueAtTime(0.7, noteStart);
          gain.gain.exponentialRampToValueAtTime(0.01, noteStart + 0.35);

          osc.connect(gain);
          gain.connect(volumeNode);

          osc.start(noteStart);
          osc.stop(noteStart + 0.4);
        });

      } else if (type === 'lose') {
        // Somber, dropping minor chord progression
        const notes = [293.66, 277.18, 220.00, 146.83]; // D4, C#4, A3, D3
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          const noteStart = time + idx * 0.12;

          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(freq, noteStart);
          osc.frequency.linearRampToValueAtTime(freq - 15, noteStart + 0.4);

          gain.gain.setValueAtTime(0.5, noteStart);
          gain.gain.exponentialRampToValueAtTime(0.01, noteStart + 0.5);

          osc.connect(gain);
          gain.connect(volumeNode);

          osc.start(noteStart);
          osc.stop(noteStart + 0.6);
        });

      } else if (type === 'alarm') {
        // Extremely soft low-frequency dull thud (pulses heartbeat)
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(80, time);
        osc.frequency.exponentialRampToValueAtTime(30, time + 0.15);

        // Low volume to prevent being intrusive
        gain.gain.setValueAtTime(0.8, time);
        gain.gain.exponentialRampToValueAtTime(0.01, time + 0.2);

        osc.connect(gain);
        gain.connect(volumeNode);

        osc.start(time);
        osc.stop(time + 0.22);
      }
    } catch (e) {
      console.warn('Failed to play synthesized sound:', e);
    }
  }
}

export const playSound = new ChessAudioEngine();
