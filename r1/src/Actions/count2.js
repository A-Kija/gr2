import * as C from '../Constants/count2';


export const plus1 = _ => {
    return {
        type: C.plus1,
    }
}

export const minus1 = _ => {
    return {
        type: C.minus1,
    }
}

export const plus5 = _ => {
    return {
        type: C.plus5,
    }
}

export const plusInput = value => {
    return {
        type: C.plusInput,
        payload: value,
    }
}

export const multiInput = value => {
    return {
        type: C.multiInput,
        payload: value,
    }
}