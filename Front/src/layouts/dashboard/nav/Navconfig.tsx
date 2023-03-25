// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  blog: icon('ic_blog'),
  cart: icon('ic_cart'),
  chat: icon('ic_chat'),
  mail: icon('ic_mail'),
  user: icon('ic_user'),
  file: icon('ic_file'),
  lock: icon('ic_lock'),
  label: icon('ic_label'),
  blank: icon('ic_blank'),
  kanban: icon('ic_kanban'),
  folder: icon('ic_folder'),
  banking: icon('ic_banking'),
  booking: icon('ic_booking'),
  invoice: icon('ic_invoice'),
  calendar: icon('ic_calendar'),
  disabled: icon('ic_disabled'),
  external: icon('ic_external'),
  menuItem: icon('ic_menu_item'),
  ecommerce: icon('ic_ecommerce'),
  analytics: icon('ic_analytics'),
  dashboard: icon('ic_dashboard'),
  customer: icon('ic_user'),

};

const navConfig  = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'general',
    items: [
      { title: 'Blank', path: PATH_DASHBOARD.blank, icon: ICONS.blank },
      { title: 'Add Product', path: PATH_DASHBOARD.product.add, icon: ICONS.blank },
      {
        title: 'customer',
        path: PATH_DASHBOARD.customer.root,
        icon: ICONS.customer,
        children: [
          { title: 'Add', path: PATH_DASHBOARD.customer.add },
          { title: 'List', path: PATH_DASHBOARD.customer.list },
        ]
      },
    ],
  },
];

export default navConfig;
