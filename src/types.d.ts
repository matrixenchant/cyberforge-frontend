interface AppUser {
  id: number;
  username: string;
}

interface PCComponent {
  id: number;
  name: string;
  image: string;
  type: string;
  cost: number;
  rating?: number;
  spec?: PCComponentSpec[];
}

interface PCModification {
  id: number;
  name: string;
  description?: string;
  author_name: string;
  likes: number;

  housing?: PCComponent
  cpu?: PCComponent
  gpu?: PCComponent
  ram?: PCComponent
  memory?: PCComponent
  motherboard?: PCComponent
  power_supply?: PCComponent
  cooling?: PCComponent
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
  type: string;
  label: string;
  component: null | PCComponent;
}

interface FilterField {
  label: string;
  value: string;
  size: `${number}fr`;
  type?: string;
}