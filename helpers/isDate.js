import moment from "moment";

export const isDate = (value) => {
    if (!value) {
        throw new Error("- Las fechas son obligatorias");
    }

    const date = moment(value);

    if (date.isValid()) {
        return true;
    } else {
        throw new Error("- Las fechas no son válidas");
    }
};