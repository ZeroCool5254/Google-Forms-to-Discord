var POST_URL = "WEBHOOKURL";

function onSubmit(e) {
    var form = FormApp.getActiveForm();
    var allResponses = form.getResponses();
    var latestResponse = allResponses[allResponses.length - 1];
    var response = latestResponse.getItemResponses();
    var items = [];

    for (var i = 0; i < response.length; i++) {
        var question = response[i].getItem().getTitle();
        var answer = response[i].getResponse();
        try {
            var parts = answer.match(/[\s\S]{1,1024}/g) || [];
        } catch (e) {
            var parts = answer;
        }

        if (answer == "") {
            continue;
        }
        for (var j = 0; j < parts.length; j++) {
            if (j == 0) {
                items.push({
                    "name": question,
                    "value": parts[j],
                    "inline": false
                });
            } else {
                items.push({
                    "name": question.concat(" (cont.)"),
                    "value": parts[j],
                    "inline": false
                });
            }
        }
    }

    var options = {
        "method": "post",
        "payload": JSON.stringify({
            "embeds": [{
                "color" : 3447003, //Use this website as a reference to changing the color of the embed: https://github.com/izy521/discord.io/blob/master/docs/colors.md
                "title": "TOP TEXT CHANGE THIS IN SCRIPT",
                "fields": items,
                "footer": {
                    "text": "BOTTOM TEXT CHANGE THIS IN SCRIPT"
                }
            }]
        })
    };

    UrlFetchApp.fetch(POST_URL, options);
};
