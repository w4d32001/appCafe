import {
    faBox,
  faCartShopping,
  faCoffee,
  faList,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';

interface SidebarItem {
  type: 'item';
  icon: IconDefinition;
  label: string;
  link: string;
}

interface SidebarSeparator {
  type: 'separator';
  label: string;
}

type SidebarMenuItem = SidebarItem | SidebarSeparator;
export const dataSidebar: SidebarMenuItem[] = [
  { type: 'separator', label: 'Dashboard' },
  { type: 'item', icon: faCoffee, label: 'Dashboard', link: '/' },
  { type: 'separator', label: 'Categorias' },
  { type: 'item', icon: faList, label: 'Categoria', link: '/category' },
  { type: 'separator', label: 'Productos' },
  { type: 'item', icon: faBox, label: 'Producto', link: '/product' },
  { type: 'separator', label: 'Pedidos' },
  { type: 'item', icon: faCartShopping, label: 'Ordenes', link: '/order' },
];
