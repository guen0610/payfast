#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

extern crate tauri;
use rusqlite::{Connection, Result};
use serde::Serialize;
use thiserror::Error;

#[derive(Debug, thiserror::Error)]
enum Error {
    #[error(transparent)]
    DataBaseError(#[from] rusqlite::Error),
}

// we must manually implement serde::Serialize
impl serde::Serialize for Error {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::ser::Serializer,
    {
        serializer.serialize_str(self.to_string().as_ref())
    }
}

#[derive(Serialize)]
struct Item {
    id: i32,
    barcode: String,
    category_id: i32,
    nhat: i32,
    name: String,
    unit: i32,
    price: i32
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![get_strings, init])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
fn get_strings() -> Vec<String> {
    vec![String::from("a"), String::from("b"), String::from("c")]
}

#[tauri::command]
fn init() -> Result<Vec<Item>, Error> {
    println!("Opening connection");
    let conn = match Connection::open("../config.db") {
        Ok(conn) => conn,
        Err(err) => {
            return Err(Error::DataBaseError(err));
        }
    };

    println!("Preparing conn");
    let mut stmt = conn.prepare("SELECT id, barcode, category_id, nhat, name, unit, price FROM items")?;

    println!("Parsing to struct");
    let item_iter = stmt.query_map([], |row| {
        Ok(Item {
            id: row.get(0)?,
            barcode: row.get(1)?,
            category_id: row.get(2)?,
            nhat: row.get(3)?,
            name: row.get(4)?,
            unit: row.get(5)?,
            price: row.get(6)?,
        })
    })?;

    println!("Iterating on items");
    let mut items: Vec<Item> = Vec::new();
    for item in item_iter {
        let item = item?;
        println!(
            "id: {}, barcode: {}, category_id: {}, nhat: {}, name: {}, unit: {}",
            item.id, item.barcode, item.category_id, item.nhat, item.name, item.unit
        );
        items.push(item);
    }
    Ok(items)
}
