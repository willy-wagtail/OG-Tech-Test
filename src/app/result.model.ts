/*
 * Copyright (C) 2018 - present by OpenGamma Inc. and the OpenGamma group of companies
 *
 * Please see distribution for license.
 */

// ------------------------------------------------------
// --- DO NOT MODIFY THIS FILE
// ------------------------------------------------------

/**
 * Represents the result of checking a calculation state.
 */
export interface Result {

  /** The status of the calculation. */
  status: 'PENDING' | 'SUCCESS';

  /** The calculation result, present if the status is `SUCCESS`. */
  value?: ImGrouping;
}

/**
 * Represents an initial margin value for a given grouping, alongside the members that form the grouping.
 */
export interface ImGrouping {

  /** The name of the grouping. */
  name: string;

  /** The value of the initial margin. */
  imValue: CurrencyValue;

  /** The members of the grouping. */
  children?: ImGrouping[];
}

/**
 * Represents a price value for a currency.
 */
export interface CurrencyValue {

  /** The currency symbol. */
  symbol: string;

  /** The currency value. */
  price: number;

  /** The currency ISO Code. */
  isoCode: string;
}
