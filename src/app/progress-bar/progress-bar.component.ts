/*
 * Copyright (C) 2018 - present by OpenGamma Inc. and the OpenGamma group of companies
 *
 * Please see distribution for license.
 */

import { Component, Input } from '@angular/core';
import { interval, Observable, timer } from 'rxjs';
import { delay, last, map, takeWhile, tap } from 'rxjs/operators';

/**
 * A progress bar which approximates the progress of several calculations.
 *
 * When completedParts and totalParts are equal, the progress bar will be 100% full.
 */
@Component({
  selector: 'og-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent {

  // -------------------------------------------------------------------------
  // DO NOT CHANGE THESE INPUTS.

  /** The total number of parts. */
  @Input() totalParts: number;

  /** The number of completed parts. */
  @Input() completedParts: number;

  // -------------------------------------------------------------------------
  // TODO: Improve the code below

  @Input() showText: boolean = true;
  @Input() showLoading = false;


  /** Returns the number of requests completed, as a percentage of the number of total parts */
  getBarWidth(): number {
    return 100 * this.completedParts / this.totalParts;
  }

  loadingBarWidth = 
    interval(15).pipe(
      map(number => this.getBarWidth() === 100 ? 100 : number % 100),
      takeWhile(
        _ => this.getBarWidth() !== 100, 
        true
      ),
    );

}
