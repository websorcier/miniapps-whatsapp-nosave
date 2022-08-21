/* ----------  Imports  ---------- */

// Styles
import './assets/css/app.css';

// App
import App from './App.svelte';

/* ----------  App  ---------- */

const app = new App({
	target: document.getElementById('app'),
});

/* ----------  Exports  ---------- */

export default app;
