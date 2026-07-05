export interface Massive {
    getMass(): number
}

export function isMassive(arg: any): arg is Massive {
    return arg 
        && arg.getMass 
        && typeof(arg.getMass) === 'function'       
    ;
}