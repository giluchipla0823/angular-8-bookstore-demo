export const extractColumn = (arr: any[], column: string, convertToString: boolean = false): any[] => {
    function reduction(previousValue: any, currentValue: any) {
        let value: any = currentValue[column];

        if (convertToString) {
            value = value.toString();
        }

        previousValue.push(value);
        return previousValue;
    }

    return arr.reduce(reduction, []);
};