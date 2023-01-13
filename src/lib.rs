#[no_mangle]
pub fn hello() {
    println!("\nhello!!")
}

#[no_mangle]
pub fn hello_ptr() -> *const u8 {
    return "hello world\0".as_bytes().as_ptr() as *const u8;
}
