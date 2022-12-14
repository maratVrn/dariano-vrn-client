import {$authHost, $host} from "./index";
//  ------------------------  DoorsColors ------------------------------------------------------
export const createDoorsColor = async (dColor) => {
    try {
        const {data} = await $authHost.post('api/doorsColor', dColor)
        return data
    } catch(e) {console.log('ошибка   '+ e.message)}

}
export const getDoorsColors= async () => {
    try {

    const {data} = await $authHost.get('api/doorsColor')

    return data
    } catch(e) {console.log('ошибка   '+ e.message)}
}

export const updateDoorsColor = async (dColor) => {
    try {

        const {data} = await $authHost.put('api/doorsColor', dColor)
        return data
    } catch(e) {console.log('ошибка   '+ e.message)}

}

export const deleteDoorsColor = async (dColorId) => {
    const {data} = await $host.delete('api/doorsColor/'+dColorId.toString())
    return data
}

//  ------------------------  FittingColors ------------------------------------------------------
export const createFittingColor = async (dColor) => {
    try {
        const {data} = await $authHost.post('api/fittingColor', dColor)
        return data
    } catch(e) {console.log('ошибка   '+ e.message)}

}
export const getFittingColors= async () => {
    try {
        const {data} = await $authHost.get('api/fittingColor')
        return data
    } catch(e) {console.log('ошибка   '+ e.message)}
}

export const updateFittingColor = async (dColor) => {
    try {
        const {data} = await $authHost.put('api/fittingColor', dColor)
        return data
    } catch(e) {console.log('ошибка   '+ e.message)}

}

export const deleteFittingColor = async (dColorId) => {
    const {data} = await $host.delete('api/fittingColor/'+dColorId.toString())
    return data
}

//  ------------------------  Doors ------------------------------------------------------
export const createDoor = async (door) => {
    try {
        const {data} = await $authHost.post('api/doors', door)
        return data
    } catch(e) {console.log('ошибка   '+ e.message)}

}
export const getDoors= async () => {
    try {

        const {data} = await $authHost.get('api/doors')
        return data
    } catch(e) {console.log('ошибка   '+ e.message)}
}

export const updateDoor = async (dColor) => {
    try {
        const {data} = await $authHost.put('api/doors', dColor)
        return data
    } catch(e) {console.log('ошибка   '+ e.message)}

}

export const deleteDoor = async (doorId) => {
    const {data} = await $host.delete('api/doors/'+doorId.toString())
    return data
}
//  ------------------------  ClassicModel ------------------------------------------------------
export const createClassicModel = async (model) => {
    try {
        const {data} = await $authHost.post('api/classicModel', model)
        return data
    } catch(e) {console.log('ошибка   '+ e.message)}

}
export const getClassicModel= async () => {
    try {

        const {data} = await $authHost.get('api/classicModel')
        return data
    } catch(e) {console.log('ошибка   '+ e.message)}
}

export const updateClassicModel = async (model) => {
    try {
        const {data} = await $authHost.put('api/classicModel', model)
        return data
    } catch(e) {console.log('ошибка   '+ e.message)}

}

export const deleteClassicModel = async (modelId) => {
    const {data} = await $host.delete('api/classicModel/'+modelId.toString())
    return data
}
//  ------------------------  NeoClassicModel ------------------------------------------------------
export const createNeoClassicModel = async (model) => {
    try {
        const {data} = await $authHost.post('api/neoClassicModel', model)
        return data
    } catch(e) {console.log('ошибка   '+ e.message)}

}
export const getNeoClassicModel= async () => {
    try {
        const {data} = await $authHost.get('api/neoClassicModel')
        return data
    } catch(e) {console.log('ошибка   '+ e.message)}
}

export const updateNeoClassicModel = async (dModel) => {
    try {
        const {data} = await $authHost.put('api/neoClassicModel', dModel)
        return data
    } catch(e) {console.log('ошибка   '+ e.message)}

}

export const deleteNeoClassicModel = async (modelId) => {
    const {data} = await $host.delete('api/neoClassicModel/'+modelId.toString())
    return data
}
//  ------------------------  ModernModel ------------------------------------------------------
export const createModernModel = async (model) => {
    try {
        const {data} = await $authHost.post('api/modernModel', model)
        return data
    } catch(e) {console.log('ошибка   '+ e.message)}

}
export const getModernModel= async () => {
    try {
        const {data} = await $authHost.get('api/modernModel')
        return data
    } catch(e) {console.log('ошибка   '+ e.message)}
}

