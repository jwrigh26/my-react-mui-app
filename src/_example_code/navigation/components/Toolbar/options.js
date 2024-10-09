import {
  faTag,
  faBookOpen,
  faLifeRing,
} from '@fortawesome/free-solid-svg-icons';
import { marketingSiteUrl } from 'data/constants';

export const options = [
  {
    icon: faTag,
    key: 'pricing',
    label: 'Pricing',
    url: `${marketingSiteUrl}#pricing`,
  },
  {
    icon: faBookOpen,
    key: 'tutorials',
    label: 'Tutorials',
    url: `${marketingSiteUrl}tutorials`,
  },
  {
    icon: faLifeRing,
    key: 'support',
    label: 'Support',
    url: `${marketingSiteUrl}support`,
  },
];
