vlt = {
  init: function () {
    var geneBox = $('#geneBox');
    geneBox.autocomplete({
      source: '/api/lookup/genes',
      minLength: 2,
      autoFocus: true,
      position: {
        my: 'left bottom',
        at: 'left top',
        of: '#geneBox',
        collision: 'flip'
      },
      select: function (event, ui) {
        vlt.query(ui.item.value);
      }
    });
    geneBox.keydown(function (event) {
      if (event.which == 13) {
        vlt.query(event.target.value);
      }
    });
    geneBox.focus();

    $('#variants').dataTable({
      columns: [
        { data: 'gene' },
        { data: 'nucleotide_change' },
        { data: 'protein_change' },
        { data: 'other_mappings' },
        { data: 'alias' },
        { data: 'transcripts' },
        { data: 'region' },
        { data: 'reported_classification' },
        { data: 'inferred_classification' },
        { data: 'source' },
        { data: 'last_evaluated', className: 'date' },
        { data: 'last_updated', className: 'date' }
      ],
      ajax: {
          url: '/api/variants',
          dataSrc: function (json) {
            for (var i in json) {
              var variant = json[i];
              variant.other_mappings = variant.other_mappings.replace(/,/g, '<br/>');
              variant.transcripts = variant.transcripts.replace(/,/g, '<br/>');
              if (variant.source === 'ClinVar') {
                variant.alias = variant.alias.replace(/,\s/g, '<br/>');
              } else if (variant.source === 'EmvClass') {
                variant.alias = variant.alias.replace(/,$/, '');
                variant.alias = variant.alias.replace(/,|\s\|\s/g, '<br/>');
              }
              if (variant.source && variant.url) {
                variant.source = '<a target="_blank" href="' + variant.url + '">' + variant.source + '</a>';
              }
            }
            return json;
          }
      },      
      paging: false,
      searching: false,
      info: false,
      autoWidth: false
    });
  },

  query: function (gene) {
    $('#variants').DataTable().ajax.url('/api/variants?gene=' + gene).load();
  }
};

$('document').ready(function () {
  vlt.init();
});
