(function () {
    'use strict';

    angular
        .module('app.nodos.nuevo')
        .controller('nodosController', nodosController);

    function nodosController() {
        var vm = this;
        vm.ejecutar = ejecutar;

        function ejecutar() {
            // vm.entradas = 2;
            // vm.salidas = 1;
            vm.error_lineal = new Array();
            vm.entradas_problema = new Array();
            vm.salidas_esperadas = new Array();
            vm.iteraciones = 20;
            vm.rata = 0;
            vm.error_maximo = 0;
            vm.sum = 0;
            var y = 0;
            vm.error_patron = [];
            vm.aux_error_lineal = 0;
            vm.suma_patrones = 0;
//Primer patron
            vm.entradas_problema[1] = new Array();
            vm.salidas_esperadas[1] = new Array();
            vm.entradas_problema[1][1] = 1;
            vm.entradas_problema[1][2] = 1;
            // vm.entradas_problema[1][3] = 1;
            vm.salidas_esperadas[1][1] = 1;
            // vm.salidas_esperadas[1][2] = 1;
//segunda patron
            vm.entradas_problema[2] = new Array();
            vm.salidas_esperadas[2] = new Array();
            vm.entradas_problema[2][1] = 1;
            vm.entradas_problema[2][2] = 0;
            // vm.entradas_problema[2][3] = 0;
            vm.salidas_esperadas[2][1] = 0;
            // vm.salidas_esperadas[2][2] = 1;
//Tercera patron
            vm.entradas_problema[3] = new Array();
            vm.salidas_esperadas[3] = new Array();
            vm.entradas_problema[3][1] = 0;
            vm.entradas_problema[3][2] = 1;
            // vm.entradas_problema[3][3] = 1;
            vm.salidas_esperadas[3][1] = 0;
            // vm.salidas_esperadas[3][2] = 0;
//Cuarto patron
            vm.entradas_problema[4] = new Array();
            vm.salidas_esperadas[4] = new Array();
            vm.entradas_problema[4][1] = 0;
            vm.entradas_problema[4][2] = 0;
            // vm.entradas_problema[4][3] = 0;
            vm.salidas_esperadas[4][1] = 0;
            // vm.salidas_esperadas[4][2] = 0;

            var contenido = document.getElementById("contenido");
            var divmatriz = document.getElementById("matriz");
            var divsalidas = document.getElementById("salidas");
            var diventradas = document.getElementById("entradas");
            var e = vm.entradas;
            var s = vm.salidas;
            contenido.innerHTML = "";
            diventradas.innerHTML = "";
            divsalidas.innerHTML = "";
            divmatriz.innerHTML = "";
            var aux = -1.1;
            var valores = [];
            var u = new Array();
            for (var i = -1; i < 20; i++) {
                aux += 0.1;
                valores.push(aux.toFixed(1));
            }
            var w = new Array();
            for (var i = 1; i <= s; i++) {
                w[i] = new Array();
                for (var j = 1; j <= e; j++) {
                    w[i][j] = ((Math.random() * (1 - (-1) + 1)) + (-1)).toFixed(3);
                }
                u[i] = ((Math.random() * (1 - (-1) + 1)) + (-1)).toFixed(3);
            }
// MOSTRAR RESULTADOS
            divmatriz.innerHTML += "<div style='text-align: center'><b>Matriz</b><br></div>";
            for (var i = 1; i <= s; i++) {
                for (var j = 1; j <= e; j++) {
                    divmatriz.innerHTML += "  " + w[i][j] + " &nbsp;&nbsp;  ";
                }
                divmatriz.innerHTML += "<br>";
            }

            divmatriz.innerHTML += "<div style='text-align: center'><b>Umbral</b><br></div>";
            for (var j = 1; j <= s; j++) {
                divmatriz.innerHTML += " " + u[j] + "&nbsp;&nbsp; ";
            }

            diventradas.innerHTML += "<div style='text-align: center'><b>Entradas</b><br></div>";
            for (var i = 1; i <= 4; i++) {
                for (var j = 1; j <= 2; j++) {
                    diventradas.innerHTML += "  " + vm.entradas_problema[i][j] + " &nbsp;&nbsp";
                }
                diventradas.innerHTML += "<br>";
            }
            divsalidas.innerHTML += "<div style='text-align: center'><b>Salidas</b><br></div>";
            for (var i = 1; i <= 4; i++) {
                for (var j = 1; j <= 1; j++) {
                    divsalidas.innerHTML += "  " + vm.salidas_esperadas[i][j] + " &nbsp;&nbsp";
                }
                divsalidas.innerHTML += "<br>";
            }

            // PROCESO
            contenido.innerHTML += "<br><b>PROCESO DE ENTRENAMIENTO</b><br><hr>";
            for (var q = 1; q <= vm.iteraciones; q++) {
                contenido.innerHTML += "<hr>";
                contenido.innerHTML += "<br><b> INTERACCIÓN " + q + " </b><br><hr>";
                vm.suma_patrones = 0;
                for (var i = 1; i <= 4; i++) {
                    vm.aux_error_lineal = 0;
                    for (var j = 1; j <= 1; j++) {
                        vm.sum = 0;
                        for (var k = 1; k <= 2; k++) {
                            vm.sum += vm.entradas_problema[k][j] * w[k][j];
                        }//fin for para recorrer las entradas y pesos
                        //funcion Escalon
                        var aux_suma = vm.sum - u[j];
                        if (aux_suma <= 0) {
                            y = 0;
                        } else {
                            y = 1;
                        }
                        //calculo el error lineal
                        contenido.innerHTML += "yr" + j + "=" + y + "<br>";
                        vm.error_lineal[j] = vm.salidas_esperadas[i][j] - y;
                        contenido.innerHTML += "<b>Error lineal: " + j + "</b>=" + (vm.salidas_esperadas[i][j] - y) + "<br>";
                        var mientras = vm.salidas_esperadas[i][j] - y;
                        vm.aux_error_lineal += Math.abs(mientras);
                    }//fin for para el numero de salidas por patron
                    contenido.innerHTML += "<b>Error del patron: " + i + "</b>=" + vm.aux_error_lineal + "/" + 2 + "=" + (vm.aux_error_lineal / 2) + "<br><hr>";
                    vm.error_patron.push(vm.aux_error_lineal / 2);
                    vm.suma_patrones = vm.suma_patrones + (vm.aux_error_lineal / 2);

                    //cambio la matriz de peso y umbral del para el siguiente patron
                    contenido.innerHTML += "<div style='text-align: center'><br><b>NUEVA MATRIZ DE PESO</b><br></div>";
                    for (var f = 1; f <= s; f++) {
                        for (var p = 1; p <= e; p++) {
                            var calcula_error = parseFloat(w[f][p] + (vm.rata * vm.error_lineal[f] * vm.entradas_problema[i][p]));
                            contenido.innerHTML += "  " + calcula_error + " &nbsp;&nbsp;  ";
                            w[f][p] = calcula_error;
                        }
                        contenido.innerHTML += "<br>";
                        var auxU = parseFloat(u[f]) + (parseFloat(vm.rata) * parseFloat(vm.error_lineal[f]) * 1);
                        u[f] = auxU;
                    }
                    contenido.innerHTML += "<b>Umbral</b><br>";
                    for (var p = 1; p <= s; p++) {
                        contenido.innerHTML += " " + u[p] + "&nbsp;&nbsp;<br> ";
                    }

                }//fin for para los cuatro patrones

                var promedio_patrones = vm.suma_patrones / 4;
                contenido.innerHTML += "<br> promedio de patrones: " + promedio_patrones;
                if (promedio_patrones <= vm.error_maximo) {
                    contenido.innerHTML += "<br><b style='color:red' >Se encontro el error maximo permirido" + promedio_patrones + "<b>";
                    break;
                }
            }
        };//Fin Cargar
    }
})();