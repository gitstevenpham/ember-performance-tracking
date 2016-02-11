import BaseServiceTracking from 'ember-performance-tracking/services/performance-tracking';

export default BaseServiceTracking.extend({
  /**
   * OVERRIDE FUNCTION
   * 
   * @param  {Object} transitionData Object containing transition timing data
   */
  transitionComplete: function (transitionData) {
    // MODIFY HERE
  }
});