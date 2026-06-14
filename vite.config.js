import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        'opinions/index': 'opinions/index.html',
        'opinions/chemical-potential': 'opinions/chemical-potential.html',
        'opinions/engineering-under-uncertainty': 'opinions/engineering-under-uncertainty.html',
        'projects/lifeos': 'projects/lifeos.html',
        'projects/reaction-simulator': 'projects/reaction-simulator.html',
      }
    }
  }
});
