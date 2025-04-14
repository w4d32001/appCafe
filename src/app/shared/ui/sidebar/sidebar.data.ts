import {
    faBox,
  faCartShopping,
  faCoffee,
  faFileInvoice,
  faList,
  faUser,
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
  { type: 'item', icon: faCoffee, label: 'Dashboard', link: '/page/' },
  { type: 'separator', label: 'Categorias' },
  { type: 'item', icon: faList, label: 'Categoria', link: '/page/category' },
  { type: 'separator', label: 'Productos' },
  { type: 'item', icon: faBox, label: 'Producto', link: '/page/product' },
  { type: 'separator', label: 'Pedidos' },
  { type: 'item', icon: faCartShopping, label: 'Ordenes', link: '/page/order' },
  { type: 'separator', label: 'Clientes' },
  { type: 'item', icon: faUser, label: 'Cliente', link: '/page/user' },
  { type: 'separator', label: 'Facturas' },
  { type: 'item', icon: faFileInvoice, label: 'Factura', link: '/page/bill' },
  { type: 'separator', label: 'Examen' },
  { type: 'item', icon: faFileInvoice, label: 'Examen', link: '/page/examen' },
];
