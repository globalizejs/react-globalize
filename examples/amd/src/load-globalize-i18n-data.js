define([
    "cldr",
    "globalize",
    "json!cldr-data/main/en/ca-gregorian.json",
    "json!cldr-data/main/en/timeZoneNames.json",
    "json!cldr-data/main/en/numbers.json",
    "json!cldr-data/main/en/currencies.json",
    "json!cldr-data/main/pt/ca-gregorian.json",
    "json!cldr-data/main/pt/timeZoneNames.json",
    "json!cldr-data/main/pt/numbers.json",
    "json!cldr-data/main/pt/currencies.json",
    "json!cldr-data/supplemental/currencyData.json",
    "json!cldr-data/supplemental/plurals.json",
    "json!cldr-data/supplemental/likelySubtags.json",
    "json!cldr-data/supplemental/timeData.json",
    "json!cldr-data/supplemental/weekData.json",
    "globalize/message"
], function(Cldr, Globalize, enCaGregorian, enTimeZoneNames, enNumbers, enCurrencies, ptCaGregorian, ptTimeZoneNames, ptNumbers, ptCurrencies, currencyData, plurals, likelySubtags, timeData, weekData) {

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
      "pt": {
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

Globalize.load(enCaGregorian, enTimeZoneNames, enNumbers, enCurrencies, ptCaGregorian, ptTimeZoneNames, ptNumbers, ptCurrencies, currencyData, plurals, likelySubtags, timeData, weekData);
Globalize.loadMessages(messages);

});
