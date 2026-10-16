// Fake progress: ramps quickly to ~70% while the model downloads, then
// creeps toward 95%. `loaded()` sprints to 100% once the model is ready.
export const setProgress = (setLoading: (value: number) => void) => {
  let percent: number = 0;

  let interval = setInterval(() => {
    if (percent < 70) {
      percent = Math.min(70, percent + 2 + Math.round(Math.random() * 4));
      setLoading(percent);
    } else {
      clearInterval(interval);
      interval = setInterval(() => {
        percent = Math.min(95, percent + 1);
        setLoading(percent);
        if (percent >= 95) {
          clearInterval(interval);
        }
      }, 250);
    }
  }, 35);

  function clear() {
    clearInterval(interval);
    setLoading(100);
  }

  function loaded() {
    return new Promise<number>((resolve) => {
      clearInterval(interval);
      interval = setInterval(() => {
        if (percent < 100) {
          percent = Math.min(100, percent + 4);
          setLoading(percent);
        } else {
          resolve(percent);
          clearInterval(interval);
        }
      }, 12);
    });
  }
  return { loaded, percent, clear };
};
