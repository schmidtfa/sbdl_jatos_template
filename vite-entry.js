
import 'jspsych/css/jspsych.css';

// Discover all experiment components.
const componentModules = import.meta.glob('@components/*.{js,jsx,ts,tsx}');

const components = Object.entries(componentModules).map(([file, load]) => ({
  name: file.split('/').pop().replace(/\.(js|jsx|ts|tsx)$/, ''),
  load,
}));

const app = document.getElementById('app');

function showComponent(name) {
  // Display the experiment index locally.
  if (!name || name === 'index') {
    const heading = document.createElement('h1');
    heading.textContent = 'JATOS study components';
    app.appendChild(heading);

    const list = document.createElement('ul');

    for (const component of components) {
      const item = document.createElement('li');
      const link = document.createElement('a');

      link.href = `./index.html?component=${encodeURIComponent(component.name)}`;
      link.textContent = component.name;

      item.appendChild(link);
      list.appendChild(item);
    }

    app.appendChild(list);
    return;
  }

  // Find and load the requested experiment.
  const component = components.find((item) => item.name === name);

  if (!component) {
    app.textContent = `Unknown component: ${name}`;
    return;
  }

  component.load().catch((error) => {
    console.error(`Could not load component '${name}':`, error);
    app.textContent = `Could not load component '${name}'. Check the console.`;
  });
}

// Different component resolution for JATOS and local development.
if (window.jatos) {
  // JATOS: use the actual component HTML file path.
  window.jatos.onLoad(() => {
    const htmlPath = window.jatos.componentProperties?.htmlFilePath;

    if (!htmlPath) {
      app.textContent = 'JATOS did not provide a component HTML file path.';
      return;
    }

    const filename = htmlPath.replace(/\\/g, '/').split('/').pop();
    const componentName = filename.replace(/\.html$/i, '');

    showComponent(componentName);
  });
} else {
  // Local Vite development: use query parameter or filename.
  const filename = decodeURIComponent(
    location.pathname.split('/').pop() || 'index.html'
  );

  if (filename === 'start') {
    app.textContent = 'JATOS library is missing. Check the jatos.js script.';
  } else {
    const componentName =
      new URLSearchParams(location.search).get('component') ||
      filename.replace(/\.html$/i, '');

    showComponent(componentName);
  }
}
