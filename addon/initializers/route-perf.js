import Ember from 'ember';
import RoutePerf from 'ember-performance-tracking/mixins/route-perf';

export function initialize() {
  Ember.Router.reopen(RoutePerf);
}

export default {
  name: 'route-perf',
  initialize: initialize
};
