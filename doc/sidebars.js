// @ts-check

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.

 @type {import('@docusaurus/plugin-content-docs').SidebarsConfig}
 */
const sidebars = {
  overviewSidebar: [
    'overview/index',
    'overview/overview',
    'overview/circuit-diagrams',
    'overview/bom',
    'overview/mechanical-design',
  ],
  componentsSidebar: ['components/index', 'components/ams1117'],
  learningSidebar: ['learning/index'],
  howToSidebar: [
    'how-to/index',
    'how-to/kicad-workflow',
    'how-to/kicad-schematic-editing',
    'how-to/kicad-parts-download',
    'how-to/create-footprint-svg',
    'how-to/create-circuit-svg',
  ],
  miscSidebar: ['misc/index', 'misc/footprint-preview'],
  inboxSidebar: ['inbox/index', 'inbox/current-status', 'inbox/power-cable-recommendations'],
};

export default sidebars;
