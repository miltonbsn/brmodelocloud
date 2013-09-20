/*! JointJS v0.6.3 - JavaScript diagramming library  2013-09-13 


This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
joint.shapes.uml = {}

joint.shapes.uml.Class = joint.shapes.basic.Generic.extend({

    markup: [
        '<g class="rotatable">',
          '<g class="scalable">',
            '<rect class="uml-class-name-rect"/><rect class="uml-class-attrs-rect"/><rect class="uml-class-methods-rect"/>',
          '</g>',
          '<text class="uml-class-name-text"/><text class="uml-class-attrs-text"/><text class="uml-class-methods-text"/>',
        '</g>'
    ].join(''),

    defaults: joint.util.deepSupplement({

        type: 'uml.Class',

        attrs: {
            rect: { 'width': 200, 'stroke': 'black', 'stroke-width': 2, 'fill': '#2980b9' },
            text: { 'fill': 'black', 'font-size': 12, 'font-family': 'Times New Roman' },

            '.uml-class-name-rect': { 'fill': '#3498db' },
            '.uml-class-attrs-rect': {},
            '.uml-class-methods-rect': {},

            '.uml-class-name-text': { 'ref': '.uml-class-name-rect', 'ref-y': .5, 'ref-x': .5, 'text-anchor': 'middle', 'y-alignment': 'middle', 'font-weight': 'bold' },
            '.uml-class-attrs-text': { 'ref': '.uml-class-attrs-rect', 'ref-y': 5, 'ref-x': 5 },
            '.uml-class-methods-text': { 'ref': '.uml-class-methods-rect', 'ref-y': 5, 'ref-x': 5 }

        },

        name: [],
        attributes: [],
        methods: []

    }, joint.shapes.basic.Generic.prototype.defaults),

    initialize: function() {

        _.bindAll(this, 'updateRectangles');

        this.on('change:name change:attributes change:methods', function() {
            this.updateRectangles();
            this.trigger('change:attrs');
        });

        this.updateRectangles();

        joint.shapes.basic.Generic.prototype.initialize.apply(this, arguments);
    },

    getClassName: function() {
        return this.get('name');
    },

    updateRectangles: function() {

        var attrs = this.get('attrs');

        var rects = [
            { type: 'name', text: this.getClassName() },
            { type: 'attrs', text: this.get('attributes') },
            { type: 'methods', text: this.get('methods') }
        ];

        var offsetY = 0;

        _.each(rects, function(rect) {

            var lines = _.isArray(rect.text) ? rect.text : [rect.text];
	    var rectHeight = lines.length * 20 + 20;

            attrs['.uml-class-' + rect.type + '-text'].text = lines.join('\n');
            attrs['.uml-class-' + rect.type + '-rect'].height = rectHeight;
            attrs['.uml-class-' + rect.type + '-rect'].transform = 'translate(0,'+ offsetY + ')';

            offsetY += rectHeight;
        });
    }

});

joint.shapes.uml.Abstract = joint.shapes.uml.Class.extend({

    defaults: joint.util.deepSupplement({
        attrs: { 'rect' : { fill : '#c0392b' }, '.uml-class-name-rect': { fill : '#e74c3c' }}
    }, joint.shapes.uml.Class.prototype.defaults),

    getClassName: function() {
        return ['<<Abstract>>', this.get('name')];
    }

});

joint.shapes.uml.Interface = joint.shapes.uml.Class.extend({

    defaults: joint.util.deepSupplement({
        attrs: { 'rect' : { fill : '#f39c12' }, '.uml-class-name-rect': { fill : '#f1c40f' }}
    }, joint.shapes.uml.Class.prototype.defaults),

    getClassName: function() {
        return ['<<Interface>>', this.get('name')];
    }

});

joint.shapes.uml.Generalization = joint.dia.Link.extend({
    defaults: {
        type: 'uml.Generalization',
        attrs: { '.marker-target': { d: 'M 20 0 L 0 10 L 20 20 z', fill: 'white' }}
    }
});

joint.shapes.uml.Implementation = joint.dia.Link.extend({
    defaults: {
        type: 'uml.Implementation',
        attrs: {
            '.marker-target': { d: 'M 20 0 L 0 10 L 20 20 z', fill: 'white' },
            '.connection': { 'stroke-dasharray': '3,3' }
        }
    }
});

joint.shapes.uml.Aggregation = joint.dia.Link.extend({
    defaults: {
        type: 'uml.Aggregation',
        attrs: { '.marker-target': { d: 'M 40 10 L 20 20 L 0 10 L 20 0 z', fill: 'white' }}
    }
});

joint.shapes.uml.Composition = joint.dia.Link.extend({
    defaults: {
        type: 'uml.Composition',
        attrs: { '.marker-target': { d: 'M 40 10 L 20 20 L 0 10 L 20 0 z', fill: 'black' }}
    }
});

joint.shapes.uml.Association = joint.dia.Link.extend({
    defaults: { type: 'uml.Association' }
});

// Statechart

joint.shapes.uml.State = joint.shapes.basic.Generic.extend({

    markup: [
        '<g class="rotatable">',
          '<g class="scalable">',
            '<rect/>',
          '</g>',
          '<path/><text class="uml-state-name"/><text class="uml-state-events"/>',
        '</g>'
    ].join(''),

    defaults: joint.util.deepSupplement({

        type: 'uml.State',

        attrs: {
            rect: { 'width': 200, 'height': 200, 'fill': '#ecf0f1', 'stroke': '#bdc3c7', 'stroke-width': 3, 'rx': 10, 'ry': 10 },
            path: { 'd': 'M 0 20 L 200 20', 'stroke': '#bdc3c7', 'stroke-width': 2 },
            text: { 'font-family': 'Courier New', 'font-size': 14, fill: 'black' },
            '.uml-state-name': { 'ref': 'rect', 'ref-x': .5, 'ref-y': 5, 'text-anchor': 'middle' },
            '.uml-state-events': { 'ref': 'path', 'ref-x': 5, 'ref-y': 5 }
        },

        name: 'State',
        events: []

    }, joint.shapes.basic.Generic.prototype.defaults),

    initialize: function() {

        _.bindAll(this, 'updateEvents', 'updatePath');

        this.on({
            'change:name': function() { this.updateName(); this.trigger('change:attrs'); },
            'change:events': function() { this.updateEvents(); this.trigger('change:attrs'); },
            'change:size': this.updatePath
        });

        this.updateName();
        this.updateEvents();
        this.updatePath();

        joint.shapes.basic.Generic.prototype.initialize.apply(this, arguments);
    },

    updateName: function() {
        this.get('attrs')['.uml-state-name'].text = this.get('name');
    },

    updateEvents: function() {
        this.get('attrs')['.uml-state-events'].text = this.get('events').join('\n');
    },

    updatePath: function() {
        this.get('attrs')['path'].d = 'M 0 20 L ' + this.get('size').width + ' 20';
    }

});

joint.shapes.uml.StartState = joint.shapes.basic.Circle.extend({

    defaults: joint.util.deepSupplement({

        type: 'uml.StartState',
        attrs: { circle: { 'fill': '#34495e', 'stroke': '#2c3e50', 'stroke-width': 2, 'rx': 1 }}

    }, joint.shapes.basic.Circle.prototype.defaults)

});

joint.shapes.uml.EndState = joint.shapes.basic.Generic.extend({

    markup: '<g class="rotatable"><g class="scalable"><circle class="outer"/><circle class="inner"/></g></g>',

    defaults: joint.util.deepSupplement({

        type: 'uml.EndState',
        size: { width: 20, height: 20 },
        attrs: {
            'circle.outer': {
                transform: 'translate(10, 10)',
                r: 10,
                fill: 'white',
                stroke: '#2c3e50'
            },

            'circle.inner': {
                transform: 'translate(10, 10)',
                r: 6,
                fill: '#34495e'
            }
        }

    }, joint.shapes.basic.Generic.prototype.defaults)

});

joint.shapes.uml.Transition = joint.dia.Link.extend({
    defaults: {
        type: 'uml.Transition',
        attrs: {
            '.marker-target': { d: 'M 10 0 L 0 5 L 10 10 z', fill: '#34495e', stroke: '#2c3e50' },
            '.connection': { stroke: '#2c3e50' }
        }
    }
});
