export const isEmpty = target => {
    const str = target;
    if(target === undefined || target === null || target === '') {
        return true;
    }

    console.log(target);
    return false;
}

export const isEqual = (strA, strB) => {
    const nullityA = isEmpty(strA);
    const nullityB = isEmpty(strB);

    if(!nullityA && !nullityB){
        if(strA===strB)
            return true;
    }
    return false;
}  

export const removeQutation = str =>{
    if(!isEmpty(str))
        return str.substring(1, str.length-1);
    else
        return null;
}

