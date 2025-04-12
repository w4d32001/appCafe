import { Injectable } from '@angular/core';
import { faBars, faBox, faCheck, faCircle, faCircleNotch, faClose, faCoins, faDotCircle, faEdit, faEye, faFloppyDisk, faList, faPlus, faSave, faSearch, faTrash, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Injectable({
  providedIn: 'root'
})
export class IconsService {

  icons: { [key: string]: IconDefinition} = {
    'close': faClose,
    'edit': faEdit,
    'delete': faTrash,
    'eye': faEye,
    'plus': faPlus,
    'check': faCheck,
    'circle': faCircle,
    'dot-circle': faDotCircle,
    'search': faSearch,
    'save': faSave,
    'loading': faCircleNotch,
    'bars': faBars,
    'list': faList,
    'box': faBox,
    'coins': faCoins
  }

  getIcon(name: string): IconDefinition {
    return this.icons[name] || faCircle;
  }
}
