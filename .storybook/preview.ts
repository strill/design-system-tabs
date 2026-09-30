import type { Preview } from "@storybook/react-vite";
import "../src/styles/style.scss";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    viewport: {
      options: {
        small: {
          name: "Small (375)",
          styles: { width: "375px", height: "812px" },
        },
        medium: {
          name: "Mobile: True (768)",
          styles: { width: "768px", height: "1024px" },
        },
        full: {
          name: "Full (100%)",
          styles: { width: "100%", height: "100%" },
        },
      },
    },
  },
};

export default preview;
