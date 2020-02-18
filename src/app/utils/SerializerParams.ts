declare var $: any;

export class SerializerParams {
    static serialize(params: object) {
        return $.param(params);
    }
}