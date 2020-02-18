(function(){
    'use strict';
    

    let strings = [
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
        'Ad fugiat iusto officia soluta enim excepturi? Vitae sapiente',
        'iusto praesentium obcaecati repellat',
        'reiciendis esse provident dolor inventore quo perspiciatis?',
        'Quisquam commodi praesentium',
        'sunt dolore corporis tenetur iste',
        'eveniet alias totam, quam blanditiis.',
        'Corrupti sint culpa cum nam animi vero facilis sapiente?'
    ]

    let numbers = [123, 23, 454, 23, 98, 90, 78];

    let objects = [
        {
            name: 'Text',
            value: 'AKHSkdd dfjskjd jskdfhsd',
            created_at: '2020-01-26 10:28:00',
            updated_at: '2020-01-26 10:28:00',
            deleted_at: '2020-01-26 10:28:00'
        },
        {
            name: 'Description',
            value: 'Corrupti sint culpa cum nam animi vero facilis sapiente?',
            created_at: '2020-01-26 09:15:48',
            updated_at: '2020-01-26 10:00:27',
            deleted_at: null
        },
        {
            name: 'Coordinates',
            value: {
                lat: 47.123434,
                lng: 37.003434
            },
            created_at: '2020-12-26 12:56:02',
            updated_at: '2020-01-26 10:29:17',
            deleted_at: null
        }
    ]

    // strings.forEach((string, i)=>{
    //     document.write(`<p>${i+1} -  ${string}</p>`);
    // });

    // let longString = strings.map((string)=> string.length < 50 ? string : string.substr(0,50)+ "...");
    // longString.forEach((string, i) => document.write(`<p>${i+1} -  ${string}</p>`));

    // let cutString = strings.map((string)=> string.length < 50 ? string+string : string);
    // cutString.forEach((string, i) => document.write(`<p>${i+1} -  ${string}</p>`));


    // let table = document.getElementById('table'),
    //     tbody = table.querySelector('tbody');
    // objects.forEach((obj,i) =>{
    //     let lastModif =  new Date(obj.updated_at) > new Date(obj.deleted_at) ? obj.updated_at : obj.deleted_at;
    //     let entries = Object.entries(obj);
    //     let tr = `
    //     <tr>
    //         <th scope="row">${++i}</th>
    //         <td>${obj.name}</td>
    //         <td>${obj.value}</td>
    //         <td>${obj.created_at}</td>
    //         <td>${lastModif}</td>
    //       </tr>`;
    //     tbody.insertAdjacentHTML("beforeend", tr);
    // })


    let table = document.getElementById('table'),
        tbody = table.querySelector('tbody');

        let filteredObjects = objects.filter(((obj)=> obj.deleted_at == null));
        filteredObjects.forEach((obj,i) =>{
        let lastModif =  new Date(obj.updated_at) > new Date(obj.deleted_at) ? obj.updated_at : obj.deleted_at;
        let tr = `
        <tr>
            <th scope="row">${++i}</th>
            <td>${JSON.stringify(obj.name)}</td>
            <td>${JSON.stringify(obj.value)}</td>
            <td>${dataPretify(obj.created_at)}</td>
            <td>${dataPretify(lastModif)}</td>
          </tr>`;
        tbody.insertAdjacentHTML("beforeend", tr);
    })



    // functions

    function dataPretify(string) {
        let date = new Date(string);
        let month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        return `${date.getDate()}th of ${month[date.getMonth()]} ${date.getFullYear()}y. at ${('0'+date.getHours()).substr(-2)}:${('0'+date.getMinutes()).substr(-2)}`;
    }

})();
