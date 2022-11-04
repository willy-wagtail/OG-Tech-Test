/*
 * Copyright (C) 2018 - present by OpenGamma Inc. and the OpenGamma group of companies
 *
 * Please see distribution for license.
 */

import { Injectable } from "@angular/core";
import { DataService } from "./data.service";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { delay, mergeMap, tap, map, filter, catchError } from "rxjs/operators";
import { ImGrouping, Result } from "./result.model";

/**
 * Enables calculations to be carried out.
 */
@Injectable()
export class CalculationService {
  private readonly POLL_INTERVAL: number = 200;

  /**
   * Returns the result of a long running calculation.
   */
  calculate(): Observable<ImGrouping> {
    return this.dataService.submitCalculation().pipe(
      mergeMap((id) => this.pollForResult(id)),
      filter((result) => result.status === "SUCCESS"),
      map((result) => result.value)
    );
  }

  constructor(private dataService: DataService) {}

  private pollForResult(id: string): Observable<Result> {
    const trigger = new BehaviorSubject("");

    const continueIfPending = (result: Result) => {
      if (result.status === "PENDING") {
        trigger.next("");
      }
    };

    return trigger.pipe(
      delay(this.POLL_INTERVAL),
      mergeMap((_) => this.dataService.requestResult(id)),
      tap(continueIfPending),
      catchError((err) => {
        
        // If using http, we'd be mapping out and handling error scenarios.
        // Could continue polling for non-fatal errors, or terminate polling for fatal ones.
        // Catch and rethrow strategy for the error so we can handle error in view, 
        // and perhaps a global error handler can log it.

        console.error(
          "Catch, handle error locally, then rethrow for higher up error handling",
          err
        );
        return throwError(err);
      })
    );
  }
}
