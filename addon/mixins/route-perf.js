import { scheduleOnce } from '@ember/runloop';
import { inject as service } from '@ember/service';
import Mixin from '@ember/object/mixin';

export default Mixin.create({
  perfTracking: service('performance-tracking'),
  /**
   * Schedule a function to call the endTransition function of the perfTracking service in afterRender run queue
   */
  didTransition: function() {
    scheduleOnce('afterRender', () => {
      this.get('perfTracking').endTransition(this.get('currentRouteName'), this.get('currentURL'));
    });
    return this._super(...arguments);
  },
  willTransition: function() {
    this.get('perfTracking').startTransition();
    return this._super(...arguments);
  }
});