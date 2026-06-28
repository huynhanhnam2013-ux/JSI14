/* map */
{
let number = [12, 5, 8, 130, 44, 7, 21]
let new_number = number.map(item => item * item)
console.log(new_number);

let new_number2 = number.map(function(item, index){
    return item * item
})
console.log(new_number2);
}
/* filter */
{
let ds = [1, 2, 3, 4, 5, 6, 7]
let ds_moi = ds.filter(function(item, index){
    return item % 2 == 0
})
console.log(ds_moi);
let ds_moi2 = ds.filter(item => item % 2 == 1)
console.log(ds_moi2);

sp = ["ban", "ghe", "tu" , "chau"]
let sp_moi = sp.filter(item1 => item1.length > 2)
console.log(sp_moi);
}
/* forEach */
{
let ds2 = [1, 2, 3, 4, 5, 6, 7]
ds2.forEach((item,index)  => console.log("phan tu thu " +  index + " la " + item))

ds2.forEach(function(item, index) {
    console.log("phan tu thu " +  index + " la " + item);
    
})
}
/* find */
{
let ds3 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
let ds3_moi = ds3.find(function(item){
    return item > 4
})
console.log(ds3_moi)

let ds3_moi2 = ds3.find(item => item > 5)
console.log(ds3_moi2);
}
