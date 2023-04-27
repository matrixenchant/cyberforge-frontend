interface PCComponent {
    id: number;
    label: string;
    hero: string;
    type: string;
    power?: number;
    spec?: PCComponentSpec[];
}

interface PCComponentSpec {
    label: string;
    value: string;
}