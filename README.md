# react-globalize

Easy to use [React](http://facebook.github.io/react/) components that provide internationalization features out of the box via [Globalize](https://github.com/jquery/globalize). With a quick update of a value, variable or locale, you get instant UI updates.

## Install
1. `npm install react-globalize`
2. In your application just:
	`var FormatCurrency = require('react-globalize').FormatCurrency;`
3. Then follow the usage instructions for each component below

## Components
Components are the heart of React and the whole point of react-globalize. These components provide simple, easily updatable elements in your page to display things like currency, dates, numbers and messages, formatted or translated to the current locale set by your application.

### FormatCurrency
#### Props
- **locale** - required
 - A string value representing the CLDR indicator for the desired locale used in formatting the amount. Most apps will pull this value from the component's state or the state of one of its parent compenents.
- **currency** - required
 - A string value representing the currency type (USD, EUR, etc)
- **value** - required
 - The numeric value to be formatted
- **options**
 - An optional set of options to further format the value. See the [numberFormatter](https://github.com/jquery/globalize/blob/master/doc/api/number/number-formatter.md) docs in Globalize for more info on specific options

#### Usage
- Default format with USD in English

  `<FormatCurrency locale="en" currency="USD" value={150} />`

Result: $150.00

- Accounting format with EUR in Portuguese

  `<FormatCurrency locale="pt-BR" currency="EUR" value={-150} options={{ style: "accounting" }} />`

Result: (€150,00)

### FormatDate
#### Props
- **locale** - required
 - A string value representing the CLDR indicator for the desired locale used in formatting the date. Most apps will pull this value from the component's state or the state of one of its parent compenents.
- **value** - required
 - The date object to be formatted
- **pattern** - required
 - An string or object which defines how to format the date. See the [dateFormatter](https://github.com/jquery/globalize/blob/master/doc/api/date/date-formatter.md) docs in Globalize for more info on supported patterns

#### Usage
- Simple string skeleton in English

  `<FormatDate locale="en" value={new Date()} pattern="GyMMMd" />`

Result: Feb 27, 2015 AD

- Medium length date and time in Portuguese

  `<FormatDate locale="pt-BR" value={new Date()} pattern={{ datetime: 'medium' }} />`

Result: 27 de fev de 2015 11:17:10

### FormatMessage
#### Props
- **locale** - required
 - A string value representing the CLDR indicator for the desired locale used in formatting the message. Most apps will pull this value from the component's state or the state of one of its parent compenents.
- **path** - required
 - String or array path to traverse a set of messages store in JSON format
- **variables**
 - An array (where variables are represented as indeces) or object (for named variables) which contains values for variable replacement within a message.

#### Usage
Below message JSON used in these examples:
  ```JS
  {
    en: {
      salutations: {
        hi: "Hi",
        bye: "Bye"
      },
      variables: {
        hello: "Hello, {0} {1} {2}",
        hey: "Hey, {first} {middle} {last}"
      }
    },
    "pt-BR": {
      salutations: {
        hi: "Oi",
        bye: "Tchau"
      },
      variables: {
        hello: "Olá, {0} {1} {2}",
        hey: "Ei, {first} {middle} {last}"
      }
    }
  }
  ```
- Simple salutation

Hi in English: `<FormatMessage locale="en" path="salutations/hi" />`

Result: Hi

Hi in Portuguese: `<FormatMessage locale="pt-BR" path="salutations/hi" />`

Result: Oi

- Variable Replacement

Array in English: `<FormatMessage locale="en" path="variables/hello" variables={["Wolfgang", "Amadeus", "Mozart"]} />`

Result: Hello, Wolfgang Amadeus Mozart

Object in Portuguese: `<FormatMessage locale="pt-BR" path="variables/hey" variables={{first:"Wolfgang", middle:"Amadeus", last:"Mozart"}} />`

Result: Ei, Wolfgang Amadeus Mozart

### FormatNumber
#### Props
- **locale** - required
 - A string value representing the CLDR indicator for the desired locale used in formatting the date. Most apps will pull this value from the component's state or the state of one of its parent compenents.
- **value** - required
 - The number to be formatted
- **options**
 - An optional set of options to further format the value. See the [numberFormatter](https://github.com/jquery/globalize/blob/master/doc/api/number/number-formatter.md) docs in Globalize for more info on specific options

#### Usage
- Default format pi in English

  `<FormatNumber locale="en" value={Math.PI} />`

Result: 3.142

- Show at least 2 decimal places in Portuguese

  `<FormatNumber locale="pt-BR" value={10000} options={{ minimumFractionDigits: 2 }} />`

Result: 10.000,00

## License
This project is distributed under the [MIT license](https://www.tldrlegal.com/l/mit).
