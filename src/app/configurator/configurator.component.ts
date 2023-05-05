import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { snakeCase } from 'src/utils';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';
import { DeckComponent } from './deck/deck.component';

@Component({
  selector: 'app-configurator',
  templateUrl: './configurator.component.html',
  styleUrls: ['./configurator.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ConfiguratorComponent implements OnInit {
  @ViewChild(DeckComponent) deckComponent: DeckComponent | undefined;

  showFilter: boolean = false;
  filterFields: FilterField[] = [
    {
      label: 'Название',
      value: 'name',
      size: '1fr',
    },
    {
      label: 'Цена от',
      value: 'costMin',
      size: '0.5fr',
      type: 'number',
    },
    {
      label: 'Цена до',
      value: 'costMax',
      size: '0.5fr',
    },
  ];

  name: string = '';

  assembly: PCModification = {
    id: 0,
    name: '',
    price: 0,
    description: '',
    author_name: '',
    likes: 0,
    components: [],
  };

  types: PCTypes[] = [
    { type: 'Housing', label: 'Корпус', component: null },
    { type: 'CPU', label: 'CPU', component: null },
    { type: 'GPU', label: 'Видеокарта', component: null },
    { type: 'Motherboard', label: 'Мат. плата', component: null },
    { type: 'RAM', label: 'ОЗУ', component: null },
    { type: 'Memory', label: 'Память', component: null },
    { type: 'PowerSupplyUnit', label: 'Блок питания', component: null },
  ];
  activeType: string | null = null;

  components: PCComponent[] = [];

  deck = [] as any;

  loading: boolean = false;
  isEdit: boolean = false;

  constructor(
    public notification: NotificationService,
    public api: ApiService,
    public auth: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.route.params.subscribe((params: any) => {
        if (!params['id']) return;
        const mod = this.auth.user.modifications.filter(
          (x) => +(x.id as number) === +params['id']
        )[0];
        this.assembly = mod;
        this.name = mod.name;
        this.isEdit = true;

        for (let i = 0; i < this.types.length; i++) {
          const type = this.types[i].type;
          const comp = mod.components.filter((x) => x.type === type)[0];
          this.types[i].component = comp;
        }
      });
    }, 500);
  }

  saveAssembly() {
    if (this.types.some((x) => x.component === null)) {
      return this.notification.notify('Выберите все компоненты');
    }
    if (!this.name) {
      return this.notification.notify('Заполните название сборки');
    }

    const modification: PCModification = {
      id: this.assembly.id,
      name: this.name,
      description: `Description for ${this.name}`,
      likes: 0,
      price: this.getCost(),
      author_name: this.auth.user.username,
      components: this.types.map((x) => x.component) as PCComponent[],
    };

    this.loading = true;

    let handler = this.api.addModification(modification);
    if (this.isEdit) handler = this.api.updateModification(modification);

    handler
      .pipe(
        catchError((err) => {
          console.log(err);

          for (let e in err?.error) {
            this.notification.notify(err.error[e]);
          }

          this.loading = false;
          return throwError(() => err);
        })
      )
      .subscribe((x) => {
        console.log('success', x);
        this.notification.notify(
          this.isEdit ? 'Сборка сохранена' : 'Сборка создана'
        );

        if (this.isEdit) {
          this.auth.user.modifications = this.auth.user.modifications.map(mod => {
            if (mod.id == modification.id) return modification
            return mod
          });
        }

        this.loading = false;
      });
  }

  getHousing() {
    return this.types[0];
  }
  getRenderTypes() {
    return this.types.filter((x) => x.type !== 'Housing');
  }

  onSearch(data: any) {
    console.log('filter', data);
    const type = this.types.filter((x) => x.type === this.activeType)[0];

    const byName = (name: string) =>
      data.name ? name.toLowerCase().includes(data.name.toLowerCase()) : true;
    const byCostMin = (cost: number) =>
      data.costMin ? cost >= data.costMin : true;
    const byCostMax = (cost: number) =>
      data.costMax ? cost <= data.costMax : true;

    this.deckComponent?.changeDeck(
      this.assembly.components.filter(
        (x: any) =>
          x.type === type.type &&
          x.id !== type?.component?.id &&
          byName(x.name) &&
          byCostMin(x.cost) &&
          byCostMax(x.cost)
      )
    );
  }

  getCost() {
    let price = 0;

    this.types.forEach((x: PCTypes) => {
      if (!x.component?.price) return;
      price += +x.component.price;
    });
    return price;
  }

  getChoicesComponents() {
    return this.types
      .filter((x) => x.component !== null)
      .map((x) => x.component) as any;
  }

  addComponentEvent(comp: any) {
    this.types = this.types.map((x) =>
      x.type == comp.type ? { ...x, component: comp } : x
    );
    if (this.deckComponent?.deck)
      this.deckComponent.deck = this.components.filter(
        (x: any) => x.type === this.activeType && x.id !== comp?.id
      );
  }

  getTypeLabel(type: string) {
    return this.types.filter((x) => x.type === type)[0].label;
  }

  changeType(type: string) {
    if (type === this.activeType) return;
    this.activeType = type;
    const selfComp = this.types.filter((x) => x.type === type)[0].component;

    this.api.getListPCComponent(snakeCase(type)).subscribe((x) => {
      console.log(x);
      
      this.components = (x.results as PCComponent[])
      /*.filter(
        (x) => x.id !== selfComp?.id
      );*/

      this.deckComponent?.changeDeck(this.components);
    });
  }
}
