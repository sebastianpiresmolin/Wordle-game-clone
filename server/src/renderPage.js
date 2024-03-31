export default async function renderPage(res, page) {
  const currentPath = page == 'index' ? '/' : `/${page}`;
  res.render(page, {
    menuItems: MENU.map((item) => {
      return {
        active: currentPath == item.link,
        label: item.label,
        link: item.link,
      };
    }),
  });
}

const MENU = [
  {
    label: 'Leaderboards',
    link: '/leaderboards',
  },
  {
    label: 'About',
    link: '/about',
  },
];
