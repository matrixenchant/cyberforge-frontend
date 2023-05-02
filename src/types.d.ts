interface AppUser {
  first_name?: string,
  last_name?: string,
  email?: string,
  phone?: string,
  username: string,
  modifications: PCModification[]
}

type PCComponentTypes =
  | 'Housing'
  | 'Motherboard'
  | 'PowerSupplyUnit'
  | 'CPU'
  | 'GPU'
  | 'RAM'
  | 'Memory'
  | 'Cooling';

interface PCComponent {
  id: number;
  name: string;
  type: PCComponentTypes;
  images: string;
  price: number;
  rating: number;
  spec?: PCComponentSpec[];
}

interface PCModification {
  id?: number;
  name: string;
  description?: string;
  author_name: string;
  likes: number;

  components: PCComponent[];
}

interface PCComponentSpec {
  label: string;
  value: string;
}

interface AppNotification {
  id: string;
  message: string;
}

interface PCTypes {
  type: PCComponentTypes;
  label: string;
  component: null | PCComponent;
}

interface FilterField {
  label: string;
  value: string;
  size: `${number}fr`;
  type?: string;
}

interface AuthUser {
  token: string;
  user: AppUser;
}
