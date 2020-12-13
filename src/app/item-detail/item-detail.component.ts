import { Component, OnInit } from '@angular/core';
import { SearchItem } from '../search/search.component';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {
  model: SearchItem = {
    description: "",
    name: "",
    title: "",
    url: ""
  };

  constructor(private firestore: AngularFirestore, private router: Router) { }

  ngOnInit(): void {
  }

  async onSave(): Promise<void> {
    await this.firestore.collection("items").add(this.model);
    this.router.navigate(["admin/add-items"]);
  }
}
