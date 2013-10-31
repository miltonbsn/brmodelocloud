$(document).ready(function() {

        var x = 1;
        
        Array.prototype.clear = function() {
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

         var element = function(elm, x, y, label) {
             var cell = new elm({ position: { x: x, y: y }, attrs: { text: { text: label }}});
             
             graph.addCell(cell);
                          
          		return cell;
          
             }; 

         var link = function(elm1, elm2) {
             var myLink = new erd.Line({ source: { id: elm1.id }, target: { id: elm2.id }});
             graph.addCell(myLink);
             return myLink;
         };

        loaddbs(element, link);
         
         $("#entityclick").click(function() {
             listtoadd[0] = erd.Entity;
        	 //element(erd.Entity, 50, 350, "Entidade");
         });
         
         $("#relationclick").click(function() {
             listtoadd[0] = erd.Relationship;
        	 //element(erd.Relationship, 50, 350, "Relacionamento");
         });

         $("#atributoclick").click(function() {
             listtoadd[0] = erd.Normal;
        	 //element(erd.Normal, 50, 350, "Atributo");
         });
         
         $("#atributochaveclick").click(function() {
             listtoadd[0] = erd.Key;
        	 //element(erd.Key, 50, 350, "Chave");
         });

        $("#especializacaoclick").click(function() {
            listtoadd[0] = erd.ISA;
            //element(erd.ISA, 50, 350, ""); 
         });
    
         $("#lineclick").click(function() {
 
//        	 var link;
//
//        	 link = new joint.dia.Link({
//        	   source: {
//        	     x: 50,
//        	     y: 500
//        	   },
//        	   target: {
//        	     x: 50,
//        	     y: 350
//        	   },
//        	   attrs: {}
//        	 });
//
//        	 link.attr({
//        	   ".connection": {
//        	     stroke: "black"
//        	   }
//        	 });
//        	 
//        	 
//        	 graph.addCell(link);
             
             
             //console.log(list);

             list[0].model.attributes.attrs['.outer'].fill = 'white';
             list[0].update();
             list[1].model.attributes.attrs['.outer'].fill = 'white';
             list[1].update();
             
             link(graph.getCell(list[0].model.attributes.id), graph.getCell(list[1].model.attributes.id));
             list.clear();
        	 
         }); 
         
         $("#lessclick").click(function() {
        	 x = x - 0.1;
        	 paper.scale(x, x);
        	 $
         });
         
         $("#moreclick").click(function() {
        	 x = x + 0.1;
        	 paper.scale(x, x);
         });
    
         paper.on( "cell:pointerdown", function( cellview, evt, x, y)  {
        	         
        	console.log(evt);
        	 
        	 if(evt.originalEvent.ctrlKey == true){
        		 
        		   if(cellview.model.attributes.attrs['.outer'].fill == 'white'){
                  	 cellview.model.attributes.attrs['.outer'].fill = cellview.model.attributes.attrs['.outer'].stroke; 
                     list.push(cellview); 
                   } else {                            
                  	 cellview.model.attributes.attrs['.outer'].fill = 'white';
                     list.pop(cellview);
                   }

               cellview.update();
               
//                   var jsonString = JSON.stringify(graph.toJSON());
//                	
//                   graph.clear();
//                   
//                   graph.fromJSON(JSON.parse(jsonString));
        		 
        	 }
        	 
         });   
    
        paper.on('blank:pointerdown', function(evt, x, y) { 
            if(listtoadd.length != 0){
                
                if(listtoadd[0] == erd.Entity){
                    element(erd.Entity, x, y, "Entidade");
                }    
                
                if(listtoadd[0] == erd.Relationship){
                    element(erd.Relationship, x, y, "Relacionamento");
                } 
                
                if(listtoadd[0] == erd.Normal){
                    element(erd.Normal, x, y, "Atributo");
                } 
                
                if(listtoadd[0] == erd.Key){
                    element(erd.Key, x, y, "chave");
                }   
                
                if(listtoadd[0] == erd.ISA){
                    element(erd.ISA, x, y, "");
                }   
                
                listtoadd.pop();
            }
        });

});

function loaddbs(element, link){
    
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
//function MainCtrl($scope) {
//  $scope.models = [
//    {text:'Lógico'},
//    {text:'Conceitual'}];
// 
//  $scope.addModelConceitual = function() {
//    $scope.models.push({text:"Conceitual"});
//  };
//
//  $scope.addModelLogico = function() {
//    $scope.models.push({text:"Lógico"});
//  };
//    
//}