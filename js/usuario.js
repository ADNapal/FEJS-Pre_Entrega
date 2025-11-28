//crea un usuario en SessionStorage

let NameUsur = "Juan Petrolli";
let DireUser = "Siempre Viva 1234";
let MailUser = "juan@gamil.com";

sessionStorage.setItem("Nombre", NameUsur);
sessionStorage.setItem("Direccion", DireUser);
sessionStorage.setItem("Mail", MailUser);

console.log("Usuario guardado en SessionStorage:");
console.log("Nombre: " + sessionStorage.getItem("Nombre"));
console.log("Direccion: " + sessionStorage.getItem("Direccion"));
console.log("Mail: " + sessionStorage.getItem("Mail"));