export const updateModernModel = async (model) => {
    try {
        const {data} = await $authHost.put('api/modernModel', model)
        return data
    } catch(e) {console.log('ошибка   '+ e.message)}

}

export const deleteModernModel = async (modelId) => {
    const {data} = await $host.delete('api/modernModel/'+modelId.toString())
    return data
}
//  ------------------------  Moldings ------------------------------------------------------
export const createMolding = async (model) => {
    try {
        const {data} = await $authHost.post('api/moldings', model)
        return data
    } catch(e) {console.log('ошибка   '+ e.message)}

}
export const getMoldings= async () => {
    try {

        const {data} = await $authHost.get('api/moldings')
        return data
    } catch(e) {console.log('ошибка   '+ e.message)}
}

export const updateMolding = async (model) => {
    try {
        const {data} = await $authHost.put('api/moldings', model)
        return data
    } catch(e) {console.log('ошибка   '+ e.message)}

}

export const deleteMolding = async (modelId) => {
    const {data} = await $host.delete('api/moldings/'+modelId.toString())
    return data
}
//  ------------------------  MoldingsPos ------------------------------------------------------
export const createMoldingPos = async (model) => {
    try {
        const {data} = await $authHost.post('api/moldingPos', model)
        return data
    } catch(e) {console.log('ошибка   '+ e.message)}

}
export const getMoldingPos= async () => {
    try {

        const {data} = await $authHost.get('api/moldingPos')
        return data
    } catch(e) {console.log('ошибка   '+ e.message)}
}

export const updateMoldingPos = async (model) => {
    try {
        const {data} = await $authHost.put('api/moldingPos', model)
        return data
    } catch(e) {console.log('ошибка   '+ e.message)}

}

export const deleteMoldingPos = async (modelId) => {
    const {data} = await $host.delete('api/moldingPos/'+modelId.toString())
    return data
}
//  ------------------------  Fittings ------------------------------------------------------
export const createFittings = async (dFitting) => {
    try {
        const {data} = await $authHost.post('api/fittings', dFitting)
        return data
    } catch(e) {console.log('ошибка   '+ e.message)}

}
export const getFittings= async () => {
    try {
        const {data} = await $authHost.get('api/fittings')
        return data
    } catch(e) {console.log('ошибка   '+ e.message)}
}

export const updateFittings = async (dFitting) => {
    try {
        const {data} = await $authHost.put('api/fittings', dFitting)
        return data
    } catch(e) {console.log('ошибка   '+ e.message)}

}

export const deleteFittings = async (dFittingId) => {
    const {data} = await $host.delete('api/fittings/'+dFittingId.toString())
    return data
}
//  ------------------------  FittingsPos ------------------------------------------------------
export const createFittingsPos = async (dFitting) => {
    try {
        const {data} = await $authHost.post('api/fittingsPos', dFitting)
        return data
    } catch(e) {console.log('ошибка   '+ e.message)}

}
export const getFittingsPos= async () => {
    try {
        const {data} = await $authHost.get('api/fittingsPos')
        return data
    } catch(e) {console.log('ошибка   '+ e.message)}
}

export const updateFittingsPos = async (dFitting) => {
    try {
        const {data} = await $authHost.put('api/fittingsPos', dFitting)
        return data
    } catch(e) {console.log('ошибка   '+ e.message)}

}

export const deleteFittingsPos = async (dFittingId) => {
    const {data} = await $host.delete('api/fittingsPos/'+dFittingId.toString())
    return data
}
//  ------------------------  FittingBrands ------------------------------------------------------
export const createFittingBrands = async (dFitting) => {
    try {
        const {data} = await $authHost.post('api/fittingBrands', dFitting)
        return data
    } catch(e) {console.log('ошибка   '+ e.message)}

}
export const getFittingBrands = async () => {
    try {
        const {data} = await $authHost.get('api/fittingBrands')
        return data
    } catch(e) {console.log('ошибка   '+ e.message)}
}

export const updateFittingBrands = async (dFitting) => {
    try {
        const {data} = await $authHost.put('api/fittingBrands', dFitting)
        return data
    } catch(e) {console.log('ошибка   '+ e.message)}

}

export const deleteFittingBrands = async (dFittingId) => {
    const {data} = await $host.delete('api/fittingBrands/'+dFittingId.toString())
    return data
}