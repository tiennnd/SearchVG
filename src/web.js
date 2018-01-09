// var baseUrl = 'https://touch.vatgia.com';
// var baseUrl = 'https://www.npmjs.com/package/fast-html-parser';
var baseUrl = 'https://touch.vatgia.com/ajax_v2/load_quick_search_result.php';
import DOMParser from 'react-native-html-parser';


export default (key, page) => {
    console.log(`key word = ${key} page = ${page}`);

    return new Promise((resolve, reject) => {

        // return resolve(item);


        console.log('Make a request for : ' + baseUrl);
        const myRequest = new Request(baseUrl + '?keyword=' + key + '&page=' + page,
            // const myRequest = new Request(baseUrl,
            {
                method: 'POST',
                header: {
                    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
                    'Content-Type': 'text/html; charset=UTF-8'
                },
            },
        );



        fetch(myRequest)
            .then( response => {
                if (response.status === 200) {

                    let html = response._bodyInit;

                    // let length = html.split("new_product_item_name  _fix");
                    // let lastItemiIndex = 0;
                    // for (var i = 0; i<length; i++) {
                    //
                    //     let index = html.indexOf('new_product_item_name  _fix', lastItemiIndex);
                    //     lastItemiIndex = index;
                    //
                    //     // doing ...........................
                    //     let check = getTitle(html, index);
                    //     console.log('check = ' + check);
                    // }


                    const parser = new DOMParser.DOMParser();
                    const parsed = parser.parseFromString(html, 'text/html');
                    let elements = parsed.getElementsByClassName('new_product_item_name  _fix');
                    console.log('size  = ' + elements.length);

                    return resolve(item);

                } else {
                    throw new Error('Something went wrong on api server!');
                }
            })
            .then(response => {
                console.debug(response);
                // ...
            }).catch(error => {
            console.error(error);
        });


    })

}

function getTitle(html, index) {
    let title = html.substring(index + 30, html.indexOf("<", index + 3))
    // console.log('index = ' + index +', title=' + title);
    return title;
}

const item = [
    {
        title: 'Huyen My 1',
        url: 'https://media.thethaovanhoa.vn/Upload/YHNKxWgZb1sjFDALClZWA/files/8N0A1729.JPG',
        width: 100,
        height: 100
    },
    {
        title: 'Huyen My 2',
        url: 'https://image.thanhnien.vn/665/uploaded/nhith/2017_08_22/hmh_uqkj.jpg',
        width: 100,
        height: 100
    },
    {
        title: 'Huyen My 3',
        url: 'https://baomoi-photo-3-td.zadn.vn/w1000_r1m/17/07/31/17/22889954/1_57687.jpg',
        width: 100,
        height: 100
    },
    {
        title: 'Huyen My 4',
        url: 'https://s-media-cache-ak0.pinimg.com/originals/15/bd/61/15bd618f4dc00b940f6622236a4186bf.jpg',
        width: 100,
        height: 100
    },
    {
        title: 'Huyen My 1',
        url: 'https://media.thethaovanhoa.vn/Upload/YHNKxWgZb1sjFDALClZWA/files/8N0A1729.JPG',
        width: 100,
        height: 100
    },
    {
        title: 'Huyen My 2',
        url: 'https://image.thanhnien.vn/665/uploaded/nhith/2017_08_22/hmh_uqkj.jpg',
        width: 100,
        height: 100
    },
    {
        title: 'Huyen My 3',
        url: 'https://baomoi-photo-3-td.zadn.vn/w1000_r1m/17/07/31/17/22889954/1_57687.jpg',
        width: 100,
        height: 100
    },
    {
        title: 'Huyen My 4',
        url: 'https://s-media-cache-ak0.pinimg.com/originals/15/bd/61/15bd618f4dc00b940f6622236a4186bf.jpg',
        width: 100,
        height: 100
    },
    {
        title: 'Huyen My 1',
        url: 'https://media.thethaovanhoa.vn/Upload/YHNKxWgZb1sjFDALClZWA/files/8N0A1729.JPG',
        width: 100,
        height: 100
    },
    {
        title: 'Huyen My 2',
        url: 'https://image.thanhnien.vn/665/uploaded/nhith/2017_08_22/hmh_uqkj.jpg',
        width: 100,
        height: 100
    },
    {
        title: 'Huyen My 3',
        url: 'https://baomoi-photo-3-td.zadn.vn/w1000_r1m/17/07/31/17/22889954/1_57687.jpg',
        width: 100,
        height: 100
    },
    {
        title: 'Huyen My 4',
        url: 'https://s-media-cache-ak0.pinimg.com/originals/15/bd/61/15bd618f4dc00b940f6622236a4186bf.jpg',
        width: 100,
        height: 100
    },
]

