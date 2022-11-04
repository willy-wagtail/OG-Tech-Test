import { Component, Input, OnInit } from "@angular/core";
import { ImGrouping } from "../result.model";

@Component({
  selector: "og-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.scss"],
})
export class TableComponent implements OnInit {
  @Input() data: ImGrouping[] = [];

  totalImValue = 0;
  private showChildren = {};

  constructor() {}

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.calculateTotalImValue();
    this.setupShowChildrenState();
  }

  getFractionOfTotalPrice(price: number): number | null {
    if(this.totalImValue !== 0) {
      return price / this.totalImValue;
    } else {
      return null;
    }
  }

  isCollapsed(groupingName: string): boolean {
    const showChild = this.showChildren[groupingName];
    return showChild !== undefined && showChild === false;
  }

  toggleChildRows(groupingName: string): void {
    this.showChildren[groupingName] = !this.showChildren[groupingName];
  }

  trackByMethod(_index: number, item: ImGrouping): string {
    return item.name;
  }

  private calculateTotalImValue(): void {
    this.totalImValue = this.data.reduce(
      (prev, current) => prev + current.imValue.price,
      0
    );
  }

  private setupShowChildrenState(): void {
    this.data.forEach(row => {
      if(this.showChildren[row.name] === undefined) {
        this.showChildren[row.name] = false;
      }
    })
  }
}
