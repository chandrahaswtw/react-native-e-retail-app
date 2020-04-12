import * as keyValue from './../components/AddEdit/Utils/KeyValue';

const initial_state = {
    employeeInfo: []
}

const BioReducer = (state = initial_state, action) => {
    switch (action.type) {
        case "initialFetch":
            if (action.value) {
                const megaObj = action.value;
                const employeeInfo = [];
                var keys = Object.keys(megaObj);
                for (i of keys) {
                    let temp = {};
                    temp.id = i;
                    temp.value = {
                        [keyValue.FIRST_NAME]: megaObj[i]["FIRST_NAME"],
                        [keyValue.LAST_NAME]: megaObj[i]["LAST_NAME"],
                        [keyValue.AGE]: megaObj[i]["AGE"],
                        [keyValue.CITY]: megaObj[i]["CITY"],
                        [keyValue.COUNTRY]: megaObj[i]["COUNTRY"],
                    }
                    employeeInfo.push(temp)
                }
                return {
                    ...state,
                    employeeInfo
                };
            }
            else {
                return {
                    ...state,
                    employeeInfo: []
                }
            }

        default:
            return state
    }

}

export default BioReducer;