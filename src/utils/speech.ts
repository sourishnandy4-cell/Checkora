type VoiceGender = 'male' | 'female';

class SpeechEngine {
  public gender: VoiceGender = 'female';
  public onLoadingStateChange: ((isLoading: boolean) => void) | null = null;
  private voicesLoaded: boolean = false;
  private resumeInterval: ReturnType<typeof setInterval> | null = null;

  constructor() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.getVoices();
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = () => {
          window.speechSynthesis.getVoices();
          this.voicesLoaded = true;
        };
      }
      setTimeout(() => {
        this.voicesLoaded = true;
      }, 500);
    }
  }

  public setGender(gender: VoiceGender) {
    this.gender = gender;
  }

  public speak(text: string) {
    if (!('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();
    this.stopResumeInterval();

    const delay = this.isMobile() ? 100 : 50;

    setTimeout(() => {
      this.speakInternal(text);
    }, delay);
  }

  private speakInternal(text: string, retryCount = 0) {
    if (!('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    const voices = window.speechSynthesis.getVoices();

    let preferredVoice;

    const premiumFemale = ['Natural', 'Aria', 'Jenny', 'Google UK English Female', 'Google US English', 'Samantha'];
    const premiumMale = ['Natural', 'Guy', 'Christopher', 'Google UK English Male', 'Alex', 'Daniel'];

    const standardFemale = ['Female', 'Zira', 'Hazel', 'Catherine', 'Victoria'];
    const standardMale = ['Male', 'David', 'Mark', 'James', 'George', 'Richard'];

    const findVoice = (keywords: string[]) => {
      for (const kw of keywords) {
        const found = voices.find(v => v.name.toLowerCase().includes(kw.toLowerCase()) && v.lang.startsWith('en'));
        if (found) return found;
      }
      return null;
    };

    if (this.gender === 'female') {
      preferredVoice = findVoice(premiumFemale) || findVoice(standardFemale);
    } else {
      preferredVoice = findVoice(premiumMale) || findVoice(standardMale);
    }

    if (!preferredVoice) {
      preferredVoice = voices.find(v => v.name.toLowerCase().includes(this.gender));
    }

    if (!preferredVoice) {
      preferredVoice = voices.find(v => v.lang.startsWith('en')) || voices[0];
    }

    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
    }

    if (this.isMobile()) {
      this.startResumeInterval();
    }

    let hasFinished = false;

    utterance.onend = () => {
      hasFinished = true;
      this.stopResumeInterval();
    };

    utterance.onerror = (event) => {
      hasFinished = true;
      this.stopResumeInterval();

      if (event.error !== 'canceled' && event.error !== 'interrupted' && retryCount < 2) {
        setTimeout(() => {
          this.speakInternal(text, retryCount + 1);
        }, 200);
      }
    };

    const estimatedDuration = Math.min(text.length * 80, 15000);
    setTimeout(() => {
      if (!hasFinished && window.speechSynthesis.speaking) {
        window.speechSynthesis.resume();
      }
    }, estimatedDuration + 1000);

    window.speechSynthesis.speak(utterance);
  }

  public stop() {
    if (!('speechSynthesis' in window)) return;
    this.stopResumeInterval();
    window.speechSynthesis.cancel();
  }

  private isMobile(): boolean {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
      (navigator.maxTouchPoints > 0 && window.innerWidth < 768);
  }

  private startResumeInterval() {
    this.stopResumeInterval();
    this.resumeInterval = setInterval(() => {
      if (window.speechSynthesis && window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }
    }, 10000);
  }

  private stopResumeInterval() {
    if (this.resumeInterval) {
      clearInterval(this.resumeInterval);
      this.resumeInterval = null;
    }
  }
}

export const speechSynth = new SpeechEngine();
