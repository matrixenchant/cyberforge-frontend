import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-assembly-card',
  templateUrl: './assembly-card.component.html',
  styleUrls: ['./assembly-card.component.scss'],
})
export class AssemblyCardComponent implements OnInit {
  @Input()
  canLiked: boolean = false;

  @Input()
  isLiked: boolean = false;

  @Input()
  isMyAssemblies: boolean = false;

  @Input()
  assembly: PCModification = {
    id: 0,
    price: 0,
    name: '',
    author_name: '',
    likes: 10,
    components: [],
  };
  likeDisable = false;

  constructor(public api: ApiService, public auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.likeDisable = !this.auth.isAuth
    
    this.isLiked = this.auth.user.likes.includes(this.assembly.id as number)
  }


  likeHandler() {
    const id = this.assembly.id as number
    if (!id) return;
    this.likeDisable = true;
    this.api.likeModification(id)
    .subscribe((x) => {
      if (x.message.includes('added')) {
        this.isLiked = true;
        this.auth.user.likes.push(id)
        this.assembly.likes++
      }
      else {
        this.isLiked = false;
        this.auth.user.likes = this.auth.user.likes.filter(x => x !== id)
        this.assembly.likes--
      }

      this.likeDisable = false;
    });
  }

  deleteHandler() {
    const id = this.assembly.id as number
    this.api.deleteModification(id).subscribe(x => {
      console.log('delete', x);
      
      this.auth.user.modifications = this.auth.user.modifications.filter(x => x.id !== id)
      this.router.navigate([this.router.url])
    })
  }

  editHandler() {
    this.router.navigate([`/configurator/${this.assembly.id}`])
  }

  getHousingImage() {
    return this.assembly.components.find((x) => x.type === 'Housing')?.images;
  }

  getRating() {
    const sum = this.assembly.components.reduce(
      (prev, val) => val.rating + prev,
      0
    );
    return Math.round(sum / this.assembly.components.length);
  }

  getComponents() {
    return this.assembly.components.slice(0, 4);
  }
}
