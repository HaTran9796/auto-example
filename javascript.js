// Viết một chương trình JavaScript để tính toán số ngày còn lại cho đến Giáng sinh gần nhất 

function day () {
    const date =  new Date()
    // b1: lay duoc time ngay hien tai
    const dayNow = date.getTime()
    // b2: lay duoc time cua ngay 25/12/nam hien tai
    const year = date.getFullYear()
    const dayNoel = new Date(`${year}-12-25`)
    // b3: b2 - b1 / 24x3600 => Ngay con lai den Giang sinh
    const dayConLai = (dayNoel - dayNow) / (24*60*60) / 1000
    console.log(Math.floor(dayConLai))
}
// day();

// Viết chương trình JavaScript để tính tổng của hai số nguyên đã cho. Nếu hai giá trị giống nhau, thì trả về gấp ba tổng của chúng 

function SN (a, b){
    if(a != b){
        let sumSN = a + b;
        console.log(sumSN)
    } else{
        let sumSN1 = (a + b) * 3
        console.log(sumSN1)
    }
    // a!=b?(a+b):(a+b)*3
    console.log((a + b) * (a === b ? 3 : 1))
}
SN(5, 6)


// Viết một chương trình JavaScript để kiểm tra xem một số dương đã cho là bội của 3 hay bội của 7 
function BSC (a){
    if(a % 3 == 0){
        console.log( a + " La boi cua 3")
    } else if(a % 7 == 0){
        console.log( a + " La boi cua 7")
    } else{
        console.log (a + " khong la boi cua 3 hay 7")
    }
}
// BSC(6)