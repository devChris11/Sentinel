import type { Preview } from '@storybook/nextjs-vite';
import '../app/globals.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    
    backgrounds: {
      default: 'light-content',
      values: [
        {
          name: 'light-content',
          value: '#F8FAFC',
        },
        {
          name: 'dark-sidebar',
          value: '#0F172A',
        },
        {
          name: 'white',
          value: '#FFFFFF',
        },
      ],
    },
    
    viewport: {
      viewports: {
        desktop: {
          name: 'Desktop (Default)',
          styles: {
            width: '1280px',
            height: '900px',
          },
        },
        largeDesktop: {
          name: 'Large Desktop',
          styles: {
            width: '1920px',
            height: '1080px',
          },
        },
        tablet: {
          name: 'Tablet Landscape',
          styles: {
            width: '1024px',
            height: '768px',
          },
        },
      },
      defaultViewport: 'desktop',
    },

    a11y: {
      test: 'todo',
    },
  },
};

export default preview;