import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Voxel Playground',
  tagline: 'Grab-and-rip micro-voxel destruction in VR',
  favicon: 'img/favicon.svg',

  url: 'https://voxelplayground.com',
  baseUrl: '/',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  onBrokenAnchors: 'ignore',

  organizationName: 'fonzieyang', // Usually your GitHub org/user name.
  projectName: 'VoxelPlayground', // Usually your repo name.
  trailingSlash: false, // Recommended for GitHub Pages

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  staticDirectories: ['static'],

  stylesheets: [
    {
      href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
      type: 'text/css',
    },
    {
      href: 'https://fonts.googleapis.com/css2?family=Jersey+25&display=swap',
      type: 'text/css',
    },
    {
      href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
      type: 'text/css',
      integrity: 'sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==',
      crossorigin: 'anonymous',
    },
  ],

  presets: [
    [
      'classic',
      {
        docs: false,
        blog: false,
        sitemap: {
          lastmod: 'date',
          changefreq: 'weekly',
          priority: 0.5,
          ignorePatterns: ['/d', '/privacy.html'],
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        gtag: {
          trackingID: 'G-6F55SYBBGC',
          anonymizeIP: true,
        },
      } satisfies Preset.Options,
    ],
  ],

  headTags: [
    {
      tagName: 'script',
      attributes: {
        type: 'application/ld+json',
      },
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'WebSite',
            name: 'Voxel Playground',
            url: 'https://voxelplayground.com/',
            description:
              'Smash micro-voxel walls, weapons, and enemies in VR. Rob a bank, fight through a prison, or build a base. On Steam and Meta Quest.',
            inLanguage: 'en',
          },
          {
            '@type': 'VideoGame',
            name: 'Voxel Playground',
            url: 'https://voxelplayground.com/',
            image: 'https://voxelplayground.com/img/og-2026-10.jpg',
            description:
              'A fully destructible VR physics sandbox. Walls, weapons, vehicles, and enemies are micro-voxels. Play on Steam and Meta Quest.',
            genre: ['Action', 'Simulation'],
            gamePlatform: ['Meta Quest', 'Windows'],
            playMode: 'SinglePlayer',
            inLanguage: 'en',
            sameAs: [
              'https://store.steampowered.com/app/4350620/Voxel_Playground/',
              'https://www.meta.com/experiences/voxel-playground/9926748747373800/',
              'https://www.youtube.com/@Voxel_Playground',
              'https://discord.com/invite/CrYCjTudCH',
              'https://www.tiktok.com/@voxel_playground',
            ],
          },
        ],
      }),
    },
  ],

  themeConfig: {
    image: 'img/og-2026-10.jpg',
    navbar: {
      title: 'Voxel Playground',
      hideOnScroll: true,
      items: [
        {href: '/#home', label: 'Home', position: 'right'},
        {href: '/#about', label: 'About', position: 'right'},
        {href: '/doc/documents/manual.html', label: 'Docs', position: 'right'},
        {to: '/privacy', label: 'Privacy Policy', position: 'right'},
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Voxel Playground',
          items: [{label: 'cutting-edge micro-voxel destruction in VR', to: '/'}],
        },
        {
          title: 'Links',
          items: [
            {label: 'Home', to: '/#home'},
            {label: 'About', to: '/#about'},
            {label: 'Modding Docs', href: '/doc/documents/manual.html'},
            {label: 'Steam', href: 'https://store.steampowered.com/app/4350620/Voxel_Playground/'},
            {label: 'Meta Quest', href: 'https://www.meta.com/experiences/voxel-playground/9926748747373800/'},
            {label: 'Privacy Policy', to: '/privacy'},
          ],
        },
        {
          title: 'Contact Us',
          items: [{label: 'Contact us through Discord', href: 'https://discord.com/invite/CrYCjTudCH'}],
        },
      ],
      copyright: '© 2026 Voxel Playground. All rights reserved.',
    },
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
    metadata: [
      {
        name: 'description',
        content:
          'Smash micro-voxel walls, weapons, and enemies in VR. Rob a bank, fight through a prison, or build a base. On Steam and Meta Quest.',
      },
      {
        name: 'keywords',
        content:
          'voxel playground, micro-voxel, vr physics sandbox, vr destruction game, destructible vr, voxel sandbox, steam vr sandbox, meta quest sandbox, vr bank heist, vr zombie survival, vr base building, vr modding',
      },
      {
        property: 'og:type',
        content: 'website',
      },
      {
        name: 'twitter:card',
        content: 'summary_large_image',
      },
    ],
  } satisfies Preset.ThemeConfig,
};

export default config;
