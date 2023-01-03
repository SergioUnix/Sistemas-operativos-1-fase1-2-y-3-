use chrono::prelude::*;
use db::DB;
use serde::{Deserialize, Serialize};
use std::convert::Infallible;
use warp::{Filter, Rejection};

use actix_web::{http};

type Result<T> = std::result::Result<T, error::Error>;
type WebResult<T> = std::result::Result<T, Rejection>;

mod db;
mod error;
mod handler;

#[derive(Serialize, Deserialize, Debug)]
pub struct Book {
    pub id: String,
    pub name: String,
    pub author: String,
    pub num_pages: usize,
    pub added_at: DateTime<Utc>,
    pub tags: Vec<String>,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct Logs {
    pub id: String,
    pub game_id: String,
    pub players: String,
    pub game_name: String,
    pub winner: String,
    pub queue: String,
}


#[tokio::main]
async fn main() -> Result<()> {
    let db = DB::init().await?;


    let cors = warp::cors()
        .allow_any_origin()
        .allow_headers(vec![http::header::AUTHORIZATION, http::header::ACCEPT])
        .allow_methods(vec!["OPTIONS", "GET", "POST", "DELETE", "PUT"])
        .allow_header(http::header::CONTENT_TYPE)
        .max_age(3600);



    let book = warp::path("book");

    let book_routes = book
        .and(warp::post())
        .and(warp::body::json())
        .and(with_db(db.clone()))
        .and_then(handler::create_book_handler)
        .or(book
            .and(warp::put())
            .and(warp::path::param())
            .and(warp::body::json())
            .and(with_db(db.clone()))
            .and_then(handler::edit_book_handler))
        .or(book
            .and(warp::delete())
            .and(warp::path::param())
            .and(with_db(db.clone()))
            .and_then(handler::delete_book_handler))
        .or(book
            .and(warp::get())
            .and(with_db(db.clone()))
            .and_then(handler::books_list_handler)).with(cors);

    let routes = book_routes.recover(error::handle_rejection);




    println!("Started on port 8080");
    warp::serve(routes).run(([0, 0, 0, 0], 8080)).await;
    Ok(())
}

fn with_db(db: DB) -> impl Filter<Extract = (DB,), Error = Infallible> + Clone {
    warp::any().map(move || db.clone())
}
