


var fratList = [
    "Keffys",
    "lemon93fg",
    "Wyt_Fox",
    "DajeArmandooo",
    "juanpelull",
    "Frankie369369",
    "MarMorr-1",
    "Adengiveashit",
    "Fanuz1193",
    "iSpeez-",
    "StrainHunter93"
    // "po"
]




var fratMap = new Map();

function fratGetter() {
    scegliFrase();
    console.log("get Frat");
    // setInterval(fratUpd(fratList), 26000);
    fratUpd(fratList);
}



function fratUpd(fratList) {

    let i = 0;
    var inter = setInterval(() => {

        getFrat(fratList[i]);
        i++;
        if (i > fratList.length) {
            console.log("break");
            clearInterval(inter);
            postGet();
            // setTimeout(fratGetter, 10000);
        }
    }, 4000);


}

function postGet() {
    console.log("Classifica")
    fratMap[Symbol.iterator] = function* () {
        yield* [...this.entries()].sort((a, b) => b[1] - a[1]);
    }

    var fratOrdinat = [];
    for (let [key, value] of fratMap) {
        console.log(key + ' ' + value);
        fratOrdinat.push(key);
    }
    console.log("FRAT " + fratOrdinat);
    updateChart(fratOrdinat);
}


function getFrat(frat) {
    console.log("getFrat ---> " + frat);
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://call-of-duty-modern-warfare.p.rapidapi.com/warzone/" + frat + "/psn",
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "5aa53c1d67mshb39caa884057c17p17de8bjsn9a5982cdf047",
            "x-rapidapi-host": "call-of-duty-modern-warfare.p.rapidapi.com"
        }
    };
    $.ajax(settings).done(function (response) {
        fratMap.set(frat, response.br_all.wins)
    });
}


function updateChart(fratOrdinat) {
    console.log("UPDATE CLASSIFICA");

    let loading = document.getElementById("loader");
    loading.parentNode.removeChild(loading);

    // if (ul != null) {
    //     console.log("RIMUOVO");
    //     ul.parentNode.removeChild(ul);
    //     loading = 
    // }


    var ul = document.createElement("ul");
    ul.setAttribute("id", "fratClassif");
    ul.setAttribute("class", "classifica");

    document.body.appendChild(ul);
    // var fratN = [...fratMap.keys()];
    let first = true;
    fratOrdinat.forEach(f => {
        var li = document.createElement('li');
        li.appendChild(document.createTextNode(f));
        li.setAttribute("class", first ? "primo" : "frat");
        first = false;
        ul.appendChild(li);
    });
}

function scegliFrase() {
    let frasi = [
        "finisco di lootare una casa con Frankie e arrivo",
        "nel tempo che recupero i dati metto il c4 sul drone di Marco",
        "appena andrea torna dalla ricognizione ti faccio vedere la classifica",
        "Oh, una caramella, dammi il tempo di prenderla",
        "nel tempo che carico, hai colpi lanciarazzi?",
        "è inutile che aspetti, tanto non sei primo",
        "sto rendendo warzone meglio di cold war",
        "carico l'ultima, anche se hai fatto cacare",
        "solo pugni?",
        "dammi il tempo, intanto troxati",
        "giusto il tempo di finire demon's souls",
        "sto tornando da stornarella",
        "se limone mi ridà i pantaloni posso caricare i dati",
"Comodo, sarebbe comodo",
        "grazie per il follow amico"

    ]

    let lung = frasi.length;

    console.log("NUM - " + Math.floor(Math.random() * lung));

    let txt = frasi[Math.floor(Math.random() * lung)];
    var frase = document.getElementById("frase");
    frase.setAttribute("class", "waiting-text")
    frase.setAttribute('data-content', txt);
}
