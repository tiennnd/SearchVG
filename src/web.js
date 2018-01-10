var baseUrl = 'https://touch.vatgia.com/ajax_v2/load_quick_search_result.php';
let indexGen = 0;

export default (key, page) => {
    this.page = page;
    console.log(`key word = ${key} page = ${page}`);

    return new Promise((resolve, reject) => {
        console.log('Make a request for : ' + baseUrl);
        const myRequest = new Request(baseUrl + '?keyword=' + key + '&page=' + page,
            {
                method: 'POST',
                header: {
                    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
                    'Content-Type': 'text/html; charset=UTF-8'
                },
            },
        );


        fetch(myRequest)
            .then(async response => {
                if (response.status === 200) {
                    let html = response._bodyInit;
                    // await products = extractProduct(html);
                    // console.log('get size = ' + products.length);

                    return resolve(extractProduct(html));
                } else {
                    throw new Error('Something went wrong on api server!');
                }
            })
            .then(response => {
                console.debug(response);
            }).catch(error => {
            console.error(error);
        });


    })

}


async function extractProduct(html){
    await getTitle(html, 0);
    await getThumnails(html, 0);
    await getPrice(html, 0);
    await getLink(html,0);
    let product = [];
    for (var i = 0; i < arrTitle.length; i++) {
        product.push(
            {
                title: arrTitle[i],
                url: arrLink[i],
                price:arrPrice[i],
                thumbnail:arrThumbnail[i],
                width: 100,
                height: 100,
                index: indexGen++
            })
    }
    return product;
}

let arrTitle = [];
function getTitle(html, index) {

    if (index <= html.length) {
        let id = html.indexOf('new_product_item_name  _fix', index)
        let title = html.substring(id + 30, html.indexOf("<", id + 3))
        if (id > 0) {
            arrTitle.push(title)
            // console.log('index = ' + id + ', title =' + title);
            getTitle(html, id + 33);
        }
    }
}

let arrPrice = [];
function getPrice(html, index) {

    if (index <= html.length) {
        let id = html.indexOf('class="price', index)
        let price = html.substring(id + 14, html.indexOf("<", id + 3))
        if (id > 0) {
            arrPrice.push(price)
            // console.log('index = ' + id + ', price =' + price);
            getPrice(html, id + 14);
        }
    }
}

let arrThumbnail = [];
function getThumnails(html, index) {

    if (index <= html.length) {
        let id = html.indexOf('img src="//media.vatgia.vn/', index)
        let thumbnail = 'https:' + html.substring(id + 9, html.indexOf('/>', id) - 1)
        if (id > 0) {
            arrThumbnail.push(thumbnail)
            // console.log('index = ' + id + ', thumbnail = ' + thumbnail);
            getThumnails(html, id + 9);
        }
    }
}

let arrLink = [];
function getLink(html, index) {

    if (index <= html.length) {
        let id = html.indexOf('href=', index)
        let link = 'https://touch.vatgia.com' + html.substring(id + 6, html.indexOf(`"`, id + 6) - 1)
        if (id > 0) {
            arrLink.push(link)
            // console.log('index = ' + id + ', link = ' + link);
            getLink(html, id + 6);
        }
    }
}