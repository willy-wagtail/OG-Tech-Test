/*
 * Copyright (C) 2018 - present by OpenGamma Inc. and the OpenGamma group of companies
 *
 * Please see distribution for license.
 */

import { Injectable } from "@angular/core";
import { Observable, of as observableOf } from "rxjs";
import { delay } from "rxjs/operators";
import { Result, ImGrouping, CurrencyValue } from "./result.model";

// ------------------------------------------------------
// --- DO NOT MODIFY THIS FILE
// ------------------------------------------------------

/** Minimum duration of mock calculation. */
const MIN_TIME = 2500; // 2.5 seconds

/** Maximum time of mock calculation. */
const MAX_TIME = 10000; // 10 seconds

/**
 * Represents the API used for making requests and retrieving the status of the requests.
 * Returns mock data, though with delays to represent possible behaviour of real endpoints.
 */
@Injectable()
export class DataService {
  private lastId = 0;
  private endTimeById = [];

  /**
   * Requests a calculation and returns an observable with a corresponding calculation ID.
   *
   * @return an observable with a list of IDs corresponding to individual calculations
   */
  submitCalculation(): Observable<string> {
    const endTime =
      Date.now() + (MIN_TIME + Math.random() * (MAX_TIME - MIN_TIME));
    const id = this.lastId++;
    this.endTimeById[id] = endTime;
    return observableOf(`${id}`).pipe(delay(500));
  }

  /**
   * Requests the result of a calculation with the given ID.
   *
   * @param id the calculation ID
   */
  requestResult(id: string): Observable<Result> {
    const isSuccess = Date.now() >= this.endTimeById[+id];
    const result: Result = {
      status: isSuccess ? "SUCCESS" : "PENDING",
      value: isSuccess ? this.createImGroupings(id) : undefined,
    };
    return observableOf(result).pipe(delay(500));
  }

  /**
   * Creates a grouping with a random list of sub-groupings.
   *
   * @param calculationId the id of the calculation that requests these results
   * @param level the grouping level
   */
  private createImGroupings(calculationId: string, level = 0): ImGrouping {
    let brokerImPrice = 0;
    const children = [];
    const numberOfChildren = 1 + Math.round(Math.random() * 5);
    for (let i = 0; i < numberOfChildren; i++) {
      const name = `Trader ${calculationId}-${i}`;
      const imValue = this.priceToDollarValue(5000 + Math.random() * 10000);
      children.push({ name, imValue });
      brokerImPrice += imValue.price;
    }

    const name = `Broker ${calculationId}`;
    const imValue = this.priceToDollarValue(brokerImPrice);
    return { name, imValue, children };
  }

  /**
   * Creates a dollar currency from a given price.
   *
   * @param price the price value of the currency
   */
  private priceToDollarValue(price: number): CurrencyValue {
    return {
      price,
      symbol: "$",
      isoCode: "USD",
    };
  }
}
