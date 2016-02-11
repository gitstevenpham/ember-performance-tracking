import Ember from 'ember';

export default Ember.Mixin.create({
  perfTracking: Ember.inject.service('performance-tracking'),
  actions: {
    /**
     * Schedule a function to call the endTransition function of the perfTracking service in afterRender run queue
     */
    didTransition: function() {
      var self = this;
      Ember.run.scheduleOnce('afterRender', function () {
        self.get('perfTracking').endTransition(self.routeName, self.get('router.url'));
      });
      return this._super.apply(this, arguments);
    },
    willTransition: function() {
      this.get('perfTracking').startTransition();
      return this._super.apply(this, arguments);
    }
  }
});