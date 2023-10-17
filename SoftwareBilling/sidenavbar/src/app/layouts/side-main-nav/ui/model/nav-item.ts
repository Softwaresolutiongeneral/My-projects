export interface NavItem {
  id:number;
  menuName: string;
  disabled?: boolean;
  icon: string;
  landingpage?: string;
  menuId:number;
  roleId:number;
  children?: NavItem[];
}
