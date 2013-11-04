$(document).ready(function () {

  var x = 1;

  Array.prototype.clear = function () {
    this.splice(0, this.length);
  };

  var list = new Array();
  var listtoadd = new Array();

  var graph = new joint.dia.Graph;

  var paper = new joint.dia.Paper({
    el: $('#myholder'),
    width: $('#content').width(),
    height: $('#content').height(),
    gridSize: 1,
    model: graph
  });

  var erd = joint.shapes.erd;

  var element = function (elm, x, y, label) {
    var cell = new elm({
      position: {
        x: x,
        y: y
      },
      attrs: {
        text: {
          text: label
        }
      }
    });

    graph.addCell(cell);

    return cell;

  };

  var link = function (elm1, elm2) {
    var myLink = new erd.Line({
      source: {
        id: elm1.id
      },
      target: {
        id: elm2.id
      }
    });
    graph.addCell(myLink);
    return myLink;
  };

  loaddbs(element, link);

  $("#entityclick").click(function () {
    listtoadd[0] = erd.Entity;
  });

  $("#relationclick").click(function () {
    listtoadd[0] = erd.Relationship;
  });

  $("#atributoclick").click(function () {
    listtoadd[0] = erd.Normal;
  });

  $("#atributochaveclick").click(function () {
    listtoadd[0] = erd.Key;
  });

  $("#especializacaoclick").click(function () {
    listtoadd[0] = erd.ISA;
  });

  $("#lineclick").click(function () {
    if (list.length == 2) {
      
      var x = graph.getCell(list[0].model.attributes.id);
      var y = graph.getCell(list[1].model.attributes.id);
      
      link(x, y);
      clearSelection(list);
    } else {      
      var connection = new joint.dia.Link({
        source: {
          x: 50, y: 500
        },
        target: {
          x: 50, y: 350
        },
        attrs: {}
      });
      connection.attr({
        ".connection": {
          stroke: "black"
        }
      });
      connection.addCell(link);
    }
  });

  $("#lessclick").click(function () {
    x = x - 0.1;
    paper.scale(x, x);
    $
  });

  $("#moreclick").click(function () {
    x = x + 0.1;
    paper.scale(x, x);
  });

  $("#nameInput").blur(function () {
    list[list.length-1].model.attributes.attrs.text.text = $("#nameInput").val();
    list[list.length-1].update();
  });

  paper.on("cell:pointerdown", function (cellview, evt, x, y) {
    if (evt.originalEvent.ctrlKey == true || evt.originalEvent.altKey == true) {
      if (cellview.model.attributes.attrs['.outer'].fill == 'white') {
        addSelection(list, cellview);
        $("#nameInput").val(cellview.model.attributes.attrs.text.text);
      } else {
        removeSelection(list,cellview, true);
      }
      cellview.update();
    }
  });

  paper.on('blank:pointerdown', function (evt, x, y) {
    if (listtoadd.length != 0) {
      if (listtoadd[0] == erd.Entity) {
        element(erd.Entity, x, y, "Entidade");
      } else if (listtoadd[0] == erd.Relationship) {
        element(erd.Relationship, x, y, "Relacionamento");
      } else if (listtoadd[0] == erd.Normal) {
        element(erd.Normal, x, y, "Atributo");
      } else if (listtoadd[0] == erd.Key) {
        element(erd.Key, x, y, "chave");
      } else if (listtoadd[0] == erd.ISA) {
        element(erd.ISA, x, y, "");
      }
      listtoadd.pop();
    }
      clearSelection(list);

  });

});

function clearSelection(list) {
  for (var i = 0; i < list.length; i = i + 1) {
    removeSelection(list, list[i], false);
  }
  list.clear();
}

function addSelection(list, cellview) {
  if (list == 0) {
    list[0] = cellview;
  } else {
    if (list.length == 1) {
      list[1] = cellview;
    } else {
      if (list.length > 1) {
        removeSelection(list, list[0]);
        list[0] = list[1];
        list[1] = cellview;
      }
    }
  }
  cellview.model.attributes.attrs['.outer'].fill = cellview.model.attributes.attrs['.outer'].stroke;
  cellview.update();
}

function removeSelection(list, cellview, toremove) {
  cellview.model.attributes.attrs['.outer'].fill = 'white';
  cellview.update();
  if(toremove){
      var index = list.indexOf(cellview);
      if(index == 0){
        list[0] = list[1] ;  
      }      
      list.pop();
  }      
  console.log(list);
}

function loaddbs(element, link) {

  var erd = joint.shapes.erd;

  var filial = element(erd.Entity, 90, 43, "FILIAL");

  var possui = element(erd.Relationship, 300, 33, "possui");

  var cliente = element(erd.Entity, 532, 45, "CLIENTE");
  var isa = element(erd.ISA, 500, 151, "");
  var pfisica = element(erd.Entity, 423, 254, "PESSOA FÍSICA");
  var pjuridica = element(erd.Entity, 653, 258, "PESSOA JURÍDICA");

  var nome = element(erd.Key, 713, 30, "código");
  var codcliente = element(erd.Normal, 711, 57, "cliente");

  var sexo = element(erd.Normal, 467, 335, "rg");
  var rg = element(erd.Normal, 326, 334, "cpf");

  var cnpj = element(erd.Normal, 783, 239, "cnpj");

  link(filial, possui).cardinality('1..1');
  link(cliente, possui).cardinality('0..n');

  link(cliente, isa);
  link(pfisica, isa);
  link(pjuridica, isa);

  link(cliente, nome);
  link(cliente, codcliente);

  link(pfisica, sexo);
  link(pfisica, rg);

  link(pjuridica, cnpj);

}