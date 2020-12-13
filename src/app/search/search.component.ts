import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

export interface SearchItem {
  id?: string;
  url: string;
  title: string;
  description: string;
  name: string;
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchKey: string = "";
  items: SearchItem[] = [];
  filteredItems: SearchItem[] = [];

  constructor(private firestore: AngularFirestore) { }

  ngOnInit(): void {
    this.firestore.collection("items").snapshotChanges().subscribe(snapshot => {
      this.items = snapshot.map((snap: any) => {
        return { ...snap.payload.doc.data(), id: snap.payload.doc.id };
      });

      this.populateFilteredItems();
    });
  }

  keyPress(event: KeyboardEvent) {
    this.populateFilteredItems();
  }

  populateFilteredItems(): void {
    this.filteredItems = this.items.filter(item => JSON.stringify(item).includes(this.searchKey));
  }
}
