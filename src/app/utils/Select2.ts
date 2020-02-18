declare var $: any;

export class Select2 {
    static getDefaultOptions() {
      return {
          theme: 'bootstrap',
          placeholder: 'Seleccionar',
          allowClear: true,
          width: '100%',
          language: 'es'
      };
    }

    static setAttributesToValidate(el: JQuery, field: string) {
        el.attr({
            required: true,
            id: field,
            name: field,
            formControlName: name
        });

        el.addClass('select2-validator');

        this.setEventToCloseWhenUnselecting();
    }

    static setEventToCloseWhenUnselecting() {
        $('body')
            .on('select2:unselecting', 'select.select2-hidden-accessible', function(e: JQuery.Event) {
                $(this).data('state', 'unselected');
            })
            .on('select2:open', 'select.select2-hidden-accessible', function(e: JQuery.Event) {
                const $this =  $(this);

                if ($this.data('state') === 'unselected') {
                    $this.removeData('state');
                    $this.select2('close');
                }
            });
    }
}