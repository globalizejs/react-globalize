# react-globalize

Easy to use [React](http://facebook.github.io/react/) mixins that provide internationalization features to any React component via [Globalize](https://github.com/jquery/globalize). With a little initialization, you get instantly internationalized values in your components.

## Install
1. `npm install react-globalize`
2. In your application just:
	```JS
	var ReactGlobalize = require('react-globalize');
	var Globalize = require('globalize');
	
	// Initialize Globalize and load your CLDR data
	// See https://github.com/jquery/globalize for details on Globalize usage
	
	// In your component, this example just places the formatted value in a span
	var CurrencyComponent = React.createClass({
	    mixins: [ReactGlobalize.formatCurrency],
	    ...
	    render: function() {
	        return (
                    <span>{this.state.formattedValue}</span>
                );
            }
	});
	
	// Then to use your currency component (with JSX)
	React.render(
	    <CurrencyComponent locale="en" currency="USD" value={150}/>
	);
	// Which would render <span>$150.00</span>
	```
	
3. Further info about each mixin and its available props below

## Mixins
These mixins provide a simple way to display things like currency, dates, numbers and messages, formatted or translated to the current locale set by your application. Each mixin has a set of props, both required and optional, to be included in your component. The mixin then uses the values of those props, to add a `formattedValue` to your component's state. Below is a listing of each mixin, its props and a usage example.

### formatCurrency
#### Props
- **locale** - required
 - A string value representing the CLDR indicator for the desired locale used in formatting the amount. Most apps will pull this value from the component's state or the state of one of its parent compenents.
- **currency** - required
 - A string value representing the currency type (USD, EUR, etc)
- **value** - required
 - The numeric value to be formatted
- **options**
 - An optional set of options to further format the value. See the [numberFormatter](https://github.com/jquery/globalize/blob/master/doc/api/number/number-formatter.md) docs in Globalize for more info on specific options

#### Usage via an example FormatCurrency component
- Default format with USD in English

  `<FormatCurrency locale="en" currency="USD" value={150} />`

Result: this.state.formattedValue = $150.00

- Accounting format with EUR in Portuguese

  `<FormatCurrency locale="pt-BR" currency="EUR" value={-150} options={{ style: "accounting" }} />`

Result: this.state.formattedValue = (€150,00)

### formatDate
#### Props
- **locale** - required
 - A string value representing the CLDR indicator for the desired locale used in formatting the date. Most apps will pull this value from the component's state or the state of one of its parent compenents.
- **value** - required
 - The date object to be formatted
- **pattern** - required
 - An string or object which defines how to format the date. See the [dateFormatter](https://github.com/jquery/globalize/blob/master/doc/api/date/date-formatter.md) docs in Globalize for more info on supported patterns

#### Usage via an example FormatDate component
- Simple string skeleton in English

  `<FormatDate locale="en" value={new Date()} pattern="GyMMMd" />`

Result: this.state.formattedValue = Feb 27, 2015 AD

- Medium length date and time in Portuguese

  `<FormatDate locale="pt-BR" value={new Date()} pattern={{ datetime: 'medium' }} />`

Result: this.state.formattedValue = 27 de fev de 2015 11:17:10

### formatMessage
#### Props
- **locale** - required
 - A string value representing the CLDR indicator for the desired locale used in formatting the message. Most apps will pull this value from the component's state or the state of one of its parent compenents.
- **path** - required
 - String or array path to traverse a set of messages store in JSON format
- **variables**
 - An array (where variables are represented as indeces) or object (for named variables) which contains values for variable replacement within a message.

#### Usage via an example FormatMessage component
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

Result: this.state.formattedValue = Hi

Hi in Portuguese: `<FormatMessage locale="pt-BR" path="salutations/hi" />`

Result: this.state.formattedValue = Oi

- Variable Replacement

Array in English: `<FormatMessage locale="en" path="variables/hello" variables={["Wolfgang", "Amadeus", "Mozart"]} />`

Result: this.state.formattedValue = Hello, Wolfgang Amadeus Mozart

Object in Portuguese: `<FormatMessage locale="pt-BR" path="variables/hey" variables={{first:"Wolfgang", middle:"Amadeus", last:"Mozart"}} />`

Result: this.state.formattedValue = Ei, Wolfgang Amadeus Mozart

### formatNumber
#### Props
- **locale** - required
 - A string value representing the CLDR indicator for the desired locale used in formatting the date. Most apps will pull this value from the component's state or the state of one of its parent compenents.
- **value** - required
 - The number to be formatted
- **options**
 - An optional set of options to further format the value. See the [numberFormatter](https://github.com/jquery/globalize/blob/master/doc/api/number/number-formatter.md) docs in Globalize for more info on specific options

#### Usage via an example FormatNumber component
- Default format pi in English

  `<FormatNumber locale="en" value={Math.PI} />`

Result: this.state.formattedValue = 3.142

- Show at least 2 decimal places in Portuguese

  `<FormatNumber locale="pt-BR" value={10000} options={{ minimumFractionDigits: 2 }} />`

Result: this.state.formattedValue = 10.000,00

## License
This project is distributed under the [MIT license](https://www.tldrlegal.com/l/mit).
