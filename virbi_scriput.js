const touchDevice = ('ontouchstart' in document.documentElement);
const previews = $('#previews')[0];
const display = $('#display')[0];

$(document).ready(main());

function main() {
    axios.get('virbi_data.json') 
        .then(function(response)  { 
            format_previews(response.data, previews);         
            console.log(response.status);

            $('.preview_item').on('click', function() {
                format_display(response.data, display, $('.preview_item').index(this));
                $(display).css({'display':'block'});
                if (touchDevice) $(previews).css({'display':'none'});

                $('button.close').on('click', function() {
                    $(display).css({'display':'none'});
                    $(previews).css({'display':'block'});
                });
            });
        })
        .catch(function (error) {
            console.log(error.response.status);
        });
}


function format_previews(res, output) {
    for (i in res) {
    var item = "<div class='preview_item'>";
        item += "<h4 class='preview_title'>" + res[i]["Ilmoituksen otsikko"] + "</h4>";
        item += "<p><span class='type'>" + res[i]["Ilmoitan"] + "</span> ";
        item += res[i]["Yritys/organisaatio"] + " &mdash; ";
        item += res[i]["Hakuaika p\u00e4\u00e4ttyy"] + "</p>";
        item += "</div>";
        output.innerHTML += item;
    }
}

function format_display(res, output, index) {
    let item = '<div id="align_hack"><button class="close"></button></div>';
        item += "<h2>" + res[index]["Ilmoituksen otsikko"] + "</h2>";
        item += "<h4>" + res[index]["Ilmoitan"] + " &mdash; ";
        item += res[index]["Yritys/organisaatio"] + " &mdash; ";
        item += res[index]["Hakuaika p\u00e4\u00e4ttyy"] + "</h4>";
        item += "<br>";
        item += "<p>" + res[index]["Kuvaus teht\u00e4v\u00e4st\u00e4"] + "</p>";
        item += "<br>";
        item += "<p>" + res[index]["Ohjeet hakemiseen ja  lis\u00e4tietojen antaja"] + "</p>";
        item += "<br>";
        item += "<p>" + res[index]["Vaatimukset hakijalle"] + "</p>";
        output.innerHTML = item;
}