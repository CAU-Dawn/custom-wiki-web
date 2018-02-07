window.onload=function() {

    var quill = new Quill('#editor-container', {
      theme: 'snow',
      modules: {
        toolbar: [
          [{ header: [1, 2, false] }],
          ['code-block']
        ]
      },
      placeholder: 'im here to create.'
    });

    var form = $("#form");
    form.onsubmit = function(){
      var about = $("input[name=about]");
      about.value = JSON.stringify(quill.getContents());
      //console.log("Submitted", $(form).serialize(), $(form).serializeArray());
    };

};
