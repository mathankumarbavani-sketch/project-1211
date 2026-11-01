/* Placeholder — surprise system built in Stage 6.
   Kept as a real file so index.html never 404s. */
window.SURPRISES = window.SURPRISES || {
  unlocked: {},
  unlock(id) { this.unlocked[id] = true; },
  isUnlocked(id) { return !!this.unlocked[id]; }
};
