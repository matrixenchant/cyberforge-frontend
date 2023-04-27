interface PCComponent {
  id: number;
  name: string;
  image: string;
  type: string;
  rating?: number;
  spec?: PCComponentSpec[];
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