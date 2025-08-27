var total = 0;

function addPizza(){
  var cant = parseInt(document.getElementById("cantPizza").value);
  var esp = document.getElementById("esp").value;
  var tam = document.getElementById("tamano");
  var precioBase = parseFloat(tam.value);
  var tamText = tam.options[tam.selectedIndex].text;

  var precioExtra = 0;
  var extrasNombres = [];
  var extras = document.getElementsByClassName("extra");
  for(var i=0;i<extras.length;i++){
    if(extras[i].checked){
      precioExtra += parseFloat(extras[i].value);
      extrasNombres.push(extras[i].nextSibling.textContent.trim());
      extras[i].checked=false;
    }
  }

  var precioFinal = precioBase + precioExtra;
  var desc = esp+" "+tamText;
  if(extrasNombres.length>0){
    desc += " (con "+extrasNombres.join(", ")+")";
  }

  var sub = cant*precioFinal;
  total += sub;

  var tabla = document.getElementById("tabla");
  var fila = tabla.insertRow(-1);
  fila.insertCell(0).innerHTML="Pizza";
  fila.insertCell(1).innerHTML=desc;
  fila.insertCell(2).innerHTML=cant;
  fila.insertCell(3).innerHTML="$"+precioFinal.toFixed(2);
  fila.insertCell(4).innerHTML="$"+sub.toFixed(2);
  var c5 = fila.insertCell(5);
  c5.innerHTML="<button onclick='borrar(this,"+sub+")'>Eliminar</button>";

  document.getElementById("total").innerHTML=total.toFixed(2);
}

function addBebida(){
  var b = document.getElementById("bebida");
  var nombreBebida = b.value;
  var precio = 3.5;
  if(nombreBebida=="Agua"){ precio=2; }
  var cant = parseInt(document.getElementById("cantBebida").value);
  var sub = cant*precio;
  total+=sub;

  var t = document.getElementById("tabla");
  var fila = t.insertRow(-1);
  fila.insertCell(0).innerHTML="Bebida";
  fila.insertCell(1).innerHTML=nombreBebida;
  fila.insertCell(2).innerHTML=cant;
  fila.insertCell(3).innerHTML="$"+precio.toFixed(2);
  fila.insertCell(4).innerHTML="$"+sub.toFixed(2);
  var c5=fila.insertCell(5);
  c5.innerHTML="<button  onclick='borrar(this,"+sub+")' >Eliminar</button>";

  document.getElementById("total").innerHTML=total.toFixed(2);
}

function borrar(btn, sub){
  var fila = btn.parentNode.parentNode;
  fila.parentNode.removeChild(fila);
  total-=sub;
  document.getElementById("total").innerHTML=total.toFixed(2);
}

function confirmar(){
  if(total==0){
    alert("No hay nada en el pedido!");
  }else{
    alert("Pedido hecho con éxito!");
    var tabla=document.getElementById("tabla");
    while(tabla.rows.length>1){
      tabla.deleteRow(1);
    }
    total=0;
    document.getElementById("total").innerHTML="0";
  }
}
