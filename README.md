# OpenGamma Web Development Coding Test

Thanks for applying to OpenGamma. This coding test is designed to test your understanding of Javascript, Angular and RxJS. The challenges below reflect typical requirements that our Web Developers face every day.

We'd recommend familiarising yourself with the [RxJS API](https://www.learnrxjs.io/) before beginning this task.

Feel free to add files and/or make changes to any files not marked with `DO NOT MODIFY THIS FILE`. This includes config files.

On average, the test takes around 2.5 hours to complete, however we acknowledge that this will depend on your experience and familiarity with the technologies. Tests are not evaluated by completion time but by completeness (does it meet requirements), correctness (is the code bug-free) and maintainability (can the next developer understand what you've done and why).

If you have any questions or queries about this coding test or your application in general, please email [webdevelopment@opengamma.com](mailto:webdevelopment@opengamma.com).
 
## Your Task

Our client requested an aggregated view across multiple price calculations that our system can run in parallel. The design team has produced an initial prototype that solves this. Your task is to implement this prototype (API integration, Data representation, User feedback) for early validation with the business side.

The exercise is formed of 3 parts, all of which can be completed individually. If struggling with one part feel free to attempt solving the rest.

### Part 1 - API Integration and Polling

Our [API](https://docs.opengamma.com) contains endpoints for:
 - asynchronously requesting calculations.
 - querying for the results of previously created calculations. 
 
A calculation takes between 2.5-10 seconds once the request has been submitted, so we've adopted a polling API with which a user submits a request and then polls an endpoint until the result is present.

An example sequence of requests might look like the following, where each call is made 2 seconds after the previous one.
```
POST /calculations -> id
GET /calculations/id -> PENDING
GET /calculations/id -> PENDING
GET /calculations/id -> PENDING
GET /calculations/id -> SUCCESS with value 123.45
```

This API is mocked in the `data.service.ts` file.

Your first task is to implement the polling behaviour described above. This should be implemented in the `calculation.service.ts` file, inside the `calculate` method.

##### Requirements
- The method should leverage the calculation service in order to submit a calculation request, then periodically query for that calculation's result until it becomes available.
- The method should then return an `Observable` which will emit once with the result `value` when the endpoint returns a result `status` of `SUCCESS`.

##### Indications
- Each request should be treated as a network call, hence the frequency of the API calls should be carefully considered.
- Explicit subscriptions to Observables are discouraged.

### Part 2 - Data Representation

As the calculated values are aggregated inside `app.component.ts`, they should be displayed to the user. The data structure returned in the API is defined in the `ImGrouping` interface in `result.model.ts`

Your second task is to create a table that displays the data, following the design under `assets/table-loaded.png`.

![Results Table](/src/assets/table-loaded.png)

##### Requirements
- The table should act as a 2-level tree, with each row offering the possibility to be expanded/collapsed on click, provided it has any children. Once expanded, it should display its children as rows directly underneath. See `assets/table-expanded.png` for reference.

![Table Expanded](/src/assets/table-expanded.png)

- The last column in the table should display a visual representation of the imValues of each row, compared to the total imValue of the rows in the table. The bars should rescale if the maximum value in the table changes.

### Part 3 - Improving UX

The progress of the calculations polling mechanism is depicted by the the `progress-bar` component.

Considering that the calculations could take a long time to return from the server, the progress bar will be stuck at 0% for multiple seconds. The user may consider that the system is idle and/or frozen.

An improvement would be to animate the progress-bar so that it fills itself gradually and consistently as soon as calculations are submitted (in our case, as soon as the page loads). The bar would only stop filling itself once all results have been fetched (at which point it will have reached 100% of its width). 
 
Modify the progress bar component to implement this behaviour.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.
