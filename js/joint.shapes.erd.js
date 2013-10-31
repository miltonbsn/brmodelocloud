/*! JointJS v0.6.4 - JavaScript diagramming library  2013-10-15 


This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
joint.shapes.erd = {};

joint.shapes.erd.Entity = joint.dia.Element.extend({

    markup: '<g class="rotatable"><g class="scalable"><polygon class="outer"/><polygon class="inner"/></g><text/></g>',

    defaults: joint.util.deepSupplement({

        type: 'erd.Entity',
        size: { width: 85, height: 45 },
        attrs: {
            '.outer': {
                fill: 'white', stroke: '#27AE60', 'stroke-width': 2,
                points: '100,0 100,60 0,60 0,0'
            },
            '.inner': {
                fill: '#2ECC71', stroke: '#27AE60', 'stroke-width': 2,
                points: '95,5 95,55 5,55 5,5',
                display: 'none'
            },
            text: {
                text: 'Entity',
                'font-family': 'Arial', 'font-size': 8,
                ref: '.outer', 'ref-x': .5, 'ref-y': .5,
                'x-alignment': 'middle', 'y-alignment': 'middle',
                fill: 'black'
            }
        }

    }, joint.dia.Element.prototype.defaults)
});

joint.shapes.erd.WeakEntity = joint.shapes.erd.Entity.extend({

    defaults: joint.util.deepSupplement({

        type: 'erd.WeakEntity',

        attrs: {
            '.inner' : { display: 'auto' },
            text: { text: 'Weak Entity' }
        }

    }, joint.shapes.erd.Entity.prototype.defaults)
});

joint.shapes.erd.Relationship = joint.dia.Element.extend({

    markup: '<g class="rotatable"><g class="scalable"><polygon class="outer"/><polygon class="inner"/></g><text/></g>',
    
    defaults: joint.util.deepSupplement({

        type: 'erd.Relationship',
        size: { width: 60, height: 60 },
        attrs: {
            '.outer': {
                fill: 'white', stroke: '#948989', 'stroke-width': 2,
                points: '40,0 80,40 40,80 0,40'
            },
            '.inner': {
                fill: 'white', stroke: 'black', 'stroke-width': 2,
                points: '40,5 75,40 40,75 5,40',
                display: 'none'
            },
            text: {
                text: 'Relationship',
                'font-family': 'Arial', 'font-size': 8,
                ref: '.', 'ref-x': .5, 'ref-y': .5,
                'x-alignment': 'middle', 'y-alignment': 'middle'
            }
        }

    }, joint.dia.Element.prototype.defaults)
});

joint.shapes.erd.IdentifyingRelationship = joint.shapes.erd.Relationship.extend({

    defaults: joint.util.deepSupplement({

        type: 'erd.IdentifyingRelationship',

        attrs: {
            '.inner': { display: 'auto' },
            text: { text: 'Identifying' }
        }

    }, joint.shapes.erd.Relationship.prototype.defaults)
});

joint.shapes.erd.Attribute = joint.dia.Element
		.extend({

			markup : '<g class="rotatablex"><g class="scalable"><ellipse class="outer"/><ellipse class="inner"/></g><text/></g>',

			defaults : joint.util.deepSupplement({
                
				type : 'erd.Attribute',
				size : {
					width : 15,
					height : 15
				},
				attrs : {
					'ellipse' : {
						stroke : 'black',
						'stroke-width' : 1,
						transform : 'translate(0, 15)',
						opacity : .6
					},
					'.outer' : {
						cy : 0,
						rx : 30,
						ry : 15,
						fill : 'white'              
					},
					'.inner' : {
						cx : 10, cy : 25, rx : 45, ry : 20,
						fill : 'black',
						display : 'none'
					},
					text : {
                        'ref-x': 12, 'ref-y': 14,
                        'y-alignment': 'bottom'
					}
				}

			}, joint.dia.Element.prototype.defaults)

		});

 joint.shapes.erd.Multivalued = joint.shapes.erd.Attribute.extend({

     defaults: joint.util.deepSupplement({

         type: 'erd.Multivalued',

         attrs: {
             '.inner': { display: 'block' },
             text: { text: 'multivalued' }
         }
     }, joint.shapes.erd.Attribute.prototype.defaults)
 });

 joint.shapes.erd.Derived = joint.shapes.erd.Attribute.extend({

     defaults: joint.util.deepSupplement({

         type: 'erd.Derived',

         attrs: {
             '.outer': { 'stroke-dasharray': '3,5' },
             text: { text: 'derived' }
         }

     }, joint.shapes.erd.Attribute.prototype.defaults)
 });

 joint.shapes.erd.Key = joint.shapes.erd.Attribute.extend({

     defaults: joint.util.deepSupplement({

         type: 'erd.Key',

         attrs: {
             ellipse: { 'stroke-width': 2 },
           	 '.outer' : {
						fill : 'black'              
					},
             text: { text: 'key', 'font-weight': 'bold', 'text-decoration': 'underline' }
         }
     }, joint.shapes.erd.Attribute.prototype.defaults)
});

joint.shapes.erd.Normal = joint.shapes.erd.Attribute.extend({

    defaults: joint.util.deepSupplement({

        type: 'erd.Normal',

        attrs: { text: { text: 'Normal' }}

    }, joint.shapes.erd.Attribute.prototype.defaults)
});

joint.shapes.erd.ISA = joint.dia.Element.extend({

    markup: '<g class="rotatable"><g class="scalable"><polygon class="outer"/></g><text/></g>',

    defaults: joint.util.deepSupplement({

        type: 'erd.ISA',
        size: { width: 75, height: 35 },
        attrs: {
            'polygon': {
                points: '25,0 0,25 50,25',
                fill: 'white', stroke: '#948989', 'stroke-width': 2
            },
            '.outer' : {
				fill : 'white',
                stroke: '#948989'
            },
            text: {
                text: 'ISA',
                ref: '.', 'ref-x': .5, 'ref-y': .3, 'x-alignment': 'middle', 'y-alignment': 'middle'
            }
        }

    }, joint.dia.Element.prototype.defaults)

});

joint.shapes.erd.Line = joint.dia.Link.extend({

    defaults: { type: "erd.Line" },

    cardinality: function(value) {
        this.set('labels', [{ position: -20, attrs: { text: { dy: -8, text: value }}}]);
    }
});
