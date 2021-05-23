class billete
{
    constructor (b , c, u)
    {
        this.valor = b;
        this.cantidad = c;
        this.url = u;
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
var dinero_disponible = 0;

boton.addEventListener ("click", transaccion);
recarga.addEventListener ("click", recargabilletes);
document.addEventListener("keydown", sonido_tecla);

function sonido_tecla ()
{
    sonidos.tecla.play();
}

function transaccion()
{   quedan.innerHTML = " ";
    resultado.innerHTML = " ";
    entregado =  [];
    var t = document.getElementById("dinero");
    dinero = (parseInt(t.value) / 1000);

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
            entregado.push(new billete (bi.valor, papeles, bi.url));
            dinero -=  (bi.valor * papeles);
            bi.cantidad -= papeles;                  
        } 
        quedan.innerHTML += "quedan " + bi.cantidad + " billetes de $" + bi.valor + "<br/>";
    }

    if (dinero>0)
    {
        sonidos.alerta.play();
        quedan.innerHTML = "Transacción invalida <br/>";
    }

    else 
    {
        for (var e of entregado)
        {
            if (e.cantidad == 1 && e.cantidad !=0)
            {
                sonidos.entrega.play();
                resultado.innerHTML +=  +e.cantidad + "  billete de:<br/>" 
                resultado.innerHTML += "<img src =" + e.url + "<br/>"
                contador();
            }
            else if (e.cantidad != 1 && e.cantidad !=0)
            {
                sonidos.entrega.play();
                resultado.innerHTML +=  +e.cantidad + "  billetes de:<br>" 
                resultado.innerHTML += "<img src ="  + e.url + "<br/>" 
                contador();
            }
        }
    }
}
function contador() 
{
  for(v of caja)
  {
    dinero_disponible = dinero_disponible + (v.valor * v.cantidad);
    console.log (dinero_disponible);
  }
}
function recargabilletes ()
{
    quedan.innerHTML = " ";
    resultado.innerHTML = " ";
    entregado =  [];
    caja =[]
    caja.push (new billete(100,10,"https://i.postimg.cc/8zp9TBnN/100.jpg"))
    caja.push (new billete(50,10,"https://i.postimg.cc/7LbR2PkR/50.png"))
    caja.push (new billete(20,10,"https://i.postimg.cc/T3tS1LZm/20.png"))
    caja.push (new billete(10,10,"https://i.postimg.cc/QxkvLnmf/10.png")) 
    caja.push (new billete(5,10,"https://i.postimg.cc/jdrBFrHW/5.jpg"))  
    contador();
}