import Ember from 'ember';

/**
 * If the performance API is missing, polyfill using Date
 */
var navigationStart = 0;
var performanceNow = function() {
  if ('performance' in window && typeof window.performance.now === 'function' && typeof fastboot === 'undefined') {
    return window.performance.now();
  } else {
    return (new Date).getTime() - navigationStart;
  }
};
navigationStart = window.performance.timing ? window.performance.timing.navigationStart : performanceNow();

export default Ember.Service.extend({
  /**
   * Initialize the TransitionData object that holds information about a transition
   * @type {Object}
   */
  currentTransition: {
    isInitial: true,
    start: 0,
    startTimestamp: navigationStart
  },
  /**
   * Create a new object that contains the start timstamp in milliseconds and start attribute using
   * window.performance.now. It is assumed that once this function is called, it is a subsequent transition
   * Store the new object in the service
   */
  startTransition: function () {
    var newTransitionData = {
      isInitial: false,
      start: performanceNow(),
      startTimestamp: navigationStart + performanceNow()
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
        if (rs.startTime > start && rs.startTime <= end) {
          resources.push(rs);
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
