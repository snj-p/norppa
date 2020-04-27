const touchDevice =  window.matchMedia("only screen and (max-width: 823px)").matches;
const previews = $('#previews')[0];
const display = $('#display')[0];

$(document).ready(main());

function main() {
    let selection;

    axios.get('data.json') 
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
        let title = res[i]["Ilmoituksen otsikko"];
        let co = res[i]["Yritys/organisaatio"];
        let due = res[i]["Hakuaika p\u00e4\u00e4ttyy"];
        let type_span = "<span>";

        if (type == "Opinnäytetyöpaikka")       { type_span = "<span class='type1'>" }
        else if (type == "Työpaikka")           { type_span = "<span class='type2'>" }
        else if (type == "Kesätyöpaikka")       { type_span = "<span class='type3'>" }
        else if (type == "Harjoittelupaikka")   { type_span = "<span class='type4'>" };

    let item = "<div class='preview_item'>";
        if (title) item += "<h4 class='preview_title'>" + title + "</h4>";
        if (type) item += "<p>" + type_span + type + "</span></p> ";
        if (co) item += "<p>" + co + " &mdash; ";
        if (due) item += due + "</p>";
        item += "</div>";
        output.innerHTML += item;
    }
}

function format_display(res, output, index) {
    let type = res[index]["Ilmoitan"];
    let title = res[index]["Ilmoituksen otsikko"];
    let co = res[index]["Yritys/organisaatio"];
    let due = res[index]["Hakuaika p\u00e4\u00e4ttyy"];
    let desc = res[index]["Kuvaus teht\u00e4v\u00e4st\u00e4"];
    let addt = res[index]["Ohjeet hakemiseen ja  lis\u00e4tietojen antaja"];
    let req = res[index]["Vaatimukset hakijalle"];

    let item = '<button class="close"></button>';
        if (title) item += "<h2>" + title + "</h2>";
        if (type) item += "<h4>" + type + " &mdash; ";
        if (co) item += co + " &mdash; ";
        if (due) item += due + "</h4>";
        item += "<br>";
        if (desc) item += "<p>" + desc + "</p>";
        item += "<br>";
        if (addt) item += "<p>" + addt + "</p>";
        item += "<br>";
        if (req) { 
            item += "<h4>Vaatimukset hakijalle: </h4>"
            item += "<p>" + req + "</p>"; }
        output.innerHTML = item;
}