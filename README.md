# react-globalize

[React](http://facebook.github.io/react/) components that provide internationalization features via [Globalize](https://github.com/jquery/globalize). With a little initialization, you get instantly internationalized values in your application.

## Install

1. `npm install react-globalize --save`
2. In your application just:
	```JS
	var ReactGlobalize = require("react-globalize");
	var Globalize = require("globalize");
	var FormatCurrency = ReactGlobalize.FormatCurrency;

	// Initialize Globalize and load your CLDR data
	// See https://github.com/jquery/globalize for details on Globalize usage

	Globalize.locale("en");

	// Then, to use any ReactGlobalize component (with JSX)
	React.render(
	    <FormatCurrency currency="USD">{150}</FormatCurrency>
	);
	// Which would render for example:
	// <span>$150.00</span> when using the `en` (English) locale, or
	// <span>150,00 $</span> when using the `de` (German) locale, or
	// <span>US$150,00</span> when using the `pt` (Portuguese) locale, or
	// <span>US$ 150.00</span> when using the `zh` (Chinese) locale, or
	// <span>US$ ١٥٠٫٠٠</span> when using the `ar` (Arabic) locale.
	```

3. Further info about each component is available below.

## Components

These components provide a simple way to display things like currency, dates, numbers and messages, formatted or translated to the current locale set by your application. Each component has a set of props, both required and optional. The component then uses the values of those props to properly format the passed values. Below is a listing of each component, its props and a usage example.

### FormatCurrency

It allows to format a currency. Your code can be completely independent of the locale conventions for which currency symbol to use, whether or not there's a space between the currency symbol and the value, the side where the currency symbol must be placed, or even decimal digits used by particular currencies. Currencies can be displayed using symbols (the default), accounting form, 3-letter code, or plural messages. See [currencyFormatter][] docs in Globalize for more information.

[currencyFormatter]: https://github.com/jquery/globalize/blob/master/doc/api/currency/currency-formatter.md

#### Children

The numeric value to be formatted. Required.

#### Props

- **currency** - required
 - A 3-letter string currency code as defined by ISO 4217 (e.g., USD, EUR, CNY, etc).
- **options**
 - An optional set of options to further format the value. See the [currencyFormatter][] docs in Globalize for more info on specific options
- **locale** - optional
 - A string value representing the locale (as defined by BCP47) used to override the default locale (preferred) set by your application using `Globalize.locale(locale)` when formatting the amount.

#### Usage

Default format with USD.

```js
<FormatCurrency currency="USD">{150}</FormatCurrency>
// Which would render:
// <span>$150.00</span> when using the `en` (English) locale, or
// <span>US$150,00</span> when using the `pt` (Portuguese) locale.
```

Accounting format with EUR.

```js
<FormatCurrency currency="EUR" options={{style: "accounting"}}>
	{-150}
</FormatCurrency>
// Which would render:
// <span>(€150.00)</span> when using the `en` (English) locale, or
// <span>(€150,00)</span> when using the `pt` (Portuguese) locale.
```

### FormatDate

It allows to convert dates and times from their internal representations to textual form in a language-independent manner. Your code can conveniently control the length of the formatted date, time, datetime. See [dateFormatter][] docs in Globalize for more information.

[dateFormatter]: https://github.com/jquery/globalize/blob/master/doc/api/date/date-formatter.md

#### Children

The date object to be formatted. Required.

#### Props

- **options**
 - An optional set of options which defines how to format the date. See the [dateFormatter][] docs in Globalize for more info on supported patterns
- **locale** - optional
 - A string value representing the locale (as defined by BCP47) used to override the default locale (preferred) set by your application using `Globalize.locale(locale)` when formatting the amount.

#### Usage

Simple string skeleton.

```js
<FormatDate options={{skeleton: "GyMMMd"}}>
	{new Date()}
</FormatDate>
// Which would render:
// <span>Feb 27, 2015 AD</span> when using the `en` (English) locale, or
// <span>27 de fev de 2015 d.C.</span> when using the `pt` (Portuguese) locale.
```

Medium length date and time.

```js
<FormatDate options={{datetime: "medium"}}>
	{new Date()}
</FormatDate>
// Which would render:
// <span>Feb 27, 2015, 11:17:10 AM</span> when using the `en` (English) locale, or
// <span>27 de fev de 2015 11:17:10</span> when using the `pt` (Portuguese) locale.
```

### FormatMessage

It allows for the creation of internationalized messages (as defined by the [ICU Message syntax][]), with optional arguments (variables/placeholders) allowing for simple replacement, gender and plural inflections. The arguments can occur in any order, which is necessary for translation into languages with different grammars. See [messageFormatter][] docs in Globalize for more information.

[messageFormatter]: https://github.com/jquery/globalize/blob/master/doc/api/message/message-formatter.md
[ICU Message syntax]: http://userguide.icu-project.org/formatparse/messages

#### Children

Required unless the `path` property is set. It's a string with the default message. Either this or the `path` property is required.

#### Props

- **path** - required unless children is set
 - String or array path to traverse a set of messages store in JSON format. Defaults to the message itself defined by the children.
- **variables** - optional
 - An array (where variables are represented as indeces) or object (for named variables) which contains values for variable replacement within a message.
- **elements** - optional
 - An object (where element names are represented as keys, and its corresponding element as values) which contains elements replacement within a message.
- **locale** - optional
 - A string value representing the locale (as defined by BCP47) used to override the default locale (preferred) set by your application using `Globalize.locale(locale)` when formatting the amount.

#### Usage

Below translation message JSON used in these examples:
```js
{
	"pt": {
		"Hi": "Oi",
		"Hi, {0} {1} {2}": "Olá, {0} {1} {2}",
		"Hello, {first} {middle} {last}": "Ei, {first} {middle} {last}"
	}
}
```

Simple salutation.

```js
<FormatMessage>Hi</FormatMessage>
// Which would render:
// <span>Hi</span> when using the default message, in this case `en` (English).
// <span>Oi</span> when using the `pt` (Portuguese) locale and its translation messages.
```

Variable Replacement.

```js
// Using Array.
<FormatMessage variables={["Wolfgang", "Amadeus", "Mozart"]}>
	{"Hi, {0} {1} {2}"}
</FormatMessage>
// Which would render:
// <span>Hello, Wolfgang Amadeus Mozart</span> when using the default message, in this case `en` (English).
// <span>Hello, Wolfgang Amadeus Mozart</span> when using the `en` (English) locale and its translation messages.

// Using Object.
<FormatMessage variables={{first:"Wolfgang", middle:"Amadeus", last:"Mozart"}}>
  {"Hey, {first} {middle} {last}"}
</FormatMessage>
// Which would render:
// <span>Hey, Wolfgang Amadeus Mozart</span> when using the default message, in this case `en` (English).
// <span>Ei, Wolfgang Amadeus Mozart</span> when using the `pt` (Portuguese) locale and its translation messages.
```

Element Replacement.

```js
<FormatMessage
  elements={{
    reactGlobalizeLink: <a href='https://github.com/jquery-support/react-globalize'></a>
  }}
>
  For more information, see [reactGlobalizeLink]React Globalize[/reactGlobalizeLink]
</FormatMessage>
// Which would render:
// <span>
//   For more information, see 
//   <a href="https://github.com/jquery-support/react-globalize">React Globalize</a>
// </span>
// when using the default message, in this case `en` (English).
```

See [messageFormatter][] docs in Globalize for more message examples (e.g., pluralization or gender selection).

### FormatNumber

It allows to convert numbers into textual representations. Your code can be completely independent of the locale conventions for decimal points, thousands-separators, or even the particular decimal digits used, or whether the number format is even decimal. Though, it can still conveniently control various aspects of the formatted number like the minimum and maximum fraction digits, integer padding, rounding method, display as percentage, and others. See [numberFormatter][] docs in Globalize for more information.

[numberFormatter]: https://github.com/jquery/globalize/blob/master/doc/api/number/number-formatter.md

#### Children

The number to be formatted. Required.

#### Props

- **options**
 - An optional set of options to further format the value. See the [numberFormatter][] docs in Globalize for more info on specific options
- **locale** - optional
 - A string value representing the locale (as defined by BCP47) used to override the default locale (preferred) set by your application using `Globalize.locale(locale)` when formatting the amount.

#### Usage

Default format pi.

```js
<FormatNumber locale="en">{Math.PI}</FormatNumber>
// Which would render:
// <span>3.142</span> when using the `en` (English) locale, or
// <span>3,142</span> when using the `pt` (Portuguese) locale.
```

Show at least 2 decimal places.

```js
<FormatNumber options={{minimumFractionDigits: 2}}>
	{10000}
</FormatNumber>
// Which would render:
// <span>10,000.00</span> when using the `en` (English) locale, or
// <span>10.000,00</span> when using the `pt` (Portuguese) locale.
```

## Development

### Testing

```
npm test
```

### Release process

Update package.json version, commit, and merge it into `master`.

On master, run:

```
VER=<version> # e.g., "0.4.0"
git checkout --detach &&
grunt &&
git add -f dist/* &&
git commit -a -m Build &&
git tag -a -m v$VER v$VER
```

Verify the tag and:

```
git push --tags origin &&
npm publish
```

## License

This project is distributed under the [MIT license](https://www.tldrlegal.com/l/mit).
