const axios = require('axios')

const add_user = async(user) => {
    axios.post('http://localhost:9000/user', user).then((res) => {})
}

const get_users = async() => {
    let users = await axios.get('https://randomuser.me/api/?results=50')

    let all = users['data']['results']

    all.forEach(uzr => {

        let email = uzr['email']
        let name = uzr['login']['username']
        let phone = uzr['phone']
        let password = `${name}123`
        let password_confirmation = `${name}123`

        let new_user = { email, name, phone, password, password_confirmation }

        console.log(new_user)
        add_user(new_user)

    });

}

get_users()

// axios.get('https://randomuser.me/api/?results=50')
// .then((usrs) => {
//     let all = usrs['data']['results']

//     all.forEach(uzr => {
//         let email = uzr['email']
//         let name = uzr['login']['username']
//         let phone = uzr['phone']
//         let password = `${name}123`
//         let password_confirmation = `${name}123`

//         let new_user = { email, name, phone, password, password_confirmation }

//         console.log(new_user)
//         add_user(new_user)

//     });

// })
// `id` int auto_increment,
// `name` varchar(50) not null unique,
// `passcode` varchar(190) not null,
// `phone` varchar(14) not null,
// `email` varchar(90),
// `city` varchar(50),
// `dob` date not null,
// `verified` boolean default false,
// `min_charge` decimal(10, 2) default 0.0,
// `joined_on` datetime default NOW(),
// `todo_on` datetime,
// `do_now` boolean default true,
// `user_type` enum('SERVICE_PROVIDER', 'USER', 'ADMIN') default 'USER',
// `is_company` boolean default false,