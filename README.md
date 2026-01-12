# ChronoGlow – Colorful Time Dashboard

## Overview
ChronoGlow is a vibrant, responsive web application that brings together a collection of time‑related utilities in a single, visually appealing dashboard. Built with modern HTML, CSS, and JavaScript, the app runs entirely in the browser—no server, build tools, or dependencies required. The design embraces bold gradients, subtle shadows, and smooth animations to create an engaging user experience on both desktop and mobile devices.

## Features
- **Dynamic Clock** – Real‑time display of the current time, updating every second.
- **Timezone Selector** – Switch the clock to any IANA timezone (e.g., `America/New_York`, `Asia/Tokyo`).
- **Theme Toggle** – Light and dark mode themes with smooth transitions.
- **Alarm Scheduler** – Set a daily alarm that triggers a browser notification when the time is reached.
- **Countdown Timer** – Start a countdown for a custom number of seconds with visual progress feedback.
- **Responsive Layout** – Flexbox/Grid layout adapts to various screen sizes, from phones to large monitors.
- **Animated UI** – Subtle hover effects, fade‑in animations, and gradient transitions enhance interactivity.

## Screenshots
> *Replace the placeholders with actual screenshots of the app.*

![ChronoGlow Dashboard – Light Theme](screenshots/light-theme.png)

![ChronoGlow Dashboard – Dark Theme](screenshots/dark-theme.png)

## Tech Stack
- **HTML5** – Semantic markup with `<header>`, `<main>`, `<section>`, and `<footer>`.
- **CSS3** – Modern layout techniques (Flexbox, CSS Grid), CSS variables for theming, gradients, shadows, and keyframe animations.
- **JavaScript (ES6+)** – Vanilla JS for all interactive logic, including `Intl.DateTimeFormat` for timezone handling, the Notification API for alarms, and `requestAnimationFrame` for smooth countdown updates.
- **Web APIs** – Utilizes the Browser Notification API, `setInterval`, and `localStorage` for persisting user preferences.

## Installation & Setup
1. **Clone the repository** (or download the ZIP):
   ```bash
   git clone https://github.com/yourusername/chronoglow.git
   cd chronoglow
   ```
2. **Open the app** – No build step is required. Simply open `index.html` in any modern web browser (Chrome, Firefox, Edge, Safari). You can double‑click the file or run:
   ```bash
   open index.html   # macOS
   start index.html  # Windows
   ```
3. **Optional – Enable notifications**
   When you set an alarm for the first time, the browser will ask for permission to display notifications. Accept the prompt to receive alarm alerts.

## Usage Guide
1. **Current Time** – The main clock shows the local time by default.
2. **Change Timezone** – Use the dropdown menu to select a different IANA timezone. The clock updates instantly.
3. **Toggle Theme** – Click the sun/moon icon in the top‑right corner to switch between light and dark themes.
4. **Set an Alarm** – Choose a time using the hour/minute selectors and click **Set Alarm**. The alarm repeats daily until you clear it.
5. **Start a Countdown** – Enter the number of seconds, then press **Start**. The timer displays a progress bar and a visual countdown.
6. **Persisted Settings** – Theme choice and the last selected timezone are saved in `localStorage` and restored on subsequent visits.

## Contributing
Contributions are welcome! If you’d like to improve ChronoGlow, follow these steps:
1. Fork the repository.
2. Create a new branch for your feature or bug‑fix:
   ```bash
   git checkout -b feature/awesome-feature
   ```
3. Make your changes, ensuring the code follows the existing style and the app remains responsive.
4. Test the changes across different browsers and screen sizes.
5. Submit a pull request with a clear description of the changes.

Please adhere to the project's coding standards and include relevant documentation or screenshots if you add new UI elements.

## License
This project is licensed under the MIT License – see the `LICENSE` file for details.
