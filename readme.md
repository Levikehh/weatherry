# Weatherry

## Usage
1. Start `express` with `npm start`.
2. Open `index.html` file with any browser.
3. Select a city from the dropdown, then click `Check weather` button.

You will see the result / error on the right.

## API

#### **POST** `/api/weather`
| Body param | Type | Example value |
| :--------: | :--: | :-----------: |
| `city` | `string` | `'Budapest'` |

## Logging
* Console
* `access.log` file

## Stack

* NodeJS (Express.JS)
* Redis
* jQuery
* TailwindCSS