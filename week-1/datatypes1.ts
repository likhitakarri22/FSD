let username: string="Likhita"
let age: number = 19
let isMember: boolean = true
console.log("DataType of username: "+typeof username);
console.log("DataType of age: "+typeof age);
console.log("DataType of isMember: "+typeof isMember);
function displayDetails(name: string ,age: number,active: boolean):void{
    console.log(`Username : ${username}`)
    console.log(`age : ${age}`)
    console.log(`Active : ${isMember}`)
}
displayDetails(username,age,isMember)