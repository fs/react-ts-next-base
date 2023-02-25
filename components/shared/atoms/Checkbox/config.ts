import theme from 'public/styles/theme';
import { TVariantConfig, TPositionConfig, TSizeProps } from './types';

export const positionConfig: TPositionConfig = {
  left: {
    marginLeft: '0',
    marginRight: '0.8rem',
    left: '0',
    right: 'auto',
  },
  right: {
    marginLeft: '0.8rem',
    marginRight: '0',
    left: 'auto',
    right: '0',
  },
};

export const sizeConfig: TSizeProps = '1rem';

export const variantConfig: TVariantConfig = {
  default: {
    checked: {
      backgroundImage:
        'data:image/svg+xml,%3Csvg viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath fill-rule="evenodd" clip-rule="evenodd" d="M12 1.70733L10.8449 0.552246L5.51285 5.88431L1.9657 2.45422L0.810608 3.60931L5.48861 8.13292L5.53151 8.17582L5.53223 8.1751L5.533 8.17584L6.68809 7.02076L6.68732 7.02002L12 1.70733Z" fill="white"/%3E%3C/svg%3E%0A',
      backgroundColor: theme.colors.blue,
      borderColor: theme.colors.blue,
    },
    unchecked: {
      backgroundImage: null,
      backgroundColor: theme.colors.white,
      borderColor: theme.colors.greyA3,
    },
  },
  plus: {
    checked: {
      backgroundImage:
        'data:image/svg+xml,%3Csvg viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M15.1786 1.375C15.5125 1.375 15.7857 1.64219 15.7857 1.96875V15.0312C15.7857 15.3578 15.5125 15.625 15.1786 15.625H1.82143C1.4875 15.625 1.21429 15.3578 1.21429 15.0312V1.96875C1.21429 1.64219 1.4875 1.375 1.82143 1.375H15.1786ZM15.1786 0.1875H1.82143C0.815848 0.1875 0 0.985352 0 1.96875V15.0312C0 16.0146 0.815848 16.8125 1.82143 16.8125H15.1786C16.1842 16.8125 17 16.0146 17 15.0312V1.96875C17 0.985352 16.1842 0.1875 15.1786 0.1875ZM12.9018 7.83203H9.18304V4.19531C9.18304 3.95039 8.97813 3.75 8.72768 3.75H8.27232C8.02188 3.75 7.81696 3.95039 7.81696 4.19531V7.83203H4.09821C3.84777 7.83203 3.64286 8.03242 3.64286 8.27734V8.72266C3.64286 8.96758 3.84777 9.16797 4.09821 9.16797H7.81696V12.8047C7.81696 13.0496 8.02188 13.25 8.27232 13.25H8.72768C8.97813 13.25 9.18304 13.0496 9.18304 12.8047V9.16797H12.9018C13.1522 9.16797 13.3571 8.96758 13.3571 8.72266V8.27734C13.3571 8.03242 13.1522 7.83203 12.9018 7.83203Z" fill="%2325B900"/%3E%3C/svg%3E',
      backgroundColor: theme.colors.white,
      borderColor: 'transparent',
    },
    unchecked: {
      backgroundImage:
        'data:image/svg+xml,%3Csvg viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M15.1786 1.21429C15.5125 1.21429 15.7857 1.4875 15.7857 1.82143V15.1786C15.7857 15.5125 15.5125 15.7857 15.1786 15.7857H1.82143C1.4875 15.7857 1.21429 15.5125 1.21429 15.1786V1.82143C1.21429 1.4875 1.4875 1.21429 1.82143 1.21429H15.1786ZM15.1786 0H1.82143C0.815848 0 0 0.815848 0 1.82143V15.1786C0 16.1842 0.815848 17 1.82143 17H15.1786C16.1842 17 17 16.1842 17 15.1786V1.82143C17 0.815848 16.1842 0 15.1786 0ZM12.9018 7.81696H9.18304H7.81696H4.09821C3.84777 7.81696 3.64286 8.02188 3.64286 8.27232V8.72768C3.64286 8.97813 3.84777 9.18304 4.09821 9.18304H7.81696H9.18304H12.9018C13.1522 9.18304 13.3571 8.97813 13.3571 8.72768V8.27232C13.3571 8.02188 13.1522 7.81696 12.9018 7.81696Z" fill="%2325B900"/%3E%3C/svg%3E',
      backgroundColor: theme.colors.white,
      borderColor: 'transparent',
    },
  },
};
