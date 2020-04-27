const touchDevice =  window.matchMedia("only screen and (max-width: 823px)").matches;
const previews = $('#previews')[0];
const display = $('#display')[0];

$(document).ready(main());

function main() {
    let selection;

    axios.get('virbi_data.json') 
        .then(function(response)  { 
            format_previews(response.data, previews);         

            $('.preview_item').on('click', function() {
                selection = this;
                format_display(response.data, display, $('.preview_item').index(selection));
                $(display).css({'display':'block'});
                if (touchDevice) $(previews).css({'display':'none'});

                $('button.close').on('click', function() {
                    $(display).css({'display':'none'});
                    $(previews).css({'display':'block'});
                    if (touchDevice) selection.scrollIntoView(true);
                });
            });
        })
        .catch(function (error) {
            console.log(error.response.status);
        });
}


function format_previews(res, output) {
    for (i in res) {
        let type = res[i]["Ilmoitan"];
        let type_span = "<span>";

        if (type == "Opinnäytetyöpaikka")       { type_span = "<span class='type1'>" }
        else if (type == "Työpaikka")           { type_span = "<span class='type2'>" }
        else if (type == "Kesätyöpaikka")       { type_span = "<span class='type3'>" }
        else if (type == "Harjoittelupaikka")   { type_span = "<span class='type4'>" };

    let item = "<div class='preview_item'>";
        item += "<h4 class='preview_title'>" + res[i]["Ilmoituksen otsikko"] + "</h4>";
        
        item += "<p>" + type_span + type + "</span></p> ";
        item += "<p>" + res[i]["Yritys/organisaatio"] + " &mdash; ";
        item += res[i]["Hakuaika p\u00e4\u00e4ttyy"] + "</p>";
        item += "</div>";
        output.innerHTML += item;
    }
}

function format_display(res, output, index) {
    let item = '<button class="close"></button>';
        item += "<h2>" + res[index]["Ilmoituksen otsikko"] + "</h2>";
        item += "<h4>" + res[index]["Ilmoitan"] + " &mdash; ";
        item += res[index]["Yritys/organisaatio"] + " &mdash; ";
        item += res[index]["Hakuaika p\u00e4\u00e4ttyy"] + "</h4>";
        item += "<br>";
        item += "<p>" + res[index]["Kuvaus teht\u00e4v\u00e4st\u00e4"] + "</p>";
        item += "<br>";
        item += "<p>" + res[index]["Ohjeet hakemiseen ja  lis\u00e4tietojen antaja"] + "</p>";
        item += "<br>";
        item += "<h4>Vaatimukset hakijalle: </h4>"
        item += "<p>" + res[index]["Vaatimukset hakijalle"] + "</p>";
        output.innerHTML = item;
}