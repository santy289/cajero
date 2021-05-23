class billete
{
    constructor (b , c)
    {
        this.valor = b;
        this.cantidad = c;        
    }
}
var boton = document.getElementById ("boton");
var resultado = document.getElementById ("resultado");
var quedan = document.getElementById ("restante");
var recarga = document.getElementById ("recarga");
var sonidos  =
{
  tecla: document.getElementById("tecla_id"),
  alerta: document.getElementById("alerta_id"),
  entrega: document.getElementById("entrega_id"),
}
var caja = [];
var entregado =[];
var restante = [];
var papeles=0;
var division=0;

boton.addEventListener ("click", transaccion);
recarga.addEventListener ("click", recargabilletes);
document.addEventListener("keydown", sonido_tecla);

function sonido_tecla ()
{
    sonidos.tecla.play();
}

function transaccion()
{   
    quedan.innerHTML = " ";
    resultado.innerHTML = " ";
    entregado =  [];
    var t = document.getElementById("dinero");
    dinero = parseInt(t.value);

    for(var bi of caja)
    {
        if (dinero>0 && bi.cantidad != 0)
        {
            division=Math.floor(dinero/ bi.valor)  
                  
            if (division>bi.cantidad)
            {
            papeles=bi.cantidad;
            }
            else 
            {
            papeles=division;
            }
            entregado.push(new billete (bi.valor, papeles));
            dinero -=  (bi.valor * papeles);
            bi.cantidad -= papeles;                  
        } 
        quedan.innerHTML += "quedan " + bi.cantidad + " billetes de $" + bi.valor + "<br/>";
    }

    if (dinero>0)
    {
        sonidos.alerta.play();
        quedan.innerHTML = "No hay suficiente dinero <br/> Favor recargar ";
    }

    else 
    {
        for (var e of entregado)
        {
            if (e.cantidad == 1 && papeles != 0)
            {
                sonidos.entrega.play();
                resultado.innerHTML +=  +e.cantidad + "  billete de:<br/>" 
                resultado.innerHTML += "<img src =" + e.valor + ".png> <br/>"
            }
            else if (e.cantidad == 1 && papeles != 0)
            {
                sonidos.entrega.play();
                resultado.innerHTML +=  +e.cantidad + "  billetes de:<br>" 
                resultado.innerHTML += "<img src =" + e.valor + ".png> <br/>"
            }
        }
    }
}

function recargabilletes ()
{
    quedan.innerHTML = " ";
    resultado.innerHTML = " ";
    entregado =  [];
    caja =[]
    caja.push (new billete(100,10))
    caja.push (new billete(50,10))
    caja.push (new billete(20,10))
    caja.push (new billete(10,10)) 
    caja.push (new billete(5,10))      
}
