window.JsFunctions = {
    interop: function (functionStr) {

        function jsonReady(array) {
            array.forEach(function (element, index) {
                element = element.replace(/'/g, '"');
                element = "[" + element + "]";
                element = element.replace(/\s/g, '');
                this[index] = element;
            }, array);
        }

        function executeFunctionByString(functionString, context, argums) {
            if (functionString == null)
                return false;

            let openBr = 0;
            var args = Array();
            var functions = Array();
            let functionStart = 0;
            for (let pos = 0; pos < functionString.length; pos++) {
                const element = functionString[pos];
                if (element == '(') {
                    if (openBr == 0) {
                        functions.push(functionString.substring(functionStart, pos))
                        startPos = ++pos;
                    }
                    openBr++;
                } else if (element == ')') {
                    openBr--;
                    if (openBr == 0) {
                        endPos = pos;
                        functionStart = ++pos;
                        args.push(functionString.substring(startPos, endPos));
                    }
                }
            }

            jsonReady(args);
            jsonReady(argums);
            functions.forEach(function (element, index) {
                this[index] = element.split('.').filter(Boolean)
            }, functions);

            for (let i = 0; i < functions.length; i++) {
                let namespaces = functions[i];
                let func = namespaces.pop();
                for (let j = 0; j < namespaces.length; j++) {
                    context = context[namespaces[j]];
                }
                let json = JSON.parse(args[i]);
                if ((/@/i.test(json[0]) && (json[0].length == 1)) && (argums.length > 0)) {
                    context = context[func].apply(context, JSON.parse(argums[0]));
                    argums = Array.prototype.slice.call(argums, 1);
                } else {
                    context = context[func].apply(context, JSON.parse(args[i])); //context ?= chart 
                }
            }
            return context;
        }
        console.log("interop.js")
        executeFunctionByString(functionStr, window, Array.prototype.slice.call(arguments, 1));
        return true;
    },
    log: function (message) {
        console.log(message);
        return true;
    }
};