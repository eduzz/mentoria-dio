import { HoustonThemeBuilder } from '@eduzz/houston-ui/styles/types';

const variables = {
  lang: 'pt-BR',
  headerHeight: 67,
  headerHeightUpSm: 64,
  tabbarHeight: 48,
  contentPadding: 12,
  contentPaddingUpSm: 24,
  boxShadow:
    '0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 5px 8px 0px rgba(0, 0, 0, 0.14), 0px 1px 14px 0px rgba(0, 0, 0, 0.12)'
};

const theme: HoustonThemeBuilder = {
  colors: {
    primary: {
      light: '#ffb04d',
      main: '#F18018',
      dark: '#b85200',
      contrastText: '#fff'
    },
    secondary: {
      light: '#4e4588',
      main: '#1F1E5A',
      dark: '#000031',
      contrastText: '#fff'
    }
  },
  variables
};

declare module '@eduzz/houston-ui/styles/types' {
  type Variables = typeof variables;
  interface IHoustonThemeCustomVariables extends Variables {}
}

export default theme;
