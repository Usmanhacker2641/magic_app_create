document.addEventListener('DOMContentLoaded', () => {
  const clockDisplay = document.getElementById('clock-display');
  const timezoneSelect = document.getElementById('timezone-select');
  const themeToggle = document.getElementById('theme-toggle');
  const alarmForm = document.getElementById('alarm-form');
  const alarmStatus = document.getElementById('alarm-status');
  const countdownForm = document.getElementById('countdown-form');
  const countdownDisplay = document.getElementById('countdown-display');

  const THEME_KEY = 'chrono-theme';
  function applyTheme(isDark) {
    document.body.classList.toggle('dark-mode', isDark);
    themeToggle.setAttribute('aria-pressed', isDark);
    themeToggle.textContent = isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode';
    localStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light');
  }
  const savedTheme = localStorage.getItem(THEME_KEY);
  applyTheme(savedTheme === 'dark');
  themeToggle.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark-mode');
    applyTheme(isDark);
  });

  const TZ_KEY = 'chrono-timezone';
  const timezones = Intl.supportedValuesOf ? Intl.supportedValuesOf('timeZone') : [];
  const defaultOption = document.createElement('option');
  defaultOption.value = '';
  defaultOption.textContent = 'Local Time';
  timezoneSelect.appendChild(defaultOption);
  timezones.forEach(tz => {
    const option = document.createElement('option');
    option.value = tz;
    option.textContent = tz.replace('_', ' ');
    timezoneSelect.appendChild(option);
  });
  const savedTZ = localStorage.getItem(TZ_KEY);
  if (savedTZ) timezoneSelect.value = savedTZ;
  timezoneSelect.addEventListener('change', () => {
    localStorage.setItem(TZ_KEY, timezoneSelect.value);
    updateClock();
  });

  function updateClock() {
    const tz = timezoneSelect.value;
    const now = new Date();
    let timeString;
    if (tz) {
      const options = { timeZone: tz, hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' };
      timeString = now.toLocaleTimeString('en-US', options);
    } else {
      timeString = now.toLocaleTimeString();
    }
    clockDisplay.textContent = timeString;
  }
  setInterval(updateClock, 1000);
  updateClock();

  const ALARM_KEY = 'chrono-alarm-time';
  let alarmTimeout = null;
  function scheduleAlarm(timestamp) {
    const now = Date.now();
    const diff = timestamp - now;
    if (diff <= 0) return;
    clearTimeout(alarmTimeout);
    alarmTimeout = setTimeout(() => {
      alarmStatus.textContent = '⏰ Alarm ringing!';
      alarmStatus.classList.add('alarm-active');
      localStorage.removeItem(ALARM_KEY);
    }, diff);
  }
  function loadSavedAlarm() {
    const saved = localStorage.getItem(ALARM_KEY);
    if (saved) {
      const ts = Number(saved);
      if (!isNaN(ts) && ts > Date.now()) {
        scheduleAlarm(ts);
        const alarmDate = new Date(ts);
        alarmStatus.textContent = `Alarm set for ${alarmDate.toLocaleTimeString()}`;
      } else {
        localStorage.removeItem(ALARM_KEY);
      }
    }
  }
  alarmForm.addEventListener('submit', e => {
    e.preventDefault();
    const timeInput = alarmForm.querySelector('#alarm-time').value;
    if (!timeInput) return;
    const [hours, minutes] = timeInput.split(':').map(Number);
    const now = new Date();
    const alarm = new Date();
    alarm.setHours(hours, minutes, 0, 0);
    if (alarm <= now) alarm.setDate(alarm.getDate() + 1);
    const ts = alarm.getTime();
    localStorage.setItem(ALARM_KEY, ts.toString());
    scheduleAlarm(ts);
    alarmStatus.textContent = `Alarm set for ${alarm.toLocaleTimeString()}`;
    alarmStatus.classList.remove('alarm-active');
  });
  loadSavedAlarm();

  let countdownInterval = null;
  function formatTime(sec) {
    const m = Math.floor(sec / 60).toString().padStart(2, '0');
    const s = (sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  }
  countdownForm.addEventListener('submit', e => {
    e.preventDefault();
    const seconds = Number(countdownForm.querySelector('#countdown-duration').value);
    if (isNaN(seconds) || seconds <= 0) return;
    clearInterval(countdownInterval);
    let remaining = seconds;
    countdownDisplay.textContent = formatTime(remaining);
    countdownInterval = setInterval(() => {
      remaining--;
      if (remaining <= 0) {
        clearInterval(countdownInterval);
        countdownDisplay.textContent = "Time's up!";
      } else {
        countdownDisplay.textContent = formatTime(remaining);
      }
    }, 1000);
  });
});