import Ember from 'ember';

/**
 * If the performance API is missing, polyfill using Date
 */
if (!window.performance || !window.performance.now) {
  window.performance = window.performance || {};
  window.performance.now = function () {
    return (new Date()).getTime();
  };
}


export default Ember.Service.extend({
  /**
   * Initialize the TransitionData object that holds information about a transition
   * @type {Object}
   */
  currentTransition: {
    start: window.performance.now(),
    startTimestamp: (new Date()).getTime()
  },
  /**
   * Create a new object that contains the start timstamp in milliseconds and start attribute using window.performance.now
   * Store the new object in the service
   */
  startTransition: function () {
    var newTransitionData = {
      start: window.performance.now(),
      startTimestamp: (new Date()).getTime()
    };
    this.set('currentTransition', newTransitionData);
  },
  /**
   * Store the destination route and pathname with the end timer.
   * 
   * @param  {String} finalRouteName Destination route name
   * @param  {String} finalPathName  Destination pathname expected to be from this.get('router.url') from a route
   * @return {null}                  Returns nothing
   */
  endTransition: function (finalRouteName, finalPathName) {
    var transitionData = this.get('currentTransition');
    transitionData.end = window.performance.now();
    transitionData.duration = transitionData.end - transitionData.start;
    transitionData.destinationRoute = finalRouteName;
    transitionData.url = finalPathName;
    transitionData.resources = this.getResourcesInvolved(transitionData.start, transitionData.end);
    this.transitionComplete(transitionData);
  },
  /**
   * Get the AJAX calls that were initiated between the start and end
   * 
   * @param  {Float} start - Expected to be a DOMHighResTimeStamp offset from the PerformanceTiming.navigationStart property
   * @param  {Float} end   - Expected to be a DOMHighResTimeStamp offset from the PerformanceTiming.navigationStart property
   * @return {Array}         Returns an array AJAX calls with the url,
   */
  getResourcesInvolved: function (start, end) {
    var entries,
      resources = [];
    if (window.performance || window.performance.getEntries) {
      entries = window.performance.getEntries();
      entries.forEach(function (rs) {
        if (rs.initiatorType === 'xmlhttprequest' && rs.startTime > start && rs.startTime <= end) {
          resources.push({
            name: rs.name,
            duration: Math.ceil(rs.duration),
            startTime: Math.ceil(rs.startTime)
          });
        }
      });
      return resources;
    } else {
      return [];
    }
  },
  /**
   * Expected to be overriden by child classes
   * @param  {Object} transitionData Object containing transition timing data
   */
  transitionComplete: function (transitionData) {
    return transitionData;
  }
});