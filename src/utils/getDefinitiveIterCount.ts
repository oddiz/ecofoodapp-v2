export default function getDefinitiveIterCount(activeFoodCount: number, menuSize: number): number {
    return Math.round(
        factorial(activeFoodCount + menuSize - 1) / (factorial(activeFoodCount) * factorial(menuSize - 1))
    );
}

function factorial(num: number) {
    var rval = 1;
    for (var i = 2; i <= num; i++) rval = rval * i;
    return rval;
}
