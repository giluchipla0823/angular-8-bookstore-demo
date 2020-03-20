import { Api } from '../interfaces/api.interface';

declare var $: any;

export class DatatablesUtils {

    static DOM: string = `<\'hide\'lt><\'row\'<\'col-sm-12\'tr>><\'hide\'ip>`;
    static LENGTH_MENU: any[] = [[10, 25, 50, 100, -1], [10, 25, 50, 100, 'Todos']];

    static initComplete(settings: DataTables.SettingsLegacy, json: any) {
        const tableId: string = settings.sTableId;
        const $table: any = $('#' + tableId);
        const $panel: any = $table.parents('.card');
        const $containerLength: any = $panel.find('.dt-select-length');
        const $containerInfoResults: any = $panel.find('.dt-info-results');
        const $containerPagination: any = $panel.find('.dt-pagination');
        const $datatableLength: any = $panel.find('.dataTables_length');
        const $datatableInfo: any = $panel.find('.dataTables_info');
        const $datatablePaginate: any = $panel.find('.dataTables_paginate');

        $containerLength.children().remove();
        $containerInfoResults.children().remove();
        $containerPagination.children().remove();
        $datatableLength.appendTo($containerLength);
        $containerInfoResults.append($datatableInfo);
        $containerPagination.append($datatablePaginate);

        $('[data-toggle="tooltip"]').tooltip();
    }

    static reloadData($instance: DataTables.Api,  resetPagination: boolean) {
        $instance.ajax.reload(json => {
            console.log('reload datatable');

            /*
            var count_ul = $_ulRow.length;

            for(var i = 0; i < count_ul; i++){
                var index = $($_ulRow[i]).data('dtrIndex');
                $('#' + tableId +' tbody tr')
                    .not('tr.child')
                    .eq(index)
                    .children('td:eq(0)')
                    .trigger('click');
            }
            */
        }, resetPagination);
    }

    static getAjaxDataSrc(data: any) {
        if (data.data === undefined) {
            return [];
        }

        return data.data;
    }

    static getAjaxDataFilter(response: string) {
        const json: Api = JSON.parse(response);
        const data: any = json.data;

        return JSON.stringify({
            draw: data.draw,
            recordsTotal: data.recordsTotal,
            recordsFiltered: data.recordsFiltered,
            data: data.items
        });
    }
}