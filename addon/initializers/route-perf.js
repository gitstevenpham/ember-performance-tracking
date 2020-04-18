import EmberRouter from '@ember/routing/router';
import RoutePerf from 'ember-performance-tracking/mixins/route-perf';

export function initialize() {
  EmberRouter.reopen(RoutePerf);
}

export default {
  name: 'route-perf',
  initialize: initialize
};
