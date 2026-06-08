type VoiceGender = 'male' | 'female';

class FastSpeechEngine {
  public gender: VoiceGender = 'female';
  public onLoadingStateChange: ((isLoading: boolean) => void) | null = null;
  
  constructor() {
    // Warm up the voices
    if ('speechSynthesis' in window) {
      window.speechSynthesis.getVoices();
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = () => {
          window.speechSynthesis.getVoices();
        };
      }
    }
  }

  public setGender(gender: VoiceGender) {
    this.gender = gender;
  }

  public speak(text: string) {
    if (!('speechSynthesis' in window)) return;
    
    // Stop any ongoing speech instantly
    window.speechSynthesis.cancel();

    // Use a small timeout to let the browser engine clear the queue before speaking
    setTimeout(() => {
      const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    
    const voices = window.speechSynthesis.getVoices();
    
    let preferredVoice;
    
    // Arrays of keywords to rank voices by quality (Neural/Online/Premium are best)
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
    
    // Fallback loosely
    if (!preferredVoice) {
      preferredVoice = voices.find(v => v.name.toLowerCase().includes(this.gender));
    }

    // Absolute fallback
    if (!preferredVoice) {
      preferredVoice = voices.find(v => v.lang.startsWith('en')) || voices[0];
    }
    
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    // A weird bug in Chrome sometimes drops speech synthesis unless we attach a small delay
    // or resume the synthesis engine if it got stuck.
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }

      window.speechSynthesis.speak(utterance);
    }, 50);
  }
  
  public stop() {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
  }
}

export const speechSynth = new FastSpeechEngine();
