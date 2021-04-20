$(document).ready(function(){
    //TODO: Add autoscroll
    var icon = $(".terminal-icon");
    var nuovo = ('<div class="min" id="terminal">\
                    <div id="header">\
                        <button type="button" class="red"></button>\
                        <button type="button" class="yellow"></button>\
                        <button type="button" class="green"></button>\
                        <span class="title">Terminale</span>\
                    </div>\
                    <div class="container"></div>\
                </div>');

    var open = 0;

    icon.click(function(){
        if(open == 0){
            open = 1;
            icon.addClass("terminal-open");
            $("body").append(nuovo);
            var terminal = $("#terminal");
            var prompt = "[paolo@paolo-pc]:~";
            var canvas = $(".container");
            var green = $(".green");
            var red = $(".red");
            var yellow = $(".yellow");
            var command = "";
            function display(){
                canvas.append(prompt);
            }
            display();

    /********************Make terminal draggable******************************/

            dragElement(document.getElementById("terminal"));

            function dragElement(elmnt) {
                var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
                if (document.getElementById("header"))
                    if($("#terminal").hasClass("min"))
                        document.getElementById("header").onmousedown = dragMouseDown;
                    //TODO: Fix bug of dragging termi

                function dragMouseDown(e) {
                    e = e || window.event;
                    e.preventDefault();
                    // get the mouse cursor position at startup:
                    pos3 = e.clientX;
                    pos4 = e.clientY;
                    document.onmouseup = closeDragElement;
                    // call a function whenever the cursor moves:
                    document.onmousemove = elementDrag;
                }

                function elementDrag(e) {
                    e = e || window.event;
                    e.preventDefault();
                    // calculate the new cursor position:
                    pos1 = pos3 - e.clientX;
                    pos2 = pos4 - e.clientY;
                    pos3 = e.clientX;
                    pos4 = e.clientY;
                    // set the element's new position:
                    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
                    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
                }

                function closeDragElement() {
                    // stop moving when mouse button is released:
                    document.onmouseup = null;
                    document.onmousemove = null;
                }
            }
            terminal.resizable();

    /********************Terminal ctrl button******************************/
            
            green.click(function(){
                if($("#terminal").hasClass("max")){
                    $("#terminal").removeClass("max");
                    $("#terminal").addClass("min");
                }
                else{
                    $("#terminal").removeClass("min");
                    $("#terminal").addClass("max");
                }
            });
        
            red.click(function(){
                icon.removeClass("terminal-open");
                $("#terminal").remove();
                open = 0;;
            });
        
            yellow.click(function(){
                $("#terminal").css("visibility", "hidden");
            });
        }

        else if(open == 1){
            $("#terminal").css("visibility", "visible");
        }

        /********************Terminal typing******************************/

        //COMANDI
        function clear(){
            canvas.text(prompt);
            command = "";
        }

        function help(){
            canvas.append("<br/>clear - utilizzalo per ripulire il terminale dallo storico dei comandi<br/>ls - utilizzalo per vedere il contenuto della cartella<br/>help - utilizzalo per mostrare la lista dei comandi<br/>info - utilizzalo per vedere le informazioni sull' applicativo");
            goAhead();
        }

        function ls(){
            canvas.append("<br/>Programma.exe     C:/     Pappagallo_OS.iso");
            goAhead();
        }

        function info(){
            canvas.append("<br/>Emultore terminale<br/>Versione: 1.1<br/>Realizzato da Rabbito Paolo");
            goAhead();
        }
        /*
        function echo(args){
            canvas.innerHTML += "<br/>"args;
            goAhead();
        }*/
        
        function error(){
            canvas.append("<br/> Errore: command not found");
            goAhead();
        }

        //MESSA A CAPO DOPO UN COMANDO
        function goAhead(){
            canvas.append("<br/>");
            canvas.append(prompt);
            command = "";
        }
        canvas.innerHTML = prompt;
        //INPUT DA TASTIERA
        document.addEventListener('keydown', function(event) {
            if(event.keyCode>47 && event.keyCode<90){
                canvas.append(event.key);
                command += event.key;
            }
            if(event.keyCode===8 && command.length>0){
                canvas.innerHTML = canvas.innerHTML.replace(/.$/, '');
                canvas = canvas.slice(0, -1);
            }
            if(event.keyCode===13){
                switch(command){
                    case "clear":
                        clear();
                        break;

                    case "help":
                        help();
                        break;
                    
                    case"ls":
                        ls();
                        break;
                    
                    case "info":
                        info();
                        break;
                    
                    case "":
                        goAhead();
                        break;
                        
                    default:
                        error();
                }       
            }
        });
    });
});