
var test = false;

var fratList = [
    "Keffys",
    "lemon93fg",
    "Wyt_Fox",
    "iSpeez-",
    "juanpelull",
    "Frankie369369",
    "MarMorr-1",
    "Adengiveashit",
    "Fanuz1193"
    // "mm",
    // "as",
    // "po",
    // "ia"
]

var fratMap = new Map();




function fratGetter() {
    if (!test) {
        console.log("Update Frat");
        setInterval(fratUpd(fratList), 50000);
    }
    else {
        updateChart(fratList);
    }

}



function fratUpd(fratList) {

    let i = 0;
    var inter = setInterval(() => {

        getFrat(fratList[i]);
        i++;
        if (i >= fratList.length) {
            console.log("break");
            clearInterval(inter);
            setTimeout(fratGetter, 10000);
        }
    }, 5000);

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
    console.log("UPDADE CLASSIFICA")

    // const ordered = Object.keys(fratMap).sort().reduce(
    //     (obj, key) => ({ obj[key]: fratMap[key] }), {}
    //   );

    var ul = document.getElementById("fratClassif");
    if (ul != null) {
        console.log("RIMUOVO");
        ul.parentNode.removeChild(ul);
    }
    ul = document.createElement("ul");
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
