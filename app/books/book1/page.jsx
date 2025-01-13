import BookInfo from "@/components/elements/BookInfo";

export default function book(){return (<BookInfo {...{
    title: "NAZWA KSIĄŻKI",
    author: "Gal anonim",
    date: "2022",
    type: "Akcja",
    rating: "8/10",
    about: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta neque sapiente accusamus, temporibus ipsam totam provident nisi sed dolores! Mollitia voluptate enim modi eum culpa! Tenetur cum maxime sit quod.",
    reviews:[
        { 
            user:"Imię i nazwisko",
            date:"12-02-2024",
            rating:"5/10",
            review: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolor voluptatibus inventore ex aut obcaecati consequuntur cupiditate odio ea delectus a iure nihil nesciunt iusto, animi optio eveniet laboriosam quas itaque.",
        },

        { 
            user:"",
            date:"",
            rating:"",
            review:"",
        },

        { 
            user:"",
            date:"",
            rating:"",
            review:"",
        },
    ],
}}/>)};