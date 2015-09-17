var React = require('react');
var Globalize = require('globalize');
var LocalizedCurrencies = require('./components/currency');
var LocalizedDates = require('./components/dates');
var LocalizedMessages = require('./components/messages');
var LocalizedNumbers = require('./components/numbers');

var messages = {
    en: {
        salutations: {
            hi: "Hi",
            bye: "Bye"
        },
        variables: {
            hello: "Hello, {0} {1} {2}",
            hey: "Hey, {first} {middle} {last}"
        },
        party: [
            "{hostGender, select,",
            "  female {{host} invites {guest} to her party}",
            "    male {{host} invites {guest} to his party}",
            "   other {{host} invites {guest} to their party}",
            "}"
        ],
        task: [
            "You have {count, plural,",
            "     =0 {no tasks}",
            "    one {one task}",
            "  other {{formattedCount} tasks}",
            "} remaining"
        ],
        likeIncludingMe: [
            "{count, plural, offset:1",
            "     =0 {Be the first to like this}",
            "     =1 {You liked this}",
            "    one {You and someone else liked this}",
            "  other {You and # others liked this}",
            "}"
        ]
    },
    "pt-BR": {
        // default message examples
        "Hi": "Oi",
        "Bye": "Tchau",
        "Hi|Bye": "Oi/Tchau",
        salutations: {
            hi: "Oi",
            bye: "Tchau"
        },
        variables: {
            hello: "Olá, {0} {1} {2}",
            hey: "Ei, {first} {middle} {last}"
        },
        party: [
            "{hostGender, select,",
            "  female {{guestGender, select,",
            "    female {A {host} convida a {guest} para sua festa}",
            "      male {A {host} convida o {guest} para sua festa}",
            "      other {A {host} convida {guest} para sua festa}",
            "  }}",
            "  male {{guestGender, select,",
            "    female {O {host} convida a {guest} para sua festa}",
            "      male {O {host} convida o {guest} para sua festa}",
            "      other {O {host} convida {guest} para sua festa}",
            "  }}",
            "  other {{guestGender, select,",
            "    female {{host} convidam a {guest} para sua festa}",
            "      male {{host} convidam o {guest} para sua festa}",
            "      other {{host} convidam {guest} para sua festa}",
            "  }}",
            "}"
        ],
        task: [
            "{count, plural,",
            "     =0 {Você não tem nenhuma tarefa restante}",
            "    one {Você tem uma tarefa restante}",
            "  other {Você tem {formattedCount} tarefas restantes}",
            "}"
        ],
        likeIncludingMe: [
            "{count, plural, offset:1",
            "     =0 {Seja o primeiro a curtir isto}",
            "     =1 {Você curtiu isto}",
            "    one {Você e alguém mais curtiu isto}",
            "  other {Você e # outros curtiram isto}",
            "}"
        ]
    }
};

Globalize.load(
    require( 'cldr-data/main/en/ca-gregorian' ),
    require( 'cldr-data/main/en/timeZoneNames' ),
    require( 'cldr-data/main/en/numbers' ),
    require( 'cldr-data/main/en/currencies' ),
    require( 'cldr-data/main/pt/ca-gregorian' ),
    require( 'cldr-data/main/pt/timeZoneNames' ),
    require( 'cldr-data/main/pt/numbers' ),
    require( 'cldr-data/main/pt/currencies' ),
    require( 'cldr-data/supplemental/currencyData' ),
    require( 'cldr-data/supplemental/plurals' ),
    require( 'cldr-data/supplemental/likelySubtags' ),
    require( 'cldr-data/supplemental/timeData' ),
    require( 'cldr-data/supplemental/weekData' )
);
Globalize.loadMessages(messages);

React.render(
    <LocalizedCurrencies />, document.getElementById('currency')
);
React.render(
    <LocalizedDates />, document.getElementById('dates')
);
React.render(
    <LocalizedMessages />, document.getElementById('messages')
);
React.render(
    <LocalizedNumbers />, document.getElementById('numbers')
);
