//Variable que almacena el valor del scroll
var OPFancyMenu_docscroll = 0;


//Funcion para mostrar el menu. se usa desde un evento
function OPFancyMenu_Open(e)
{
    //detenemos la propagacion del evento
    e.stopPropagation();
    e.preventDefault();

    //Obtenemos el contedor y el wrapper
    var contenedor = $('#OP_perspective');
    var contenido = $('#OP_wrapper');

    //obtenemos el scroll actual
    OPFancyMenu_docscroll = (window.pageYOffset || window.document.documentElement.scrollTop);

    //Cambiamos el top del contenido
    contenido.css('top', OPFancyMenu_docscroll * -1 + 'px');
    // mac chrome issue: "Parece que es para evitar un problema"
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    //agregamos la clase css
    contenedor.addClass('OP_modalview');
    //agregamos otra clase css pero posponemos un momento
    setTimeout(function () { contenedor.addClass('OP_animate'); }, 25);

    //agregamos el evento, cerrar el menu haciendo click en el contenedor
    $('#OP_container').click(OPFancyMenu_Close);
}


//Funcion para ocultar el menu. se usa desde un evento
function OPFancyMenu_Close(e)
{
    //detenemos la propagacion del evento
    e.stopPropagation();
    e.preventDefault();

    //Obtenemos el contedor y el wrapper
    var contenedor = $('#OP_perspective');
    var contenido = $('#OP_wrapper');
    
    if (contenedor.hasClass('OP_animate'))
    {
        //funcion anonima que completa la transicion. quita el efecto modal y acomoda el scroll
        var onEndTransFn = function (e) {
            //revisamos si es el llamado por la propiedad requerida
            var ev = e.originalEvent;
            if (Modernizr.csstransitions && (ev.target.className !== 'OP_container' || ev.propertyName.indexOf('transform') == -1)) return;

            //detenemos la propagacion del evento
            e.stopPropagation();
            e.preventDefault();

            //Quitamos el control del evento fin de transicion y quitamos la clase modal
            contenedor.off('transitionend webkitTransitionEnd oTransitionEnd', onEndTransFn);
            contenedor.removeClass('OP_modalview');
            // mac chrome issue: "Parece que es para evitar un problema"
            document.body.scrollTop = document.documentElement.scrollTop = OPFancyMenu_docscroll;
            //Cambiamos el top del contenido
            contenido.css('top', '0px');
        };

        //Verificamos que se soporte las transiciones, de ser asi se asigna en evento, sino se ejecuta la funcion inmediatamente
        if (Modernizr.csstransitions) { contenedor.on('transitionend webkitTransitionEnd oTransitionEnd', onEndTransFn); }
        else { onEndTransFn.call(); }

        //Quitamos la clase animada, esto hace inicia la animacion inversa
        contenedor.removeClass('OP_animate');

        //quitamos el evento, cerrar el menu haciendo click en el contenedor
        $('#OP_container').off('click' ,OPFancyMenu_Close);
    }
}


//Se inicializa los contoles que manejan el menu 
$().ready(
    function () {
        //Se asigna el evento al boton (en contenido). para mostrar el menu
        $('#OP_MenuButton').click(OPFancyMenu_Open);

        //Se asigna el evento al enlace (en menu). para ocultar el menu
        $('#OP_MenuClose').click(OPFancyMenu_Close);
    }
);