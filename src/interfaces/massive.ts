export interface Massive {
    mass: number
}

export function isMassive(arg: any): arg is Massive {
    return arg 
        && arg.mass 
        && typeof(arg.mass) === 'number'
    ;
}