/*
 * Copyright (C) 2018 - present by OpenGamma Inc. and the OpenGamma group of companies
 *
 * Please see distribution for license.
 */

import { Component, OnInit } from "@angular/core";
import { Observable, range as observableRange } from "rxjs";
import { CalculationService } from "./calculation.service";
import { map, mergeMap, scan, share, startWith } from "rxjs/operators";
import { ImGrouping } from "./result.model";

@Component({
  selector: "og-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent implements OnInit {
  completedValues$: Observable<ImGrouping[]>;
  completedParts$: Observable<number>;

  totalParts = Math.floor(5 + Math.random() * 10); // Between 5 and 15 calculations

  ngOnInit(): void {
    this.completedValues$ = observableRange(1, this.totalParts).pipe(
      mergeMap(() => this.calculationService.calculate()),
      scan((acc, value: ImGrouping) => [...acc, value], []),
      share()
    );

    this.completedParts$ = this.completedValues$.pipe(
      map((values) => values.length),
      startWith(0)
    );
  }

  // -------------------------------------------------------------------------
  constructor(private calculationService: CalculationService) {}
}
