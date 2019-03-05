window.JsFunctions = {
    showData: function (text, X, Y) {

        var chart = InteractiveDataDisplay.asPlot($("#chart"));
        chart.polyline("line", { x: [1, 4, 4.5], y: [1, 6.5, 9], stroke: "blue", thickness: 3 });
        //X_arr = [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ];
        //Y_arr = [1, 2, 3, 4, 5, 4, 3, 2, 1];
        //console.dir(X);
        //console.dir(X_arr);

        chart.polyline(text, { x: X, y: Y, stroke: "gray", thickness: 3 });

        return true;
    },
    addLine: function (text, X, Y, color) {

        var chart = InteractiveDataDisplay.asPlot($("#chart"));

        chart.polyline(text, { x: X, y: Y, stroke: color, thickness: 3 });

        return true;
    },
    say: function (data) {
        console.dir(data);
        return true;
    }
};