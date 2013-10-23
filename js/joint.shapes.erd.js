/*! Joint v0.6.2 - JavaScript diagramming library  2013-09-11 


This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
joint.shapes.erd = {};

joint.shapes.erd.Entity = joint.dia.Element
		.extend({

			markup : '<g class="rotatable"><g class="scalable"><rect class="outer"/><rect class="inner"/></g><text/></g>',

			defaults : joint.util.deepSupplement({

				type : 'erd.Entity',
				size : {
					width : 100,
					height : 40
				},
				attrs : {
					rect : {
						fill : 'white',
						stroke : 'black',
						'stroke-width' : 2
					},
					'.outer' : {
						width : 150,
						height : 60
					},
					'.inner' : {
						width : 140,
						height : 50,
						ref : '.outer',
						'ref-x' : .03,
						'ref-y' : .08,
						display : 'none'
					},
					text : {
						text : 'Entity',
						'font-family' : 'Courier New',
						'font-size' : '.8em',
						ref : '.outer',
						'ref-x' : .5,
						'ref-y' : .5,
						'x-alignment' : 'middle',
						'y-alignment' : 'middle'
					}
				}

			}, joint.dia.Element.prototype.defaults)
		});

//joint.shapes.erd.EntityView = joint.dia.ElementView.extend({
//
//	pointerdown : function(evt) {
//		joint.dia.ElementView.prototype.pointerdown.apply(this, arguments);
//		console.log('pointerdown');
//
//		//    if (evt.which === 3) {
//		// Here you can create your custom context menu or do whatever is needed as a reaction on the mouse right button.
//		//        console.log('open context menu');
//		//    }
//
//	},
//
//	pointerup : function(evt) {
//		joint.dia.ElementView.prototype.pointerup.apply(this, arguments);
//		console.log('click');
//	}
//
//});

joint.shapes.erd.WeakEntity = joint.shapes.erd.Entity.extend({

	defaults : joint.util.deepSupplement({

		type : 'erd.WeakEntity',

		attrs : {
			'.inner' : {
				display : 'auto'
			},
			text : {
				text : 'Weak Entity'
			}
		}

	}, joint.shapes.erd.Entity.prototype.defaults)
});

joint.shapes.erd.Relationship = joint.dia.Element
		.extend({

			markup : '<g class="rotatable"><g class="scalable"><polygon class="outer"/><polygon class="inner"/></g><text/></g>',

			defaults : joint.util.deepSupplement({

				type : 'erd.Relationship',
				size : {
					width : 60,
					height : 60
				},
				attrs : {

					polygon : {
						fill : 'white',
						stroke : 'black',
						'stroke-width' : 0
					},
					'.outer' : {
						points : '40,0 80,40 40,80 0,40',
						fill : 'green'
					},
					'.inner' : {
						points : '40,5 75,40 40,75 5,40',
						display : 'none'
					},
					text : {
						text : 'Relationship',
						'font-family' : 'Courier New',
						'font-size' : '.6em',
						ref : '.',
						'ref-x' : .5,
						'ref-y' : .5,
						'x-alignment' : 'middle',
						'y-alignment' : 'middle'
					}
				}

			}, joint.dia.Element.prototype.defaults)
		});

joint.shapes.erd.IdentifyingRelationship = joint.shapes.erd.Relationship
		.extend({

			defaults : joint.util.deepSupplement({

				type : 'erd.IdentifyingRelationship',

				attrs : {
					'.inner' : {
						display : 'auto'
					},
					text : {
						text : 'Identifying'
					}
				}

			}, joint.shapes.erd.Relationship.prototype.defaults)
		});

joint.shapes.erd.Attribute = joint.dia.Element
		.extend({

			markup : '<g class="rotatable"><g class="scalable"><ellipse class="outer"/><ellipse class="inner"/></g><text/></g>',

			defaults : joint.util.deepSupplement({

				type : 'erd.Attribute',
				size : {
					width : 12,
					height : 12
				},
				attrs : {
					'ellipse' : {
						stroke : 'black',
						'stroke-width' : 1,
						transform : 'translate(0, 15)',
						opacity : .6
					},
					'.outer' : {
						cx : 20,
						cy : 50,
						rx : 20,
						ry : 50,
						fill : 'white'
					},
					'.inner' : {
						cx : 10,
						cy : 25,
						rx : 45,
						ry : 20,
						fill : 'transparent',
						display : 'none'
					},
					text : {
						'y' : '1.0em'
					//                 'font-family': 'Courier New', 'font-size': '.8em',
					//                 ref: '.', 'ref-x': .1, 'ref-y': 1
					//                 'x-alignment': 'middle', 'y-alignment': 'middle'
					}
				}

			}, joint.dia.Element.prototype.defaults)

		});

joint.shapes.erd.Multivalued = joint.shapes.erd.Attribute.extend({

	defaults : joint.util.deepSupplement({

		type : 'erd.Multivalued',

		attrs : {
			'.inner' : {
				display : 'block'
			},
			text : {
				text : 'multivalued'
			}
		}
	}, joint.shapes.erd.Attribute.prototype.defaults)
});

joint.shapes.erd.Derived = joint.shapes.erd.Attribute.extend({

	defaults : joint.util.deepSupplement({

		type : 'erd.Derived',

		attrs : {
			'.outer' : {
				'stroke-dasharray' : '3, 5'
			},
			text : {
				text : 'derived'
			}
		}

	}, joint.shapes.erd.Attribute.prototype.defaults)
});

joint.shapes.erd.Key = joint.shapes.erd.Attribute.extend({

	defaults : joint.util.deepSupplement({

		type : 'erd.Key',

		attrs : {
			ellipse : {
				'stroke-width' : 4
			},
			text : {
				text : 'key',
				'font-weight' : 'bold',
				'text-decoration' : 'underline'
			}
		}
	}, joint.shapes.erd.Attribute.prototype.defaults)
});

joint.shapes.erd.Normal = joint.shapes.erd.Attribute.extend({

	defaults : joint.util.deepSupplement({

		type : 'erd.Normal',

		attrs : {
			text : {
				text : 'Normal'
			}
		}

	}, joint.shapes.erd.Attribute.prototype.defaults)
});

joint.shapes.erd.ISA = joint.dia.Element
		.extend({

			markup : '<g class="rotatable"><g class="scalable"><polygon/></g><text/></g>',

			defaults : joint.util.deepSupplement({

				type : 'erd.ISA',
				size : {
					width : 100,
					height : 50
				},
				attrs : {
					polygon : {
						points : '0,0 50,50 100,0',
						fill : 'gold',
						stroke : 'goldenrod',
						'stroke-width' : 2
					},
					text : {
						text : 'ISA',
						ref : '.',
						'ref-x' : .5,
						'ref-y' : .3,
						'x-alignment' : 'middle',
						'y-alignment' : 'middle'
					}
				}

			}, joint.dia.Element.prototype.defaults)

		});

joint.shapes.erd.Line = joint.dia.Link.extend({

	defaults : {
		type : "erd.Line"
	},

	cardinality : function(value) {
		this.set('labels', [ {
			position : -20,
			attrs : {
				text : {
					dy : -8,
					text : value
				}
			}
		} ]);
	}
});
