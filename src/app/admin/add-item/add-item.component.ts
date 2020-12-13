import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { SearchItem } from 'src/app/search/search.component';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {
  items: SearchItem[] = [];

  constructor(private firestore: AngularFirestore, private router: Router) { }

  ngOnInit(): void {
    this.firestore.collection("items").snapshotChanges().subscribe(snapshot => {
      this.items = snapshot.map((snap: any) => {
        return { ...snap.payload.doc.data(), id: snap.payload.doc.id };
      });
    });
  }

  addItem(): void {
    this.router.navigate(["admin/item-detail/0"])
  }

  rebuy(itemId: string): void {

  }

  trash(itemId: string): void {

  }
}
