import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        'projects/pals': 'projects/pals.html',
        'samsung-leadership-camp/index': 'samsung-leadership-camp/index.html',
        'concepts/sun-of-korea': 'concepts/sun-of-korea.html',
        'opinions/index': 'opinions/index.html',
        'opinions/does-quantum-chemistry-help': 'opinions/does-quantum-chemistry-help.html',
        'opinions/chemical-potential': 'opinions/chemical-potential.html',
        'opinions/engineering-under-uncertainty': 'opinions/engineering-under-uncertainty.html',
        'projects/lifeos': 'projects/lifeos.html',
        'projects/reaction-simulator': 'projects/reaction-simulator.html',
      }
    }
  }
});
