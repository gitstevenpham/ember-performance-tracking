import Ember from 'ember';

export default Ember.Mixin.create({
  perfTracking: Ember.inject.service('performance-tracking'),
  /**
   * Schedule a function to call the endTransition function of the perfTracking service in afterRender run queue
   */
  didTransition: function() {
    Ember.run.scheduleOnce('afterRender', () => {
      this.get('perfTracking').endTransition(this.get('currentRouteName'), this.get('currentURL'));
    });
    return this._super(...arguments);
  },
  willTransition: function() {
    this.get('perfTracking').startTransition();
    return this._super(...arguments);
  }
});