const form = document.querySelector("#searchForm");
const res = document.querySelector("#tableresult");
var upd;
form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (upd) {
        clearTimeout(upd);
    }
    const crypt = form.elements.coinType.value;
    console.log("tdtdtuxt")
    console.log(crypt);
    fetchprice(crypt);

})

function timeConverter(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
    console.log(time)
    return time;
}
const fetchprice = async(crypt) => {
    const r = await axios.get(`https://api.cryptonator.com/api/ticker/${crypt}`)

    console.log(r)
    const price = r.data.ticker.price;
    const volume = r.data.ticker.volume;
    const change = r.data.ticker.change;
    const base = r.data.ticker.base;
    const target = r.data.ticker.target;
    const time = timeConverter(r.data.timestamp);
    console.log(res);

    res.innerHTML = `<tr style="background-color:orange; color:white; font-weight:700">
    <td><Strong>Property</Strong></td>
    <td><Strong>Value</Strong></td>
</tr>
<tr style="background-color:rgb(189,183,107)">
    <td>${base}</td>
    <td>${price}${target}</td>
</tr>
<tr style="background-color:rgb(189,183,107)">
    <td>Volume</td>
    <td>${volume}</td>
</tr>
<tr style="background-color:rgb(189,183,107)">
    <td>Change</td>
    <td>${change}</td>
</tr>

<tr style="background-color:rgb(189,183,107)">
    <td>Last Updated</td>
    <td>${time}</td>
</tr>


`;
    console.log(price);
    upd = setTimeout(() => fetchprice(crypt)

        , 10000);

}