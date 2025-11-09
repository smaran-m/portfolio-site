export const NAV_COLORS = [
  '#FF0000',
  '#00FF00',
  '#0000FF',
  '#00FFFF',
  '#FF00FF',
  '#FFFF00',

] as const;

export const PAGE_COLORS = {
  home: NAV_COLORS[0],
  art: NAV_COLORS[1],
  music: NAV_COLORS[2],
  projects: NAV_COLORS[3],
  blog: NAV_COLORS[4],
  about: NAV_COLORS[5],
} as const;
